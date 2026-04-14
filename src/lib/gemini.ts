import { GoogleGenerativeAI, type GenerativeModel } from '@google/generative-ai';

const MODEL_NAME = 'gemini-2.5-flash';

let client: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('GOOGLE_API_KEY is not configured. Please set it in .env.local');
  }
  if (!client) {
    client = new GoogleGenerativeAI(apiKey);
  }
  return client;
}

function getModel(systemInstruction: string): GenerativeModel {
  return getClient().getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction,
  });
}

/**
 * Call Gemini with a system prompt and user message, returns full text response.
 */
export async function callAI(
  systemPrompt: string,
  userMessage: string,
  options?: { maxTokens?: number }
): Promise<string> {
  const model = getModel(systemPrompt);
  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: userMessage }] }],
    generationConfig: {
      maxOutputTokens: options?.maxTokens ?? 4096,
    },
  });
  return result.response.text();
}

/**
 * Stream Gemini response. Returns an async iterable of text chunks.
 */
export async function* streamAI(
  systemPrompt: string,
  userMessage: string,
  options?: { maxTokens?: number }
): AsyncGenerator<string> {
  const model = getModel(systemPrompt);
  const result = await model.generateContentStream({
    contents: [{ role: 'user', parts: [{ text: userMessage }] }],
    generationConfig: {
      maxOutputTokens: options?.maxTokens ?? 4096,
    },
  });

  for await (const chunk of result.stream) {
    const text = chunk.text();
    if (text) yield text;
  }
}
