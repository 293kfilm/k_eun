import { GoogleGenerativeAI, type GenerativeModel } from '@google/generative-ai';

const PRIMARY_MODEL = 'gemini-2.5-flash';
const FALLBACK_MODEL = 'gemini-2.0-flash';

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

function getModel(systemInstruction: string, modelName?: string): GenerativeModel {
  return getClient().getGenerativeModel({
    model: modelName || PRIMARY_MODEL,
    systemInstruction,
  });
}

/**
 * Call Gemini with a system prompt and user message, returns full text response.
 * Falls back to FALLBACK_MODEL on 503 (high demand).
 */
export async function callAI(
  systemPrompt: string,
  userMessage: string,
  options?: { maxTokens?: number }
): Promise<string> {
  const config = {
    contents: [{ role: 'user' as const, parts: [{ text: userMessage }] }],
    generationConfig: {
      maxOutputTokens: options?.maxTokens ?? 4096,
    },
  };

  try {
    const model = getModel(systemPrompt, PRIMARY_MODEL);
    const result = await model.generateContent(config);
    return result.response.text();
  } catch (err) {
    if (err instanceof Error && (err.message.includes('503') || err.message.includes('overloaded') || err.message.includes('high demand'))) {
      console.warn(`[gemini] ${PRIMARY_MODEL} unavailable (503), falling back to ${FALLBACK_MODEL}`);
      const fallback = getModel(systemPrompt, FALLBACK_MODEL);
      const result = await fallback.generateContent(config);
      return result.response.text();
    }
    throw err;
  }
}

/**
 * Stream Gemini response. Returns an async iterable of text chunks.
 * Falls back to FALLBACK_MODEL on 503 (high demand).
 */
export async function* streamAI(
  systemPrompt: string,
  userMessage: string,
  options?: { maxTokens?: number }
): AsyncGenerator<string> {
  const config = {
    contents: [{ role: 'user' as const, parts: [{ text: userMessage }] }],
    generationConfig: {
      maxOutputTokens: options?.maxTokens ?? 4096,
    },
  };

  let stream;
  try {
    const model = getModel(systemPrompt, PRIMARY_MODEL);
    stream = await model.generateContentStream(config);
  } catch (err) {
    if (err instanceof Error && (err.message.includes('503') || err.message.includes('overloaded') || err.message.includes('high demand'))) {
      console.warn(`[gemini] ${PRIMARY_MODEL} unavailable (503), falling back to ${FALLBACK_MODEL}`);
      const fallback = getModel(systemPrompt, FALLBACK_MODEL);
      stream = await fallback.generateContentStream(config);
    } else {
      throw err;
    }
  }

  for await (const chunk of stream.stream) {
    const text = chunk.text();
    if (text) yield text;
  }
}
