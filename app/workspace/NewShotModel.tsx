"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Shot } from "@/lib/types"

type Props = {
    open: boolean
    onClose: () => void
    onSave: (shot: Shot) => void
    activeDnaId: string
}

export default function NewShotModal({ open, onClose, onSave, activeDnaId }: Props) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    if (!open) return null

    const handleSave = () => {
        if (!title.trim() || !description.trim()) return
        const newShot: Shot = {
            id: `shot-${Date.now()}`,
            title: title.toUpperCase(),
            description,
            dnaId: activeDnaId,
            status: "idle",
        }
        onSave(newShot)
        setTitle("")
        setDescription("")
        onClose()
    }

    const handleClose = () => {
        setTitle("")
        setDescription("")
        onClose()
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={handleClose}
        >
            <div
                className="bg-[#0e0e10] border border-white/8 w-full max-w-lg mx-4 flex flex-col"
                onClick={e => e.stopPropagation()}
            >

                {/* header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                    <span className="text-[10px] tracking-[0.15em] uppercase text-stone-600">
                        New Shot
                    </span>
                    <button
                        onClick={handleClose}
                        className="text-[11px] text-stone-700 hover:text-stone-400 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-5 flex flex-col gap-4">

                    {/* scene heading */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[9px] tracking-[0.15em] uppercase text-stone-700">
                            Scene Heading
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="INT. CORRIDOR — DUSK"
                            className="bg-transparent border border-white/8 px-3 py-2.5 text-[11px] text-stone-300 placeholder:text-stone-800 focus:outline-none focus:border-white/20 transition-colors uppercase tracking-wider"
                        />
                    </div>

                    {/* shot description */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[9px] tracking-[0.15em] uppercase text-stone-700">
                            Shot Description
                        </label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Describe what happens in this shot — action, lighting, camera, mood, character details..."
                            className="bg-transparent border border-white/8 px-3 py-2.5 text-[11px] text-stone-400 placeholder:text-stone-800 focus:outline-none focus:border-white/20 transition-colors resize-none h-36 leading-relaxed"
                        />
                    </div>

                    {/* hint */}
                    <p className="text-[9px] text-stone-800 leading-relaxed">
                        After adding, hit Check to run consistency against the active DNA profile.
                    </p>

                </div>

                {/* footer */}
                <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-white/5">
                    <button
                        onClick={handleClose}
                        className="text-[10px] tracking-widest uppercase text-stone-700 hover:text-stone-400 transition-colors px-4 py-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!title.trim() || !description.trim()}
                        className={cn(
                            "text-[10px] tracking-[0.12em] uppercase px-6 py-2.5 transition-colors",
                            title.trim() && description.trim()
                                ? "bg-stone-100 text-stone-900 hover:bg-white"
                                : "bg-stone-900 text-stone-700 cursor-not-allowed"
                        )}
                    >
                        Add Shot
                    </button>
                </div>

            </div>
        </div>
    )
}