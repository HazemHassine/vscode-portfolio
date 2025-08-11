import { meAsContext } from "@/components/data/me";


export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_ID = process.env.GEMINI_MODEL || "gemini-1.5-flash";

export async function POST(req) {
    try {
        const { messages = [], system = "You are a friendly portfolio chatbot." } = await req.json();

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

        const systemInstruction = [
            (system || "You are Hazem’s hype-but-honest portfolio guide.").trim(),
            "Style: reply in brief sentence—friendly, a bit quirky, and genuinely enthusiastic about Hazem.",
            "Scope: answer ONLY using the context; if it’s not there, say: “I don’t know from the context.”",
            "Constraints: plain text, no lists/headers, no code blocks, keep it under ~40 words, one tasteful exclamation max.",
            "--- CONTEXT START ---",
            meAsContext(),
            "--- CONTEXT END ---",
        ].join("\n");

        const model = genAI.getGenerativeModel({
            model: MODEL_ID,
            systemInstruction,
            generationConfig: {
                temperature: 0.2,
            },
        });

        // Find index of the last user message
        let lastUserIndex = -1;
        for (let i = messages.length - 1; i >= 0; i--) {
            if (messages[i]?.role === "user") {
                lastUserIndex = i;
                break;
            }
        }

        // Build history strictly before the last user turn
        const prior = lastUserIndex > 0 ? messages.slice(0, lastUserIndex) : [];

        // Convert to Gemini format, ensuring the first entry is 'user'
        const history = [];
        for (const m of prior) {
            if (m.role !== "user" && m.role !== "assistant") continue;
            const role = m.role === "assistant" ? "model" : "user";

            // Drop any leading assistant/model messages
            if (history.length === 0 && role !== "user") continue;

            // Merge consecutive same-role messages (robustness)
            const text = String(m.content ?? "");
            if (!text) continue;

            if (history.length && history[history.length - 1].role === role) {
                history[history.length - 1].parts.push({ text });
            } else {
                history.push({ role, parts: [{ text }] });
            }
        }

        // The new prompt is the content of the last user message
        const prompt = lastUserIndex !== -1 ? String(messages[lastUserIndex].content ?? "") : "";
        const chat = model.startChat({ history });
        const result = await chat.sendMessage(prompt);
        const reply = result.response.text();

        return NextResponse.json({ reply });
    } catch (err) {
        console.error("Gemini API error:", err);
        return NextResponse.json(
            { reply: "Sorry—the model is unavailable right now. Please try again later." },
            { status: 500 }
        );
    }
}
