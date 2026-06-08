// freecoffee.de — main application
import { INGREDIENTS } from "./ingredients.js";
import { DISH_CONFIGS, COFFEE_CONFIG } from "./dishConfig.js";
import { COFFEES } from "./coffees.js";
import { generate } from "./generator.js";
import { loadProfile, toggleFavorite, toggleKotzliste, encodeProfile, decodeProfile } from "./profile.js";
import { buildCartUrl, findRariestIngredient, buildSingleAsinUrl, buildSearchUrl } from "./amazon.js";
import { exportPDF } from "./pdf.js";

const ASSOCIATE_TAG = "freecoffee-21"; // replace with your PartnerNet tag

// ─── State ────────────────────────────────────────────────────────────────────
let activeDish = "pizza";
let currentResult = null;

// ─── DOM refs ─────────────────────────────────────────────────────────────────
const dishTabs        = document.querySelectorAll("[data-dish]");
const generateBtn     = document.getElementById("generate-btn");
const resultCard      = document.getElementById("result-card");
const dishNameEl      = document.getElementById("dish-name");
const slotsEl         = document.getElementById("slots-container");
const errorEl         = document.getElementById("error-msg");
const rerollBtn       = document.getElementById("reroll-btn");
const pdfBtn          = document.getElementById("pdf-btn");
const amazonBtn       = document.getElementById("amazon-btn");
const specialBtn      = document.getElementById("special-btn");
const specialEl       = document.getElementById("special-ingredient");
const profileBtn      = document.getElementById("profile-btn");
const profilePanel    = document.getElementById("profile-panel");
const closeProfileBtn = document.getElementById("close-profile");
const profileIngredEl = document.getElementById("profile-ingredients");
const shareProfileBtn = document.getElementById("share-profile-btn");
const importBanner    = document.getElementById("import-banner");
const importAcceptBtn = document.getElementById("import-accept");
const importDenyBtn   = document.getElementById("import-deny");

// ─── Dish tab selection ───────────────────────────────────────────────────────
function setActiveDish(type) {
  activeDish = type;

  dishTabs.forEach(btn => {
    if (btn.dataset.dish === type) btn.setAttribute("data-active", "");
    else btn.removeAttribute("data-active");
  });

  generateBtn.className = generateBtn.className
    .replace(/\bbtn-\w+/g, "").trim() + ` btn-${type}`;

  // Hide profile button when coffee mode is active (no ingredient profile for coffee)
  profileBtn.style.visibility = type === "coffee" ? "hidden" : "";
}

dishTabs.forEach(btn => btn.addEventListener("click", () => setActiveDish(btn.dataset.dish)));

// ─── Generate ─────────────────────────────────────────────────────────────────
function doGenerate() {
  errorEl.classList.add("hidden");
  try {
    if (activeDish === "coffee") {
      currentResult = generateCoffee();
      renderCoffeeResult(currentResult);
    } else {
      const profile = loadProfile();
      const config  = DISH_CONFIGS[activeDish];
      const result  = generate(activeDish, profile, INGREDIENTS, config);
      currentResult = result;
      renderFoodResult(result, config);
    }
  } catch (err) {
    errorEl.textContent = `Fehler: ${err.message}`;
    errorEl.classList.remove("hidden");
  }
}

generateBtn.addEventListener("click", doGenerate);
rerollBtn.addEventListener("click", doGenerate);

// ─── Coffee generator ─────────────────────────────────────────────────────────
function generateCoffee() {
  const item = COFFEES[Math.floor(Math.random() * COFFEES.length)];
  return {
    id: `coffee-${Date.now()}`,
    type: "coffee",
    name: item.name,
    origin: item.origin,
    meaning: item.meaning,
    progress: item.progress,
    ingredients: item.ingredients,
    generated_at: new Date().toISOString()
  };
}

// ─── Render: food result ──────────────────────────────────────────────────────
function renderFoodResult(dish, config) {
  dishNameEl.innerHTML = `<span class="text-2xl">${config.emoji}</span><span>${dish.name}</span>`;

  slotsEl.innerHTML = "";
  for (const slot of dish.slots) {
    if (!slot.ingredients.length) continue;
    const row = document.createElement("div");
    row.className = "flex flex-wrap items-start gap-2";
    const label = document.createElement("span");
    label.className = "slot-label";
    label.textContent = slot.label;
    row.appendChild(label);
    const pills = document.createElement("div");
    pills.className = "flex flex-wrap gap-1.5";
    for (const ing of slot.ingredients) {
      const badge = document.createElement("div");
      badge.className = "ing-badge-wrapper";
      badge.innerHTML = `
        <span class="ing-badge">${ing.emoji} ${ing.name}</span>
        <button class="ing-ignore-btn" title="Zur Kotzliste hinzufügen" data-id="${ing.id}">✕</button>
      `;
      const ignoreBtn = badge.querySelector(".ing-ignore-btn");
      ignoreBtn.addEventListener("click", e => {
        e.stopPropagation();
        toggleKotzliste(ing.id);
        renderFoodResult(dish, config);
      });
      pills.appendChild(badge);
    }
    row.appendChild(pills);
    slotsEl.appendChild(row);
  }

  // Amazon
  const allSelected = dish.slots.flatMap(s => s.ingredients);
  const cartUrl = buildCartUrl(allSelected, ASSOCIATE_TAG);
  if (cartUrl) {
    amazonBtn.href = cartUrl;
    amazonBtn.classList.remove("hidden");
  } else {
    amazonBtn.classList.add("hidden");
  }

  // Special ingredient
  const rarest = findRariestIngredient(allSelected.filter(i => (i.rarity ?? 0) >= 6));
  if (rarest) {
    const linkUrl = buildSingleAsinUrl(rarest, ASSOCIATE_TAG) ?? buildSearchUrl(rarest, ASSOCIATE_TAG);
    specialBtn.classList.remove("hidden");
    specialEl.innerHTML = `
      <p class="text-sm font-semibold text-[#78350F] mb-1.5">
        Hast du schon mal <strong>${rarest.emoji} ${rarest.name}</strong> probiert?
      </p>
      ${linkUrl ? `<a href="${linkUrl}" target="_blank" rel="noopener"
        class="text-xs font-medium text-[#B45309] underline underline-offset-2 hover:text-[#92400E]">
        Bei Amazon ansehen &rarr;
      </a>` : ""}
    `;
  } else {
    specialBtn.classList.add("hidden");
    specialEl.classList.add("hidden");
  }

  showResultCard();
}

// ─── Render: coffee result ────────────────────────────────────────────────────
function renderCoffeeResult(coffee) {
  dishNameEl.innerHTML = `<span class="text-2xl">☕</span><span>${coffee.name}</span>`;

  slotsEl.innerHTML = `
    <div class="flex items-center gap-2 mb-1">
      <span class="slot-label">Herkunft</span>
      <span class="ing-badge">${coffee.origin}</span>
    </div>
    <div class="flex items-start gap-2 mb-3">
      <span class="slot-label" style="padding-top:1px">Was</span>
      <span class="text-sm text-[#5C4030] italic leading-snug">${coffee.meaning}</span>
    </div>
    <div class="flex flex-wrap items-start gap-2 mb-3">
      <span class="slot-label">Zutaten</span>
      <div class="flex flex-wrap gap-1.5">
        ${coffee.ingredients.map(i => `<span class="ing-badge">${i}</span>`).join("")}
      </div>
    </div>
    <div class="flex items-start gap-2">
      <span class="slot-label" style="padding-top:1px">Methode</span>
      <p class="text-sm text-[#3A2810] leading-relaxed flex-1">${coffee.progress}</p>
    </div>
  `;

  // No Amazon or special ingredient for coffee
  amazonBtn.classList.add("hidden");
  specialBtn.classList.add("hidden");
  specialEl.classList.add("hidden");

  showResultCard();
}

function showResultCard() {
  resultCard.classList.remove("hidden");
  resultCard.classList.add("animate-slide-up");
  setTimeout(() => resultCard.classList.remove("animate-slide-up"), 500);
}

specialBtn.addEventListener("click", () => specialEl.classList.toggle("hidden"));

// ─── PDF export ───────────────────────────────────────────────────────────────
pdfBtn.addEventListener("click", () => {
  if (!currentResult) return;
  if (!window.jspdf) { alert("jsPDF noch nicht geladen. Bitte kurz warten."); return; }
  const config = currentResult.type === "coffee" ? COFFEE_CONFIG : DISH_CONFIGS[currentResult.type];
  exportPDF(currentResult, config);
});

// ─── Profile panel ────────────────────────────────────────────────────────────
function openProfile() {
  renderProfilePanel();
  profilePanel.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeProfile() {
  profilePanel.classList.add("hidden");
  document.body.style.overflow = "";
}

profileBtn.addEventListener("click", openProfile);
closeProfileBtn.addEventListener("click", closeProfile);
profilePanel.addEventListener("keydown", e => { if (e.key === "Escape") closeProfile(); });

function renderProfilePanel() {
  const profile = loadProfile();
  profileIngredEl.innerHTML = "";

  for (const [dishType, ings] of Object.entries(groupIngredientsByDish())) {
    const config = DISH_CONFIGS[dishType];

    const section = document.createElement("div");
    const heading = document.createElement("h3");
    heading.className = "font-display font-bold text-[#2C1F14] mb-2 text-base";
    heading.textContent = `${config.emoji}  ${config.label}`;
    section.appendChild(heading);

    const list = document.createElement("div");
    list.className = "space-y-1.5";

    for (const ing of ings) {
      const isFav  = profile.favorites.includes(ing.id);
      const isKotz = profile.kotzliste.includes(ing.id);

      const row = document.createElement("div");
      row.className = `profile-row flex items-center justify-between px-3 py-2 text-sm ${isFav ? "is-fav" : isKotz ? "is-kotz" : ""}`;

      row.innerHTML = `
        <span class="flex-1 text-[#3A2810]">${ing.emoji} ${ing.name}</span>
        <div class="flex gap-1 ml-3">
          <button data-action="fav"  class="profile-btn-fav  ${isFav  ? "active" : ""}" title="Lieblingskram">❤️</button>
          <button data-action="kotz" class="profile-btn-kotz ${isKotz ? "active" : ""}" title="Kotzliste">🤢</button>
        </div>
      `;

      row.querySelector("[data-action=fav]").addEventListener("click", () => {
        toggleFavorite(ing.id); renderProfilePanel();
      });
      row.querySelector("[data-action=kotz]").addEventListener("click", () => {
        toggleKotzliste(ing.id); renderProfilePanel();
      });

      list.appendChild(row);
    }

    section.appendChild(list);
    profileIngredEl.appendChild(section);
  }
}

function groupIngredientsByDish() {
  const grouped = {};
  for (const ing of INGREDIENTS) {
    for (const dish of ing.dishes) {
      if (!grouped[dish]) grouped[dish] = [];
      if (!grouped[dish].find(x => x.id === ing.id)) grouped[dish].push(ing);
    }
  }
  return grouped;
}

// ─── Profile sharing ─────────────────────────────────────────────────────────
shareProfileBtn.addEventListener("click", () => {
  const url = `${location.origin}${location.pathname}?p=${encodeProfile(loadProfile())}`;
  navigator.clipboard.writeText(url).then(() => {
    shareProfileBtn.textContent = "✅ Link kopiert!";
    setTimeout(() => { shareProfileBtn.textContent = "🔗 Profil teilen"; }, 2500);
  }).catch(() => prompt("Profil-URL (kopieren):", url));
});

// ─── Import profile from URL ──────────────────────────────────────────────────
function checkUrlProfile() {
  const param = new URLSearchParams(location.search).get("p");
  if (!param) return;
  const parsed = decodeProfile(param);
  if (!parsed || (!parsed.favorites?.length && !parsed.kotzliste?.length)) return;

  importBanner.classList.remove("hidden");
  const f = parsed.favorites?.length ?? 0, k = parsed.kotzliste?.length ?? 0;
  document.getElementById("import-summary").textContent =
    `${f} Favorit${f !== 1 ? "en" : ""}, ${k} auf der Kotzliste`;

  importAcceptBtn.addEventListener("click", () => {
    localStorage.setItem("freecoffee:profile", JSON.stringify(parsed));
    importBanner.classList.add("hidden");
    history.replaceState({}, "", location.pathname);
  });
  importDenyBtn.addEventListener("click", () => {
    importBanner.classList.add("hidden");
    history.replaceState({}, "", location.pathname);
  });
}

// ─── Init ─────────────────────────────────────────────────────────────────────
setActiveDish("pizza");
checkUrlProfile();
doGenerate();
