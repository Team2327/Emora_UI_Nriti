import { useState } from 'react'
import { Calendar, Star } from 'lucide-react'
import { subscriptionService } from '../services/subscriptionService'

const DOCTORS = [
  { name: 'Dr. Ananya Sharma', specialty: 'Clinical Psychologist', rating: 4.8 },
  { name: 'Dr. Rohan Mehta', specialty: 'Psychiatrist', rating: 4.6 },
  { name: 'Dr. Priya Nair', specialty: 'Counseling Therapist', rating: 4.9 },
]

export default function Doctors() {
  const [booked, setBooked] = useState<string | null>(null)
  const isPremium = subscriptionService.isPremium()

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Professional Directory</h1>
      <p className="text-slate-400">Demo listing of therapists and psychiatrists.</p>

      <div className="space-y-3">
        {DOCTORS.map((doc) => (
          <div key={doc.name} className="glass rounded-2xl p-4 flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold">{doc.name}</h3>
              <p className="text-sm text-slate-400">{doc.specialty}</p>
              <div className="flex items-center gap-1 text-xs text-yellow-400 mt-1">
                <Star size={12} fill="currentColor" /> {doc.rating}
              </div>
            </div>

            {isPremium ? (
              <button
                onClick={() => setBooked(doc.name)}
                className="flex items-center gap-2 px-4 py-2 rounded-full btn-primary bg-[var(--color-primary)] text-white text-sm font-medium"
              >
                <Calendar size={16} /> Book
              </button>
            ) : (
              <button disabled className="px-4 py-2 rounded-full bg-slate-700 text-slate-400 text-sm cursor-not-allowed">
                Locked
              </button>
            )}
          </div>
        ))}
      </div>

      {booked && (
        <div className="p-4 rounded-lg bg-green-950/50 border border-green-800 text-green-200 text-sm">
          Appointment requested with {booked}. You'll get a confirmation shortly.
        </div>
      )}
    </div>
  )
}