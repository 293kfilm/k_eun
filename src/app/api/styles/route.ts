import { NextRequest } from 'next/server';
import { dbAll, dbRun } from '@/lib/db';
import { callAI } from '@/lib/gemini';
import { buildStyleAnalysisPrompt } from '@/lib/prompts';
import { nanoid } from 'nanoid';

export async function GET() {
  const styles = await dbAll<Record<string, unknown>>(
    'SELECT * FROM styles ORDER BY updated_at DESC'
  );
  const parsed = styles.map((s) => ({
    ...s,
    reference_prompts: JSON.parse(s.reference_prompts as string),
  }));
  return Response.json(parsed);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, toolId, referencePrompts, rules } = body;

    if (!name || !referencePrompts?.length) {
      return Response.json({ error: 'Name and at least 1 reference prompt required' }, { status: 400 });
    }

    const promptText = referencePrompts.join('\n\n---\n\n');
    const rulesNote = rules ? `\n\nUser-specified rules:\n${rules}` : '';
    const analysisPrompt = buildStyleAnalysisPrompt();
    const styleSummary = await callAI(analysisPrompt, promptText + rulesNote);

    const id = nanoid();

    await dbRun(
      `INSERT INTO styles (id, name, description, tool_id, reference_prompts, style_summary, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [id, name, description || null, toolId || null, JSON.stringify(referencePrompts), styleSummary]
    );

    return Response.json({
      id,
      name,
      description,
      tool_id: toolId,
      reference_prompts: referencePrompts,
      style_summary: styleSummary,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return Response.json({ error: message }, { status: 500 });
  }
}
