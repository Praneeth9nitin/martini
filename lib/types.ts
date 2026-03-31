export type Trait = {
    id: string
    label: string
    value: string
    locked: boolean
}

export type StyleDNA = {
    id: string
    name: string
    referencePrompt: string
    traits: Trait[]
}

export type Shot = {
    id: string
    title: string
    description: string
    dnaId: string
    consistencyScore?: number
    driftFlags?: string[]
    fixes?: string[]
    status: "idle" | "checking" | "clean" | "flagged"
}