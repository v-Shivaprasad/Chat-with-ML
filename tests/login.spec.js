import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    // Fill in the email and password fields
    await page.getByPlaceholder('Enter your email').fill('testuser@example.com');
    await page.getByPlaceholder('Enter your password').fill('correctpassword');

    // Click the login button
    await page.getByRole('button', { name: /login/i }).click();

    // Wait for navigation (assuming it redirects to home on success)
    await page.waitForURL('http://localhost:5173/');

    // Optional: check if login succeeded by verifying some element on home page
    await expect(page.locator('text=Login To Your Account')).not.toBeVisible(); // Shouldn't be on login page anymore
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    await page.getByPlaceholder('Enter your email').fill('wronguser@example.com');
    await page.getByPlaceholder('Enter your password').fill('wrongpassword');
    await page.getByRole('button', { name: /login/i }).click();

    // Check if error message is shown
    await expect(page.locator('text=Invalid')).toBeVisible(); // Adjust based on actual error text
  });
});
