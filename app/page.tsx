import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#09090b] font-mono font-light text-stone-600 relative overflow-hidden">

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-80px bg-mask-radial-ellipse-80-80-at-50-40-black-30-transparent-100" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_40%,#09090b_100%)]" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-5 border-b border-white/5">
        <span className="font-[Cormorant_Garamond] text-xl font-normal tracking-[0.14em] uppercase text-stone-100">
          Martini
        </span>
        <div className="flex items-center gap-6">
          <span className="text-[10px] tracking-widest uppercase text-stone-700 hover:text-stone-500 cursor-pointer transition-colors">Product</span>
          <span className="text-[10px] tracking-widest uppercase text-stone-700 hover:text-stone-500 cursor-pointer transition-colors">Studio</span>
          <span className="text-[10px] tracking-widest uppercase text-stone-700 hover:text-stone-500 cursor-pointer transition-colors">Docs</span>
          <Link
            href="/workspace"
            className="text-[10px] tracking-widest uppercase bg-stone-100 text-stone-900 px-5 py-2.5 hover:bg-white transition-colors"
          >
            Open Workspace
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-10 pt-20 pb-16">
        <div className="flex items-center gap-2 border border-white/8 px-4 py-1.5 mb-9 text-[9px] tracking-[0.15em] uppercase text-stone-700">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-700 shadow-[0_0_6px_#6b9e82]" />
          Now in early access
        </div>

        <h1 className="font-[Cormorant_Garamond] text-[clamp(42px,6vw,78px)] font-light leading-[1.05] text-stone-100 tracking-[-0.01em] max-w-3xl mb-2">
          Film with intention.<br />
          <em className="text-stone-600">Generate with precision.</em>
        </h1>

        <p className="text-xs text-stone-700 leading-loose max-w-sm mt-5 mb-10">
          The first professional workflow built for generative filmmaking.
          Lock your visual DNA. Maintain consistency across every shot.
        </p>

        <div className="flex gap-3.5 items-center">
          <Link
            href="/workspace"
            className="text-[10px] tracking-[0.12em] uppercase bg-stone-100 text-stone-900 px-7 py-3.5 hover:bg-white transition-colors"
          >
            Open Workspace
          </Link>
          <button className="text-[10px] tracking-widest uppercase text-stone-600 border border-white/8 px-7 py-3.5 hover:border-white/20 hover:text-stone-400 transition-colors">
            See how it works
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 mx-10 mt-12 grid grid-cols-3 border border-white/5 bg-white/5 gap-px">
        {[
          { n: "01", t: "Style DNA Locking", d: "Define a character's visual identity once. Lock traits across lighting, costume, lens, and color grade." },
          { n: "02", t: "Consistency Checking", d: "AI flags drift before you generate. Suggests fixes inline, shot by shot, against your locked DNA." },
          { n: "03", t: "Model Agnostic", d: "Runway, Kling, Luma, Sora — swap providers without losing your creative intent or workflow." },
        ].map(f => (
          <div key={f.n} className="bg-[#09090b] px-7 py-8">
            <div className="text-[9px] text-stone-800 tracking-widest mb-5">{f.n}</div>
            <div className="font-[Cormorant_Garamond] text-xl font-normal text-stone-300 leading-snug mb-2.5">{f.t}</div>
            <div className="text-[11px] text-stone-700 leading-loose">{f.d}</div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="relative z-10 flex justify-between items-center px-10 py-6 mt-12 border-t border-white/4">
        <span className="font-[Cormorant_Garamond] text-sm text-stone-800 tracking-[0.14em] uppercase">Martini</span>
        <span className="text-[9px] text-stone-900 tracking-[0.08em]">Professional filmmaking for the generative era</span>
      </footer>

    </main>
  )
}