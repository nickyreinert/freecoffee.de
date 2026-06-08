# Tools — freecoffee.de

Utility scripts for development. Kept separate from the main app.

## scrape-asins.js

Automatically fetch real Amazon DE ASINs for all ingredients with `amazon_asin: null`.

### Setup

```bash
cd tools
npm install
```

### Run

```bash
node scrape-asins.js
```

The script will:
1. Loop through each ingredient
2. Search amazon.de for the product
3. Extract the ASIN from the first result
4. Update `../js/ingredients.js` in place

### Output

```
🔍 Fetching ASINs from amazon.de...

  Searching: Nduja ........................... ✓ B0123456789
  Searching: Campari ......................... ✓ B0987654321
  Searching: Trüffelöl ....................... ✗ no match
  ...

✅ Done! Found 45, missed 12
📝 Updated ../js/ingredients.js

💡 Tip: Review the results before git commit
```

### Notes

- Respects 600ms delay between requests (don't hammer Amazon)
- Retries once on network errors
- Only fetches for ingredients with `amazon_asin: null`
- Some products may not have exact matches (e.g. regional variants)
- Always **review the updated `js/ingredients.js` before committing** to verify ASINs are correct

### If Amazon blocks you

Add a proxy or increase delay. Or do it manually for the high-value ~15 ingredients (rarity ≥ 7) and ship v1.
