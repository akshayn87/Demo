import { defineConfig, devices } from '@playwright/test';

const SESSION_ID = new Date().toISOString().replace(/[:.]/g, '-');
const SESSION_DIR = `test-results/${SESSION_ID}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 1,
  outputDir: `${SESSION_DIR}/artifacts`,
  reporter: [
    ['list'],
    ['html', { outputFolder: `${SESSION_DIR}/html-report`, open: 'on-failure' }],
  ],
  use: {
    ...devices['Desktop Chrome'],
    headless: false,
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});

