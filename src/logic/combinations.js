export function getPermutations(inputString) {
  const data = inputString.split('\n').filter((line) => line.trim() !== '');
  let idx = 0;
  const n = parseInt(data[idx++]);
  const output = [];

  for (let i = 0; i < n; i++) {
    const m = parseInt(data[idx++]);
    const matrix = [];

    // Leer matriz de supervisión
    for (let j = 0; j < m; j++) {
      matrix.push(data[idx++].split(' ').map(Number));
    }

    // Leer ratings
    const ratings = data[idx++].split(' ').map(Number);

    // Resolver y guardar resultado
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
