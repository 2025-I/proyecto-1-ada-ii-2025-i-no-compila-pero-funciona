function parseInput(inputString) {
  const data = inputString.split('\n').filter((line) => line.trim() !== '');
  let idx = 0;
  const n = parseInt(data[idx++]);
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

// Solucion al problema - Dinamica
export function getPermutations(inputString) {
  const problems = parseInput(inputString);
  const output = [];

  // Resolver y guardar resultado
  for (const { m, matrix, ratings } of problems) {
    const { selected, sum } = solveProblem(m, matrix, ratings);
    output.push(`${selected.join(' ')} ${sum}`);

  }

  // Función para construir el árbol desde la matriz
  function buildTree(m, matrix, ratings) {
    const nodes = Array.from({ length: m }, (_, id) => ({
      id,
      parent: -1,
      children: [],
      rating: ratings[id],
      include: 0,
      exclude: 0,
    }));

    // Encontrar padres y construir hijos
    for (let j = 0; j < m; j++) {
      for (let i = 0; i < m; i++) {
        if (matrix[i][j] === 1) {
          nodes[j].parent = i;
          nodes[i].children.push(j);
          break; // Asume un solo padre
        }
      }

      // Encontrar la raíz (nodo sin padre)
      const root = nodes.find((node) => node.parent === -1);
      return { nodes, root };
    }
  }

  // Recorrido postorden para calcular include y exclude
  function calculateDP(nodes, nodeId) {
    const node = nodes[nodeId];
    node.include = node.rating;
    node.exclude = 0;

    for (const childId of node.children) {
      calculateDP(nodes, childId);
      const child = nodes[childId];
      node.include += child.exclude;
      node.exclude += Math.max(child.include, child.exclude);
    }
  }

  // Seleccionar nodos óptimos
  function selectNodes(nodes, nodeId, parentIncluded, selected) {
    const node = nodes[nodeId];
    if (parentIncluded) {
      selected[node.id] = 0;
      node.children.forEach((childId) => selectNodes(nodes, childId, true, selected));
    } else {
      if (node.include > node.exclude) {
        selected[node.id] = 1;
        node.children.forEach((childId) => selectNodes(nodes, childId, true, selected));
      } else {
        if (node.include > node.exclude) {
          selected[node.id] = 1;
          node.children.forEach((childId) => selectNodes(nodes, childId, true, selected));
        } else {
          if (node.include > node.exclude) {
            selected[node.id] = 1;
            node.children.forEach((childId) => selectNodes(nodes, childId, true, selected));
          } else {
            selected[node.id] = 0;
            node.children.forEach((childId) => selectNodes(nodes, childId, false, selected));
          }
        }
      }
    }
  }

  // Resolver un problema
  function solveProblem(m, matrix, ratings) {
    const { nodes, root } = buildTree(m, matrix, ratings);
    if (!root) return { selected: Array(m).fill(0), sum: 0 };

    calculateDP(nodes, root.id);
    const selected = Array(m).fill(0);
    selectNodes(nodes, root.id, false, selected);

    const sum = nodes.reduce((acc, node, idx) => acc + (selected[idx] ? node.rating : 0), 0);
    return { selected, sum };
  }

  return output.join('\n');
}

// Solucion al problema - Voraz
export function getPermutationsVoraz (inputString) {
  const problems = parseInput(inputString);
  const output = [];

  for (const { m, matrix, ratings } of problems) {
    // Crear lista de empleados con sus índices y ratings
    const employees = ratings.map((rating, idx) => ({ idx, rating }));
        
    // Ordenar por rating descendente
    employees.sort((a, b) => b.rating - a.rating);

    const invited = new Set();
    const forbidden = new Set(); // Empleados que no pueden ser invitados
    let sum = 0;

    for (const emp of employees) {
      if (!forbidden.has(emp.idx)) {
        invited.add(emp.idx);
        sum += emp.rating;
                
        // Marcar supervisores y subordinados como prohibidos
        for (let i = 0; i < m; i++) {
          if (matrix[emp.idx][i] === 1 || matrix[i][emp.idx] === 1) {
            forbidden.add(i);
          }
        }
      }
    }

    // Formatear salida
    output.push(formatOutput(m, Array.from(invited), sum));
  }
  return output.join('\n');
}

// Solucion al problema - Fuerza Bruta
export function getPermutationsFuerzaBruta(inputString) {
  const problems = parseInput(inputString);
  const output = [];

  for (const { m, matrix, ratings } of problems) {
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
          subset.push(i);
          sum += ratings[i];
                
          // Verificar si algún supervisor está también en el subset
          for (let j = 0; j < m; j++) {
            if (matrix[j][i] === 1 && (mask & (1 << j))) {
              isValid = false;
              break;
            }
          }
          if (!isValid) break;
        }
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
