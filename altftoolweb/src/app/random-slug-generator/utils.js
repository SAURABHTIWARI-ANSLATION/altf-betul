/**
 * Random Pages Utility Functions
 * All redirect logic is separated here from UI.
 */

/** Validate a URL string is parseable and uses http/https */
export function isValidUrl(urlString) {
  try {
    const u = new URL(urlString);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

/** Get one random active item from a category pool */
export function getRandomItem(categoryKey, config) {
  const cat = config[categoryKey];
  if (!cat || !Array.isArray(cat.items)) {
    return { error: 'Category not found.', item: null };
  }
  const active = cat.items.filter(i => i.active && i.url && isValidUrl(i.url));
  if (active.length === 0) {
    return { error: 'No active URLs in this category.', item: null };
  }
  const item = active[Math.floor(Math.random() * active.length)];
  return { error: null, item };
}

/** Weighted random category selector */
export function getWeightedRandomCategory(config) {
  const entries = Object.entries(config);
  const total = entries.reduce((sum, [, cat]) => sum + (cat.weight || 1), 0);
  let rand = Math.random() * total;
  for (const [key, cat] of entries) {
    rand -= cat.weight || 1;
    if (rand <= 0) return key;
  }
  return entries[0][0];
}

/** Safe redirect with validation. Returns error string or null. */
export function safeRedirect(url, newTab = false) {
  if (!isValidUrl(url)) return 'Invalid or unsafe URL.';
  if (newTab) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    window.location.href = url;
  }
  return null;
}

/** Copy text to clipboard, returns promise */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** Format a countdown from a date string into { days, hours, mins, secs } */
export function getCountdown(expiresDateString) {
  const diff = new Date(expiresDateString).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  const secs  = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs };
}
