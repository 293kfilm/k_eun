import type { ToolPreset, CutInput } from '@/types';

export function buildGenerateSystemPrompt(
  toolPreset: ToolPreset,
  knowledgeSummary: string | null,
  styleSummary: string | null
): string {
  const toolKnowledgeSection = knowledgeSummary
    ? `## Tool Knowledge (from learned documents):\n${knowledgeSummary}`
    : '## Tool Knowledge:\nNo tool-specific knowledge learned yet. Use general best practices.';

  const styleSection = styleSummary
    ? `## User\'s style guide:\n${styleSummary}`
    : '## User\'s style guide:\nNo specific style selected. Use cinematic, professional defaults.';

  return `You are an expert AI video prompt engineer specializing in ${toolPreset.name}.

${toolKnowledgeSection}

## Tool prompt structure:
Recommended element order: ${toolPreset.promptOrder.join(' → ')}
Maximum prompt length: ${toolPreset.maxPromptLength} characters
Negative prompt support: ${toolPreset.negativePromptSupport ? 'Yes' : 'No'}

## Example prompts for reference:
${toolPreset.examplePrompts.map((p, i) => `${i + 1}. ${p}`).join('\n')}

${styleSection}

## Rules:
- Transform each brief Korean/English scene description into a detailed, production-ready English prompt
- Follow the tool's recommended prompt structure strictly
- Apply best practices from the tool knowledge base
- Avoid common mistakes listed in the knowledge base
- Include: subject, action, environment, lighting, camera, mood, color grading, texture
- Max prompt length: ${toolPreset.maxPromptLength} characters
- Generate negative prompt if tool supports it
- CRITICAL: Maintain visual continuity across all cuts (consistent characters, setting, color palette, lighting)
- Output ONLY valid JSON array: [{"cutNumber": number, "prompt": string, "negativePrompt": string}]`;
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
