import { Locator, Page } from '@playwright/test';
import { TIMEOUTS } from '../config/constants';
import { logger } from './logger';

export type LocatorStrategy =
  | { type: 'testId'; value: string }
  | { type: 'role'; value: Parameters<Page['getByRole']>[0]; name?: string | RegExp }
  | { type: 'label'; value: string | RegExp }
  | { type: 'placeholder'; value: string | RegExp }
  | { type: 'text'; value: string | RegExp }
  | { type: 'css'; value: string }
  | { type: 'xpath'; value: string };

function build(page: Page, s: LocatorStrategy): Locator {
  switch (s.type) {
    case 'testId':
      return page.getByTestId(s.value);
    case 'role':
      return page.getByRole(s.value, s.name ? { name: s.name } : undefined);
    case 'label':
      return page.getByLabel(s.value);
    case 'placeholder':
      return page.getByPlaceholder(s.value);
    case 'text':
      return page.getByText(s.value);
    case 'css':
      return page.locator(s.value);
    case 'xpath':
      return page.locator(`xpath=${s.value}`);
  }
}

/**
 * Resolves the first strategy that yields a visible element, re-querying the
 * DOM on each attempt to recover from detached/stale nodes.
 */
export async function safeLocator(
  page: Page,
  strategies: LocatorStrategy[],
  timeout = TIMEOUTS.action,
): Promise<Locator> {
  const deadline = Date.now() + timeout;
  let lastErr: unknown;
  while (Date.now() < deadline) {
    for (const strategy of strategies) {
      try {
        const locator = build(page, strategy).first();
        await locator.waitFor({ state: 'visible', timeout: TIMEOUTS.short });
        return locator;
      } catch (err) {
        lastErr = err;
        logger.debug(`Locator miss: ${JSON.stringify(strategy)}`);
      }
    }
  }
  throw new Error(
    `safeLocator failed for strategies ${JSON.stringify(strategies)}: ${String(lastErr)}`,
  );
}

