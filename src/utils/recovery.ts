import { Page } from '@playwright/test';
import { LocatorStrategy } from './safeLocator';
import { logger } from './logger';

/** Best-effort dismissal of common blockers before/after interactions. */
const DISMISS_TARGETS: LocatorStrategy[] = [
  { type: 'role', value: 'button', name: /accept all|i agree|accept/i },
  { type: 'role', value: 'button', name: /reject all|decline/i },
  { type: 'role', value: 'button', name: /close|dismiss|got it/i },
];

export async function dismissOverlays(page: Page): Promise<void> {
  for (const target of DISMISS_TARGETS) {
    try {
      const el = page
        .getByRole('button', { name: (target as { name: RegExp }).name })
        .first();
      if (await el.isVisible({ timeout: 1_000 })) {
        await el.click({ timeout: 2_000 });
        logger.info(`Dismissed overlay: ${String((target as { name: RegExp }).name)}`);
      }
    } catch {
      /* no overlay present */
    }
  }
}

