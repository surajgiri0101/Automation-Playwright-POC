# Product Module Test Plan

## Scope
Covers the product/inventory listing, sorting, cart, and checkout flows on the
sample storefront used for this demo project.

## In Scope
- Product grid rendering and sort options
- Add / remove product from cart
- Cart item count accuracy
- Checkout mandatory field validation
- Order confirmation flow

## Out of Scope
- Payment gateway integration (not present on the demo site)
- Multi-currency / tax calculation

## Test Approach
Automated regression coverage lives in `tests/regression/product.spec.js`,
driven by the `ProductPage` page object and `test-data/productData.json`.

## Entry / Exit Criteria
- Entry: demo site reachable, valid test credentials available in `.env`
- Exit: all TC001–TC010 cases pass across chromium, firefox, and webkit
