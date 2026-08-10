import { test as base, expect } from '@playwright/test';
import { GooglePage } from '../src/pages/GooglePage';
import { CrcAboutPage } from '../src/pages/CrcAboutPage';

type Fixtures = {
  googlePage: GooglePage;
  crcAboutPage: CrcAboutPage;
};

export const test = base.extend<Fixtures>({
  googlePage: async ({ page }, use) => {
    await use(new GooglePage(page));
  },
  crcAboutPage: async ({ page }, use) => {
    await use(new CrcAboutPage(page));
  },
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const file = testInfo.outputPath(
      `${testInfo.title.replace(/\s+/g, '_')}.png`,
    );
    await page.screenshot({ path: file, fullPage: true });
    await testInfo.attach('failure-screenshot', { path: file, contentType: 'image/png' });
  }
});

export { expect };

