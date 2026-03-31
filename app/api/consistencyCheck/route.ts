import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { Shot, StyleDNA } from "@/lib/types";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: NextRequest) {
    const { shot, dna }: { shot: Shot, dna: StyleDNA } = await req.json()

    const lockedTraits = dna.traits.filter(t => t.locked).map(t => `${t.label}: ${t.value}`).join("\n")

    try {
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: "You are a film continuity supervisor. You only respond with valid JSON. Never respond with text or explanations."
                },
                {
                    role: "user",
                    content: `You are checking if a shot description is consistent with a locked visual DNA profile.

LOCKED DNA TRAITS:
${lockedTraits}

SHOT DESCRIPTION:
"${shot.description}"

Analyze the shot against every locked trait and return ONLY this JSON, nothing else:
{
  "score": <number 0-100, how consistent the shot is>,
  "flags": [
    "<trait that is violated and why>"
  ],
  "fixes": [
    "<specific suggestion to fix the violation>"
  ]
}

Rules:
- score 100 = perfectly consistent with all locked traits
- score 0 = completely inconsistent
- flags array is empty if no violations found
- fixes array matches flags one to one
- Be specific, use filmmaker language
- If no violations, return score 85-100 with empty flags and fixes`
                }
            ],
            max_tokens: 1000,
        })
        const raw = response.choices[0].message.content || "[]"
        const clean = raw.replace(/```json|```/g, "").trim()
        const parsed = JSON.parse(clean)
        return NextResponse.json(parsed, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "something went wrong" }, { status: 500 })
    }
}