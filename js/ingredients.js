// Ingredient data — freecoffee.de
// Each ingredient may appear in multiple dish types with different roles.
export const INGREDIENTS = [

  // ─── PIZZA: base_dough ──────────────────────────────────────────────────
  {
    id: "klassischer_teig", name: "Klassischer Teig", emoji: "🫓",
    tags: ["mild", "fluffy", "classic"],
    dishes: ["pizza"], roles: { pizza: "base_dough" },
    excludes: [], amazon_asin: null,
    tags_name: ["klassisch", "vertraut", "italienisch"],
    noun_form: "Klassiker", rarity: 1
  },
  {
    id: "vollkorn_teig", name: "Vollkorn-Teig", emoji: "🌾",
    tags: ["nutty", "hearty", "wholesome"],
    dishes: ["pizza"], roles: { pizza: "base_dough" },
    excludes: [], amazon_asin: null,
    tags_name: ["kernig", "vollwertig", "rustikal"],
    noun_form: "Korn", rarity: 3
  },
  {
    id: "dinkel_teig", name: "Dinkelteig", emoji: "🌿",
    tags: ["nutty", "light", "ancient"],
    dishes: ["pizza"], roles: { pizza: "base_dough" },
    excludes: [], amazon_asin: null,
    tags_name: ["urig", "biologisch", "nachhaltig"],
    noun_form: "Dinkel", rarity: 4
  },

  // ─── PIZZA: sauce ───────────────────────────────────────────────────────
  {
    id: "tomatensauce", name: "Tomatensauce", emoji: "🍅",
    tags: ["tangy", "classic", "fresh"],
    dishes: ["pizza"], roles: { pizza: "sauce" },
    excludes: [], amazon_asin: null,
    tags_name: ["klassisch", "frisch", "sonnig"],
    noun_form: "Tomate", rarity: 1
  },
  {
    id: "arrabiata", name: "Arrabiata", emoji: "🌶️",
    tags: ["spicy", "tangy", "fiery"],
    dishes: ["pizza"], roles: { pizza: "sauce" },
    excludes: [], amazon_asin: "B09TXYZ001",
    tags_name: ["scharf", "feurig", "temperamentvoll"],
    noun_form: "Feuer", rarity: 5
  },
  {
    id: "pesto_rosso", name: "Pesto Rosso", emoji: "🫙",
    tags: ["rich", "sun-dried", "intense"],
    dishes: ["pizza"], roles: { pizza: "sauce" },
    excludes: [], amazon_asin: "B09TXYZ002",
    tags_name: ["satt", "intensiv", "mediterran"],
    noun_form: "Pesto", rarity: 6
  },

  // ─── PIZZA: cheese ──────────────────────────────────────────────────────
  {
    id: "mozzarella", name: "Mozzarella", emoji: "🧀",
    tags: ["mild", "creamy", "melty"],
    dishes: ["pizza"], roles: { pizza: "cheese" },
    excludes: ["thunfisch", "garnelen"],
    amazon_asin: null,
    tags_name: ["cremig", "mild", "klassisch"],
    noun_form: "Mozzarella", rarity: 1
  },
  {
    id: "bueffel_mozzarella", name: "Büffel-Mozzarella", emoji: "🐃",
    tags: ["rich", "creamy", "premium"],
    dishes: ["pizza"], roles: { pizza: "cheese" },
    excludes: ["thunfisch", "garnelen"],
    amazon_asin: "B09TXYZ003",
    tags_name: ["sahnig", "edel", "büffelig"],
    noun_form: "Büfala", rarity: 7
  },
  {
    id: "gorgonzola", name: "Gorgonzola", emoji: "🧀",
    tags: ["pungent", "bold", "creamy"],
    dishes: ["pizza"], roles: { pizza: "cheese" },
    excludes: ["thunfisch", "garnelen"],
    amazon_asin: "B09TXYZ004",
    tags_name: ["wuchtig", "kühn", "charaktervoll"],
    noun_form: "Gorgonzola", rarity: 7
  },
  {
    id: "parmesan", name: "Parmesan", emoji: "🧀",
    tags: ["salty", "umami", "aged"],
    dishes: ["pizza", "salat"], roles: { pizza: "cheese", salat: "garnish" },
    excludes: ["thunfisch", "garnelen"],
    amazon_asin: "B09TXYZ005",
    tags_name: ["salzig", "gereift", "intensiv"],
    noun_form: "Parmesan", rarity: 4
  },

  // ─── PIZZA: protein ─────────────────────────────────────────────────────
  {
    id: "nduja", name: "Nduja", emoji: "🌶️",
    tags: ["spicy", "fatty", "smoky", "italian"],
    dishes: ["pizza", "stulle"], roles: { pizza: "protein", stulle: "spread" },
    excludes: [], amazon_asin: "B07ABC456",
    tags_name: ["scharf", "rauchig", "wuchtig"],
    noun_form: "Nduja", rarity: 9
  },
  {
    id: "salami", name: "Salami", emoji: "🍖",
    tags: ["savory", "fatty", "classic"],
    dishes: ["pizza", "stulle"], roles: { pizza: "protein", stulle: "protein" },
    excludes: [], amazon_asin: null,
    tags_name: ["herzhaft", "klassisch", "fettig"],
    noun_form: "Salami", rarity: 2
  },
  {
    id: "prosciutto", name: "Prosciutto", emoji: "🥩",
    tags: ["savory", "delicate", "italian"],
    dishes: ["pizza"], roles: { pizza: "protein" },
    excludes: [], amazon_asin: "B09TXYZ006",
    tags_name: ["zart", "edel", "toskanisch"],
    noun_form: "Prosciutto", rarity: 7
  },
  {
    id: "thunfisch", name: "Thunfisch", emoji: "🐟",
    tags: ["oceanic", "savory", "mediterranean"],
    dishes: ["pizza", "salat"], roles: { pizza: "protein", salat: "protein" },
    excludes: ["mozzarella", "bueffel_mozzarella", "gorgonzola", "parmesan"],
    amazon_asin: "B09TXYZ007",
    tags_name: ["meerig", "frisch", "maritim"],
    noun_form: "Thunfisch", rarity: 3
  },
  {
    id: "garnelen", name: "Garnelen", emoji: "🦐",
    tags: ["oceanic", "delicate", "fresh"],
    dishes: ["pizza", "salat"], roles: { pizza: "protein", salat: "protein" },
    excludes: ["mozzarella", "bueffel_mozzarella", "gorgonzola", "parmesan"],
    amazon_asin: "B09TXYZ008",
    tags_name: ["meerig", "delikat", "knackig"],
    noun_form: "Garnele", rarity: 6
  },

  // ─── PIZZA: veggie ──────────────────────────────────────────────────────
  {
    id: "rucola", name: "Rucola", emoji: "🥬",
    tags: ["bitter", "fresh", "leafy", "light"],
    dishes: ["pizza", "stulle", "salat"],
    roles: { pizza: "veggie", stulle: "veggie", salat: "base_green" },
    excludes: [], amazon_asin: null,
    tags_name: ["frisch", "leicht", "mediterran"],
    noun_form: "Rucola", rarity: 3
  },
  {
    id: "champignons", name: "Champignons", emoji: "🍄",
    tags: ["earthy", "umami", "mild"],
    dishes: ["pizza", "salat"], roles: { pizza: "veggie", salat: "veggie" },
    excludes: [], amazon_asin: null,
    tags_name: ["erdig", "waldig", "satt"],
    noun_form: "Champignon", rarity: 2
  },
  {
    id: "artischocken", name: "Artischocken", emoji: "🌿",
    tags: ["earthy", "mild", "mediterranean"],
    dishes: ["pizza", "salat"], roles: { pizza: "veggie", salat: "veggie" },
    excludes: [], amazon_asin: "B09TXYZ009",
    tags_name: ["mediterran", "edel", "sanft"],
    noun_form: "Artischocke", rarity: 7
  },
  {
    id: "paprika", name: "Paprika", emoji: "🫑",
    tags: ["sweet", "crunchy", "colorful"],
    dishes: ["pizza", "salat"], roles: { pizza: "veggie", salat: "veggie" },
    excludes: [], amazon_asin: null,
    tags_name: ["bunt", "süßlich", "knackig"],
    noun_form: "Paprika", rarity: 2
  },
  {
    id: "oliven", name: "Oliven", emoji: "🫒",
    tags: ["salty", "briny", "mediterranean"],
    dishes: ["pizza", "salat"], roles: { pizza: "veggie", salat: "veggie" },
    excludes: [], amazon_asin: "B09TXYZ010",
    tags_name: ["griechisch", "salzig", "mediterran"],
    noun_form: "Olive", rarity: 4
  },

  // ─── PIZZA: garnish ─────────────────────────────────────────────────────
  {
    id: "basilikum", name: "Basilikum", emoji: "🌿",
    tags: ["aromatic", "fresh", "italian"],
    dishes: ["pizza", "salat"], roles: { pizza: "garnish", salat: "garnish" },
    excludes: [], amazon_asin: null,
    tags_name: ["aromatisch", "frisch", "genussvoll"],
    noun_form: "Basil", rarity: 2
  },
  {
    id: "chili_flakes", name: "Chili-Flakes", emoji: "🌶️",
    tags: ["spicy", "hot", "intense"],
    dishes: ["pizza"], roles: { pizza: "garnish" },
    excludes: [], amazon_asin: "B09TXYZ011",
    tags_name: ["scharf", "heiß", "mutig"],
    noun_form: "Chili", rarity: 4
  },
  {
    id: "trueffeloel", name: "Trüffelöl", emoji: "✨",
    tags: ["luxurious", "earthy", "aromatic"],
    dishes: ["pizza"], roles: { pizza: "garnish" },
    excludes: [], amazon_asin: "B09TXYZ012",
    tags_name: ["luxuriös", "edel", "trüffelig"],
    noun_form: "Trüffel", rarity: 10
  },

  // ─── STULLE: base_bread ─────────────────────────────────────────────────
  {
    id: "schwarzbrot", name: "Schwarzbrot", emoji: "🍞",
    tags: ["hearty", "dark", "malty"],
    dishes: ["stulle"], roles: { stulle: "base_bread" },
    excludes: [], amazon_asin: null,
    tags_name: ["herb", "norddeutsch", "geerdet"],
    noun_form: "Schwarz", rarity: 2
  },
  {
    id: "koernerbrot", name: "Körnerbrot", emoji: "🌾",
    tags: ["nutty", "seedy", "wholesome"],
    dishes: ["stulle"], roles: { stulle: "base_bread" },
    excludes: [], amazon_asin: null,
    tags_name: ["kernig", "vital", "vollwertig"],
    noun_form: "Korn", rarity: 2
  },
  {
    id: "pumpernickel", name: "Pumpernickel", emoji: "🍫",
    tags: ["sweet", "dense", "intense"],
    dishes: ["stulle"], roles: { stulle: "base_bread" },
    excludes: [], amazon_asin: "B09TXYZ013",
    tags_name: ["westfälisch", "intensiv", "dunkel"],
    noun_form: "Pumpernickel", rarity: 5
  },
  {
    id: "sauerteigbrot", name: "Sauerteigbrot", emoji: "🍞",
    tags: ["sour", "complex", "artisan"],
    dishes: ["stulle"], roles: { stulle: "base_bread" },
    excludes: [], amazon_asin: "B09TXYZ014",
    tags_name: ["sauer", "komplex", "handwerklich"],
    noun_form: "Sauerteig", rarity: 6
  },
  {
    id: "baguette", name: "Baguette", emoji: "🥖",
    tags: ["crusty", "light", "french"],
    dishes: ["stulle"], roles: { stulle: "base_bread" },
    excludes: [], amazon_asin: null,
    tags_name: ["knusprig", "französisch", "luftig"],
    noun_form: "Baguette", rarity: 3
  },

  // ─── STULLE: spread ─────────────────────────────────────────────────────
  {
    id: "butter", name: "Butter", emoji: "🧈",
    tags: ["creamy", "rich", "classic"],
    dishes: ["stulle"], roles: { stulle: "spread" },
    excludes: [], amazon_asin: null,
    tags_name: ["cremig", "satt", "klassisch"],
    noun_form: "Butter", rarity: 1
  },
  {
    id: "frischkaese", name: "Frischkäse", emoji: "🧀",
    tags: ["creamy", "mild", "tangy"],
    dishes: ["stulle"], roles: { stulle: "spread" },
    excludes: [], amazon_asin: null,
    tags_name: ["frisch", "mild", "cremig"],
    noun_form: "Frischkäse", rarity: 2
  },
  {
    id: "hummus", name: "Hummus", emoji: "🫘",
    tags: ["earthy", "nutty", "middle-eastern"],
    dishes: ["stulle"], roles: { stulle: "spread" },
    excludes: [], amazon_asin: "B09TXYZ015",
    tags_name: ["orientalisch", "nussig", "satt"],
    noun_form: "Hummus", rarity: 5
  },
  {
    id: "guacamole", name: "Guacamole", emoji: "🥑",
    tags: ["creamy", "fresh", "avocado"],
    dishes: ["stulle"], roles: { stulle: "spread" },
    excludes: [], amazon_asin: null,
    tags_name: ["mexikanisch", "cremig", "avocadisch"],
    noun_form: "Guacamole", rarity: 4
  },

  // ─── STULLE: protein ────────────────────────────────────────────────────
  {
    id: "lachs", name: "Räucherlachs", emoji: "🐟",
    tags: ["smoky", "oceanic", "premium"],
    dishes: ["stulle"], roles: { stulle: "protein" },
    excludes: [], amazon_asin: "B09TXYZ016",
    tags_name: ["rauchig", "atlantisch", "edel"],
    noun_form: "Lachs", rarity: 7
  },
  {
    id: "schinken", name: "Schinken", emoji: "🥩",
    tags: ["savory", "classic", "mild"],
    dishes: ["stulle"], roles: { stulle: "protein" },
    excludes: [], amazon_asin: null,
    tags_name: ["herzhaft", "klassisch", "handfest"],
    noun_form: "Schinken", rarity: 2
  },

  // ─── STULLE: veggie ─────────────────────────────────────────────────────
  {
    id: "tomate", name: "Tomate", emoji: "🍅",
    tags: ["fresh", "juicy", "acidic"],
    dishes: ["stulle", "salat"], roles: { stulle: "veggie", salat: "veggie" },
    excludes: [], amazon_asin: null,
    tags_name: ["saftig", "frisch", "sonnig"],
    noun_form: "Tomate", rarity: 1
  },
  {
    id: "gurke", name: "Gurke", emoji: "🥒",
    tags: ["fresh", "crisp", "mild"],
    dishes: ["stulle", "salat"], roles: { stulle: "veggie", salat: "veggie" },
    excludes: [], amazon_asin: null,
    tags_name: ["frisch", "kühl", "knackig"],
    noun_form: "Gurke", rarity: 1
  },
  {
    id: "avocado", name: "Avocado", emoji: "🥑",
    tags: ["creamy", "rich", "mild"],
    dishes: ["stulle", "salat"], roles: { stulle: "veggie", salat: "veggie" },
    excludes: [], amazon_asin: null,
    tags_name: ["cremig", "tropisch", "weich"],
    noun_form: "Avocado", rarity: 3
  },
  {
    id: "radieschen", name: "Radieschen", emoji: "🌸",
    tags: ["peppery", "crisp", "fresh"],
    dishes: ["stulle", "salat"], roles: { stulle: "veggie", salat: "veggie" },
    excludes: [], amazon_asin: null,
    tags_name: ["würzig", "frisch", "pfiffig"],
    noun_form: "Radieschen", rarity: 4
  },

  // ─── STULLE: garnish ────────────────────────────────────────────────────
  {
    id: "schnittlauch", name: "Schnittlauch", emoji: "🌿",
    tags: ["fresh", "oniony", "light"],
    dishes: ["stulle", "salat"], roles: { stulle: "garnish", salat: "garnish" },
    excludes: [], amazon_asin: null,
    tags_name: ["frisch", "grün", "nordisch"],
    noun_form: "Schnittlauch", rarity: 2
  },
  {
    id: "kapern", name: "Kapern", emoji: "🫙",
    tags: ["salty", "briny", "tangy"],
    dishes: ["stulle"], roles: { stulle: "garnish" },
    excludes: [], amazon_asin: "B09TXYZ017",
    tags_name: ["salzig", "kapriziös", "mediterran"],
    noun_form: "Kaper", rarity: 7
  },

  // ─── SALAT: base_green ──────────────────────────────────────────────────
  {
    id: "kopfsalat", name: "Kopfsalat", emoji: "🥬",
    tags: ["mild", "fresh", "crisp"],
    dishes: ["salat"], roles: { salat: "base_green" },
    excludes: [], amazon_asin: null,
    tags_name: ["klassisch", "frisch", "leicht"],
    noun_form: "Kopfsalat", rarity: 1
  },
  {
    id: "feldsalat", name: "Feldsalat", emoji: "🌿",
    tags: ["mild", "nutty", "delicate"],
    dishes: ["salat"], roles: { salat: "base_green" },
    excludes: [], amazon_asin: null,
    tags_name: ["nussig", "zart", "winterlich"],
    noun_form: "Feldsalat", rarity: 4
  },
  {
    id: "spinat", name: "Babyspinat", emoji: "🌿",
    tags: ["iron-rich", "mild", "earthy"],
    dishes: ["salat"], roles: { salat: "base_green" },
    excludes: [], amazon_asin: null,
    tags_name: ["kräftig", "grün", "vital"],
    noun_form: "Spinat", rarity: 3
  },

  // ─── SALAT: protein ─────────────────────────────────────────────────────
  {
    id: "haehnchenbrust", name: "Hähnchenbrust", emoji: "🍗",
    tags: ["lean", "mild", "classic"],
    dishes: ["salat"], roles: { salat: "protein" },
    excludes: [], amazon_asin: null,
    tags_name: ["lean", "klassisch", "satt"],
    noun_form: "Hähnchen", rarity: 2
  },
  {
    id: "halloumi", name: "Halloumi", emoji: "🧀",
    tags: ["salty", "squeaky", "grilled"],
    dishes: ["salat"], roles: { salat: "protein" },
    excludes: [], amazon_asin: "B09TXYZ018",
    tags_name: ["zypriotisch", "salzig", "gegrillt"],
    noun_form: "Halloumi", rarity: 7
  },
  {
    id: "kichererbsen", name: "Kichererbsen", emoji: "🫘",
    tags: ["earthy", "nutty", "filling"],
    dishes: ["salat"], roles: { salat: "protein" },
    excludes: [], amazon_asin: null,
    tags_name: ["orientalisch", "nussig", "sättigend"],
    noun_form: "Kicher", rarity: 3
  },

  // ─── SALAT: crunch ──────────────────────────────────────────────────────
  {
    id: "croutons", name: "Croutons", emoji: "🍞",
    tags: ["crunchy", "toasty", "classic"],
    dishes: ["salat"], roles: { salat: "crunch" },
    excludes: [], amazon_asin: null,
    tags_name: ["knusprig", "rösch", "klassisch"],
    noun_form: "Crouton", rarity: 2
  },
  {
    id: "kuerbiskerne", name: "Kürbiskerne", emoji: "🌰",
    tags: ["nutty", "green", "crunchy"],
    dishes: ["salat"], roles: { salat: "crunch" },
    excludes: [], amazon_asin: "B09TXYZ019",
    tags_name: ["nussig", "knackig", "herbstlich"],
    noun_form: "Kürbis", rarity: 4
  },
  {
    id: "walnuesse", name: "Walnüsse", emoji: "🌰",
    tags: ["bitter", "nutty", "rich"],
    dishes: ["salat"], roles: { salat: "crunch" },
    excludes: [], amazon_asin: null,
    tags_name: ["bitter", "nussig", "herbst"],
    noun_form: "Walnuss", rarity: 3
  },

  // ─── SALAT: dressing ────────────────────────────────────────────────────
  {
    id: "vinaigrette", name: "Vinaigrette", emoji: "🫙",
    tags: ["acidic", "bright", "classic"],
    dishes: ["salat"], roles: { salat: "dressing" },
    excludes: [], amazon_asin: null,
    tags_name: ["klassisch", "sauer", "frisch"],
    noun_form: "Vinaigrette", rarity: 2
  },
  {
    id: "caesar_dressing", name: "Caesar-Dressing", emoji: "🫙",
    tags: ["rich", "creamy", "umami"],
    dishes: ["salat"], roles: { salat: "dressing" },
    excludes: [], amazon_asin: "B09TXYZ020",
    tags_name: ["kaiserlich", "cremig", "würzig"],
    noun_form: "Caesar", rarity: 4
  },
  {
    id: "joghurt_dressing", name: "Joghurt-Dressing", emoji: "🥣",
    tags: ["creamy", "mild", "fresh"],
    dishes: ["salat"], roles: { salat: "dressing" },
    excludes: [], amazon_asin: null,
    tags_name: ["mild", "cremig", "frisch"],
    noun_form: "Joghurt", rarity: 2
  },

  // ─── COCKTAIL: spirit ───────────────────────────────────────────────────
  {
    id: "campari", name: "Campari", emoji: "🍷",
    tags: ["bitter", "herbal", "italian"],
    dishes: ["cocktail"], roles: { cocktail: "spirit" },
    excludes: [], amazon_asin: "B06DEF789",
    tags_name: ["bitter", "herb", "komplex"],
    noun_form: "Campari", rarity: 6
  },
  {
    id: "gin", name: "Gin", emoji: "🍸",
    tags: ["botanical", "juniper", "dry"],
    dishes: ["cocktail"], roles: { cocktail: "spirit" },
    excludes: [], amazon_asin: "B09TXYZ021",
    tags_name: ["botanisch", "trocken", "elegant"],
    noun_form: "Gin", rarity: 5
  },
  {
    id: "rum", name: "Rum", emoji: "🥃",
    tags: ["sweet", "tropical", "bold"],
    dishes: ["cocktail"], roles: { cocktail: "spirit" },
    excludes: [], amazon_asin: "B09TXYZ022",
    tags_name: ["karibisch", "tropisch", "süß"],
    noun_form: "Rum", rarity: 4
  },
  {
    id: "wodka", name: "Wodka", emoji: "🥃",
    tags: ["neutral", "crisp", "clean"],
    dishes: ["cocktail"], roles: { cocktail: "spirit" },
    excludes: [], amazon_asin: null,
    tags_name: ["klar", "rein", "nordisch"],
    noun_form: "Wodka", rarity: 2
  },
  {
    id: "aperol", name: "Aperol", emoji: "🍊",
    tags: ["bitter-sweet", "orange", "italian"],
    dishes: ["cocktail"], roles: { cocktail: "spirit" },
    excludes: [], amazon_asin: "B09TXYZ023",
    tags_name: ["spritzig", "orange", "leicht"],
    noun_form: "Aperol", rarity: 4
  },
  {
    id: "tequila", name: "Tequila", emoji: "🥃",
    tags: ["agave", "earthy", "bold"],
    dishes: ["cocktail"], roles: { cocktail: "spirit" },
    excludes: [], amazon_asin: "B09TXYZ024",
    tags_name: ["mexikanisch", "mutig", "agave"],
    noun_form: "Tequila", rarity: 6
  },

  // ─── COCKTAIL: mixer ────────────────────────────────────────────────────
  {
    id: "tonic_water", name: "Tonic Water", emoji: "🫧",
    tags: ["bitter", "fizzy", "refreshing"],
    dishes: ["cocktail"], roles: { cocktail: "mixer" },
    excludes: [], amazon_asin: "B09TXYZ025",
    tags_name: ["sprudelnd", "bitter", "erfrischend"],
    noun_form: "Tonic", rarity: 3
  },
  {
    id: "soda_water", name: "Sodawasser", emoji: "💧",
    tags: ["neutral", "fizzy", "clean"],
    dishes: ["cocktail"], roles: { cocktail: "mixer" },
    excludes: [], amazon_asin: null,
    tags_name: ["spritzig", "klar", "neutral"],
    noun_form: "Soda", rarity: 1
  },
  {
    id: "orangensaft", name: "Orangensaft", emoji: "🍊",
    tags: ["sweet", "citrusy", "tropical"],
    dishes: ["cocktail"], roles: { cocktail: "mixer" },
    excludes: [], amazon_asin: null,
    tags_name: ["sonnig", "süß", "zitrusfrisch"],
    noun_form: "Orange", rarity: 2
  },
  {
    id: "grapefruitschraut", name: "Grapefruitsaft", emoji: "🍊",
    tags: ["bitter", "citrusy", "refreshing"],
    dishes: ["cocktail"], roles: { cocktail: "mixer" },
    excludes: [], amazon_asin: null,
    tags_name: ["bitter", "zitrusig", "frisch"],
    noun_form: "Grapefruit", rarity: 5
  },
  {
    id: "prosecco", name: "Prosecco", emoji: "🥂",
    tags: ["bubbly", "light", "festive"],
    dishes: ["cocktail"], roles: { cocktail: "mixer" },
    excludes: [], amazon_asin: "B09TXYZ026",
    tags_name: ["sprudelnd", "festlich", "leicht"],
    noun_form: "Prosecco", rarity: 5
  },

  // ─── COCKTAIL: sweet ────────────────────────────────────────────────────
  {
    id: "honigsirup", name: "Honigsirup", emoji: "🍯",
    tags: ["sweet", "floral", "natural"],
    dishes: ["cocktail"], roles: { cocktail: "sweet" },
    excludes: [], amazon_asin: "B09TXYZ027",
    tags_name: ["honig", "süß", "blütig"],
    noun_form: "Honig", rarity: 5
  },
  {
    id: "agavensirup", name: "Agavensirup", emoji: "🌵",
    tags: ["sweet", "mild", "natural"],
    dishes: ["cocktail"], roles: { cocktail: "sweet" },
    excludes: [], amazon_asin: null,
    tags_name: ["süß", "natürlich", "mexikanisch"],
    noun_form: "Agave", rarity: 4
  },
  {
    id: "grenadine", name: "Grenadine", emoji: "🍒",
    tags: ["sweet", "fruity", "red"],
    dishes: ["cocktail"], roles: { cocktail: "sweet" },
    excludes: [], amazon_asin: "B09TXYZ028",
    tags_name: ["rot", "süß", "romantisch"],
    noun_form: "Grenadine", rarity: 6
  },

  // ─── COCKTAIL: acid ─────────────────────────────────────────────────────
  {
    id: "limettensaft", name: "Limettensaft", emoji: "🍋",
    tags: ["sour", "bright", "tropical"],
    dishes: ["cocktail"], roles: { cocktail: "acid" },
    excludes: [], amazon_asin: null,
    tags_name: ["sauer", "tropisch", "frisch"],
    noun_form: "Limette", rarity: 3
  },
  {
    id: "zitronensaft", name: "Zitronensaft", emoji: "🍋",
    tags: ["sour", "bright", "classic"],
    dishes: ["cocktail"], roles: { cocktail: "acid" },
    excludes: [], amazon_asin: null,
    tags_name: ["sauer", "klassisch", "frisch"],
    noun_form: "Zitrone", rarity: 2
  },

  // ─── COCKTAIL: garnish ──────────────────────────────────────────────────
  {
    id: "minze", name: "Minze", emoji: "🌿",
    tags: ["fresh", "cool", "aromatic"],
    dishes: ["cocktail"], roles: { cocktail: "garnish" },
    excludes: [], amazon_asin: null,
    tags_name: ["frisch", "kühl", "minzig"],
    noun_form: "Minze", rarity: 3
  },
  {
    id: "orangenscheibe", name: "Orangenscheibe", emoji: "🍊",
    tags: ["citrusy", "colorful", "fresh"],
    dishes: ["cocktail"], roles: { cocktail: "garnish" },
    excludes: [], amazon_asin: null,
    tags_name: ["sonnig", "farbenfroh", "frisch"],
    noun_form: "Orange", rarity: 2
  }
];
