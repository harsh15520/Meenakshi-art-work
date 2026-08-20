import { test, expect } from '@playwright/test';

test.describe('Smoke tests', () => {
  test('home page loads with title containing "Meenakshi" or "Art"', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Meenakshi|Art/i);
  });

  test('navigation links exist', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /Academy/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Gallery/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Custom Orders/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Journal/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Contact/i })).toBeVisible();
  });

  test('/academy page loads (200 status)', async ({ request }) => {
    const res = await request.get('/academy');
    expect(res.ok()).toBeTruthy();
  });

  test('/gallery page loads (200 status)', async ({ request }) => {
    const res = await request.get('/gallery');
    expect(res.ok()).toBeTruthy();
  });

  test('/custom-orders page loads (200 status)', async ({ request }) => {
    const res = await request.get('/custom-orders');
    expect(res.ok()).toBeTruthy();
  });

  test('/journal page loads (200 status)', async ({ request }) => {
    const res = await request.get('/journal');
    expect(res.ok()).toBeTruthy();
  });

  test('/contact page loads (200 status)', async ({ request }) => {
    const res = await request.get('/contact');
    expect(res.ok()).toBeTruthy();
  });

  test('invalid slug /academy/nonexistent returns 404-like behavior', async ({ page, request }) => {
    const res = await request.get('/academy/nonexistent');
    const status = res.status();
    expect(status === 404 || status >= 400).toBeTruthy();
    await page.goto('/academy/nonexistent');
    const bodyText = await page.locator('body').innerText();
    const hasNotFoundIndicator =
      /404|not found|doesn.?t exist|cannot find/i.test(bodyText) || status === 404;
    expect(hasNotFoundIndicator).toBeTruthy();
  });

  test('each external target=_blank WhatsApp link has rel="noopener noreferrer"', async ({ page }) => {
    await page.goto('/');
    const links = page.locator('a[target="_blank"][href*="whatsapp"], a[href*="wa.me"], a[href*="api.whatsapp"]');
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const rel = await link.getAttribute('rel');
      expect(rel).toMatch(/noopener/);
      expect(rel).toMatch(/noreferrer/);
    }
    const otherPages = ['/academy', '/gallery', '/custom-orders', '/journal', '/contact'];
    for (const path of otherPages) {
      await page.goto(path);
      const pageLinks = page.locator('a[target="_blank"][href*="whatsapp"], a[href*="wa.me"], a[href*="api.whatsapp"]');
      const pageCount = await pageLinks.count();
      for (let i = 0; i < pageCount; i++) {
        const link = pageLinks.nth(i);
        const rel = await link.getAttribute('rel');
        expect(rel).toMatch(/noopener/);
        expect(rel).toMatch(/noreferrer/);
      }
    }
  });

  test('homepage has at least one <h1> or <h2> (SEO check)', async ({ page }) => {
    await page.goto('/');
    const h1Count = await page.locator('h1').count();
    const h2Count = await page.locator('h2').count();
    expect(h1Count + h2Count).toBeGreaterThan(0);
  });
});
