import Anthropic from '@anthropic-ai/sdk';

let client: Anthropic | null = null;

export function getClaudeClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('ANTHROPIC_API_KEY is not configured. Please set it in .env.local');
  }
  if (!client) {
    client = new Anthropic({ apiKey });
  }
  return client;
}

export async function callClaude(
  systemPrompt: string,
  userMessage: string,
  options?: { maxTokens?: number }
): Promise<string> {
  const claude = getClaudeClient();
  const response = await claude.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: options?.maxTokens ?? 4096,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  });

  const textBlock = response.content.find((b) => b.type === 'text');
  return textBlock?.text ?? '';
}

export async function streamClaude(
  systemPrompt: string,
  userMessage: string,
  options?: { maxTokens?: number }
) {
  const claude = getClaudeClient();
  return claude.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: options?.maxTokens ?? 4096,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  });
}
