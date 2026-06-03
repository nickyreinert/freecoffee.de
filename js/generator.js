// Core generator — sampling, exclude resolution, name generation

// ─── Weighted pool ────────────────────────────────────────────────────────────

function buildWeightedPool(candidates, favorites, weight = 3) {
  const pool = [];
  for (const c of candidates) {
    const count = favorites.includes(c.id) ? weight : 1;
    for (let i = 0; i < count; i++) pool.push(c);
  }
  return pool;
}

function weightedSample(pool, n) {
  const result = [];
  const seen = new Set();
  const working = [...pool];

  while (result.length < n && working.length > 0) {
    const idx = Math.floor(Math.random() * working.length);
    const pick = working[idx];
    if (!seen.has(pick.id)) {
      result.push(pick);
      seen.add(pick.id);
      for (let i = working.length - 1; i >= 0; i--) {
        if (working[i].id === pick.id) working.splice(i, 1);
      }
    } else {
      working.splice(idx, 1);
    }
  }
  return result;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ─── Exclude resolution ───────────────────────────────────────────────────────

function resolveExcludes(resultSlots, dishType, profile, allIngredients, dishConfig) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const allSelected = resultSlots.flatMap(s => s.ingredients);
    let conflict = null;

    outer: for (const ing of allSelected) {
      for (const excId of ing.excludes) {
        const conflicting = allSelected.find(x => x.id === excId);
        if (conflicting) { conflict = { keeper: ing, drop: conflicting }; break outer; }
      }
    }

    if (!conflict) break;

    const slotIdx = resultSlots.findIndex(s =>
      s.ingredients.some(x => x.id === conflict.drop.id)
    );
    if (slotIdx === -1) break;

    const slot = resultSlots[slotIdx];
    slot.ingredients = slot.ingredients.filter(x => x.id !== conflict.drop.id);

    // Try to re-fill the emptied slot position (excluding the dropped ingredient)
    const slotConfig = dishConfig.slots.find(s => s.role === slot.role);
    if (slotConfig) {
      const existingIds = new Set(slot.ingredients.map(x => x.id));
      existingIds.add(conflict.drop.id);
      // Exclude everything the keeper conflicts with, so re-fill won't re-introduce a conflict
      for (const excId of conflict.keeper.excludes) existingIds.add(excId);
      const candidates = allIngredients
        .filter(i => i.dishes.includes(dishType))
        .filter(i => i.roles[dishType] === slotConfig.role)
        .filter(i => !profile.kotzliste.includes(i.id))
        .filter(i => !existingIds.has(i.id));

      if (candidates.length > 0) {
        const additional = weightedSample(
          buildWeightedPool(candidates, profile.favorites, 3), 1
        );
        slot.ingredients.push(...additional);
      }
    }
  }

  return resultSlots;
}

// ─── Name generation ──────────────────────────────────────────────────────────

const TEMPLATES = {
  pizza: [
    (adj, noun) => `Die ${cap(adj_e(adj))} ${noun}`,
    (adj, noun) => `Il ${cap(adj)}o ${noun}`,
    (adj, noun) => `${noun}er Traum`,
    (adj, noun) => `Die ${cap(adj_e(adj))} Angelegenheit`,
    (adj, noun) => `${noun} Deluxe`
  ],
  stulle: [
    (adj, noun) => `Der ${cap(adj_e(adj))}`,
    (adj, noun) => `Die ${noun}stulle`,
    (adj, noun) => `Hanseatischer ${noun}`,
    (adj, noun) => `Die ${cap(adj_e(adj))} Stulle`,
    (adj, noun) => `${noun} auf Brot`
  ],
  salat: [
    (adj, noun) => `${cap(adj_e(adj))} Stunde`,
    (adj, noun) => `Der ${cap(adj_e(adj))} ${noun}-Salat`,
    (adj, noun) => `Das ${cap(adj_e(adj))} Grün`,
    (adj, noun) => `${noun} Bowl`,
    (adj, noun) => `Leichte ${cap(adj_e(adj))}`
  ],
  cocktail: [
    (adj, noun) => `${noun} Express`,
    (adj, noun) => `Der ${cap(adj_e(adj))} Abend`,
    (adj, noun) => `Hamburger ${noun}`,
    (adj, noun) => `${noun}nacht`,
    (adj, noun) => `${cap(adj_e(adj))} ${noun}`
  ]
};

function cap(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Add German weak adjective ending '-e'. Handles borrowed words ending in a/i/o/u.
function adj_e(s) {
  if (!s) return "";
  if (s.endsWith("e")) return s;              // frische → frische
  if (/[aiou]$/i.test(s)) return s.slice(0, -1) + "e"; // "aperitivo" → "aperitive"
  return s + "e";                             // frisch → frische
}

// Priority roles for dominant ingredient selection per dish type
const DOMINANT_ROLES = {
  pizza:   ["protein", "cheese", "veggie", "sauce"],
  stulle:  ["protein", "spread", "veggie", "base_bread"],
  salat:   ["protein", "base_green", "dressing", "veggie"],
  cocktail:["spirit", "mixer", "sweet", "acid"]
};

function findDominant(ingredients, dishType) {
  for (const role of DOMINANT_ROLES[dishType] || []) {
    const match = ingredients.find(i => i.roles[dishType] === role);
    if (match) return match;
  }
  return ingredients[0] || null;
}

export function generateName(dishType, selected) {
  const adjectives = [...new Set(selected.flatMap(i => i.tags_name))];
  const adj = adjectives[Math.floor(Math.random() * Math.min(adjectives.length, 3))] || "lecker";
  const dominant = findDominant(selected, dishType);
  const noun = dominant ? dominant.noun_form : "Überraschung";
  const templates = TEMPLATES[dishType] || TEMPLATES.pizza;
  const tpl = templates[Math.floor(Math.random() * templates.length)];
  return tpl(adj, noun);
}

// ─── Main generate function ───────────────────────────────────────────────────

let _uuidCounter = 0;
function uuid() {
  return `dish-${Date.now()}-${++_uuidCounter}`;
}

export function generate(dishType, profile, allIngredients, dishConfig) {
  const resultSlots = [];

  for (const slotCfg of dishConfig.slots) {
    const candidates = allIngredients
      .filter(i => i.dishes.includes(dishType))
      .filter(i => i.roles[dishType] === slotCfg.role)
      .filter(i => !profile.kotzliste.includes(i.id));

    if (candidates.length === 0 && slotCfg.required) {
      throw new Error(`Keine Zutaten für Slot: ${slotCfg.label}`);
    }
    if (candidates.length === 0) {
      resultSlots.push({ role: slotCfg.role, label: slotCfg.label, ingredients: [] });
      continue;
    }

    const pool = buildWeightedPool(candidates, profile.favorites, 3);
    const n = randInt(slotCfg.min, Math.min(slotCfg.max, candidates.length));
    const selected = weightedSample(pool, n);
    resultSlots.push({ role: slotCfg.role, label: slotCfg.label, ingredients: selected });
  }

  resolveExcludes(resultSlots, dishType, profile, allIngredients, dishConfig);

  const allSelected = resultSlots.flatMap(s => s.ingredients);

  return {
    id: uuid(),
    type: dishType,
    name: generateName(dishType, allSelected),
    slots: resultSlots,
    generated_at: new Date().toISOString()
  };
}
