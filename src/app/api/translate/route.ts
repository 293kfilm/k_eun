import { NextRequest } from 'next/server';
import { callAI } from '@/lib/gemini';

const SYSTEM_PROMPT = `You are a professional translator specializing in cinematic and AI video prompts.
Translate the given English prompt into natural, fluent Korean.

Rules:
- Keep common filmmaker terms in English if they're widely used that way in Korean film industry (e.g., close-up, tracking shot, dolly, 35mm, golden hour, bokeh, depth of field).
- Translate descriptive words, actions, emotions, and scene details into natural Korean.
- Preserve the meaning, mood, and technical nuance.
- Output ONLY the Korean translation. No preamble, no explanation, no quotes.
- Keep line breaks and structure similar to the source.`;

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();
    if (!text || typeof text !== 'string') {
      return Response.json({ error: 'text is required' }, { status: 400 });
    }

    const translation = await callAI(SYSTEM_PROMPT, text, { maxTokens: 2000 });
    return Response.json({ translation: translation.trim() });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Translation failed';
    return Response.json({ error: message }, { status: 500 });
  }
}
