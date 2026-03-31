"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Trait } from "@/lib/types"

type Props = {
    open: boolean
    onClose: () => void
    onSave: (name: string, prompt: string, traits: Trait[]) => void
}

export default function NewDNAModal({ open, onClose, onSave }: Props) {
    const [name, setName] = useState("")
    const [prompt, setPrompt] = useState("")
    const [traits, setTraits] = useState<Trait[]>([])
    const [loading, setLoading] = useState(false)
    const [parsed, setParsed] = useState(false)

    if (!open) return null

    const handleParse = async () => {
        if (!prompt.trim()) return
        setLoading(true)
        try {
            const res = await fetch("/api/parseDna", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ referencePrompt: prompt }),
            })
            const { traits } = await res.json()
            const withIds = traits.map((t: Trait, i: number) => ({
                ...t,
                id: `trait-${Date.now()}-${i}`,
            }))
            setTraits(withIds)
            setParsed(true)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const handleToggleLock = (id: string) => {
        setTraits(prev =>
            prev.map(t => t.id === id ? { ...t, locked: !t.locked } : t)
        )
    }

    const handleTraitEdit = (id: string, value: string) => {
        setTraits(prev =>
            prev.map(t => t.id === id ? { ...t, value } : t)
        )
    }

    const handleSave = () => {
        if (!name.trim() || traits.length === 0) return
        const id = `dna-${Date.now()}`
        onSave(name, prompt, traits.map(t => ({ ...t })))
        // reset
        setName("")
        setPrompt("")
        setTraits([])
        setParsed(false)
        onClose()
    }

    const handleClose = () => {
        setName("")
        setPrompt("")
        setTraits([])
        setParsed(false)
        onClose()
    }

    return (
        <div
            className="fixed inset-0 z-50 flex overflow-y-auto items-center justify-center bg-black/70"
            onClick={handleClose}
        >
            <div
                className="bg-[#0e0e10] border border-white/8 w-full max-w-lg mx-4 flex flex-col"
                onClick={e => e.stopPropagation()}
            >

                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                    <span className="text-[10px] tracking-[0.15em] uppercase text-stone-600">
                        New DNA Profile
                    </span>
                    <button
                        onClick={handleClose}
                        className="text-[11px] text-stone-700 hover:text-stone-400 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-5 flex flex-col gap-4">

                    <div className="flex flex-col gap-2">
                        <label className="text-[9px] tracking-[0.15em] uppercase text-stone-700">
                            Profile Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Elena — Lead Character"
                            className="bg-transparent border border-white/8 px-3 py-2.5 text-[11px] text-stone-300 placeholder:text-stone-800 focus:outline-none focus:border-white/20 transition-colors"
                        />
                    </div>

                    {/* reference prompt */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[9px] tracking-[0.15em] uppercase text-stone-700">
                            Visual Reference
                        </label>
                        <textarea
                            value={prompt}
                            onChange={e => {
                                setPrompt(e.target.value)
                                if (parsed) setParsed(false)
                            }}
                            placeholder="Describe the visual DNA in your own words — lighting, costume, color grade, lens, mood, skin tone, anything that matters..."
                            className="bg-transparent border border-white/8 px-3 py-2.5 text-[11px] text-stone-400 placeholder:text-stone-800 focus:outline-none focus:border-white/20 transition-colors resize-none h-28 leading-relaxed"
                        />
                    </div>

                    {!parsed && (
                        <button
                            onClick={handleParse}
                            disabled={!prompt.trim() || loading}
                            className={cn(
                                "text-[10px] tracking-[0.12em] uppercase py-2.5 border transition-colors",
                                prompt.trim() && !loading
                                    ? "border-white/15 text-stone-400 hover:border-white/30 hover:text-stone-200"
                                    : "border-white/5 text-stone-800 cursor-not-allowed"
                            )}
                        >
                            {loading ? "Parsing..." : "→ Extract DNA Traits"}
                        </button>
                    )}

                    {parsed && traits.length > 0 && (
                        <div className="flex overflow-y-auto flex-col border border-white/5">
                            <div className="px-4 py-2 border-b border-white/5">
                                <span className="text-[9px] tracking-[0.15em] uppercase text-stone-700">
                                    Extracted Traits — edit or lock each one
                                </span>
                            </div>

                            {traits.map(trait => (
                                <div
                                    key={trait.id}
                                    className="flex items-center gap-3 px-4 py-2.5 border-b border-white/4 last:border-b-0"
                                >
                                    <span className="text-[9px] tracking-[0.08em] uppercase text-stone-700 w-20 shrink-0">
                                        {trait.label}
                                    </span>
                                    <input
                                        value={trait.value}
                                        onChange={e => handleTraitEdit(trait.id, e.target.value)}
                                        className="flex-1 bg-transparent text-[10px] text-stone-400 focus:outline-none focus:text-stone-200 transition-colors min-w-0"
                                    />
                                    <button
                                        onClick={() => handleToggleLock(trait.id)}
                                        className={cn(
                                            "w-5 h-5 border flex items-center justify-center text-[8px] shrink-0 transition-colors",
                                            trait.locked
                                                ? "border-stone-400 text-stone-400"
                                                : "border-stone-800 text-stone-800 hover:border-stone-600"
                                        )}
                                        title={trait.locked ? "Locked" : "Unlocked"}
                                    >
                                        {trait.locked ? "■" : "□"}
                                    </button>
                                </div>
                            ))}

                            <button
                                onClick={handleParse}
                                className="text-[9px] tracking-widest uppercase text-stone-800 hover:text-stone-600 py-2.5 border-t border-white/5 transition-colors"
                            >
                                ↺ Re-parse
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-white/5">
                    <button
                        onClick={handleClose}
                        className="text-[10px] tracking-widest uppercase text-stone-700 hover:text-stone-400 transition-colors px-4 py-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!name.trim() || traits.length === 0}
                        className={cn(
                            "text-[10px] tracking-[0.12em] uppercase px-6 py-2.5 transition-colors",
                            name.trim() && traits.length > 0
                                ? "bg-stone-100 text-stone-900 hover:bg-white"
                                : "bg-stone-900 text-stone-700 cursor-not-allowed"
                        )}
                    >
                        Save Profile
                    </button>
                </div>

            </div>
        </div>
    )
}