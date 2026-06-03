// User profile — localStorage persistence
// Key: "freecoffee:profile"
// Value: { favorites: string[], kotzliste: string[] }

const STORAGE_KEY = "freecoffee:profile";
const DEFAULT = { favorites: [], kotzliste: [] };

export function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT, favorites: [], kotzliste: [] };
    const parsed = JSON.parse(raw);
    return {
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      kotzliste: Array.isArray(parsed.kotzliste) ? parsed.kotzliste : []
    };
  } catch {
    return { favorites: [], kotzliste: [] };
  }
}

function save(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  return profile;
}

export function toggleFavorite(id) {
  const p = loadProfile();
  if (p.favorites.includes(id)) {
    p.favorites = p.favorites.filter(x => x !== id);
  } else {
    p.favorites.push(id);
    p.kotzliste = p.kotzliste.filter(x => x !== id); // can't be both
  }
  return save(p);
}

export function toggleKotzliste(id) {
  const p = loadProfile();
  if (p.kotzliste.includes(id)) {
    p.kotzliste = p.kotzliste.filter(x => x !== id);
  } else {
    p.kotzliste.push(id);
    p.favorites = p.favorites.filter(x => x !== id); // can't be both
  }
  return save(p);
}

export function encodeProfile(profile) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(profile))));
}

export function decodeProfile(encoded) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(encoded))));
  } catch {
    return null;
  }
}
