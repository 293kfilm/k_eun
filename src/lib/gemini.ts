import { GoogleGenerativeAI, type GenerativeModel } from '@google/generative-ai';

const PRIMARY_MODEL = 'gemini-2.5-flash';
const FALLBACK_MODEL = 'gemini-2.0-flash';
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 5000;

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

function isRetryable(err: Error): boolean {
  return (
    err.message.includes('503') ||
    err.message.includes('429') ||
    err.message.includes('overloaded') ||
    err.message.includes('high demand') ||
    err.message.includes('quota') ||
    err.message.includes('RESOURCE_EXHAUSTED')
  );
}

function friendlyError(err: Error): Error {
  if (err.message.includes('429') || err.message.includes('quota')) {
    return new Error('API 할당량 초과 — 잠시 후 다시 시도해주세요 (약 30초 후)');
  }
  if (err.message.includes('503') || err.message.includes('overloaded')) {
    return new Error('AI 모델이 현재 과부하 상태입니다 — 잠시 후 다시 시도해주세요');
  }
  if (err.message.includes('400')) {
    return new Error('요청 형식 오류 — 입력을 확인해주세요');
  }
  return err;
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Try calling a model, with fallback + retry on transient errors.
 * Order: PRIMARY → FALLBACK → retry PRIMARY after delay → retry FALLBACK after delay
 */
async function callWithRetry<T>(
  systemPrompt: string,
  config: Parameters<GenerativeModel['generateContent']>[0],
  execFn: (model: GenerativeModel) => Promise<T>,
): Promise<T> {
  const models = [PRIMARY_MODEL, FALLBACK_MODEL];

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    for (const modelName of models) {
      try {
        const model = getModel(systemPrompt, modelName);
        return await execFn(model);
      } catch (err) {
        if (err instanceof Error && isRetryable(err)) {
          console.warn(`[gemini] ${modelName} failed (${attempt}): ${err.message.slice(0, 100)}`);
          continue; // try next model
        }
        throw friendlyError(err instanceof Error ? err : new Error(String(err)));
      }
    }
    // All models failed this round — wait before retrying
    if (attempt < MAX_RETRIES) {
      console.warn(`[gemini] All models failed, retrying in ${RETRY_DELAY_MS}ms...`);
      await delay(RETRY_DELAY_MS);
    }
  }

  throw new Error('API 할당량 초과 — 잠시 후 다시 시도해주세요 (약 30초 후)');
}

/**
 * Call Gemini with a system prompt and user message, returns full text response.
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

  return callWithRetry(systemPrompt, config, async (model) => {
    const result = await model.generateContent(config);
    return result.response.text();
  });
}

/**
 * Stream Gemini response. Returns an async iterable of text chunks.
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

  // For streaming, try each model but can't easily retry mid-stream,
  // so we retry at the connection level.
  const models = [PRIMARY_MODEL, FALLBACK_MODEL];
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    for (const modelName of models) {
      try {
        const model = getModel(systemPrompt, modelName);
        const stream = await model.generateContentStream(config);
        for await (const chunk of stream.stream) {
          const text = chunk.text();
          if (text) yield text;
        }
        return; // success
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        if (isRetryable(lastError)) {
          console.warn(`[gemini] stream ${modelName} failed (${attempt}): ${lastError.message.slice(0, 100)}`);
          continue;
        }
        throw friendlyError(lastError);
      }
    }
    if (attempt < MAX_RETRIES) {
      console.warn(`[gemini] All stream models failed, retrying in ${RETRY_DELAY_MS}ms...`);
      await delay(RETRY_DELAY_MS);
    }
  }

  throw friendlyError(lastError || new Error('AI 모델 호출 실패'));
}
