import { StyleDNA } from "@/lib/types"
import SidebarClient from "./SidebarClient"

type Props = {
    profiles: StyleDNA[]
    activeDnaId: string
    onSelect: (id: string) => void
    onAddProfile: (dna: StyleDNA) => void
}

export default function Sidebar(props: Props) {
    return <SidebarClient {...props} />
}