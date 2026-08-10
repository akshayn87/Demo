import { Locator, Page } from '@playwright/test';
import { TIMEOUTS } from '../src/config/constants';

export async function waitForReady(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle').catch(() => undefined);
}

export async function waitInteractable(locator: Locator): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.action });
  await locator.scrollIntoViewIfNeeded();
}

