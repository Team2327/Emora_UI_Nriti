import { CozyParticles } from './CozyParticles'

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden scene-bg" aria-hidden="true">
      <div className="scene-blob scene-blob-1 animate-pulse-slow" />
      <div className="scene-blob scene-blob-2 animate-pulse-slower" />
      <div className="scene-blob scene-blob-3 animate-float" />
      <CozyParticles />
    </div>
  )
}