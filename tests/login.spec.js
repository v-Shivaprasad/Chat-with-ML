import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:5173/login');

    // Fill email
    await page.getByPlaceholder('Enter your email').fill('velagadaa@gmail.com');

    // Fill password
    await page.getByPlaceholder('Enter your password').fill('shiva');

    // Click the login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Expect redirect to homepage
    await expect(page).toHaveURL('http://localhost:5173/');

    // Optionally, check something on the homepage (e.g., navbar, welcome message)
    await expect(page.locator('text=Login To Your Account')).not.toBeVisible(); // should be redirected
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    await page.getByPlaceholder('Enter your email').fill('wrong@example.com');
    await page.getByPlaceholder('Enter your password').fill('wrongpass');

    await page.getByRole('button', { name: 'Login' }).click();

    // Expect error message
    await expect(page.locator('text=Invalid email or password.')).toBeVisible();
  });
});
