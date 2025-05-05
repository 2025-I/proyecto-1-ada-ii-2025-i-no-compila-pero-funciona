function parseInput(inputString) {
  const data = inputString.split('\n').filter((line) => line.trim() !== '');
  let idx = 0;
  
  // Agregar manejo de errores
  if (data.length === 0) return [];
  
  const n = parseInt(data[idx++]);
  if (isNaN(n) || n <= 0) return [];

  const problems = [];

  for (let i = 0; i < n; i++) {
    const m = parseInt(data[idx++]);
    const matrix = [];

    // Leer matriz de supervisión
    for (let j = 0; j < m; j++) {
      matrix.push(data[idx++].split(' ').map(Number));
    }

    // Leer ratings
    const ratings = data[idx++].split(' ').map(Number);
    
    problems.push({ m, matrix, ratings });
  }
  
  return problems;
}

function formatOutput(m, bestSubset, maxSum) {
  const result = Array(m).fill(0);
  bestSubset.forEach(emp => result[emp] = 1);
  return `${result.join(' ')} ${maxSum}`;
}

// Solución al problema - Dinámica
export function getPermutations(inputString) {
  const problems = parseInput(inputString);
  const output = [];

  // Resolver y guardar resultado
  for (const { m, matrix, ratings } of problems) {
    const result = solveWithGraph(m, matrix, ratings);
    output.push(formatOutput(m, result.bestSubset, result.maxSum));
  }

  function solveWithGraph(m, matrix, ratings) {
    // Identificar auto-supervisión
    const selfSupervision = new Set();
    // Identificar empleados que no supervisan a nadie (fila de ceros)
    const doesntSuperviseAnyone = new Set();
    
    for (let i = 0; i < m; i++) {
      if (matrix[i][i] === 1) {
        selfSupervision.add(i);
      }
      
      // Verificar si este empleado no supervisa a nadie
      let supervisesSomeone = false;
      for (let j = 0; j < m; j++) {
        if (matrix[i][j] === 1) {
          supervisesSomeone = true;
          break;
        }
      }
      
      if (!supervisesSomeone) {
        doesntSuperviseAnyone.add(i);
      }
    }
    
    // Usar enfoque de programación dinámica con máscara de bits
    const totalStates = 1 << m;
    const dp = new Array(totalStates).fill(-1); // -1 significa que aún no se ha calculado
    
    // Obtener la calificación máxima para un subconjunto específico de empleados
    function getMaskValue(mask) {
      if (dp[mask] !== -1) return dp[mask];
      
      // Verificar si esta máscara es válida (sin empleados en conflicto)
      for (let i = 0; i < m; i++) {
        if (!(mask & (1 << i))) continue; // Saltar si el empleado i no está en el subconjunto
        
        // Verificar auto-supervisión
        if (selfSupervision.has(i)) {
          dp[mask] = -Infinity; // Estado no válido
          return dp[mask];
        }
        
        for (let j = i+1; j < m; j++) {
          if (!(mask & (1 << j))) continue; // Saltar si el empleado j no está en el subconjunto
          
          // CASO ESPECIAL: Si alguno de los empleados no supervisa a nadie, ignorar la regla de conflicto
          if (doesntSuperviseAnyone.has(i) || doesntSuperviseAnyone.has(j)) {
            continue;
          }
          
          // Verificar conflicto entre supervisor-subordinado para empleados que sí supervisan
          if (matrix[i][j] === 1 || matrix[j][i] === 1) {
            dp[mask] = -Infinity; // Estado no válido
            return dp[mask];
          }
        }
      }
      
      // Calcular la suma de calificaciones para esta máscara válida
      let sum = 0;
      for (let i = 0; i < m; i++) {
        if (mask & (1 << i)) {
          sum += ratings[i];
        }
      }
      
      dp[mask] = sum;
      return sum;
    }
    
    // Calcular el valor para todas las máscaras posibles
    for (let mask = 0; mask < totalStates; mask++) {
      getMaskValue(mask);
    }
    
    // Encontrar la máscara con el valor máximo
    let maxValue = 0;
    let optimalMask = 0;
    
    for (let mask = 0; mask < totalStates; mask++) {
      if (dp[mask] > maxValue) {
        maxValue = dp[mask];
        optimalMask = mask;
      }
    }
    
    // Convertir máscara a subconjunto
    const bestSubset = [];
    for (let i = 0; i < m; i++) {
      if (optimalMask & (1 << i)) {
        bestSubset.push(i);
      }
    }
    
    return { bestSubset, maxSum: maxValue };
  }

  return output.join('\n');
}

// Solución al problema - Voraz
export function getPermutationsVoraz(inputString) {
  const problems = parseInput(inputString);
  const output = [];

  for (const { m, matrix, ratings } of problems) {
    // Crear lista de empleados con sus índices y ratings
    const employees = ratings.map((rating, idx) => ({ idx, rating }));
    
    // Verificar primero auto-supervisión y excluir esos empleados
    const selfSupervising = new Set();
    for (let i = 0; i < m; i++) {
      if (matrix[i][i] === 1) {
        selfSupervising.add(i);
      }
    }
    
    // Ordenar por rating descendente
    employees.sort((a, b) => b.rating - a.rating);

    const invited = new Set();
    const forbidden = new Set(selfSupervising); // Comenzar con los auto-supervisores como prohibidos
    let sum = 0;

    for (const emp of employees) {
      // Saltar si ya está prohibido
      if (forbidden.has(emp.idx)) continue;
      
      invited.add(emp.idx);
      sum += emp.rating;
      
      // Marcar empleados relacionados como prohibidos
      for (let i = 0; i < m; i++) {
        if (matrix[emp.idx][i] === 1 || matrix[i][emp.idx] === 1) {
          forbidden.add(i);
        }
      }
    }

    // Formatear salida
    output.push(formatOutput(m, Array.from(invited), sum));
  }
  return output.join('\n');
}

// Solución al problema - Fuerza Bruta
export function getPermutationsFuerzaBruta(inputString) {
  const problems = parseInput(inputString);
  const output = [];

  for (const { m, matrix, ratings } of problems) {
    // Verificar primero auto-supervisión
    const selfSupervising = new Set();
    for (let i = 0; i < m; i++) {
      if (matrix[i][i] === 1) {
        selfSupervising.add(i);
      }
    }
    
    // Generar todos los subconjuntos posibles
    let maxSum = 0;
    let bestSubset = [];
    const totalSubsets = 1 << m; // 2^m

    for (let mask = 0; mask < totalSubsets; mask++) {
      const subset = [];
      let isValid = true;
      let sum = 0;

      // Verificar restricciones y calcular suma
      for (let i = 0; i < m; i++) {
        if (mask & (1 << i)) {
          // Saltar empleados con auto-supervisión
          if (selfSupervising.has(i)) {
            isValid = false;
            break;
          }
          subset.push(i);
          sum += ratings[i];
        }
      }
      
      if (!isValid) continue;
      
      // Segunda pasada: validar que no haya pares supervisor-subordinado
      for (const i of subset) {
        for (const j of subset) {
          if (i !== j && (matrix[i][j] === 1 || matrix[j][i] === 1)) {
            isValid = false;
            break;
          }
        }
        if (!isValid) break;
      }

      if (isValid && sum > maxSum) {
        maxSum = sum;
        bestSubset = subset;
      }
    }

    // Formatear salida
    output.push(formatOutput(m, bestSubset, maxSum));
  }
  return output.join('\n');
}
