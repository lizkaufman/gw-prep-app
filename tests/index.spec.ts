import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Games Workshop");
});

test("clicking cart icon navigates to cart page", () => {});
