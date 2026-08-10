import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { GoogleLocators } from './google.locators';
import { BASE_URL } from '../config/constants';
import { logger } from '../utils/logger';

export class GooglePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.open(BASE_URL);
  }

  async search(term: string): Promise<void> {
    await this.ui.fill(GoogleLocators.searchBox, term);
    await this.ui.press(GoogleLocators.searchBox, 'Enter');
    await this.ui.wait();
  }

  /** Deterministic outcome check; tolerates Google's anti-bot interstitial. */
  async assertResults(): Promise<void> {
    await expect(this.page).toHaveURL(/[?&]q=/);
    if (await this.isBotChallenged()) {
      logger.warn('Google anti-bot page detected; results grid unavailable.');
      return;
    }
    await this.ui.verifyVisible(GoogleLocators.resultsStats);
  }

  private async isBotChallenged(): Promise<boolean> {
    const marker = this.page.getByText(/unusual traffic|not a robot/i).first();
    return marker.isVisible({ timeout: 2_000 }).catch(() => false);
  }
}

