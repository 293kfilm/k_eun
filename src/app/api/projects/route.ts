import { NextRequest } from 'next/server';
import { dbAll, dbRun } from '@/lib/db';
import { nanoid } from 'nanoid';

export async function GET() {
  const projects = await dbAll(
    `SELECT p.*, COUNT(c.id) as cut_count
     FROM projects p
     LEFT JOIN cuts c ON c.project_id = p.id
     GROUP BY p.id
     ORDER BY p.updated_at DESC`
  );
  return Response.json(projects);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, description, defaultToolId, defaultStyleId, cuts: inputCuts } = body;

  if (!name) {
    return Response.json({ error: 'Name is required' }, { status: 400 });
  }

  const projectId = nanoid();

  await dbRun(
    `INSERT INTO projects (id, name, description, default_tool_id, default_style_id, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
    [projectId, name, description || null, defaultToolId || null, defaultStyleId || null]
  );

  if (inputCuts?.length) {
    for (const cut of inputCuts) {
      await dbRun(
        `INSERT INTO cuts (id, project_id, order_index, input_text, generated_prompt, negative_prompt, parameters, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
        [
          nanoid(),
          projectId,
          cut.order_index ?? cut.cutNumber ?? 0,
          cut.input_text ?? cut.text ?? '',
          cut.generated_prompt ?? cut.prompt ?? null,
          cut.negative_prompt ?? cut.negativePrompt ?? null,
          cut.parameters ? JSON.stringify(cut.parameters) : null,
        ]
      );
    }
  }

  return Response.json({ id: projectId, name });
}
