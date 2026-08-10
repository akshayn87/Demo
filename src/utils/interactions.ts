import { Locator, Page, expect } from '@playwright/test';
import { LocatorStrategy, safeLocator } from './safeLocator';
import { waitInteractable, waitForReady } from './waits';
import { retry } from './retry';
import { logger } from './logger';

/** Reusable, self-healing interaction wrappers. All resolve locators lazily. */
export class Interactions {
  constructor(private readonly page: Page) {}

  findElement(strategies: LocatorStrategy[]): Promise<Locator> {
    return safeLocator(this.page, strategies);
  }

  async click(strategies: LocatorStrategy[]): Promise<void> {
    await retry(async () => {
      const el = await this.findElement(strategies);
      await waitInteractable(el);
      await el.click();
    });
    logger.info(`click ${JSON.stringify(strategies[0])}`);
  }

  async fill(strategies: LocatorStrategy[], value: string): Promise<void> {
    await retry(async () => {
      const el = await this.findElement(strategies);
      await waitInteractable(el);
      await el.fill('');
      await el.fill(value);
      await expect(el).toHaveValue(value);
    });
    logger.info(`fill ${JSON.stringify(strategies[0])}`);
  }

  async type(strategies: LocatorStrategy[], value: string): Promise<void> {
    const el = await this.findElement(strategies);
    await waitInteractable(el);
    await el.pressSequentially(value);
  }

  async select(strategies: LocatorStrategy[], value: string): Promise<void> {
    const el = await this.findElement(strategies);
    await el.selectOption(value);
  }

  async check(strategies: LocatorStrategy[]): Promise<void> {
    const el = await this.findElement(strategies);
    await el.check();
    await expect(el).toBeChecked();
  }

  async uncheck(strategies: LocatorStrategy[]): Promise<void> {
    const el = await this.findElement(strategies);
    await el.uncheck();
    await expect(el).not.toBeChecked();
  }

  async hover(strategies: LocatorStrategy[]): Promise<void> {
    const el = await this.findElement(strategies);
    await el.hover();
  }

  async press(strategies: LocatorStrategy[], key: string): Promise<void> {
    const el = await this.findElement(strategies);
    await el.press(key);
  }

  async upload(strategies: LocatorStrategy[], files: string | string[]): Promise<void> {
    const el = await this.findElement(strategies);
    await el.setInputFiles(files);
  }

  async getText(strategies: LocatorStrategy[]): Promise<string> {
    const el = await this.findElement(strategies);
    return (await el.textContent())?.trim() ?? '';
  }

  async verifyVisible(strategies: LocatorStrategy[]): Promise<void> {
    const el = await this.findElement(strategies);
    await expect(el).toBeVisible();
  }

  wait(): Promise<void> {
    return waitForReady(this.page);
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }
}

