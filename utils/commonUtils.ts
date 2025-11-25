import { Page } from '@playwright/test';

export async function navigateToUrl(page: Page, url: string) : Promise<void> {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
}

export async function waitUntil(page: Page, timeout: number) {
  await page.waitForTimeout(timeout);
  console.log("Timeout",timeout);
}



declare class WebElement {
  click(): Promise<void>;
  getText(): Promise<string>;
  // ... other methods
}

function performActionOnWebElement(element: WebElement): void {
  element.click();
  element.getText().then(text => console.log(text));
}