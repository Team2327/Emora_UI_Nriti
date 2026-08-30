import { storageService } from './storageService';
import type { SubscriptionState } from '../types/subscription';
import { DEFAULT_SUBSCRIPTION } from '../types/subscription';

const SUBSCRIPTION_KEY = 'emora_subscription';

export const subscriptionService = {
  getState(): SubscriptionState {
    return storageService.get<SubscriptionState>(SUBSCRIPTION_KEY) ?? DEFAULT_SUBSCRIPTION;
  },

  isPremium(): boolean {
    return this.getState().tier === 'premium';
  },

  upgradeToPremium(): void {
    storageService.set(SUBSCRIPTION_KEY, {
      tier: 'premium',
      upgradedAt: new Date().toISOString(),
    });
  },

  downgradeToFree(): void {
    storageService.set(SUBSCRIPTION_KEY, { tier: 'free' });
  },
};