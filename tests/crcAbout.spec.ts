import { test, expect } from './fixtures';

test('crc about page loads and shows navigation', async ({ crcAboutPage }) => {
  await crcAboutPage.goto();
  await crcAboutPage.assertLoaded();
  await crcAboutPage.assertNavigationVisible();
  expect(crcAboutPage.url()).toContain('/About-Us');
});

