"use client"
import { useState } from "react"
import Sidebar from "@/app/workspace/Sidebar"
import CenterCanvas from "@/app/workspace/CenterCanvas"
import DNAPanel from "@/app/workspace/DnaPanel"
import { StyleDNA, Shot } from "@/lib/types"

export default function WorkspacePage() {
    const [dnaProfiles, setDnaProfiles] = useState<StyleDNA[]>([])
    const [shots, setShots] = useState<Shot[]>([])
    const [activeDnaId, setActiveDnaId] = useState<string>("")

    const activeDna = dnaProfiles.find(d => d.id === activeDnaId) ?? null

    return (
        <div className="flex h-screen bg-[#09090b] text-stone-400 font-mono overflow-hidden">
            <Sidebar
                profiles={dnaProfiles}
                activeDnaId={activeDnaId}
                onSelect={setActiveDnaId} onAddProfile={(newDna: StyleDNA) => {
                    setDnaProfiles([...dnaProfiles, newDna])
                    setActiveDnaId(newDna.id)
                }} />
            <CenterCanvas
                shots={shots}
                activeDnaId={activeDnaId}
                dna={activeDna!}
                onShotsChange={setShots}
            />
            <DNAPanel
                dna={activeDna}
                onDnaChange={(updated) =>
                    setDnaProfiles(prev =>
                        prev.map(d => d.id === updated.id ? updated : d)
                    )
                }
            />
        </div>
    )
}