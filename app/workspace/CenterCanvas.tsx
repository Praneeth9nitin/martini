'use client'

import { useState } from "react"
import { Shot, StyleDNA } from "@/lib/types"
import ShotCard from "./ShotCard"
import NewShotModal from "./NewShotModel"

type Props = {
    shots: Shot[]
    activeDnaId: string
    dna: StyleDNA
    onShotsChange: (shots: Shot[]) => void
}

export default function CenterCanvas({ shots, activeDnaId, dna, onShotsChange }: Props) {
    const handleShotUpdate = (updated: Shot) => {
        onShotsChange(shots.map(s => s.id === updated.id ? updated : s))
    }
    const [modalOpen, setModalOpen] = useState(false)

    const handleAddShot = (newShot: Shot) => {
        onShotsChange([...shots, newShot])
        setModalOpen(false)
    }

    return (
        <main className="flex-1 overflow-y-auto">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <span className="text-[10px] tracking-[0.15em] uppercase text-stone-700">
                    Shot Sequence
                </span>
                <button
                    onClick={() => setModalOpen(true)}
                    className="text-[10px] tracking-widest uppercase text-stone-700 hover:text-stone-400 transition-colors"
                >
                    + Add Shot
                </button>
            </div>

            <div className="p-6 flex flex-col gap-3">
                {shots.length === 0 ? (
                    <EmptyState />
                ) : (
                    shots.filter(s => s.dnaId === activeDnaId).map((shot, i) => (
                        <ShotCard
                            key={shot.id}
                            shot={shot}
                            dna={dna}
                            index={i + 1}
                            onUpdate={handleShotUpdate}
                        />
                    ))
                )}
            </div>
            <NewShotModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleAddShot}
                activeDnaId={activeDnaId}
            />
        </main>
    )
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center h-96 text-center">
            <p className="text-[10px] tracking-[0.2em] uppercase text-stone-800 mb-3">
                No shots yet
            </p>
            <p className="text-[11px] text-stone-700">
                Add your first shot to begin checking consistency
            </p>
        </div>
    )
}