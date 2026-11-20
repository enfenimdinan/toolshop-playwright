import {test, expect} from '@playwright/test';

test.describe('Homepage', () => {
    test('products load on the home page', async ({page}) => {
        await page.goto('');
        await expect(page).toHaveTitle(/Toolshop/);
        const productCards = page
            .getByRole('link')
            .filter({has: page.getByTestId('product-name')});
        // if we have this as requirement - to show top 9 items (for example)
        // if not - remove this check
        await expect(productCards).toHaveCount(9);
        await expect(productCards.first()).toBeVisible();

        for (const productCard of await productCards.all()) {
            await expect(productCard.getByTestId('product-name')).not.toBeEmpty();
            await expect(productCard.getByTestId('product-price')).toHaveText(/\$\d+\.\d{2}/);
        }
    });
});