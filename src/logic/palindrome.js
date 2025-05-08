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
    return encontrarSubsecuenciaPalindromica(str);
  });

  return resultados.join('\n');
}

function encontrarSubsecuenciaPalindromica(str) {
  const n = str.length;
  if (n === 0) return '';

  // Enfoque alternativo: encontrar el palíndromo más largo que sea subcadena
  let maxLength = 1;
  let start = 0;

  // Matriz para indicar si str[i..j] es palíndromo
  const dp = Array.from({ length: n }, () => Array(n).fill(false));

  // Todas las subcadenas de longitud 1 son palíndromos
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }

  // Verificar subcadenas de longitud 2
  for (let i = 0; i < n - 1; i++) {
    if (str[i] === str[i + 1]) {
      dp[i][i + 1] = true;
      if (maxLength < 2) {
        start = i;
        maxLength = 2;
      }
    }
  }

  // Verificar subcadenas de longitud > 2
  for (let len = 3; len <= n; len++) {
    for (let i = 0; i < n - len + 1; i++) {
      const j = i + len - 1;
      if (str[i] === str[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        if (len > maxLength) {
          start = i;
          maxLength = len;
        }
      }
    }
  }

  return str.substring(start, start + maxLength);
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

// FUERZA BRUTA
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

    // Para cadenas largas, usar el enfoque dinámico directamente
    if (n > 20) {
      return encontrarPalindromoOptimo(str);
    }

    let maxLen = 0;
    let bestPalindromes = new Set();

    // Función para verificar palíndromos
    const isPalindrome = s => {
      const len = s.length;
      for (let i = 0; i < len / 2; i++) {
        if (s[i] !== s[len - 1 - i]) return false;
      }
      return true;
    };

    // Generar todas las posibles subsecuencias
    for (let mask = 1; mask < (1 << n); mask++) {
      let subsequence = '';
      for (let i = 0; i < n; i++) {
        if (mask & (1 << i)) {
          subsequence += str[i];
        }
      }

      if (isPalindrome(subsequence)) {
        if (subsequence.length > maxLen) {
          maxLen = subsequence.length;
          bestPalindromes = new Set([subsequence]);
        } else if (subsequence.length === maxLen) {
          bestPalindromes.add(subsequence);
        }
      }
    }

    // Seleccionar el palíndromo más "natural" (el que aparece primero en la cadena original)
    if (bestPalindromes.size > 0) {
      const palindromesArray = Array.from(bestPalindromes);
      // Ordenar por posición de inicio más temprana
      palindromesArray.sort((a, b) => {
        return str.indexOf(a) - str.indexOf(b);
      });
      return palindromesArray[0];
    }

    return '';
  });

  return results.join('\n');
}

// Función auxiliar optimizada para cadenas largas
function encontrarPalindromoOptimo(str) {
  const n = str.length;
  if (n === 0) return '';

  let maxLength = 1;
  let start = 0;

  // Matriz para almacenar si subcadena [i..j] es palíndromo
  const dp = Array.from({ length: n }, () => Array(n).fill(false));

  // Todas las subcadenas de longitud 1 son palíndromos
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }

  // Verificar subcadenas de longitud 2
  for (let i = 0; i < n - 1; i++) {
    if (str[i] === str[i + 1]) {
      dp[i][i + 1] = true;
      start = i;
      maxLength = 2;
    }
  }

  // Verificar subcadenas de longitud > 2
  for (let len = 3; len <= n; len++) {
    for (let i = 0; i < n - len + 1; i++) {
      const j = i + len - 1;
      if (str[i] === str[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        if (len > maxLength) {
          start = i;
          maxLength = len;
        }
      }
    }
  }

  return str.substring(start, start + maxLength);
}