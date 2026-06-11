import OpenAI from "openai";

let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === "sk-your-api-key-here") {
      throw new Error(
        "OPENAI_API_KEY nije podesen. Dodajte vas API kljuc u .env.local fajl."
      );
    }

    openaiClient = new OpenAI({ apiKey });
  }

  return openaiClient;
}

export const GPT_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

export const MAX_TOKENS = 800;

export const MAX_HISTORY_MESSAGES = 20;
