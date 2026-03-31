import { Trait } from "@/lib/types"
import { cn } from "@/lib/utils"

type Props = {
    trait: Trait
    onToggle: () => void
}

export default function TraitRow({ trait, onToggle }: Props) {
    return (
        <div className="flex items-center gap-3 px-4 py-3">
            <span className="text-[9px] tracking-widest uppercase text-stone-700 w-20 shrink-0">
                {trait.label}
            </span>
            <span className="text-[10px] text-stone-500 flex-1 truncate">
                {trait.value}
            </span>
            <button
                onClick={onToggle}
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
    )
}