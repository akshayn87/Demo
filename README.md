# CodeAgent — Playwright + TypeScript

Minimal Playwright end-to-end testing boilerplate with TypeScript, plus a custom **CodeAgent** VS Code agent for minimal-token code editing.

## Requirements

- Node.js 18+ and npm
- VS Code (for the custom agent)

## Setup

```bash
npm install
npx playwright install chromium
```

## Run Tests

```bash
npm test
```

Runs all specs in `tests/` using the Playwright test runner.

## Project Structure

```
.
├── .github/agents/codeagent.agent.md  # Custom CodeAgent persona
├── tests/google.spec.ts               # Boilerplate navigation test
├── playwright.config.ts               # Playwright configuration
├── tsconfig.json                      # TypeScript configuration
└── package.json
```

## Example Test

`tests/google.spec.ts` navigates to Google and asserts the URL:

```ts
import { test, expect } from '@playwright/test';

test('navigate to google', async ({ page }) => {
  await page.goto('https://www.google.com');
  await expect(page).toHaveURL(/google\.com/);
});
```

## CodeAgent

A custom VS Code agent defined in `.github/agents/codeagent.agent.md`. It completes, fixes, refactors, and generates code with the smallest possible response.

Key behaviors:

- Detects language automatically and preserves existing style.
- Returns only the requested changes — no markdown, greetings, or summaries.
- Prefers the standard library and avoids inventing APIs.
- Returns `// NEED MORE CONTEXT` when information is missing.

Select **CodeAgent** from the agent picker in VS Code Chat to use it.

## Configuration

- `playwright.config.ts` — test directory and browser options (headless by default).
- `tsconfig.json` — ES2023 target, strict mode enabled.

