"use client"
import { useState } from "react"
import { StyleDNA, Trait } from "@/lib/types"
import NewDNAModal from "./NewDNAModel"
import { cn } from "@/lib/utils"

type Props = {
    profiles: StyleDNA[]
    activeDnaId: string
    onSelect: (id: string) => void
    onAddProfile: (dna: StyleDNA) => void
}

export default function SidebarClient({
    profiles,
    activeDnaId,
    onSelect,
    onAddProfile,
}: Props) {
    const [modalOpen, setModalOpen] = useState(false)

    const handleSave = (name: string, prompt: string, traits: Trait[]) => {
        const newDNA: StyleDNA = {
            id: `dna-${Date.now()}`,
            name,
            referencePrompt: prompt,
            traits,
        }
        onAddProfile(newDNA)
    }

    return (
        <>
            <aside className="w-56 border-r border-white/5 flex flex-col shrink-0">
                <div className="px-4 py-4 border-b border-white/5">
                    <span className="text-[10px] tracking-[0.15em] uppercase text-stone-700">
                        DNA Profiles
                    </span>
                </div>

                <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
                    {profiles.map(dna => (
                        <button
                            key={dna.id}
                            onClick={() => onSelect(dna.id)}
                            className={cn(
                                "w-full text-left px-3 py-2.5 border text-[11px] transition-colors",
                                activeDnaId === dna.id
                                    ? "border-white/15 bg-white/5 text-stone-300"
                                    : "border-white/5 text-stone-600 hover:border-white/10 hover:text-stone-400"
                            )}
                        >
                            <div className="mb-1">{dna.name}</div>
                            <div className="text-[9px] tracking-wider text-stone-700">
                                {dna.traits.filter(t => t.locked).length} traits locked
                            </div>
                        </button>
                    ))}
                </div>

                <div className="p-3 border-t border-white/5">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="w-full text-[10px] tracking-widest uppercase text-stone-700 hover:text-stone-500 py-2 border border-white/5 hover:border-white/10 transition-colors"
                    >
                        + New Profile
                    </button>
                </div>
            </aside>

            <NewDNAModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
            />
        </>
    )
}