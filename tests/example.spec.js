// @ts-check
import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });


test('la page se charge avec le bouton PLAY et QUIT', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#jogar-btn')).toBeVisible();
  await expect(page.locator('#midia-btn')).toBeVisible();
});

test('cliquer sur play lance le jeu', async ({ page }) => {
  await page.goto('/');
  await page.locator('#jogar-btn').click();

  await page.waitForTimeout(1000);       // Attend 1sec car les boutons PLAY et QUIT ne disparaissent pas instant                                     

  await expect(page.locator('#jogar-btn')).toBeHidden();      // L'ecran d'acceuil disparait
  await expect(page.locator('#midia-btn')).toBeHidden();      // L'ecran d'acceuil disparait
  await expect(page.locator('.text')).not.toBeEmpty();        // Le mot a tapé n'est pas vide
  await expect(page.locator('.lifebar')).toBeVisible();       // La barre dde vie apparait en haut a gauche
  await expect(page.locator('.cronometer')).toBeVisible();    // Le chronometre s'affiche
});

test('un mot apparait au lancement du jeu', async ({ page }) => {
  await page.goto('/');
  await page.locator('#jogar-btn').click();

  await page.waitForTimeout(1000);

  const word = await page.locator('.text').textContent();
  expect(word.length).toBeGreaterThan(0);
});

test('appuyer sur quit lance une alerte', async ({ page }) => {
  await page.goto('/');
  await page.locator('#midia-btn').click();

  await page.waitForTimeout(1000);

  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('alert');
    await dialog.dismiss();
  })
});

test('le menu RETRY apparait quand on perd', async ({ page }) => {
  await page.goto('/');
  await page.locator('#jogar-btn').click();

  await expect(page.locator('#retry')).toBeVisible({ timeout: 60000 });
});