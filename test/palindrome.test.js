// palindrome.test.js
import {
  isPalindrome,
  normalizarCadena,
  dinamicPalindromeSubsequence,
  vorazPalindromeSubsequence,
  bruteForcePalindromicSubsequence
} from '../src/logic/palindrome.js';

describe('Palindrome Functions', () => {
  // Test 1: Cadena vacía
  test('should handle empty string', () => {
    const input = '';
    expect(normalizarCadena(input)).toBe('');

    // Modificamos las expectativas para las funciones que procesan múltiples líneas
    expect(dinamicPalindromeSubsequence(input)).toBe('');
    expect(vorazPalindromeSubsequence(input)).toBe('');
    expect(bruteForcePalindromicSubsequence(input)).toBe('');
  });

  // Test 2: Cadena simple (10 caracteres)
  test('should handle simple palindrome (10 chars)', () => {
    const input = 'anitalavalatina';
    const normalized = 'anitalavalatina';

    expect(normalizarCadena(input)).toBe(normalized);
    expect(dinamicPalindromeSubsequence(input)).toBe(normalized);
    expect(vorazPalindromeSubsequence(input)).toBe(normalized);
    expect(bruteForcePalindromicSubsequence(input)).toBe(normalized);
  });

  // Test 3: Cadena con caracteres especiales
  test('should handle special characters', () => {
    const input = 'Dábale arroz a la zorra el abad';
    const normalized = 'dabalearrozalazorraelabad';

    expect(normalizarCadena(input)).toBe(normalized);
    expect(dinamicPalindromeSubsequence(input)).toBe(normalized);
    expect(vorazPalindromeSubsequence(input)).toBe(normalized);
    expect(bruteForcePalindromicSubsequence(input)).toBe(normalized);
  });

  // Test 4: Cadena no palindrómica (10 caracteres)
  test('should handle non-palindromic string (10 chars)', () => {
    const input = 'abcdefghij';
    const normalized = 'abcdefghij';

    expect(normalizarCadena(input)).toBe(normalized);
    expect(dinamicPalindromeSubsequence(input)).toBe('a');
    expect(vorazPalindromeSubsequence(input)).toBe('a');
    expect(bruteForcePalindromicSubsequence(input)).toBe('a, b, c, d, e, f, g, h, i, j');
  });


  // Test 5: Cadena con múltiples líneas
  test('should handle multi-line input', () => {
    const input = `3
Dábale arroz
a la zorra
el abad`;
    const expected = 'dabalearrozalazorraelabad';
    expect(dinamicPalindromeSubsequence(input)).toBe(expected);
    expect(vorazPalindromeSubsequence(input)).toBe(expected);
    expect(bruteForcePalindromicSubsequence(input)).toBe(expected);
  });
});