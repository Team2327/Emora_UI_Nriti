import { LifeBuoy, Phone } from 'lucide-react'

export function SafetyCard() {
  return (
    <div className="glass cozy-in rounded-2xl p-5 border-2 border-rose-400/60 space-y-3 text-left">
      <div className="flex items-center gap-2">
        <LifeBuoy size={20} className="text-rose-400" />
        <h3 className="text-white font-semibold">You are not alone</h3>
      </div>
      <p className="text-sm text-slate-300">
        What you shared matters. Please consider talking to someone you trust, or a trained
        counsellor, today.
      </p>
      <div className="space-y-2">
        <a
          href="tel:14416"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-500/20 text-rose-300 text-sm font-medium hover:bg-rose-500/30"
        >
          <Phone size={16} /> Tele-MANAS: 14416 (free, 24x7)
        </a>
        <a
          href="tel:112"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-500/20 text-rose-300 text-sm font-medium hover:bg-rose-500/30"
        >
          <Phone size={16} /> Emergency: 112
        </a>
      </div>
      <p className="text-xs text-slate-500">
        EMORA is a screening and support tool. It does not diagnose conditions or prescribe
        treatment, and it cannot replace a healthcare professional.
      </p>
    </div>
  )
}