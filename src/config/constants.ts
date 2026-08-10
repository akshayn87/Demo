export const TIMEOUTS = {
  action: 15_000,
  navigation: 30_000,
  short: 5_000,
  stable: 500,
} as const;

export const RETRY = {
  attempts: 3,
  delayMs: 300,
} as const;

export const BASE_URL = process.env.BASE_URL ?? 'https://www.google.com';

