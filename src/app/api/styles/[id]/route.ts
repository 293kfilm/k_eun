import { NextRequest } from 'next/server';
import { dbGet, dbRun } from '@/lib/db';
import { callAI } from '@/lib/gemini';
import { buildStyleAnalysisPrompt } from '@/lib/prompts';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { name, description, toolId, referencePrompts, rules } = body;

  const existing = await dbGet('SELECT * FROM styles WHERE id = ?', [id]);
  if (!existing) {
    return Response.json({ error: 'Style not found' }, { status: 404 });
  }

  let styleSummary: string | undefined;
  if (referencePrompts) {
    const promptText = referencePrompts.join('\n\n---\n\n');
    const rulesNote = rules ? `\n\nUser-specified rules:\n${rules}` : '';
    styleSummary = await callAI(buildStyleAnalysisPrompt(), promptText + rulesNote);
  }

  await dbRun(
    `UPDATE styles SET
      name = COALESCE(?, name),
      description = COALESCE(?, description),
      tool_id = COALESCE(?, tool_id),
      reference_prompts = COALESCE(?, reference_prompts),
      style_summary = COALESCE(?, style_summary),
      updated_at = datetime('now')
    WHERE id = ?`,
    [
      name || null,
      description ?? null,
      toolId ?? null,
      referencePrompts ? JSON.stringify(referencePrompts) : null,
      styleSummary || null,
      id,
    ]
  );

  return Response.json({ success: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await dbRun('DELETE FROM styles WHERE id = ?', [id]);
  return Response.json({ success: true });
}
