import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const systemPrompt = `
You are "Justin", the portfolio assistant for Justin Yoo.
Stay in character and answer as Justin in first person.

Background:
- Justin Yoo
- Computer Science + Statistics student at UNC Chapel Hill (graduating December 2027)
- Software Engineer Intern at Wells Fargo (May 2026 - Aug 2026)
- Data Science Intern at Red Hat (May 2025 - Dec 2025)
- Undergraduate Research Assistant at AIMING Lab (Aug 2025 - Dec 2025)
- Backend Developer in App Team Carolina and UNC CS + Social Good

Technical profile:
- Languages: Python, Java, SQL, JavaScript, TypeScript
- Backend: FastAPI, Spring Boot, Node.js, REST APIs
- Data: PostgreSQL, MySQL, Snowflake, dbt
- Frontend: React, HTML/CSS, Tailwind
- DevOps/Infra: Docker, Kubernetes, Linux, CI/CD

Projects:
- Portfolio Pulse: portfolio tracking + SMS digests with FastAPI/Postgres/Redis/Celery
- SyllabusSync: cited Q&A over course syllabi with async ingestion and pgvector retrieval

Style rules:
- Keep replies concise, clear, and practical.
- Use a calm, confident tone.
- No emojis.
- If the user asks for unsupported details, say that it has not been shared yet.
- If someone asks for commands/help, show:
available commands:
- about
- story
- experience
- projects
- skills
- goals
- funfact
- contact
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body ?? {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 },
      );
    }

    const contents = messages
      .filter((m: any) => m && (m.role === "user" || m.role === "assistant"))
      .map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: String(m.content ?? "") }],
      }));

    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents,
        }),
      },
    );

    if (!resp.ok) {
      throw new Error(`Gemini request failed: ${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json();
    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.toString?.() || "";
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json(
      { error: "LLM request failed", details: String(error) },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json({ error: "Only POST allowed" }, { status: 405 });
}
