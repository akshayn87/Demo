import { Page } from '@playwright/test';
import { Interactions } from '../utils/interactions';
import { dismissOverlays } from '../utils/recovery';
import { waitForReady } from '../utils/waits';

export abstract class BasePage {
  protected readonly ui: Interactions;

  constructor(protected readonly page: Page) {
    this.ui = new Interactions(page);
  }

  async open(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await waitForReady(this.page);
    await dismissOverlays(this.page);
  }

  url(): string {
    return this.page.url();
  }
}

