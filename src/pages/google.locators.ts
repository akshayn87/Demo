import { LocatorStrategy } from '../utils/safeLocator';

export const GoogleLocators = {
  searchBox: [
    { type: 'role', value: 'combobox', name: /search/i },
    { type: 'css', value: 'textarea[name="q"]' },
    { type: 'css', value: 'input[name="q"]' },
  ] as LocatorStrategy[],
  resultsStats: [
    { type: 'css', value: '#result-stats' },
    { type: 'css', value: '#search' },
  ] as LocatorStrategy[],
};

