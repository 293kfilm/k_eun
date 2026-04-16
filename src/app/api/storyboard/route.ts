import { NextRequest } from 'next/server';
import { callAI } from '@/lib/gemini';
import { getBuiltinKnowledge } from '@/lib/builtinKnowledge';
import { getStylePreset } from '@/data/stylePresets';

const SYSTEM_PROMPT = `You are an expert cinematic storyboard designer and video pre-production planner.

Your task: take a single-line brief from the user and decompose it into a sequence of individual cuts for an AI video project.

## Rules:
1. Each cut is ONE continuous camera shot (3–10 seconds of video).
2. The cuts together must tell a complete visual story — establish → develop → resolve.
3. Each cut description should be SHORT (1–2 sentences in Korean), describing:
   - What we SEE (subject, action, environment)
   - Camera angle/movement if crucial to the storytelling
4. Vary the shot types across cuts: wide establishing, medium, close-up, detail, POV, tracking, etc.
5. Maintain character/location consistency across all cuts.
6. AVOID flat front-facing angles with obvious vanishing points — use dynamic compositions.
7. Follow the 9-cut storyboard principle when applicable: mix of close-ups, side shots, wide shots, high/low angles, over-the-shoulder, bird's-eye views.
8. For product/commercial briefs: follow the pattern of macro detail → reveal → lifestyle context → CTA.
9. For narrative briefs: follow setup → tension → climax → resolution arc.
10. For SNS/viral briefs: hook in cut 1, payoff by final cut, keep total under 15 seconds.

Output ONLY a valid JSON array of strings (the cut descriptions in Korean):
["컷 1 묘사", "컷 2 묘사", ...]

No preamble, no explanation, no markdown. Just the JSON array.`;

export async function POST(request: NextRequest) {
  try {
    const { brief, cutCount, toolId, styleId } = await request.json();

    if (!brief || typeof brief !== 'string') {
      return Response.json({ error: 'brief is required' }, { status: 400 });
    }

    const numCuts = Math.min(Math.max(Number(cutCount) || 6, 2), 20);

    // Build context sections
    const contextParts: string[] = [SYSTEM_PROMPT];

    // Add tool knowledge if available
    if (toolId) {
      const knowledge = getBuiltinKnowledge(toolId);
      if (knowledge) {
        contextParts.push(`\n## Tool context (${toolId}):\nThe cuts will be turned into prompts for this tool. Keep cut descriptions compatible with its strengths.\n`);
      }
    }

    // Add style context if preset selected
    if (styleId?.startsWith('preset:')) {
      const preset = getStylePreset(styleId.slice('preset:'.length));
      if (preset) {
        contextParts.push(`\n## Visual style: ${preset.name}\n${preset.styleSummary}\nIncorporate this style's visual language into the cut descriptions (camera angles, lighting cues, mood keywords).`);
      }
    }

    const systemPrompt = contextParts.join('\n');

    const userMessage = `Brief: "${brief}"
Number of cuts: ${numCuts}

위 한 줄 브리프를 ${numCuts}개의 컷으로 분해해주세요. 각 컷은 한국어로 1-2문장으로 간결하게 묘사하세요.`;

    const result = await callAI(systemPrompt, userMessage, { maxTokens: 2000 });

    // Parse JSON array from response
    const jsonMatch = result.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      return Response.json({ error: 'Failed to parse storyboard result' }, { status: 500 });
    }

    const cuts: string[] = JSON.parse(jsonMatch[0]);

    if (!Array.isArray(cuts) || cuts.length === 0) {
      return Response.json({ error: 'Empty storyboard result' }, { status: 500 });
    }

    return Response.json({ cuts });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Storyboard generation failed';
    return Response.json({ error: message }, { status: 500 });
  }
}
