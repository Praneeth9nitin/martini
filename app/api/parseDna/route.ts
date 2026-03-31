import { NextRequest } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});


export async function POST(req: NextRequest) {
    const { prompt, referencePrompt } = await req.json()
    const input = prompt || referencePrompt

    const result = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a film trait extractor. You only respond with valid JSON arrays. Never respond with text, greetings, or explanations."
            },
            {
                role: "user",
                content: `You are a professional film consultant analyzing a director's visual reference description.
                "${input}"

                    Extract ANY of these trait categories that are present or strongly implied:
- Lighting (quality, direction, color temperature)
- Color Grade (palette, saturation, tones)
- Lens (focal length, format, depth of field)
- Costume (clothing, style, condition)
- Mood (emotional tone, pacing, feel)
- Skin (tone, texture, warmth)
- Character (physical appearance, distinguishing features)
- Location (interior/exterior, setting type)
- Time of Day (golden hour, dusk, night, overcast)
- Atmosphere (weather, fog, rain, dust)
- Camera (movement, framing, angle)
- Reference (director, film, visual style)

Rules:
- Only include categories actually present in the description
- Skip anything not mentioned or implied
- Keep values concise, max 5 words
- Use filmmaker language
- Return this shape for each trait:
{ "label": "Category", "value": "concise value", "locked": true }`
            }
        ],
        model: "llama-3.3-70b-versatile",
        max_tokens: 1000,
    })
    console.log(result.choices[0].message.content)
    const text = result.choices[0].message.content || "[]"
    try {
        const raw = result.choices[0].message.content || "[]"
        const clean = raw.replace(/```json|```/g, "").trim()
        const parsed = JSON.parse(clean)
        return Response.json({ traits: parsed })
    } catch (e) {
        console.error("Failed to parse DNA JSON", e)
        return Response.json({ error: "Failed to parse DNA" }, { status: 500 })
    }
}