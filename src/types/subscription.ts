export type SubscriptionTier = 'free' | 'premium';

export interface SubscriptionState {
  tier: SubscriptionTier;
  upgradedAt?: string;
}

export const DEFAULT_SUBSCRIPTION: SubscriptionState = {
  tier: 'free',
};