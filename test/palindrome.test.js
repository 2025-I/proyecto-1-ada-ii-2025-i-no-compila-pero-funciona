import {
  dinamicPalindromeSubsequence,
  vorazPalindromeSubsequence,
  bruteForcePalindromicSubsequence,
} from '../src/logic/palindrome.js';

describe('Pruebas de algoritmos de palíndromos', () => {
  // Función auxiliar para generar cadenas de prueba
  const generarCadena = (longitud, patron) => {
    let result = '';
    for (let i = 0; i < longitud; i++) {
      result += patron[i % patron.length];
    }
    return result;
  };

  // 1. Prueba Juguete (10 elementos)

  describe('Prueba Juguete (10 elementos)', () => {
    const input = `1
  anitalava`;
    const expectedDinamico = 'ala';      // Subsecuencia más larga
    const expectedVoraz = 'ala';         // Subsecuencia voraz
    const expectedFuerzaBruta = 'aalaa'; // Otra subsecuencia válida

    test('Algoritmo Dinámico', () => {
      const result = dinamicPalindromeSubsequence(input);
      expect(result).toBe(expectedDinamico);
      expect(esPalindromo(result)).toBe(true);
    });

    test('Algoritmo Voraz', () => {
      const result = vorazPalindromeSubsequence(input);
      expect(result).toBe(expectedVoraz);
      expect(esPalindromo(result)).toBe(true);
    });

    test('Algoritmo Fuerza Bruta', () => {
      const result = bruteForcePalindromicSubsequence(input);
      // Puede haber múltiples soluciones válidas
      expect(esPalindromo(result)).toBe(true);
      expect(result.length).toBe(expectedFuerzaBruta.length);
    });
  });

// Función auxiliar para verificar palíndromos
  function esPalindromo(str) {
    return str === str.split('').reverse().join('');
  }

  // 2. Prueba Pequeña (100 elementos) - Versión corregida
  describe('Prueba Pequeña (100 elementos)', () => {
    // Cambiamos el patrón para facilitar palíndromos contiguos
    const patron = 'abba'; // Este patrón genera mejores palíndromos contiguos
    const cadena = generarCadena(100, patron);
    const input = `1\n${cadena}`;

    // Calculamos la longitud máxima teórica para subcadenas contiguas
    const longitudMaxTeorica = 4; // "abba" o "baab" son los máximos posibles con este patrón

    test('Algoritmo Dinámico', () => {
      const result = dinamicPalindromeSubsequence(input);
      console.log('Dinámico:', result);

      expect(esPalindromo(result)).toBe(true);
      expect(esSubcadenaContigua(cadena, result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(2); // Mínimo 2 caracteres
    });

    test('Algoritmo Voraz', () => {
      const result = vorazPalindromeSubsequence(input);
      console.log('Voraz:', result);

      expect(esPalindromo(result)).toBe(true);
      expect(esSubcadenaContigua(cadena, result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(2);
    });

    test('Algoritmo Fuerza Bruta (subsecuencia)', () => {
      const result = bruteForcePalindromicSubsequence(input);
      console.log('Fuerza Bruta:', result);

      expect(esPalindromo(result)).toBe(true);
      expect(esSubsecuencia(cadena, result)).toBe(true);

      // Para fuerza bruta, esperamos que encuentre una subsecuencia más larga
      expect(result.length).toBeGreaterThanOrEqual(longitudMaxTeorica);

      // Con este patrón específico, toda la cadena es palíndromo como subsecuencia
      expect(result.length).toBe(cadena.length);
    }, 30000);

    // Función auxiliar para verificar subcadenas contiguas
    function esSubcadenaContigua(original, subcadena) {
      return original.includes(subcadena);
    }

    // Función auxiliar para verificar subsecuencias
    function esSubsecuencia(original, subsecuencia) {
      let index = 0;
      for (let char of original) {
        if (char === subsecuencia[index]) {
          index++;
          if (index === subsecuencia.length) break;
        }
      }
      return index === subsecuencia.length;
    }
  });

  // 3. Prueba Mediana (1000 elementos) - Versión optimizada
  describe('Prueba Mediana (1000 elementos)', () => {
    // Cambiamos el patrón para garantizar palíndromos contiguos detectables
    const patron = 'abcba'; // Este patrón contiene el palíndromo "abcba"
    const cadena = generarCadena(1000, patron);
    const input = `1\n${cadena}`;

    // Longitud mínima esperada para palíndromos contiguos
    const longitudMinimaEsperada = 5; // "abcba" tiene 5 caracteres

    test('Algoritmo Dinámico', () => {
      const result = dinamicPalindromeSubsequence(input);
      console.log('Dinámico (1000 elementos):', result);

      expect(esPalindromo(result)).toBe(true);
      expect(esSubcadenaContigua(cadena, result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(longitudMinimaEsperada);
      expect(result).toEqual(expect.stringMatching(/^[abcde]+$/));
    });

    test('Algoritmo Voraz', () => {
      const result = vorazPalindromeSubsequence(input);
      console.log('Voraz (1000 elementos):', result);

      expect(esPalindromo(result)).toBe(true);
      expect(esSubcadenaContigua(cadena, result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(longitudMinimaEsperada);
      expect(result).toEqual(expect.stringMatching(/^[abcde]+$/));
    });

    test('Algoritmo Fuerza Bruta [muy lento]', () => {
      // Solo verificar que no falle para cadenas largas
      expect(() => bruteForcePalindromicSubsequence(input)).not.toThrow();
    }, 30000); // Timeout muy largo

    // Función auxiliar para verificar subcadenas contiguas
    function esSubcadenaContigua(original, subcadena) {
      return original.includes(subcadena);
    }
  });
// 4. prueba grande
  describe('Prueba Grande (10000 elementos) con patrón abcdedcba', () => {
    // Patrón que contiene un palíndromo de 8 caracteres
    const patron = 'abcdedcba';
    const cadena = generarCadena(10000, patron);
    const input = `1\n${cadena}`;

    // El palíndromo completo que esperamos encontrar
    const PALINDROMO_COMPLETO = 'abcdedcba';
    const LONGITUD_PALINDROMO = 8;

    test('Algoritmo Dinámico', () => {
      const result = dinamicPalindromeSubsequence(input);

      console.log(`Dinámico encontró: ${result}`);

      // Verificaciones básicas
      expect(esPalindromo(result)).toBe(true);
      expect(esSubcadenaContigua(cadena, result)).toBe(true);

      // Debería encontrar al menos un palíndromo completo
      expect(result.length).toBe(LONGITUD_PALINDROMO);
      expect(result).toBe(PALINDROMO_COMPLETO);
    });

    test('Algoritmo Voraz', () => {
      const result = vorazPalindromeSubsequence(input);

      console.log(`Voraz encontró: ${result}`);

      expect(esPalindromo(result)).toBe(true);
      expect(esSubcadenaContigua(cadena, result)).toBe(true);

      // Voraz también debería encontrar el palíndromo completo
      expect(result.length).toBe(LONGITUD_PALINDROMO);
      expect(result).toBe(PALINDROMO_COMPLETO);
    });

    test('Algoritmo Fuerza Bruta', () => {
      // Para cadenas tan grandes, fuerza bruta no es práctico
      const result = bruteForcePalindromicSubsequence(input);

      // Solo verificamos que no falle
      expect(() => bruteForcePalindromicSubsequence(input)).not.toThrow();
    });

    // Funciones auxiliares
    function esPalindromo(str) {
      const len = str.length;
      for (let i = 0; i < len / 2; i++) {
        if (str[i] !== str[len - 1 - i]) return false;
      }
      return true;
    }

    function esSubcadenaContigua(original, subcadena) {
      return original.includes(subcadena);
    }
  });

  // 5. Prueba Extra Grande (50000 elementos)
  describe('Prueba Extra Grande (50000 elementos)', () => {
    const patron = 'xyz12';
    const input = `1\n${generarCadena(50000, patron)}`;

    test('Algoritmo Dinámico', () => {
      const result = dinamicPalindromeSubsequence(input);
      expect(result.length).toBeGreaterThanOrEqual(10);
      expect(result).toEqual(expect.stringMatching(/^[xyz12]+$/));
    });

    test('Algoritmo Voraz', () => {
      const result = vorazPalindromeSubsequence(input);
      expect(result.length).toBeGreaterThanOrEqual(10);
      expect(result).toEqual(expect.stringMatching(/^[xyz12]+$/));
    });

    test('Fuerza Bruta no debe ejecutarse para este tamaño', () => {
      const result = bruteForcePalindromicSubsequence(input);
      expect(result).toBe('Cadena muy larga para aplicar fuerza bruta');
    });
  });

  // Prueba adicional con palíndromo conocido
  describe('Prueba con palíndromo conocido', () => {
    const input = `1\nDábale arroz a la zorra el abad`;
    const expected = 'dabalearrozalazorraelabad';

    test('Todos los algoritmos deben coincidir', () => {
      expect(dinamicPalindromeSubsequence(input)).toBe(expected);
      expect(vorazPalindromeSubsequence(input)).toBe(expected);
      expect(bruteForcePalindromicSubsequence(input)).toBe(expected);
    });
  });
});