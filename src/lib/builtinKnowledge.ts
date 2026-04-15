import fs from 'node:fs';
import path from 'node:path';

/**
 * Returns the built-in markdown knowledge guide bundled with the app for a given
 * tool, or null if no guide file exists. Server-only — never imported by client
 * components, so the multi-KB markdown payloads stay out of the JS bundle.
 *
 * Files live at `src/data/tool-knowledge/{toolId}.md` and are read at request time
 * (not module load) to avoid cold-start cost on routes that don't need them.
 */
export function getBuiltinKnowledge(toolId: string): string | null {
  if (!toolId || /[^a-z0-9_-]/i.test(toolId)) return null;
  try {
    const filePath = path.join(
      process.cwd(),
      'src/data/tool-knowledge',
      `${toolId}.md`,
    );
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}
