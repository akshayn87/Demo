import { LocatorStrategy } from '../utils/safeLocator';

export const CrcAboutLocators = {
  heading: [
    { type: 'role', value: 'heading', name: /about us/i },
    { type: 'css', value: 'h1' },
  ] as LocatorStrategy[],
  primaryNav: [
    { type: 'role', value: 'navigation' },
    { type: 'css', value: 'header nav' },
  ] as LocatorStrategy[],
  cookieAccept: [
    { type: 'role', value: 'button', name: /accept|agree|got it/i },
  ] as LocatorStrategy[],
  content: [
    { type: 'role', value: 'main' },
    { type: 'role', value: 'contentinfo' },
    { type: 'role', value: 'banner' },
    { type: 'css', value: 'footer, #footer' },
  ] as LocatorStrategy[],
};

