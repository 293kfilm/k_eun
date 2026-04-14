import { NextRequest } from 'next/server';
import { dbAll, dbGet, dbRun } from '@/lib/db';
import { nanoid } from 'nanoid';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const project = await dbGet('SELECT * FROM projects WHERE id = ?', [id]);
  if (!project) {
    return Response.json({ error: 'Project not found' }, { status: 404 });
  }

  const cuts = await dbAll('SELECT * FROM cuts WHERE project_id = ? ORDER BY order_index ASC', [id]);

  return Response.json({ ...project, cuts });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { name, description, defaultToolId, defaultStyleId, cuts: updatedCuts } = body;

  await dbRun(
    `UPDATE projects SET
      name = COALESCE(?, name),
      description = COALESCE(?, description),
      default_tool_id = COALESCE(?, default_tool_id),
      default_style_id = COALESCE(?, default_style_id),
      updated_at = datetime('now')
    WHERE id = ?`,
    [name || null, description ?? null, defaultToolId ?? null, defaultStyleId ?? null, id]
  );

  if (updatedCuts) {
    await dbRun('DELETE FROM cuts WHERE project_id = ?', [id]);
    for (let i = 0; i < updatedCuts.length; i++) {
      const cut = updatedCuts[i];
      await dbRun(
        `INSERT INTO cuts (id, project_id, order_index, input_text, generated_prompt, negative_prompt, parameters, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
        [
          cut.id || nanoid(),
          id,
          i,
          cut.input_text || '',
          cut.generated_prompt || null,
          cut.negative_prompt || null,
          cut.parameters ? JSON.stringify(cut.parameters) : null,
        ]
      );
    }
  }

  return Response.json({ success: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await dbRun('DELETE FROM projects WHERE id = ?', [id]);
  await dbRun('DELETE FROM cuts WHERE project_id = ?', [id]);
  return Response.json({ success: true });
}
