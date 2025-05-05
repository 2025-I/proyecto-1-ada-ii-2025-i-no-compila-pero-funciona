export function isPalindrome(str) {
  const normalized = normalizarCadena(str);
  return dinamicPalindromeSubsequence(normalized);
}

export function normalizarCadena(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

// DINAMICA
export function dinamicPalindromeSubsequence(fileContent) {
  const lines = fileContent
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '' && !/^\d+$/.test(line));

  if (lines.length === 0) return '';

  const resultados = lines.map((line) => {
    const str = normalizarCadena(line);
    return palindromoDinamicoPorCadena(str);
  });

  return resultados.join('\n');
}

function palindromoDinamicoPorCadena(str) {
  const n = str.length;
  if (n === 0) return '';

  // Matriz para almacenar los resultados de subproblemas
  const dp = Array.from({ length: n }, () => Array(n).fill(''));

  // Cada carácter individual es un palíndromo de longitud 1
  for (let i = 0; i < n; i++) {
    dp[i][i] = str[i];
  }

  // Llenamos la matriz para subcadenas de longitud 2 a n
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      if (str[i] === str[j]) {
        dp[i][j] = str[i] + dp[i + 1][j - 1] + str[j];
      } else {
        dp[i][j] = dp[i + 1][j].length > dp[i][j - 1].length
          ? dp[i + 1][j]
          : dp[i][j - 1];
      }
    }
  }

  return dp[0][n - 1];
}
// VORAZ
export function vorazPalindromeSubsequence(inputString) {
  const lines = inputString
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '' && !/^\d+$/.test(line));

  if (lines.length === 0) return '';

  const resultados = lines.map((line) => {
    const str = normalizarCadena(line);
    return encontrarMejorPalindromo(str);
  });

  return resultados.join('\n');
}

function encontrarMejorPalindromo(str) {
  if (str.length === 0) return '';

  // 1. Encontrar todos los posibles palíndromos centrales
  const palindromosCentrales = [];
  for (let i = 0; i < str.length; i++) {
    // Palíndromos con centro impar
    expandirDesdeCentro(str, i, i, palindromosCentrales);
    // Palíndromos con centro par
    expandirDesdeCentro(str, i, i + 1, palindromosCentrales);
  }

  // 2. Seleccionar el palíndromo más largo
  if (palindromosCentrales.length === 0) return str[0] || '';

  // Ordenar por longitud descendente y posición ascendente
  palindromosCentrales.sort((a, b) =>
    b.length - a.length || a.start - b.start
  );

  const mejorPalindromo = palindromosCentrales[0];
  return str.substring(mejorPalindromo.start, mejorPalindromo.end + 1);
}

function expandirDesdeCentro(str, left, right, resultados) {
  while (left >= 0 && right < str.length && str[left] === str[right]) {
    resultados.push({
      start: left,
      end: right,
      length: right - left + 1
    });
    left--;
    right++;
  }
}
//  FUERZA BRUTA
export function bruteForcePalindromicSubsequence(inputString) {
  const lines = inputString
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line !== '' && !/^\d+$/.test(line));

  if (lines.length === 0) return '';

  const results = lines.map((line) => {
    const str = normalizarCadena(line);
    const n = str.length;
    if (n === 0) return '';

    // Límite para fuerza bruta
    if (n > 25) {
      return encontrarPalindromoOptimo(str); // Función para cadenas largas
    }

    let maxLen = 0;
    const resultSet = new Set();

    function isPalindrome(s) {
      if (s.length <= 1) return true;
      let left = 0;
      let right = s.length - 1;
      while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
      }
      return true;
    }

    // Generamos subsecuencias de mayor a menor longitud
    for (let len = n; len >= 1; len--) {
      if (len < maxLen) break; // No buscar más cortas que el máximo encontrado

      const indices = Array(len).fill(0).map((_, i) => i);

      while (true) {
        const subsequence = indices.map(i => str[i]).join('');
        if (isPalindrome(subsequence)) {
          if (subsequence.length > maxLen) {
            maxLen = subsequence.length;
            resultSet.clear();
            resultSet.add(subsequence);
          } else if (subsequence.length === maxLen) {
            resultSet.add(subsequence);
          }
        }

        // Generar siguiente combinación
        let i = len - 1;
        while (i >= 0 && indices[i] === i + n - len) {
          i--;
        }
        if (i < 0) break;
        indices[i]++;
        for (let j = i + 1; j < len; j++) {
          indices[j] = indices[j - 1] + 1;
        }
      }

      if (maxLen === n) break; // Si encontramos el máximo posible
    }

    return [...resultSet].sort().join(', ');
  });

  return results.join('\n');
}

// Función auxiliar para cadenas largas (usa enfoque dinámico como fallback)
function encontrarPalindromoOptimo(str) {
  // Implementación simplificada - en realidad deberías usar tu función dinámica
  const n = str.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(''));

  for (let i = 0; i < n; i++) {
    dp[i][i] = str[i];
  }

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      if (str[i] === str[j]) {
        dp[i][j] = str[i] + dp[i + 1][j - 1] + str[j];
      } else {
        dp[i][j] = dp[i + 1][j].length > dp[i][j - 1].length
          ? dp[i + 1][j]
          : dp[i][j - 1];
      }
    }
  }

  return dp[0][n - 1];
}