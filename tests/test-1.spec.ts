import { test, expect } from '@playwright/test';
import { navigateToUrl } from '../utils/commonUtils';


test.afterEach(async ({ page },testInfo) => {
  const screenshot = await page.screenshot({ path: 'screenshot.png', fullPage: true });
  testInfo.attach('Example Page', {
  body: screenshot,
  contentType: 'image/png',
});
  await page.waitForTimeout(3000);
  await page.close();
});

// test.beforeAll(async ({ page },testInfo) => {

// });
 

test('test', async ({ browser,page }) => {
  await navigateToUrl(page, 'https://rbi.org.in/Scripts/HolidayMatrixDisplay.aspx');
  await page.goto('https://rbi.org.in/Scripts/HolidayMatrixDisplay.aspx');
  // await performActionOnWebElement()
  await page.getByLabel('Regional Office').selectOption('29');
  await page.getByLabel('Month').selectOption('12');
  await page.getByRole('button', { name: 'GO' }).click();
  await page.goto('https://rbi.org.in/Scripts/HolidayMatrixDisplay.aspx');
  await page.getByLabel('Regional Office').selectOption('16');
  await expect(page.getByLabel('Month')).toMatchAriaSnapshot(`
    - combobox "Month":
      - option "All Months"
      - option "January"
      - option "February"
      - option "March"
      - option "April"
      - option "May"
      - option "June"
      - option "July"
      - option "August"
      - option "September"
      - option "October"
      - option "November"
      - option "December"
    `);
  await page.getByLabel('Month').selectOption('12');
  await page.getByRole('button', { name: 'GO' }).click();
  await page.getByLabel('Regional Office').selectOption('10');
  await page.getByRole('button', { name: 'GO' }).click();
  await page.getByLabel('Regional Office').selectOption('19');
  await page.getByRole('button', { name: 'GO' }).click();
  await page.locator('td').filter({ hasText: '25' }).click();
  
  // await page.getByRole('checkbox', { name: 'मेरा चयनित विकल्प याद रखें /' }).check();
  // await page.getByRole('button', { name: 'English' }).click();
  // await page.getByRole('main').click();


});

test('zerodha test', async ({ page }) => {
await page.goto("https://zerodha.com/");
await page.getByRole('link', { name: 'Signup' }).click();
await page.getByRole('heading', { name: 'Signup now' }).click();
await page.getByText('Or track your existing').click();
await expect.soft(page.locator('#open_account_proceed_form')).toContainText('Get OTP');
await page.getByText('By proceeding, you agree to').click();
await page.getByText('Looking to open NRI account?').click();
await page.getByLabel('main navigation').getByRole('link', { name: 'About' }).click();
await page.getByRole('heading', { name: 'We pioneered the discount' }).click();
await page.getByText('We kick-started operations on').click({timeout:3000});
await page.getByText('Today, our disruptive pricing').click();
await page.getByText('Over 1.6+ crore clients place').click();
await page.getByText('In addition, we run a number').click();
await page.getByText('Rainmatter, our fintech fund').click();
await page.getByText('And yet, we are always up to').click();
const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Rainmatter' }).click();
  const page1 = await page1Promise;
await page.getByRole('img', { name: 'Nithin Kamath, CEO' }).click();
await page.getByText('Nithin bootstrapped and').click();
await page.getByText('He is a member of the SEBI').click();
await page.locator('.footer-logo').click();
await page.getByText('India\'s largest broker based').click();
await page.getByRole('link', { name: 'Products' }).click();
await page.getByRole('heading', { name: 'Kite', exact: true }).click();
const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Our asset management venture' }).click();
  const page2 = await page2Promise;
const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Options trading platform that' }).click();
  const page3 = await page3Promise;
const page4Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Investment research platform' }).click();
  const page4 = await page4Promise;
const page5Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Systematic trading platform' }).click();
  const page5 = await page5Promise;
const page6Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Thematic investing platform' }).click();
  const page6 = await page6Promise;
const page7Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Personalized advice on life' }).click();
  const page7 = await page7Promise;
await page.getByRole('link', { name: 'Sign up for free' }).click();
await page.getByRole('link', { name: 'Pricing' }).click();
await page.getByText('List of all charges and taxes').click();
await page.getByRole('heading', { name: 'Charges', exact: true }).click();
await page.locator('.four > img').first().click();
await page.getByRole('link', { name: 'Equity' }).click();
await page.getByRole('link', { name: 'Currency' }).click();
await page.locator('#charges_tabs').getByRole('link', { name: 'Commodity' }).click();
await page.getByRole('link', { name: 'Support', exact: true }).click();
await page.getByRole('link', { name: 'Track account opening' }).click();
await page.getByRole('link', { name: 'Track segment activation' }).click();
await page.getByRole('link', { name: 'Intraday margins' }).click();
await page.getByRole('link', { name: 'Intraday margins' }).click();
await page.getByRole('link', { name: 'Learn how to create a ticket' }).click();
await page.getByRole('link', { name: 'Signup' }).click();
await page.getByPlaceholder('Enter your mobile number').click();
await page.getByPlaceholder('Enter your mobile number').fill('9049524091');
await page.getByRole('button', { name: 'Get OTP' }).click();
await page.getByRole('textbox', { name: 'Mobile OTP' }).fill('495332');
await page.getByText('Wrong OTP').click();
await page.goto('https://zerodha.com/open-account/');

});