import { NextRequest } from 'next/server';
import { dbAll, dbGet, dbRun } from '@/lib/db';
import { getBuiltinKnowledgeBreakdown } from '@/lib/builtinKnowledge';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ toolId: string }> }
) {
  const { toolId } = await params;

  const documents = await dbAll(
    'SELECT * FROM knowledge_documents WHERE tool_id = ? ORDER BY created_at DESC',
    [toolId]
  );

  const knowledge = await dbGet('SELECT * FROM tool_knowledge WHERE tool_id = ?', [toolId]);
  const builtin = getBuiltinKnowledgeBreakdown(toolId);

  return Response.json({
    documents,
    knowledge: knowledge ?? null,
    builtin,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ toolId: string }> }
) {
  const { toolId } = await params;
  const { documentId } = await request.json();

  if (!documentId) {
    return Response.json({ error: 'documentId required' }, { status: 400 });
  }

  await dbRun('DELETE FROM knowledge_documents WHERE id = ? AND tool_id = ?', [documentId, toolId]);

  const remaining = await dbAll<{ extracted_rules: string }>(
    'SELECT extracted_rules FROM knowledge_documents WHERE tool_id = ?',
    [toolId]
  );

  if (remaining.length === 0) {
    await dbRun('DELETE FROM tool_knowledge WHERE tool_id = ?', [toolId]);
  }

  return Response.json({ success: true });
}
