// Amazon PartnerNet cart URL builder

const BASE_URL = "https://www.amazon.de/gp/aws/cart/add.html";
const SEARCH_URL = "https://www.amazon.de/s";

export function buildCartUrl(ingredients, associateTag) {
  const withAsin = ingredients.filter(i => i.amazon_asin !== null);
  if (withAsin.length === 0) return null;

  const params = new URLSearchParams({ AssociateTag: associateTag });
  withAsin.forEach((ing, idx) => {
    params.set(`ASIN.${idx + 1}`, ing.amazon_asin);
    params.set(`Quantity.${idx + 1}`, "1");
  });
  return `${BASE_URL}?${params.toString()}`;
}

export function buildSearchUrl(ingredient, associateTag) {
  if (!ingredient) return null;
  const params = new URLSearchParams({ k: ingredient.name, tag: associateTag });
  return `${SEARCH_URL}?${params.toString()}`;
}

export function findRariestIngredient(ingredients) {
  if (!ingredients.length) return null;
  return [...ingredients].sort((a, b) => (b.rarity ?? 0) - (a.rarity ?? 0))[0];
}

export function buildSingleAsinUrl(ingredient, associateTag) {
  if (!ingredient?.amazon_asin) return null;
  const params = new URLSearchParams({
    AssociateTag: associateTag,
    "ASIN.1": ingredient.amazon_asin,
    "Quantity.1": "1"
  });
  return `${BASE_URL}?${params.toString()}`;
}
