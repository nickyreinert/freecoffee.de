// freecoffee.de — main application
import { INGREDIENTS } from "./ingredients.js";
import { DISH_CONFIGS, DISH_COLORS } from "./dishConfig.js";
import { generate } from "./generator.js";
import { loadProfile, toggleFavorite, toggleKotzliste, encodeProfile, decodeProfile } from "./profile.js";
import { buildCartUrl, findRariestIngredient, buildSingleAsinUrl } from "./amazon.js";
import { exportPDF } from "./pdf.js";

// ─── State ────────────────────────────────────────────────────────────────────
let activeDish = "pizza";
let currentResult = null;

// ─── DOM refs ─────────────────────────────────────────────────────────────────
const dishTabs    = document.querySelectorAll("[data-dish]");
const generateBtn = document.getElementById("generate-btn");
const resultCard  = document.getElementById("result-card");
const dishNameEl  = document.getElementById("dish-name");
const slotsEl     = document.getElementById("slots-container");
const errorEl     = document.getElementById("error-msg");
const rerollBtn   = document.getElementById("reroll-btn");
const pdfBtn      = document.getElementById("pdf-btn");
const amazonBtn   = document.getElementById("amazon-btn");
const specialBtn  = document.getElementById("special-btn");
const specialEl   = document.getElementById("special-ingredient");
const profileBtn  = document.getElementById("profile-btn");
const profilePanel     = document.getElementById("profile-panel");
const closeProfileBtn  = document.getElementById("close-profile");
const profileIngredEl  = document.getElementById("profile-ingredients");
const shareProfileBtn  = document.getElementById("share-profile-btn");
const importBanner     = document.getElementById("import-banner");
const importAcceptBtn  = document.getElementById("import-accept");
const importDenyBtn    = document.getElementById("import-deny");

// ─── Dish tab selection ───────────────────────────────────────────────────────
function setActiveDish(type) {
  activeDish = type;
  const colors = DISH_COLORS[type];

  dishTabs.forEach(btn => {
    const t = btn.dataset.dish;
    if (t === type) {
      btn.className = `dish-tab ${colors.tab} rounded-xl py-3 flex flex-col items-center gap-1 font-semibold text-sm transition-all shadow-sm`;
    } else {
      const c = DISH_COLORS[t];
      btn.className = `dish-tab ${c.tabInactive} rounded-xl py-3 flex flex-col items-center gap-1 font-medium text-sm transition-all border border-transparent`;
    }
  });

  // Update generate button color
  generateBtn.className = `w-full py-4 rounded-2xl text-white text-lg font-bold tracking-wide shadow-md transition-all active:scale-95 ${colors.btn}`;
}

dishTabs.forEach(btn => btn.addEventListener("click", () => setActiveDish(btn.dataset.dish)));

// ─── Generate ─────────────────────────────────────────────────────────────────
function doGenerate() {
  errorEl.classList.add("hidden");

  try {
    const profile = loadProfile();
    const config  = DISH_CONFIGS[activeDish];
    const result  = generate(activeDish, profile, INGREDIENTS, config);
    currentResult = result;
    renderResult(result, config);
  } catch (err) {
    errorEl.textContent = `Fehler: ${err.message}`;
    errorEl.classList.remove("hidden");
  }
}

generateBtn.addEventListener("click", doGenerate);
rerollBtn.addEventListener("click", doGenerate);

// ─── Render result ────────────────────────────────────────────────────────────
function renderResult(dish, config) {
  const colors = DISH_COLORS[dish.type];

  // Name
  dishNameEl.innerHTML = `<span class="text-2xl mr-2">${config.emoji}</span>${dish.name}`;

  // Slots
  slotsEl.innerHTML = "";
  for (const slot of dish.slots) {
    if (!slot.ingredients.length) continue;
    const row = document.createElement("div");
    row.className = `flex flex-wrap items-center gap-2`;
    row.innerHTML = `<span class="text-xs font-semibold text-stone-400 uppercase tracking-widest w-20 shrink-0">${slot.label}</span>`;
    for (const ing of slot.ingredients) {
      const pill = document.createElement("span");
      pill.className = `${colors.badge} px-3 py-1 rounded-full text-sm font-medium`;
      pill.textContent = `${ing.emoji} ${ing.name}`;
      row.appendChild(pill);
    }
    slotsEl.appendChild(row);
  }

  // Amazon buttons
  const allSelected = dish.slots.flatMap(s => s.ingredients);
  const associateTag = "freecoffee-21"; // update with real PartnerNet tag
  const cartUrl = buildCartUrl(allSelected, associateTag);

  if (cartUrl) {
    amazonBtn.href = cartUrl;
    amazonBtn.classList.remove("hidden");
  } else {
    amazonBtn.classList.add("hidden");
  }

  // Special ingredient
  const rarest = findRariestIngredient(allSelected.filter(i => i.rarity >= 7));
  if (rarest) {
    const singleUrl = buildSingleAsinUrl(rarest, associateTag);
    specialBtn.classList.remove("hidden");
    specialEl.innerHTML = `
      <p class="text-sm text-amber-800 font-medium mb-1">Hast du schon mal <strong>${rarest.emoji} ${rarest.name}</strong> probiert?</p>
      ${singleUrl ? `<a href="${singleUrl}" target="_blank" rel="noopener" class="text-xs text-amber-700 underline hover:text-amber-900">Bei Amazon ansehen →</a>` : ""}
    `;
  } else {
    specialBtn.classList.add("hidden");
    specialEl.classList.add("hidden");
  }

  // Show card
  resultCard.classList.remove("hidden");
  resultCard.classList.add("animate-slide-in");
  setTimeout(() => resultCard.classList.remove("animate-slide-in"), 500);
}

// Special ingredient toggle
specialBtn.addEventListener("click", () => specialEl.classList.toggle("hidden"));

// ─── PDF export ───────────────────────────────────────────────────────────────
pdfBtn.addEventListener("click", () => {
  if (!currentResult) return;
  if (!window.jspdf) {
    alert("jsPDF noch nicht geladen. Bitte kurz warten und nochmal versuchen.");
    return;
  }
  exportPDF(currentResult, DISH_CONFIGS[currentResult.type]);
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

profilePanel.addEventListener("keydown", e => {
  if (e.key === "Escape") closeProfile();
});

function renderProfilePanel() {
  const profile = loadProfile();
  const grouped = groupIngredientsByDish();

  profileIngredEl.innerHTML = "";

  for (const [dishType, ings] of Object.entries(grouped)) {
    const config = DISH_CONFIGS[dishType];
    const colors = DISH_COLORS[dishType];

    const section = document.createElement("div");
    section.innerHTML = `<h3 class="font-bold text-stone-700 mb-2">${config.emoji} ${config.label}</h3>`;

    const grid = document.createElement("div");
    grid.className = "space-y-1";

    for (const ing of ings) {
      const isFav  = profile.favorites.includes(ing.id);
      const isKotz = profile.kotzliste.includes(ing.id);

      const row = document.createElement("div");
      row.className = `flex items-center justify-between px-3 py-2 rounded-lg text-sm ${isFav ? "bg-green-50 border border-green-200" : isKotz ? "bg-red-50 border border-red-200" : "bg-stone-50 border border-stone-100"}`;
      row.dataset.id = ing.id;

      row.innerHTML = `
        <span class="flex-1">${ing.emoji} ${ing.name}</span>
        <div class="flex gap-1 ml-2">
          <button data-action="fav" title="Lieblingskram"
            class="px-2 py-1 rounded-md text-base transition-all ${isFav ? "bg-green-200" : "hover:bg-green-100"}"
          >❤️</button>
          <button data-action="kotz" title="Kotzliste"
            class="px-2 py-1 rounded-md text-base transition-all ${isKotz ? "bg-red-200" : "hover:bg-red-100"}"
          >🤢</button>
        </div>
      `;

      row.querySelector("[data-action=fav]").addEventListener("click", () => {
        toggleFavorite(ing.id);
        renderProfilePanel();
      });
      row.querySelector("[data-action=kotz]").addEventListener("click", () => {
        toggleKotzliste(ing.id);
        renderProfilePanel();
      });

      grid.appendChild(row);
    }

    section.appendChild(grid);
    profileIngredEl.appendChild(section);
  }
}

function groupIngredientsByDish() {
  const grouped = {};
  for (const ing of INGREDIENTS) {
    for (const dish of ing.dishes) {
      if (!grouped[dish]) grouped[dish] = [];
      if (!grouped[dish].find(x => x.id === ing.id)) {
        grouped[dish].push(ing);
      }
    }
  }
  return grouped;
}

// ─── Profile sharing ─────────────────────────────────────────────────────────
shareProfileBtn.addEventListener("click", () => {
  const profile = loadProfile();
  const encoded = encodeProfile(profile);
  const url = `${location.origin}${location.pathname}?p=${encoded}`;
  navigator.clipboard.writeText(url).then(() => {
    shareProfileBtn.textContent = "✅ Link kopiert!";
    setTimeout(() => { shareProfileBtn.textContent = "🔗 Profil teilen"; }, 2000);
  }).catch(() => {
    prompt("Profil-URL (kopieren):", url);
  });
});

// ─── Import profile from URL ──────────────────────────────────────────────────
function checkUrlProfile() {
  const param = new URLSearchParams(location.search).get("p");
  if (!param) return;

  const parsed = decodeProfile(param);
  if (!parsed || (!parsed.favorites?.length && !parsed.kotzliste?.length)) return;

  // Show import banner
  importBanner.classList.remove("hidden");
  const favCount  = parsed.favorites?.length  ?? 0;
  const kotzCount = parsed.kotzliste?.length ?? 0;
  document.getElementById("import-summary").textContent =
    `${favCount} Favorit${favCount !== 1 ? "en" : ""}, ${kotzCount} auf der Kotzliste`;

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
// Trigger initial generate so the page isn't empty
doGenerate();
