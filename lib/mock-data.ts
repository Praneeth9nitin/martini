import { StyleDNA, Shot } from "./types"

export const MOCK_DNA: StyleDNA[] = [
  {
    id: "dna-1",
    name: "Elena — Lead",
    referencePrompt: "35mm anamorphic, desaturated greens, hard side-lighting, Tarkovsky-esque, pale skin, grey coat",
    traits: [
      { id: "t1", label: "Lighting", value: "Hard side, cool", locked: true },
      { id: "t2", label: "Costume", value: "Grey coat, worn", locked: true },
      { id: "t3", label: "Color Grade", value: "Desaturated greens", locked: true },
      { id: "t4", label: "Lens", value: "35mm anamorphic", locked: true },
      { id: "t5", label: "Mood", value: "Tarkovsky, still", locked: false },
      { id: "t6", label: "Skin", value: "Pale, no warmth", locked: true },
    ],
  },
]

export const MOCK_SHOTS: Shot[] = [
  {
    id: "shot-1",
    title: "INT. CORRIDOR — DUSK",
    description: "Elena walks through a flooded corridor, waist-deep water, hard side lighting from a cracked window",
    dnaId: "dna-1",
    status: "clean",
    consistencyScore: 94,
    driftFlags: [],
  },
  {
    id: "shot-2",
    title: "CLOSE — ELENA'S FACE",
    description: "Extreme close up, reflection in water, desaturated, cool grade, anamorphic flare",
    dnaId: "dna-1",
    status: "clean",
    consistencyScore: 88,
    driftFlags: [],
  },
  {
    id: "shot-3",
    title: "EXT. ROOFTOP — GOLDEN HOUR",
    description: "Elena on rooftop, warm orange sunset, soft bokeh, golden light wrapping her face",
    dnaId: "dna-1",
    status: "flagged",
    consistencyScore: 41,
    driftFlags: [
      "Lighting described as warm golden — conflicts with locked hard cool side-lighting",
      "Color grade feels warm — conflicts with locked desaturated greens",
    ],
    fixes: [
      "Replace golden hour with overcast dusk, retain hard side source from left",
      "Add green desaturation pass in description — e.g. 'sickly green ambient'",
    ],
  },
  {
    id: "shot-4",
    title: "WIDE — CITYSCAPE",
    description: "Aerial pullback, Elena tiny in frame, overcast sky, cool tones",
    dnaId: "dna-1",
    status: "idle",
  },
]