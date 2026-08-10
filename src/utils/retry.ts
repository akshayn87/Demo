import { RETRY } from '../config/constants';
import { logger } from './logger';

/** Retries a transient action with backoff, re-querying happens inside action. */
export async function retry<T>(
  action: () => Promise<T>,
  attempts = RETRY.attempts,
  delayMs = RETRY.delayMs,
): Promise<T> {
  let lastErr: unknown;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await action();
    } catch (err) {
      lastErr = err;
      logger.warn(`Attempt ${i}/${attempts} failed: ${String(err)}`);
      if (i < attempts) await new Promise((r) => setTimeout(r, delayMs * i));
    }
  }
  throw lastErr;
}

