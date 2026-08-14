export interface PriceConfig {
  tierName: 'STANDARD' | 'PREMIUM' | 'EXCLUSIVE';
  basePrice: number;
  sellingPrice: number;
  savings: number;
}

export const TIER_PRICING: Record<PriceConfig['tierName'], PriceConfig> = {
  STANDARD: {
    tierName: 'STANDARD',
    basePrice: 99,
    sellingPrice: 49,
    savings: 50,
  },
  PREMIUM: {
    tierName: 'PREMIUM',
    basePrice: 149,
    sellingPrice: 69,
    savings: 80,
  },
  EXCLUSIVE: {
    tierName: 'EXCLUSIVE',
    basePrice: 199,
    sellingPrice: 79,
    savings: 120,
  },
};

const EXCLUSIVE_TEMPLATES = [
  'public-leader',
  'peoples-leader',
  'national-vision',
  'constitution-democracy',
];

const PREMIUM_TEMPLATES = [
  'india-map',
  'patriot-creator',
];

export function getTemplatePricing(templateId: string): PriceConfig {
  const tid = templateId || '';
  if (EXCLUSIVE_TEMPLATES.includes(tid)) {
    return TIER_PRICING.EXCLUSIVE;
  }
  if (PREMIUM_TEMPLATES.includes(tid)) {
    return TIER_PRICING.PREMIUM;
  }
  return TIER_PRICING.STANDARD;
}
