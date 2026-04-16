import { NextRequest } from 'next/server';
import { dbGet, dbRun } from '@/lib/db';
import { getToolPreset } from '@/lib/presets';
import { getBuiltinKnowledge } from '@/lib/builtinKnowledge';
import { getStylePreset } from '@/data/stylePresets';
import { streamAI } from '@/lib/gemini';
import { buildGenerateSystemPrompt, buildGenerateUserMessage } from '@/lib/prompts';
import { nanoid } from 'nanoid';
import type { GenerateRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { cuts, toolId, styleId, globalParams, consistency } = body;

    if (!cuts?.length || !toolId) {
      return Response.json({ error: 'Missing required fields: cuts, toolId' }, { status: 400 });
    }

    const preset = getToolPreset(toolId);
    if (!preset) {
      return Response.json({ error: `Unknown tool: ${toolId}` }, { status: 400 });
    }

    const toolKnowledge = await dbGet<{ knowledge_summary: string }>(
      'SELECT knowledge_summary FROM tool_knowledge WHERE tool_id = ?',
      [toolId]
    );

    // Prefer user-trained knowledge from DB. Fall back to bundled markdown guide
    // shipped with the app so that prompts use the latest official guidance even
    // when no documents have been uploaded via the Tool Knowledge UI.
    const knowledgeSummary =
      toolKnowledge?.knowledge_summary?.trim() ||
      getBuiltinKnowledge(toolId) ||
      null;

    // Style ids prefixed with `preset:` resolve to the bundled cinematic style
    // presets (e.g. `preset:noir-classic`); anything else is a user-trained
    // style stored in the `styles` table.
    let styleSummary: string | null = null;
    if (styleId) {
      if (styleId.startsWith('preset:')) {
        const preset = getStylePreset(styleId.slice('preset:'.length));
        styleSummary = preset?.styleSummary ?? null;
      } else {
        const style = await dbGet<{ style_summary: string }>(
          'SELECT style_summary FROM styles WHERE id = ?',
          [styleId]
        );
        styleSummary = style?.style_summary ?? null;
      }
    }

    const systemPrompt = buildGenerateSystemPrompt(
      preset,
      knowledgeSummary,
      styleSummary,
      globalParams,
      consistency
    );
    const userMessage = buildGenerateUserMessage(cuts, globalParams);

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        let fullText = '';
        try {
          for await (const text of streamAI(systemPrompt, userMessage)) {
            fullText += text;
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: 'delta', text })}\n\n`)
            );
          }

          let results;
          try {
            const jsonMatch = fullText.match(/\[[\s\S]*\]/);
            results = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
          } catch {
            results = [{ cutNumber: 1, prompt: fullText, negativePrompt: '' }];
          }

          await dbRun(
            "INSERT INTO history (id, tool_id, style_id, input_cuts, output_results, created_at) VALUES (?, ?, ?, ?, ?, datetime('now'))",
            [nanoid(), toolId, styleId || null, JSON.stringify(cuts), JSON.stringify(results)]
          );

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'done', results })}\n\n`)
          );
          controller.close();
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Stream error';
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'error', error: message })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return Response.json({ error: message }, { status: 500 });
  }
}
