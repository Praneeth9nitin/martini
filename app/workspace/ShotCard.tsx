"use client"
import { useState } from "react"
import { Shot, StyleDNA } from "@/lib/types"
import { cn } from "@/lib/utils"

type Props = {
    shot: Shot
    dna: StyleDNA
    index: number,
    onUpdate: (shot: Shot) => void
}

export default function ShotCard({ shot, dna, index, onUpdate }: Props) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div
            className={cn(
                "border transition-colors",
                shot.status === "clean" && "border-emerald-900/40 bg-emerald-950/20",
                shot.status === "flagged" && "border-amber-900/40 bg-amber-950/20",
                shot.status === "idle" && "border-white/5 bg-white/2",
                shot.status === "checking" && "border-white/10 bg-white/2 animate-pulse",
            )}
        >
            <div
                className="flex items-center gap-4 px-4 py-3 cursor-pointer"
                onClick={() => {
                    setExpanded(!expanded)
                }}
            >
                <span className="text-[9px] tracking-widest text-stone-700 w-5 shrink-0">
                    {String(index).padStart(2, "0")}
                </span>

                <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-stone-400 mb-0.5 truncate">{shot.title}</p>
                    <p className="text-[9px] text-stone-700 truncate">{shot.description}</p>
                </div>

                {shot.consistencyScore !== undefined && (
                    <ScoreBadge score={shot.consistencyScore} />
                )}

                <button
                    onClick={async (e) => {
                        shot.status = "checking"
                        e.stopPropagation()
                        const res = await fetch("/api/consistencyCheck", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ shot, dna })
                        })
                        const result = await res.json()
                        if (result.flags.length <= 2) {
                            shot.status = "clean"
                        } else {
                            shot.status = "flagged"
                        }
                        onUpdate({ ...shot, consistencyScore: result.score, driftFlags: result.flags, fixes: result.fixes })
                    }}
                    className="text-[9px] tracking-widest uppercase text-stone-700 hover:text-stone-400 border border-white/5 hover:border-white/10 px-3 py-1.5 transition-colors"
                >
                    Check
                </button>
            </div>

            {expanded && (
                <div className="px-4 pb-4 border-t border-white/5 overflow-y-auto pt-3 space-y-3">
                    <textarea
                        value={shot.description}
                        onChange={(e) => onUpdate({ ...shot, description: e.target.value })}
                        placeholder="Describe this shot..."
                        className="w-full bg-transparent text-[11px] text-stone-400 placeholder:text-stone-800 border border-white/5 p-3 resize-none focus:outline-none focus:border-white/15 h-20"
                    />
                    {shot.fixes && shot.fixes.length > 0 && (
                        <div className="space-y-2">
                            {shot.fixes.map((fix, i) => (
                                <div key={i} className="flex gap-3 text-[10px]">
                                    <span className="text-emerald-800 shrink-0">→</span>
                                    <span className="text-stone-600">{fix}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {shot.driftFlags && shot.driftFlags.length > 0 && (
                        <div className="space-y-2">
                            {shot.driftFlags.map((flag, i) => (
                                <div key={i} className="flex gap-3 text-[10px]">
                                    <span className="text-amber-700 shrink-0">⚠</span>
                                    <span className="text-stone-600">{flag}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {shot.fixes && shot.fixes.length > 0 && (
                        <div className="space-y-2 border-t border-white/5 pt-3">
                            <p className="text-[9px] tracking-widest uppercase text-stone-800">Suggested fixes</p>
                            {shot.fixes.map((fix, i) => (
                                <div key={i} className="flex gap-3 text-[10px]">
                                    <span className="text-emerald-800 shrink-0">→</span>
                                    <span className="text-stone-600">{fix}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

function ScoreBadge({ score }: { score: number }) {
    return (
        <span className={cn(
            "text-[10px] tracking-wider border px-2 py-0.5 shrink-0",
            score >= 75 ? "text-emerald-700 border-emerald-900/50" : "text-amber-700 border-amber-900/50"
        )}>
            {score}
        </span>
    )
}