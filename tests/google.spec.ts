import { test, expect } from './fixtures';
import { searchData } from '../src/data/testData';

test('google search workflow', async ({ googlePage }) => {
  await googlePage.goto();
  await googlePage.search(searchData.term);
  await googlePage.assertResults();
  expect(googlePage.url()).toContain('/search');
});

