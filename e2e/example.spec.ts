import { test, expect } from '@playwright/test'

test('home loads and shows contacts', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('text=Contacts & Tasks')).toBeVisible()
  await expect(page.getByLabel('Search contacts')).toBeVisible()
})
