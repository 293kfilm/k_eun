import { NextRequest } from 'next/server';
import { callAI } from '@/lib/gemini';

const SYSTEM_PROMPT = `You are a cinematic style analyst. Given a description of a visual style — which could be:
- A free-text description of a mood, look, or vibe
- A movie/show/director reference
- A YouTube or social media video description
- A combination of any of the above

Your job: produce a concise, prescriptive style guide (under 500 words) that an AI video prompt generator can inject into its system prompt to enforce this style across every shot.

## Output format (plain text, organized by category):

### Lens & Camera
(focal lengths, movements, angles)

### Lighting
(key, fill, rim, practicals, time of day)

### Color & Grade
(palette, saturation, contrast, specific color references)

### Production Design & Wardrobe
(set, props, clothing, textures)

### Sound Design & Mood
(music genre, ambient, emotional tone)

### Constraints
(what to ALWAYS do, what to NEVER do)

Be CONCRETE — use numbers (24mm, f/1.4, 3200K), brand references (Kodachrome, Alexa), and filmmaker references. Avoid vague words like "cinematic" or "aesthetic" without specifics.

Output ONLY the style guide. No preamble, no explanation.`;

export async function POST(request: NextRequest) {
  try {
    const { description, name } = await request.json();

    if (!description || typeof description !== 'string' || !description.trim()) {
      return Response.json(
        { error: 'description is required' },
        { status: 400 }
      );
    }

    const userMessage = `Extract a visual style guide from the following description:\n\n"${description.trim()}"`;

    const styleSummary = await callAI(SYSTEM_PROMPT, userMessage, {
      maxTokens: 2000,
    });

    return Response.json({
      name: name || '추출된 스타일',
      description: description.trim().slice(0, 200),
      styleSummary: styleSummary.trim(),
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Style extraction failed';
    return Response.json({ error: message }, { status: 500 });
  }
}
