import type { ReactNode } from 'react';
import { Lock } from 'lucide-react';
import { subscriptionService } from '../../services/subscriptionService';

interface PremiumGateProps {
  children: ReactNode;
  featureName?: string;
}

export function PremiumGate({ children, featureName = 'This feature' }: PremiumGateProps) {
  const isPremium = subscriptionService.isPremium();

  if (isPremium) return <>{children}</>;

  return (
    <div className="relative">
      <div className="pointer-events-none blur-sm select-none opacity-50">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-900/60 rounded-lg">
        <Lock className="text-white" size={24} />
        <p className="text-white text-sm font-medium">{featureName} is Premium</p>
        <button className="px-4 py-1.5 rounded-full bg-amber-500 text-slate-900 text-sm font-semibold hover:bg-amber-400">
          Upgrade Now
        </button>
      </div>
    </div>
  );
}
