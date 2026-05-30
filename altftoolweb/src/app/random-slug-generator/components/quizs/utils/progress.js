// Tracks how many DISTINCT quizzes the user has completed,
// and which reward tiers they've unlocked. Persisted in localStorage.

const KEY = "quizverse_progress";

export function getProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { completed: [] };
  } catch {
    return { completed: [] };
  }
}

export function recordCompletion(quizId) {
  const p = getProgress();
  if (!p.completed.includes(quizId)) {
    p.completed.push(quizId);
    try {
      localStorage.setItem(KEY, JSON.stringify(p));
    } catch {}
  }
  // notify listeners in the same tab
  window.dispatchEvent(new Event("quizverse:progress"));
  return p.completed.length;
}

export function completedCount() {
  return getProgress().completed.length;
}

// Reward tiers — unlock a discount coupon at each milestone.
export const REWARD_TIERS = [
  { count: 1, code: "WELCOME10", percent: 10, label: "Welcome Reward" },
  { count: 3, code: "CURIOUS15", percent: 15, label: "Curious Explorer" },
  { count: 5, code: "BRAINIAC25", percent: 25, label: "Brainiac Bonus" },
  { count: 8, code: "GENIUS35", percent: 35, label: "Genius Tier" },
  { count: 12, code: "LEGEND50", percent: 50, label: "Legend Status" },
];

// returns the highest tier the user currently qualifies for (or null)
export function currentTier(count = completedCount()) {
  let tier = null;
  for (const t of REWARD_TIERS) {
    if (count >= t.count) tier = t;
  }
  return tier;
}

// the next locked tier (for "X more to unlock" messaging)
export function nextTier(count = completedCount()) {
  return REWARD_TIERS.find((t) => count < t.count) || null;
}
