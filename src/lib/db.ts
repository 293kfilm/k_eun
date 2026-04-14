import { createClient, type Client, type InArgs } from '@libsql/client';
import path from 'path';

let client: Client | null = null;
let initialized = false;

export function getClient(): Client {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;

    if (url) {
      // Production: Turso cloud database
      client = createClient({
        url,
        authToken,
      });
    } else {
      // Local development: file-based SQLite
      const localPath = `file:${path.join(process.cwd(), 'data', 'studio.db')}`;
      client = createClient({ url: localPath });
    }
  }
  return client;
}

async function ensureTables() {
  if (initialized) return;
  const db = getClient();
  await db.batch(
    [
      `CREATE TABLE IF NOT EXISTS knowledge_documents (
        id TEXT PRIMARY KEY,
        tool_id TEXT NOT NULL,
        title TEXT NOT NULL,
        source_type TEXT NOT NULL CHECK(source_type IN ('url','text','file')),
        source_url TEXT,
        raw_content TEXT NOT NULL,
        extracted_rules TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS tool_knowledge (
        tool_id TEXT PRIMARY KEY,
        merged_knowledge TEXT NOT NULL,
        knowledge_summary TEXT NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS styles (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        tool_id TEXT,
        reference_prompts TEXT NOT NULL,
        style_summary TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        default_tool_id TEXT,
        default_style_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS cuts (
        id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL,
        order_index INTEGER NOT NULL,
        input_text TEXT NOT NULL,
        generated_prompt TEXT,
        negative_prompt TEXT,
        parameters TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
      )`,
      `CREATE TABLE IF NOT EXISTS history (
        id TEXT PRIMARY KEY,
        tool_id TEXT NOT NULL,
        style_id TEXT,
        input_cuts TEXT NOT NULL,
        output_results TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
    ],
    'write'
  );
  initialized = true;
}

type Row = Record<string, unknown>;

export async function dbRun(sql: string, args: InArgs = []): Promise<void> {
  await ensureTables();
  await getClient().execute({ sql, args });
}

export async function dbGet<T = Row>(sql: string, args: InArgs = []): Promise<T | undefined> {
  await ensureTables();
  const result = await getClient().execute({ sql, args });
  const row = result.rows[0];
  return row ? (Object.fromEntries(Object.entries(row)) as T) : undefined;
}

export async function dbAll<T = Row>(sql: string, args: InArgs = []): Promise<T[]> {
  await ensureTables();
  const result = await getClient().execute({ sql, args });
  return result.rows.map((r) => Object.fromEntries(Object.entries(r)) as T);
}
