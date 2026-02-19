import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Only POST allowed");
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "No messages provided" });
  }

  const client = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  });

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
- experience
- projects
- skills
- goals
- funfact
- contact
`;

  try {
    const resp = await client.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    });

    const answer = resp.choices?.[0]?.message?.content || "";
    return res.status(200).json({ answer });
  } catch (err) {
    console.error("Gemini error:", err);
    return res
      .status(500)
      .json({ error: "LLM request failed", details: err.toString() });
  }
}
