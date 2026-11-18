# Toolshop: key user flows

**Link:** https://practicesoftwaretesting.com

| #  | Flow                              | Entry point                     | Login needed |
|----|-----------------------------------|---------------------------------|--------------|
| 1  | Register                          | `/auth/register`                | No           |
| 2  | Log in / log out                  | `/auth/login`                   | No           |
| 3  | Find a product                    | `/`, `/category/:name`          | No           |
| 4  | Add to cart & manage cart         | `/product/:id` → `/checkout`    | No           |
| 5  | Checkout & pay                    | `/checkout`                     | No (guest option) |
| 6  | Rent a tool (+ combined discount) | `/rentals`                      | No           |
| 7  | Favorites                         | `/product/:id` → `/account/favorites` | Yes    |
| 8  | Compare products                  | `/` or `/product/:id` → `/comparison` | No     |
| 9  | Invoices (order history)          | `/account/invoices`             | Yes          |
| 10 | Contact & messages                | `/contact` → `/account/messages` | No / Yes    |

---

## 1. Register

**Steps:** Sign in → Register your account → fill in the form → Register.
**Required fields:** first name, last name, date of birth (YYYY-MM-DD), street, postal code, city, state, country (dropdown), phone (digits only), email, password.
**Expected:** account is created, user is logged in automatically.

## 2. Log in / log out

**Steps:** Sign in → email + password → Login. To log out: user menu → Sign out.
**Expected:** customer → `/account`.
The header shows the user menu instead of "Sign in".

## 3. Find a product

**Steps:** home page → narrow down the list → click a product card → product page `/product/:id`.
**Ways to narrow down:**
- Search (3–40 chars). Searching resets all active filters. A "Searched for: …" caption and the result count are shown.
- Category checkboxes (hierarchical: checking a parent checks its children) and brand checkboxes. Filters combine.
- Price range slider (default $1–$100, range $0–$200).
- Sort: Name A–Z / Z–A, Price High–Low / Low–High, CO₂ Rating A–E / E–A.
- "Eco-Friendly Products" filter. Every card shows a CO₂ rating (A–E).
- Pagination.
- Header → Categories → Hand Tools / Power Tools / Other / Special Tools (`/category/:name`).

**Expected on the product page:** image, name, description, price, category and brand badges, specs, related products.

## 4. Add to cart & manage cart

The cart has no page of its own. The cart icon opens `/checkout`, and step 1 of the checkout wizard is the cart.

**Steps:** product page → set quantity → Add to cart → cart icon → review/edit the cart.
**Expected:** toast "Product added to shopping cart.", and the line appears in step 1 with the right price and total. The cart icon only appears in the header once the cart has items (with a count badge), and it disappears again when the cart is emptied.

## 5. Checkout & pay

**Steps (4-step wizard at `/checkout`):**
1. **Cart** → Proceed.
2. **Sign in:** two tabs, "Sign in" (with TOTP if enabled) and "Continue as Guest" (email, first name, last name). If already logged in: "Hello <name>, you are already logged in." → Proceed to checkout.
3. **Billing address:** street, city, state, country, postal code (all required, pre-filled for logged-in users). There is a postcode lookup that fills in the address from country + postal code. → Proceed to checkout.
4. **Payment:** pick a method → fill in its fields → "Check payment" → Confirm.

**Expected:** success message, order placed, invoice number shown, cart emptied, confirmation email sent.

**Payment methods (each has its own validation):**
| Method            | Fields |
|-------------------|--------|
| Bank Transfer     | bank name (letters), account name, account number (digits) |
| Cash on Delivery  | none |
| Credit Card       | number `XXXX-XXXX-XXXX-XXXX`, expiry `MM/YYYY` (future only), CVV (3–4 digits), holder name |
| Buy Now Pay Later | installments: 3 / 6 / 9 / 12 |
| Gift Card         | card number, validation code |

## 6. Rent a tool + combined discount

**Steps:** Categories → Rentals → rental product → set duration slider (1–10 h) → Add to cart → checkout.
**Expected:** price = hourly rate × hours. The cart marks the line "This is a rental item".

**Combined discount:**
- Rental + regular product in the cart → extra 15% off the subtotal (subtotal, discount and total shown).
- Remove all rental (or all regular) items → the discount goes away.
- The discount shows on the invoice.

## 7. Favorites

**Steps:** product page → Add to favorites → user menu → My favorites (`/account/favorites`) → remove.
**Expected:** "Product added to your favorites list." The product is listed with image, name and description (description cut at 250 chars).

## 8. Compare products

**Steps:** compare icon on a product card (overview) or "Add to compare" on the product page → the comparison bar shows "N product(s) selected" → Compare Now → `/comparison`.
**Expected:** a side-by-side table of price, brand, category, stock, CO₂ rating, eco badge, specs and description.

## 9. Invoices / order history

**Steps:** user menu → My invoices → open an invoice → Download PDF.
**List:** paginated, with invoice number, billing street, date, total and a details link.
**Detail:** number, date, total, billing address, payment method, line items (qty, name, price, line total), discounts if any.
**PDF:** the button is disabled while the PDF is being generated (status is polled every 20 s), then it downloads.

## 10. Contact & messages

**Steps:** Contact → fill in the form → Send. Then, logged in: user menu → My messages → open a message → reply.
**Form:** a logged-in user is greeted by name ("Hello <name>, please fill out this form…"), so name and email fields are hidden. A guest enters first name, last name and email. Subject (dropdown) and message are required (message min 50 chars). Attachment is optional.
**Expected:** a success message. The message appears in My messages with status NEW / IN_PROGRESS / RESOLVED. A reply is added under the message.
