import type { ToolPreset, CutInput, ConsistencyLock } from '@/types';

export function buildGenerateSystemPrompt(
  toolPreset: ToolPreset,
  knowledgeSummary: string | null,
  styleSummary: string | null,
  globalParams?: Record<string, string | number>,
  consistency?: ConsistencyLock
): string {
  const toolKnowledgeSection = knowledgeSummary
    ? `## Tool Knowledge (latest official prompt guide):\n${knowledgeSummary}`
    : '## Tool Knowledge:\nNo tool-specific knowledge available. Use general best practices.';

  const styleSection = styleSummary
    ? `## User\'s style guide:\n${styleSummary}`
    : '## User\'s style guide:\nNo specific style selected. Use cinematic, professional defaults.';

  const targetVersion = globalParams?.version ? String(globalParams.version) : null;
  const versionSection = targetVersion
    ? `## Target Model Version: ${targetVersion}
The user has selected ${targetVersion} specifically. Locate the section of the Tool Knowledge that covers this version (or the closest one) and prioritize its conventions, supported features, and length recommendations. If the chosen version lacks a feature mentioned in the knowledge (e.g. native audio, dialogue, multi-shot), DO NOT use that feature in the generated prompt.`
    : '';

  const generationMode = globalParams?.generation_mode ? String(globalParams.generation_mode) : null;
  const modeSection = buildGenerationModeSection(toolPreset.id, generationMode);

  // Baseline negative-prompt guidance. These are universal AI-video failure
  // modes the user shouldn't have to remember every time. Specialize this list
  // when the tool's knowledge guide recommends additional negatives, but always
  // include these defaults whenever the tool supports a negative prompt.
  const negativeSection = toolPreset.negativePromptSupport
    ? `## Negative prompt baseline (ALWAYS include unless tool guide overrides):
The negativePrompt field MUST always be populated when the tool supports it. Combine these universal anti-failure-mode tokens with any tool-specific negatives from the knowledge base above:

UNIVERSAL DEFAULTS — anatomy:
  deformed hands, extra fingers, missing fingers, fused fingers, mutated fingers,
  malformed face, asymmetric eyes, crossed eyes, extra limbs, missing limbs,
  bad anatomy, disfigured, mutated, unnatural body proportions

UNIVERSAL DEFAULTS — quality:
  blurry, low quality, low resolution, pixelated, jpeg artifacts, compression artifacts,
  noise, oversaturated, underexposed, overexposed, washed out, banding

UNIVERSAL DEFAULTS — text/branding:
  text, watermark, logo, signature, subtitles, captions, glitched text,
  fake letters, illegible writing, UI elements, timecode

UNIVERSAL DEFAULTS — motion/temporal:
  flickering, frame skipping, jittery motion, morphing faces, melting features,
  duplicated frames, ghosting, motion artifacts

CONDITIONAL — append only if relevant to the cut:
  - If photoreal: cartoon, anime, illustration, 3d render, plastic skin, doll-like
  - If anime/illustration: photoreal, 3d render, realistic skin pores
  - If cinematic: amateur, vlog, smartphone, vertical phone footage (unless 9:16 requested)
  - If indoor/intimate: harsh sunlight, blown highlights
  - If product shot: hands intruding, fingerprints, dust on product

Format: comma-separated tokens, lowercase, no full sentences. Keep under 400 characters.`
    : `## Negative prompt: NOT supported by this tool. Set negativePrompt to "" in output.`;

  return `You are an expert AI video prompt engineer specializing in ${toolPreset.name}.

${toolKnowledgeSection}

${versionSection}

${modeSection}

## Tool prompt structure:
Recommended element order: ${toolPreset.promptOrder.join(' → ')}
Maximum prompt length: ${toolPreset.maxPromptLength} characters
Negative prompt support: ${toolPreset.negativePromptSupport ? 'Yes' : 'No'}

## Example prompts for reference:
${toolPreset.examplePrompts.map((p, i) => `${i + 1}. ${p}`).join('\n')}

${styleSection}

${buildConsistencySection(consistency)}

${negativeSection}

## Rules:
- Transform each brief Korean/English scene description into a detailed, production-ready English prompt
- Follow the tool's recommended prompt structure strictly
- Apply best practices from the Tool Knowledge above (treat it as authoritative)
- Avoid common mistakes listed in the knowledge base
- Include: subject, action, environment, lighting, camera, mood, color grading, texture
- Max prompt length: ${toolPreset.maxPromptLength} characters
- Negative prompt: follow the Negative prompt baseline section above. Never leave it empty when the tool supports it.
- CRITICAL: Maintain visual continuity across all cuts (consistent characters, setting, color palette, lighting)
- Output ONLY valid JSON array: [{"cutNumber": number, "prompt": string, "negativePrompt": string}]`;
}

function buildGenerationModeSection(toolId: string, mode: string | null): string {
  if (!mode || mode === 'text-to-video') return '';

  if (toolId === 'seedance' && mode === 'omni') {
    return `## Generation Mode: Seedance Omni (Multimodal Reference)
The user will provide reference images/videos/audio alongside their text prompt.
Adapt the generated prompt for Seedance 2.0 Omni Reference mode:

CRITICAL DIFFERENCES from text-to-video:
1. Use @reference syntax: @image1, @image2... @video1... @audio1 to reference uploaded assets
2. The prompt should DIRECT how to use references, not re-describe them
   - BAD: "A woman with brown hair walks..." (re-describing the reference image)
   - GOOD: "Using @image1 as the character, she walks through a rain-soaked alley..."
3. Prompt structure for Omni:
   - Character reference: "@image1 as the main character" (face/body consistency from image)
   - Style reference: "@image2 as style reference" (color grade, mood, texture)
   - Motion reference: "@video1 as motion reference" (camera movement, action pacing)
   - Audio: "@audio1 as background music" (sync mood to audio)
4. Max 9 reference images, 3 reference videos, 3 audio tracks
5. Always specify WHICH reference asset controls WHAT aspect
6. The text prompt focuses on ACTION, CAMERA, and TRANSITIONS — not on re-describing referenced visuals

Output format stays the same: [{"cutNumber": number, "prompt": string, "negativePrompt": string}]
But each prompt should include @reference directives where the user mentioned reference assets.
If the user hasn't specified reference assets, write the prompt assuming they WILL attach them,
using @image1 for character, @image2 for background/style as placeholders.`;
  }

  if (toolId === 'seedance' && mode === 'image-to-video') {
    return `## Generation Mode: Seedance Image-to-Video
The user will provide a starting frame image. Adapt prompts accordingly:
- Do NOT re-describe the image's visual content (the model already sees it)
- Focus the prompt on MOTION, ACTION, and CHANGE from the starting frame
- Describe: what moves, camera movement, how the scene evolves over time
- Example: "The woman slowly turns to face the camera, wind picks up her hair. Slow dolly in. Autumn leaves begin to fall."`;
  }

  if (toolId === 'kling' && mode === 'multi') {
    return `## Generation Mode: Kling Multi-Shot
Kling 3.0 Multi mode generates up to 6 connected shots in a single output.
Adapt the generated prompts for native multi-shot format:

CRITICAL DIFFERENCES from text-to-video:
1. Structure each cut's prompt as a SEQUENCE of labeled shots:
   [Shot 1]: Wide establishing shot — description...
   [Shot 2]: Medium shot — description...
   [Shot 3]: Close-up — description...
   (up to 6 shots per cut)
2. Each shot label must specify framing (wide/medium/close-up/detail)
3. Maintain character and environment consistency WITHIN the multi-shot sequence
4. Camera transitions between shots should be specified: "cut to", "dissolve to", "match cut"
5. For dialogue, indicate speaker and tone:
   [Shot 2]: Close-up of the woman. She says softly: "I missed you." (warm, trembling voice)
6. Native audio is supported — include ambient sound and dialogue direction
7. Keep total multi-shot prompt under 800 characters (Kling 3.0 allows longer prompts in multi mode)

Output format: [{"cutNumber": number, "prompt": string, "negativePrompt": string}]
where each prompt contains the [Shot N] labeled multi-shot sequence.`;
  }

  if (toolId === 'kling' && mode === 'image-to-video') {
    return `## Generation Mode: Kling Image-to-Video
The user will provide a starting frame image. Adapt prompts accordingly:
- Do NOT re-describe the image's visual content (the model already sees it)
- Focus on MOTION and CHANGE from the starting frame
- Specify camera movement, subject action, and how the scene evolves
- Example: "She begins to walk forward slowly, camera tracking from the side. Rain intensifies. Neon reflections ripple on the wet ground."`;
  }

  return '';
}

function buildConsistencySection(consistency?: ConsistencyLock): string {
  if (!consistency) return '';
  const parts: string[] = [];
  if (consistency.characterSheet?.trim()) {
    parts.push(`### Character Sheet (MUST appear consistently in every cut):
${consistency.characterSheet.trim()}
Every cut's prompt MUST describe this character with these exact visual attributes (age, hair, wardrobe, features). Do NOT change or omit any detail.`);
  }
  if (consistency.sceneAnchor?.trim()) {
    parts.push(`### Scene Anchor (MUST appear consistently across all cuts):
${consistency.sceneAnchor.trim()}
Every cut takes place in this environment. Maintain the same location, weather, time-of-day, and color temperature. Camera may move but the world stays the same.`);
  }
  if (parts.length === 0) return '';
  return `## Consistency Lock — Cross-cut visual identity\n${parts.join('\n\n')}`;
}

export function buildGenerateUserMessage(
  cuts: CutInput[],
  globalParams?: Record<string, string | number>
): string {
  const paramStr = globalParams
    ? `\n\nGlobal parameters: ${JSON.stringify(globalParams)}`
    : '';

  const cutList = cuts
    .map((c) => {
      const paramNote = c.params ? ` [params: ${JSON.stringify(c.params)}]` : '';
      return `Cut ${c.index}: ${c.text}${paramNote}`;
    })
    .join('\n');

  return `Generate detailed prompts for the following cuts:\n\n${cutList}${paramStr}`;
}

export function buildKnowledgeExtractionPrompt(toolName: string): string {
  return `You are an AI video prompt engineering expert. Analyze the following document about ${toolName} and extract structured prompt writing rules.

Extract into these categories:
1. PROMPT_STRUCTURE: Recommended order/structure of prompt elements
2. BEST_PRACTICES: Specific tips that improve output quality
3. COMMON_MISTAKES: Things to avoid
4. STYLE_KEYWORDS: Effective keywords and phrases
5. PARAMETER_TIPS: Optimal parameter settings
6. EXAMPLES: Notable example prompts with explanations

Output ONLY valid JSON:
{
  "promptStructure": "string",
  "bestPractices": ["string"],
  "commonMistakes": ["string"],
  "effectiveKeywords": ["string"],
  "parameterTips": ["string"],
  "examplePrompts": [{"prompt": "string", "why": "string"}],
  "summary": "string (3-5 sentence overall summary)"
}`;
}

export function buildKnowledgeMergePrompt(): string {
  return `You are an AI video prompt engineering expert. Below are extracted rules from multiple documents about the same AI video tool. Merge them into a single, coherent prompt writing guide.

Requirements:
- Remove duplicates
- Resolve contradictions (prefer more specific/recent advice)
- Organize into clear sections
- Keep the total under 2000 words
- Output as a well-structured text guide (not JSON)`;
}

export function buildStyleAnalysisPrompt(): string {
  return `Analyze these reference prompts. Extract consistent patterns:
tone/mood, descriptors, camera/lighting tendencies, color grading, sentence structure.
Create a concise style guide (under 500 words) for generating new prompts in this style.
Output as plain text, organized by category.`;
}
