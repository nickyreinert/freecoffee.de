// tools/scrape-asins.js
// Utility: fetch real Amazon DE ASINs for ingredients
// Usage: node scrape-asins.js
// Output: updates ../js/ingredients.js with fetched ASINs

import { INGREDIENTS } from "../js/ingredients.js";
import fs from "fs";
import https from "https";
import { load } from "cheerio";

const DELAY_MS = 600; // delay between requests (be nice to Amazon)
const MAX_RETRIES = 2;

async function fetchASIN(ingredientName, attempt = 0) {
  const query = encodeURIComponent(ingredientName);
  const url = `https://www.amazon.de/s?k=${query}`;

  return new Promise((resolve) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
          timeout: 8000,
        },
        (res) => {
          let html = "";
          res.on("data", (chunk) => (html += chunk));
          res.on("end", () => {
            try {
              const $ = load(html);
              // Look for product links in search results
              const dpLink = $('a[href*="/dp/"]').first().attr("href");
              const asin = dpLink?.match(/\/dp\/([A-Z0-9]{10})/)?.[1];
              resolve(asin || null);
            } catch (e) {
              resolve(null);
            }
          });
        }
      )
      .on("error", () => {
        if (attempt < MAX_RETRIES) {
          setTimeout(
            () => resolve(fetchASIN(ingredientName, attempt + 1)),
            1000
          );
        } else {
          resolve(null);
        }
      });
  });
}

async function main() {
  console.log("🔍 Fetching ASINs from amazon.de...\n");

  let found = 0,
    notfound = 0;

  for (const ing of INGREDIENTS) {
    if (!ing.amazon_asin) {
      process.stdout.write(`  Searching: ${ing.name.padEnd(30)} ... `);
      const asin = await fetchASIN(ing.name);
      if (asin) {
        ing.amazon_asin = asin;
        console.log(`✓ ${asin}`);
        found++;
      } else {
        console.log(`✗ no match`);
        notfound++;
      }
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  // Write back
  const code = `// Ingredient data — freecoffee.de
// Each ingredient may appear in multiple dish types with different roles.
export const INGREDIENTS = ${JSON.stringify(INGREDIENTS, null, 2)};
`;
  fs.writeFileSync("../js/ingredients.js", code);

  console.log(`\n✅ Done! Found ${found}, missed ${notfound}`);
  console.log("📝 Updated ../js/ingredients.js");
  console.log("\n💡 Tip: Review the results before git commit");
}

main().catch(console.error);
