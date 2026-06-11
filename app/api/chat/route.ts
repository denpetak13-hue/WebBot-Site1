import { NextRequest, NextResponse } from "next/server";
import { getOpenAIClient, GPT_MODEL, MAX_TOKENS, MAX_HISTORY_MESSAGES } from "@/lib/ai/openai";
import { buildSystemPrompt } from "@/lib/ai/prompt";
import { ChatRequest } from "@/types/chat";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();

    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "Neispravan format zahteva." },
        { status: 400 }
      );
    }

    // Ogranicavamo duzinu poruke korisnika radi bezbednosti
    const lastUserMessage = body.messages[body.messages.length - 1];
    if (lastUserMessage?.role === "user" && lastUserMessage.content.length > 2000) {
      return NextResponse.json(
        { error: "Poruka je predugacka. Maksimalno 2000 karaktera." },
        { status: 400 }
      );
    }

    // Uzimamo samo poslednjih N poruka da ne prelazimo context limit
    const recentMessages = body.messages.slice(-MAX_HISTORY_MESSAGES);

    const systemPrompt = buildSystemPrompt();

    const openai = getOpenAIClient();

    const completion = await openai.chat.completions.create({
      model: GPT_MODEL,
      max_tokens: MAX_TOKENS,
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        ...recentMessages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
    });

    const message = completion.choices[0]?.message?.content;

    if (!message) {
      return NextResponse.json(
        { error: "GPT nije vratio odgovor. Pokusajte ponovo." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message }, { headers: CORS_HEADERS });
  } catch (error: unknown) {
    console.error("[Chat API Error]", error);

    // Specifican error za nepodesen API kljuc
    if (error instanceof Error && error.message.includes("OPENAI_API_KEY")) {
      return NextResponse.json(
        { error: "API kljuc nije konfigurisan. Kontaktirajte administratora." },
        { status: 500 }
      );
    }

    // OpenAI API greska
    if (
      error &&
      typeof error === "object" &&
      "status" in error &&
      (error as { status: number }).status === 401
    ) {
      return NextResponse.json(
        { error: "Neispravan API kljuc. Proverite konfiguraciju." },
        { status: 500 }
      );
    }

    if (
      error &&
      typeof error === "object" &&
      "status" in error &&
      (error as { status: number }).status === 429
    ) {
      return NextResponse.json(
        { error: "Previse zahteva. Sacekajte trenutak i pokusajte ponovo." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        error:
          "Doslo je do greske. Pokusajte ponovo ili kontaktirajte tim direktno.",
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
