import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CrcAboutLocators } from './crcAbout.locators';
import { logger } from '../utils/logger';

const ABOUT_URL = 'https://www.crcgroup.com/About-Us/About-Us';

export class CrcAboutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.open(ABOUT_URL);
  }

  /** Deterministic outcome checks for the About Us landing. */
  async assertLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/About-Us/i);
    await this.ui.verifyVisible(CrcAboutLocators.heading);
    await this.ui.verifyVisible(CrcAboutLocators.content);
    logger.info(`About Us loaded: ${await this.ui.getText(CrcAboutLocators.heading)}`);
  }

  async assertNavigationVisible(): Promise<void> {
    await this.ui.verifyVisible(CrcAboutLocators.primaryNav);
  }
}

