# Project Structure

Production-ready Playwright + TypeScript automation framework with a self-healing
locator engine, reusable interaction wrappers, page objects, and per-run reporting.

```
codeagent/
├── .github/
│   └── agents/
│       └── codeagent.agent.md      # Custom VS Code "CodeAgent" persona
├── src/
│   ├── config/
│   │   └── constants.ts            # Timeouts, retry settings, BASE_URL (env-driven)
│   ├── data/
│   │   └── testData.ts             # Externalized test data (no hardcoded values in specs)
│   ├── pages/
│   │   ├── BasePage.ts             # Shared page base: open(), overlay recovery, ready waits
│   │   ├── GooglePage.ts           # Google search workflow page object
│   │   ├── google.locators.ts      # Google fallback locator strategies
│   │   ├── CrcAboutPage.ts         # CRC Group About-Us page object
│   │   └── crcAbout.locators.ts    # CRC About-Us fallback locator strategies
│   └── utils/
│       ├── safeLocator.ts          # Self-healing multi-strategy locator resolver
│       ├── interactions.ts         # Reusable action wrappers (click/fill/type/verify…)
│       ├── waits.ts                # DOM-ready / network-idle / interactable waits
│       ├── retry.ts                # Transient-failure retry with backoff
│       ├── recovery.ts             # Cookie / consent / modal overlay dismissal
│       └── logger.ts               # Structured timestamped logging
├── tests/
│   ├── fixtures.ts                 # DI fixtures + screenshot-on-failure hook
│   ├── google.spec.ts             # Google search spec
│   └── crcAbout.spec.ts           # CRC Group About-Us spec
├── test-results/
│   └── <timestamp>/                # Per-run session: artifacts/ + html-report/
├── playwright.config.ts            # Headed Chromium, retries, trace/video, session dirs
├── tsconfig.json                   # ES2023, strict, moduleResolution: bundler
└── package.json                    # Scripts: test, test:headed, report
```

## Layer Responsibilities

### `src/config`
Central place for tunable values. `constants.ts` holds timeouts, retry counts, and
`BASE_URL` (read from `process.env`) so nothing session-specific is hardcoded.

### `src/data`
Test data separated from test logic. Specs import values instead of embedding them,
keeping tests deterministic and easy to maintain.

### `src/pages`
Page Object Model. Each page exposes a small, intention-revealing API (e.g. `search()`,
`assertLoaded()`). Locators live in sibling `*.locators.ts` files so UI changes are
fixed in one place. `BasePage` provides shared navigation, overlay recovery, and waits.

### `src/utils`
Reusable engine shared by all pages:
- **safeLocator** — tries multiple strategies (testId → ARIA → text → CSS → XPath),
  re-querying the DOM to recover from stale/detached elements.
- **interactions** — thin, validated wrappers around every user action; each verifies
  its own outcome (e.g. `fill` asserts the value was entered).
- **waits** — event-based waiting only (DOM ready, network idle, visible, interactable);
  no fixed delays.
- **retry** — retries transient failures with incremental backoff.
- **recovery** — best-effort dismissal of cookie banners, consent, and modals.
- **logger** — consistent timestamped INFO/WARN/ERROR/DEBUG output.

### `tests`
Specs and Playwright fixtures. `fixtures.ts` uses dependency injection to provide ready
page objects and captures a full-page screenshot (attached to the report) on failure.

### `test-results/<timestamp>`
Every run creates an isolated session folder containing its `artifacts/` (traces,
videos, screenshots) and a standalone `html-report/`, so runs never overwrite each other.

## NPM Scripts

| Script | Purpose |
|--------|---------|
| `npm test` | Run all specs (headed Chromium) |
| `npm run test:headed` | Explicit headed run |
| `npm run report` | Open the latest HTML report |

