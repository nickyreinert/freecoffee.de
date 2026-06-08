// Static dish configuration — slot structure per dish type
export const DISH_CONFIGS = {
  pizza: {
    type: "pizza",
    label: "Pizza",
    emoji: "🍕",
    color: "orange",
    slots: [
      { role: "base_dough", min: 1, max: 1, required: true,  label: "Teig" },
      { role: "sauce",      min: 1, max: 1, required: true,  label: "Sauce" },
      { role: "cheese",     min: 1, max: 2, required: true,  label: "Käse" },
      { role: "protein",    min: 0, max: 2, required: false, label: "Protein" },
      { role: "veggie",     min: 1, max: 3, required: true,  label: "Gemüse" },
      { role: "garnish",    min: 0, max: 2, required: false, label: "Topping" }
    ],
    prepText: "Teig ausrollen, Sauce verteilen, Zutaten belegen. 220 °C, 12 min."
  },
  stulle: {
    type: "stulle",
    label: "Stulle",
    emoji: "🥪",
    color: "amber",
    slots: [
      { role: "base_bread", min: 1, max: 1, required: true,  label: "Brot" },
      { role: "spread",     min: 1, max: 2, required: true,  label: "Aufstrich" },
      { role: "protein",    min: 0, max: 2, required: false, label: "Belag" },
      { role: "veggie",     min: 1, max: 3, required: true,  label: "Gemüse" },
      { role: "garnish",    min: 0, max: 2, required: false, label: "Extras" }
    ],
    prepText: "Brot schneiden, Aufstrich verteilen, Belag auflegen. Sofort genießen."
  },
  salat: {
    type: "salat",
    label: "Salat",
    emoji: "🥗",
    color: "green",
    slots: [
      { role: "base_green", min: 1, max: 2, required: true,  label: "Basis" },
      { role: "protein",    min: 0, max: 2, required: false, label: "Protein" },
      { role: "veggie",     min: 2, max: 4, required: true,  label: "Gemüse" },
      { role: "crunch",     min: 0, max: 2, required: false, label: "Crunch" },
      { role: "dressing",   min: 1, max: 1, required: true,  label: "Dressing" },
      { role: "garnish",    min: 0, max: 1, required: false, label: "Topping" }
    ],
    prepText: "Alle Zutaten waschen, schneiden, Dressing kurz vor dem Servieren."
  },
  cocktail: {
    type: "cocktail",
    label: "Cocktail",
    emoji: "🍹",
    color: "purple",
    slots: [
      { role: "spirit",  min: 1, max: 2, required: true,  label: "Alkohol" },
      { role: "mixer",   min: 1, max: 2, required: true,  label: "Mixer" },
      { role: "sweet",   min: 0, max: 1, required: false, label: "Süße" },
      { role: "acid",    min: 0, max: 1, required: false, label: "Säure" },
      { role: "garnish", min: 0, max: 1, required: false, label: "Garnish" }
    ],
    prepText: "Zutaten auf Eis shaken oder rühren. Nach Geschmack garnieren."
  },
  burger: {
    type: "burger",
    label: "Burger",
    emoji: "🍔",
    color: "red",
    slots: [
      { role: "bun",      min: 1, max: 1, required: true,  label: "Brötchen" },
      { role: "patty",    min: 1, max: 2, required: true,  label: "Patty" },
      { role: "cheese",   min: 0, max: 2, required: false, label: "Käse" },
      { role: "sauce",    min: 1, max: 2, required: true,  label: "Sauce" },
      { role: "veggie",   min: 1, max: 3, required: true,  label: "Belag" },
      { role: "garnish",  min: 0, max: 2, required: false, label: "Extras" }
    ],
    prepText: "Brötchen leicht toasten, Patty garen, Sauce verteilen, Belag auflegen. Sofort servieren."
  }
};

// Coffee config — separate simpler model (no slots)
export const COFFEE_CONFIG = {
  type: "coffee",
  label: "Kaffee",
  emoji: "☕",
};

// Tailwind color classes per dish type (bg, border, text, badge)
export const DISH_COLORS = {
  pizza: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-800",
    btn: "bg-orange-500 hover:bg-orange-600",
    tab: "bg-orange-500 text-white",
    tabInactive: "bg-orange-50 text-orange-700 hover:bg-orange-100"
  },
  stulle: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-800",
    btn: "bg-amber-600 hover:bg-amber-700",
    tab: "bg-amber-600 text-white",
    tabInactive: "bg-amber-50 text-amber-700 hover:bg-amber-100"
  },
  salat: {
    bg: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-800",
    btn: "bg-green-600 hover:bg-green-700",
    tab: "bg-green-600 text-white",
    tabInactive: "bg-green-50 text-green-700 hover:bg-green-100"
  },
  cocktail: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    badge: "bg-purple-100 text-purple-800",
    btn: "bg-purple-600 hover:bg-purple-700",
    tab: "bg-purple-600 text-white",
    tabInactive: "bg-purple-50 text-purple-700 hover:bg-purple-100"
  }
};
