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
