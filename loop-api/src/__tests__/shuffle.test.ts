import { describe, it, expect } from '@jest/globals';
import { shuffleWithSeed, generateSeed } from '../utils/shuffle';

describe('Shuffle Utility', () => {
  describe('shuffleWithSeed', () => {
    it('should shuffle array deterministically with same seed', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const seed = 12345;

      const result1 = shuffleWithSeed(array, seed);
      const result2 = shuffleWithSeed(array, seed);

      expect(result1).toEqual(result2);
    });

    it('should produce different shuffles with different seeds', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      const result1 = shuffleWithSeed(array, 12345);
      const result2 = shuffleWithSeed(array, 54321);

      expect(result1).not.toEqual(result2);
    });

    it('should not modify original array', () => {
      const array = [1, 2, 3, 4, 5];
      const original = [...array];

      shuffleWithSeed(array, 999);

      expect(array).toEqual(original);
    });

    it('should contain all original elements', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = shuffleWithSeed(array, 42);

      expect(result.sort()).toEqual(array.sort());
      expect(result.length).toBe(array.length);
    });

    it('should handle single element array', () => {
      const array = [42];
      const result = shuffleWithSeed(array, 100);

      expect(result).toEqual([42]);
    });

    it('should handle empty array', () => {
      const array: number[] = [];
      const result = shuffleWithSeed(array, 100);

      expect(result).toEqual([]);
    });

    it('should shuffle strings correctly', () => {
      const array = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
      const seed = 777;

      const result1 = shuffleWithSeed(array, seed);
      const result2 = shuffleWithSeed(array, seed);

      expect(result1).toEqual(result2);
      expect(result1.sort()).toEqual(array.sort());
    });

    it('should produce reasonably distributed shuffles', () => {
      const array = [1, 2, 3, 4, 5];
      const seeds = Array.from({ length: 100 }, (_, i) => i);
      const results = seeds.map((seed) => shuffleWithSeed(array, seed));

      // Check that not all shuffles are identical
      const uniqueResults = new Set(results.map((r) => JSON.stringify(r)));
      expect(uniqueResults.size).toBeGreaterThan(10); // Should have variety

      // Check that first element varies across shuffles
      const firstElements = results.map((r) => r[0]);
      const uniqueFirstElements = new Set(firstElements);
      expect(uniqueFirstElements.size).toBeGreaterThan(1);
    });
  });

  describe('generateSeed', () => {
    it('should generate same seed for same identifier', () => {
      const identifier = 'user123';

      const seed1 = generateSeed(identifier);
      const seed2 = generateSeed(identifier);

      expect(seed1).toBe(seed2);
    });

    it('should generate different seeds for different identifiers', () => {
      const seed1 = generateSeed('user123');
      const seed2 = generateSeed('user456');

      expect(seed1).not.toBe(seed2);
    });

    it('should generate non-negative seeds', () => {
      const identifiers = ['user1', 'session-abc-123', 'test@example.com', '12345'];

      identifiers.forEach((id) => {
        const seed = generateSeed(id);
        expect(seed).toBeGreaterThanOrEqual(0);
      });
    });

    it('should handle empty string', () => {
      const seed = generateSeed('');
      expect(typeof seed).toBe('number');
      expect(seed).toBeGreaterThanOrEqual(0);
    });

    it('should generate consistent seeds for UUID-like strings', () => {
      const uuid = '550e8400-e29b-41d4-a716-446655440000';

      const seed1 = generateSeed(uuid);
      const seed2 = generateSeed(uuid);

      expect(seed1).toBe(seed2);
    });

    it('should generate different seeds for similar identifiers', () => {
      const seed1 = generateSeed('user123');
      const seed2 = generateSeed('user124');
      const seed3 = generateSeed('user223');

      expect(seed1).not.toBe(seed2);
      expect(seed1).not.toBe(seed3);
      expect(seed2).not.toBe(seed3);
    });

    it('should handle special characters', () => {
      const identifiers = [
        'user@email.com',
        'session_id-123',
        'test#$%^&*()',
        'unicode-テスト',
      ];

      identifiers.forEach((id) => {
        const seed = generateSeed(id);
        expect(typeof seed).toBe('number');
        expect(seed).toBeGreaterThanOrEqual(0);
      });
    });

    it('should be case-sensitive', () => {
      const seed1 = generateSeed('UserID');
      const seed2 = generateSeed('userid');

      expect(seed1).not.toBe(seed2);
    });
  });

  describe('Integration: Shuffle with generateSeed', () => {
    it('should produce consistent shuffles for session IDs', () => {
      const questions = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'];
      const sessionId = 'session-abc-123';

      const seed = generateSeed(sessionId);
      const shuffle1 = shuffleWithSeed(questions, seed);
      const shuffle2 = shuffleWithSeed(questions, seed);

      expect(shuffle1).toEqual(shuffle2);
    });

    it('should produce different shuffles for different users', () => {
      const questions = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'];

      const user1Seed = generateSeed('user-001');
      const user2Seed = generateSeed('user-002');

      const user1Shuffle = shuffleWithSeed(questions, user1Seed);
      const user2Shuffle = shuffleWithSeed(questions, user2Seed);

      expect(user1Shuffle).not.toEqual(user2Shuffle);
    });

    it('should maintain shuffle across multiple calls with same session', () => {
      const questions = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'];
      const sessionId = 'persistent-session';

      const results = Array.from({ length: 10 }, () => {
        const seed = generateSeed(sessionId);
        return shuffleWithSeed(questions, seed);
      });

      // All results should be identical
      const firstResult = results[0];
      results.forEach((result) => {
        expect(result).toEqual(firstResult);
      });
    });
  });
});
