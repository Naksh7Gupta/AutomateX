import connectDB from "@/app/connectDB";
import Chat from "@/app/models/Chat";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export async function POST(req) {
  await connectDB();
  
  const { chatId, message } = await req.json();

  // find chat
  let chat = await Chat.findById(chatId);

  // if new chat
  if (!chat) {
    chat = await Chat.create({
      _id: chatId,
      messages: []
    });
  }

  // push user message
  chat.messages.push({ role: "user", content: message });

  // send all history to AI
  const aiRes = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: chat.messages
  });

  const aiReply = aiRes.choices[0].message.content;

  // push AI reply
  chat.messages.push({ role: "assistant", content: aiReply });

  // save updated chat
  await chat.save();

  return NextResponse.json({ reply: aiReply });
}
