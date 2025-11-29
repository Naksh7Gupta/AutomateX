import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ reply: "No prompt received." });
    }

    // OpenRouter API call
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_KEY}` // OpenRouter key
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // ya jo bhi model tu use karna chahta hai
        messages: [
          { role: "user", content: prompt }
        ]
      }),
    });

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content || "No reply";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ reply: "Server error occurred." });
  }
}
