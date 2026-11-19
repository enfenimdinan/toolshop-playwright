import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
    test('products load on the home page', async ({ page }) => {
        await page.goto('');
        const productCards = page
            .getByRole('link')
            .filter({ has: page.getByTestId('product-name') });
        // if we have this as requirement - to show top 9 items (for example)
        // if not - remove this check
        await expect(productCards).toHaveCount(9);

        const firstCard = productCards.first();
        await expect(firstCard).toBeVisible();
        await expect(firstCard.getByTestId('product-name')).not.toBeEmpty();
        await expect(firstCard.getByTestId('product-price')).not.toBeEmpty();
    });
});