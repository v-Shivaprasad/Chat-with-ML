# Test info

- Name: Login Page >> should login successfully with valid credentials
- Location: C:\Users\Dell\Desktop\CHATML\tests\login.spec.js:4:7

# Error details

```
Error: page.waitForURL: Test timeout of 30000ms exceeded.
=========================== logs ===========================
waiting for navigation to "http://localhost:5173/" until "load"
============================================================
    at C:\Users\Dell\Desktop\CHATML\tests\login.spec.js:15:16
```

# Page snapshot

```yaml
- button:
  - img
- text: Chat with ML
- button:
  - img
- list:
  - listitem:
    - link "Home":
      - /url: /
  - listitem:
    - link "About":
      - /url: /about
  - listitem:
    - link "Contact":
      - /url: /contact
- heading "Login To Your Account" [level=4]
- paragraph:
  - paragraph: Cannot read properties of undefined (reading 'ok')
- heading "Email" [level=6]
- textbox "Enter your email": testuser@example.com
- heading "Password" [level=6]
- textbox "Enter your password": correctpassword
- button "Login"
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Login Page', () => {
   4 |   test('should login successfully with valid credentials', async ({ page }) => {
   5 |     await page.goto('http://localhost:5173/login');
   6 |
   7 |     // Fill in the email and password fields
   8 |     await page.getByPlaceholder('Enter your email').fill('testuser@example.com');
   9 |     await page.getByPlaceholder('Enter your password').fill('correctpassword');
  10 |
  11 |     // Click the login button
  12 |     await page.getByRole('button', { name: /login/i }).click();
  13 |
  14 |     // Wait for navigation (assuming it redirects to home on success)
> 15 |     await page.waitForURL('http://localhost:5173/');
     |                ^ Error: page.waitForURL: Test timeout of 30000ms exceeded.
  16 |
  17 |     // Optional: check if login succeeded by verifying some element on home page
  18 |     await expect(page.locator('text=Login To Your Account')).not.toBeVisible(); // Shouldn't be on login page anymore
  19 |   });
  20 |
  21 |   test('should show error message with invalid credentials', async ({ page }) => {
  22 |     await page.goto('http://localhost:5173/login');
  23 |
  24 |     await page.getByPlaceholder('Enter your email').fill('wronguser@example.com');
  25 |     await page.getByPlaceholder('Enter your password').fill('wrongpassword');
  26 |     await page.getByRole('button', { name: /login/i }).click();
  27 |
  28 |     // Check if error message is shown
  29 |     await expect(page.locator('text=Invalid')).toBeVisible(); // Adjust based on actual error text
  30 |   });
  31 | });
  32 |
```