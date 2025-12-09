/**
 * Seeded random number generator for deterministic shuffling
 * Uses a simple LCG (Linear Congruential Generator)
 */
function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 2 ** 32;
    return state / 2 ** 32;
  };
}

/**
 * Shuffle an array deterministically using a seed
 * Uses Fisher-Yates shuffle algorithm with seeded random
 * @param array - Array to shuffle
 * @param seed - Seed for deterministic shuffling
 * @returns New shuffled array
 */
export function shuffleWithSeed<T>(array: T[], seed: number): T[] {
  const result = [...array];
  const random = seededRandom(seed);

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

/**
 * Generate a seed from a user identifier (like session ID or user ID)
 * This ensures the same user always gets the same shuffle
 * @param identifier - String identifier to convert to seed
 * @returns Numeric seed
 */
export function generateSeed(identifier: string): number {
  let hash = 0;
  for (let i = 0; i < identifier.length; i++) {
    const char = identifier.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}
