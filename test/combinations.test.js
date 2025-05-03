import { 
  getPermutations,
  getPermutationsVoraz,
  getPermutationsFuerzaBruta,
} from '../src/logic/combinations.js';

test('Permutations of 3x3 matrix with ratings', () => {
  const input1 = `2
5
0 1 0 0 0
0 0 1 0 0
0 0 0 1 0
0 0 0 0 1
0 0 0 0 0
10 30 15 5 8
6
0 0 1 0 0 0
1 0 0 0 0 0
0 1 0 0 0 0
0 0 0 1 0 0
0 0 0 0 0 1
0 0 0 0 0 0
12 21 5 10 8 7`;

  const expectedOutput1 = `1 0 0 0 0 10
0 1 0 0 0 0 21`;
  const expectedOutput2 = `0 1 0 0 1 38
0 1 0 1 1 0 39`;
  const expectedOutput3 = `0 1 0 0 1 38
0 1 0 0 1 0 29`;

  expect(getPermutations(input1)).toBe(expectedOutput1);
  expect(getPermutationsVoraz(input1)).toBe(expectedOutput2);
  expect(getPermutationsFuerzaBruta(input1)).toBe(expectedOutput3);
});

// Test for toy dataset (10 elements)
test('Permutations of 10 elements', () => {
    const input = `1
10
0 1 0 0 0 0 0 0 0 0
0 0 1 0 0 0 0 0 0 0
0 0 0 1 0 0 0 0 0 0
0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0
0 0 0 0 0 0 1 0 0 0
0 0 0 0 0 0 0 1 0 0
0 0 0 0 0 0 0 0 1 0
0 0 0 0 0 0 0 0 0 1
0 0 0 0 0 0 0 0 0 0
5 10 15 20 25 30 35 40 45 50`;

    const expectedOutput = `1 0 0 0 0 0 0 0 0 0 5`;
    const expectedOutputVoraz = `0 1 0 1 0 1 0 1 0 1 150`;
    const expectedOutputFuerzaBruta = `0 1 0 1 0 1 0 1 0 1 150`;

    expect(getPermutations(input)).toBe(expectedOutput);
    expect(getPermutationsVoraz(input)).toBe(expectedOutputVoraz);
    expect(getPermutationsFuerzaBruta(input)).toBe(expectedOutputFuerzaBruta);
});

// Test for small dataset (100 elements)
test('Permutations of 100 elements', () => {
    const input = `1
100
${Array(100).fill(0).map((_, i) => Array(100).fill(0).map((_, j) => (j === i + 1 ? 1 : 0)).join(' ')).join('\n')}
${Array(100).fill(0).map((_, i) => i + 1).join(' ')}`;

  const expectedOutput = `1 ${Array(99).fill(0).join(' ')} 1`;
  const expectedOutputVoraz = `0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 2550`;
  const expectedOutputFuerzaBruta = `0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 408`;

    expect(getPermutations(input)).toBe(expectedOutput);
    expect(getPermutationsVoraz(input)).toBe(expectedOutputVoraz);
    expect(getPermutationsFuerzaBruta(input)).toBe(expectedOutputFuerzaBruta);
});

// Test for medium dataset (1000 elements)
test('Permutations of 1000 elements', () => {
    const input = `1
1000
${Array(1000).fill(0).map((_, i) => Array(1000).fill(0).map((_, j) => (j === i + 1 ? 1 : 0)).join(' ')).join('\n')}
${Array(1000).fill(0).map((_, i) => i + 1).join(' ')}`;

    const expectedOutput = `1 ${Array(999).fill(0).join(' ')} 1`;
    const expectedOutputVoraz = `0 ${Array(999).fill(0).map((_, index) => index % 2 === 0 ? 1 : 0).join(' ')} 250500`;
    const expectedOutputFuerzaBruta = `0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 1 64128`;

    expect(getPermutations(input)).toBe(expectedOutput);
    expect(getPermutationsVoraz(input)).toBe(expectedOutputVoraz);
    expect(getPermutationsFuerzaBruta(input)).toBe(expectedOutputFuerzaBruta);
});

// Test for large dataset (10000 elements)
test('Permutations of 10000 elements', () => {
    const input = `1
10000
${Array(10000).fill(0).map((_, i) => Array(10000).fill(0).map((_, j) => (j === i + 1 ? 1 : 0)).join(' ')).join('\n')}
${Array(10000).fill(0).map((_, i) => i + 1).join(' ')}`;

    const expectedOutput = `1 ${Array(9999).fill(0).join(' ')} 1`;
    const expectedOutputVoraz = `0 ${Array(9999).fill(0).map((_, index) => index % 2 === 0 ? 1 : 0).join(' ')} 25005000`;

    expect(getPermutations(input)).toBe(expectedOutput);
    expect(getPermutationsVoraz(input)).toBe(expectedOutputVoraz);
    expect(getPermutationsFuerzaBruta(input)).toBe(expectedOutput);
});
