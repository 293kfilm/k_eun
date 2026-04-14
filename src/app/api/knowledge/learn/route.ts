import { NextRequest } from 'next/server';
import { dbAll, dbRun } from '@/lib/db';
import { callAI } from '@/lib/gemini';
import { scrapeUrl } from '@/lib/scraper';
import { buildKnowledgeExtractionPrompt, buildKnowledgeMergePrompt } from '@/lib/prompts';
import { getToolPreset } from '@/lib/presets';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { toolId, title, sourceType, sourceUrl, content: rawText } = body;

    if (!toolId || !sourceType) {
      return Response.json({ error: 'Missing toolId or sourceType' }, { status: 400 });
    }

    const preset = getToolPreset(toolId);
    if (!preset) {
      return Response.json({ error: `Unknown tool: ${toolId}` }, { status: 400 });
    }

    let content: string;
    if (sourceType === 'url') {
      if (!sourceUrl) {
        return Response.json({ error: 'URL is required' }, { status: 400 });
      }
      try {
        content = await scrapeUrl(sourceUrl);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch URL';
        return Response.json({ error: message }, { status: 400 });
      }
    } else if (sourceType === 'text' || sourceType === 'file') {
      if (!rawText) {
        return Response.json({ error: 'Content is required' }, { status: 400 });
      }
      content = rawText;
    } else {
      return Response.json({ error: 'Invalid sourceType' }, { status: 400 });
    }

    // Extract rules using Claude
    const extractionPrompt = buildKnowledgeExtractionPrompt(preset.name);
    const extractedRulesRaw = await callAI(extractionPrompt, content);

    let extractedRules;
    try {
      const jsonMatch = extractedRulesRaw.match(/\{[\s\S]*\}/);
      extractedRules = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
      if (!extractedRules) throw new Error('No JSON found');
    } catch {
      return Response.json(
        { error: 'Failed to parse extracted rules from AI response' },
        { status: 500 }
      );
    }

    // Save document to DB
    const docId = nanoid();
    const docTitle = title || `Document ${new Date().toLocaleDateString()}`;

    await dbRun(
      "INSERT INTO knowledge_documents (id, tool_id, title, source_type, source_url, raw_content, extracted_rules, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))",
      [docId, toolId, docTitle, sourceType, sourceUrl || null, content, JSON.stringify(extractedRules)]
    );

    // Merge all documents for this tool
    const allDocs = await dbAll<{ extracted_rules: string }>(
      'SELECT extracted_rules FROM knowledge_documents WHERE tool_id = ?',
      [toolId]
    );

    const allRules = allDocs.map((d) => d.extracted_rules).join('\n\n---\n\n');

    const mergePrompt = buildKnowledgeMergePrompt();
    const mergedKnowledge = await callAI(mergePrompt, allRules);

    // Upsert tool_knowledge
    await dbRun(
      `INSERT INTO tool_knowledge (tool_id, merged_knowledge, knowledge_summary, updated_at)
       VALUES (?, ?, ?, datetime('now'))
       ON CONFLICT(tool_id) DO UPDATE SET
         merged_knowledge = excluded.merged_knowledge,
         knowledge_summary = excluded.knowledge_summary,
         updated_at = datetime('now')`,
      [toolId, allRules, mergedKnowledge]
    );

    return Response.json({
      id: docId,
      title: docTitle,
      extractedRules,
      knowledgeSummary: mergedKnowledge,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return Response.json({ error: message }, { status: 500 });
  }
}
