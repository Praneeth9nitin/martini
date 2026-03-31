import { StyleDNA, Trait } from "@/lib/types"
import TraitRow from "./TraitRow"

type Props = {
    dna: StyleDNA | null
    onDnaChange: (dna: StyleDNA) => void
}

export default function DNAPanel({ dna, onDnaChange }: Props) {
    const handleTraitToggle = (traitId: string) => {
        if (!dna) return
        onDnaChange({
            ...dna,
            traits: dna.traits.map(t =>
                t.id === traitId ? { ...t, locked: !t.locked } : t
            ),
        })
    }

    return (
        <aside className="w-72 border-l border-white/5 flex flex-col shrink-0">
            <div className="px-4 py-4 border-b border-white/5">
                <span className="text-[10px] tracking-[0.15em] uppercase text-stone-700">
                    {dna ? `Active DNA — ${dna.name}` : "No DNA Selected"}
                </span>
            </div>

            {!dna ? (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-[10px] text-stone-800 tracking-widest uppercase">
                        Select a profile
                    </p>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 border-b border-white/5">
                        <p className="text-[9px] tracking-widest uppercase text-stone-800 mb-2">
                            Reference
                        </p>
                        <p className="text-[10px] text-stone-600 leading-relaxed">
                            {dna.referencePrompt}
                        </p>
                    </div>

                    <div className="divide-y divide-white/4">
                        {dna.traits.map(trait => (
                            <TraitRow
                                key={trait.id}
                                trait={trait}
                                onToggle={() => handleTraitToggle(trait.id)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </aside>
    )
}