// @ts-check
import { test, expect } from '@playwright/test';

test('Login with valid credentials', async ({ page }) => {
  // Navigate to SauceDemo website
  await page.goto('https://www.saucedemo.com/');

  // Verify the login page is displayed
  await expect(page).toHaveTitle('Swag Labs');
  
  // Fill in the username field with standard_user
  await page.locator('input[placeholder="Username"]').fill('standard_user');
  
  // Fill in the password field with secret_sauce
  await page.locator('input[placeholder="Password"]').fill('secret_sauce');
  
  // Click the Login button
  await page.locator('text=Login').click();
  
  // Verify successful login by checking if the products page is displayed
  await expect(page).toHaveURL(/.*inventory.html/);
  
  // Verify that the products container is visible
  await expect(page.locator('.inventory_container')).toBeVisible();
});

test('Login with standard_user - verify product listings', async ({ page }) => {
  // Navigate to SauceDemo website
  await page.goto('https://www.saucedemo.com/');
  
  // Enter credentials
  await page.locator('input[placeholder="Username"]').fill('standard_user');
  await page.locator('input[placeholder="Password"]').fill('secret_sauce');
  
  // Click Login
  await page.locator('text=Login').click();
  
  // Wait for inventory page to load
  await page.waitForURL('**/inventory.html');
  
  // Verify products are displayed
  const productItems = page.locator('.inventory_item');
  await expect(productItems).toHaveCount(6);
  
  // Verify product name and prices are visible
  await expect(page.locator('.inventory_item_name')).toHaveCount(6);
});

test('Login with invalid credentials - error message', async ({ page }) => {
  // Navigate to SauceDemo website
  await page.goto('https://www.saucedemo.com/');
  
  // Enter invalid credentials
  await page.locator('input[placeholder="Username"]').fill('invalid_user');
  await page.locator('input[placeholder="Password"]').fill('wrong_password');
  
  // Click Login
  await page.locator('text=Login').click();
  
  // Verify error message is displayed
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Username and password do not match any user in this service');
});
