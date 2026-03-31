# Martini — Style Consistency Panel

A prototype exploring the hardest unsolved problem in AI filmmaking:
maintaining visual consistency across AI-generated shots.

Built as an unsolicited prototype to demonstrate product thinking
around generative film workflows.

---

## The Problem

AI video generation tools like Runway, Kling, and Luma produce
stunning individual shots. But professional filmmaking requires
consistency across dozens of shots same character, same lighting,
same color grade, same lens character shot after shot.

There is no workflow today that enforces this. Directors are
copy-pasting prompt fragments and hoping for the best.

---

## The Solution

A DNA-based consistency layer that sits between the director
and the generation model.

1. **Define** — Director writes a visual reference description
2. **Extract** — AI parses it into structured, lockable traits
3. **Lock** — Director locks the traits that are non-negotiable
4. **Check** — Every shot is checked against the locked DNA before generation
5. **Fix** — Flagged shots get specific fixes suggested inline
6. **Generate** — Only consistent shots proceed to the video model

---

## How It Works

### DNA Profile
A profile is a visual blueprint for a character or scene.
The director writes a free-form reference description:
```
Elena moves through a flooded underground corridor.
Hard side-lighting from a single cracked fluorescent.
35mm anamorphic. Desaturated greens. Tarkovsky-esque stillness.
```

The AI extracts this into structured traits:
- Lighting → Hard side, cool
- Color Grade → Desaturated greens
- Lens → 35mm anamorphic
- Costume → Grey coat, worn
- Mood → Tarkovsky, still
- Camera → Static, patient

Each trait can be locked or unlocked individually.

### Consistency Check
Every shot description is checked against the locked DNA traits.
Returns:
- A consistency score (0–100)
- Specific drift flags with reasons
- Suggested fixes per flag

### Generation Ready
Shots that pass consistency check are marked ready for generation.
Locked traits are appended to the shot description automatically
before sending to the video model ensuring the generation prompt
is always DNA-consistent.

---

## Tech Stack

- **Framework** — Next.js 14 App Router
- **Styling** — Tailwind CSS
- **UI** — shadcn/ui
- **AI Layer** — Groq API (llama-3.3-70b-versatile)
- **Language** — TypeScript
- **Deployment** — Vercel

---

## Project Structure
```
app/
  page.tsx                      ← landing page
  workspace/
    page.tsx                    ← main workspace
  api/
    parseDna/
      route.ts                  ← extract traits from reference prompt
    consistency-check/
      route.ts                  ← check shot against locked DNA

components/
  workspace/
    Sidebar.tsx                 ← DNA profiles list
    CenterCanvas.tsx            ← shot sequence
    DNAPanel.tsx                ← active DNA traits
    ShotCard.tsx                ← individual shot with check/flags
    TraitRow.tsx                ← single trait with lock toggle
    NewDNAModal.tsx             ← create new DNA profile
    NewShotModal.tsx            ← add new shot to profile

lib/
  types.ts                      ← Shot, StyleDNA, Trait types
  utils.ts                      ← cn helper
```

---

## Running Locally
```bash
git clone https://github.com/Praneeth9nitin/martini.git
cd martini
npm install
```

Create `.env.local`:
```
GROQ_API_KEY=your_groq_api_key
```
```bash
npm run dev
```

Open `http://localhost:3000`

---

## Get a Groq API Key

1. Go to console.groq.com
2. Sign up free tier is generous
3. Create an API key
4. Add to `.env.local`

---

## Demo Flow

1. Click **+ New Profile** in the left panel
2. Enter a character name
3. Paste a visual reference description
4. Click **Extract DNA Traits** AI parses it into structured traits
5. Lock the traits that are non-negotiable
6. Click **Save Profile**
7. Click **+ Add Shot** to add a shot to the sequence
8. Write the shot description
9. Click **Check** AI scores the shot against locked DNA
10. Expand the card to see drift flags and suggested fixes
11. Fix flagged shots, recheck, iterate

---

## What This Is Not

This is not a video generation tool.
This is the workflow layer that makes video generation
production-grade the consistency enforcement system
that sits between the director's intent and the model's output.

---

## Built By

Praneeth
Final year IT student, tier 3 college, India.
Building in public. Targeting early-stage AI startups.

Twitter: @praneeth9nitin
Email: nitinkumariit4@gmail.com