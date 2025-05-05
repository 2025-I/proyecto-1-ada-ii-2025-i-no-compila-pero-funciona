import { 
  getPermutations,
  getPermutationsVoraz,
  getPermutationsFuerzaBruta,
} from '../src/logic/combinations.js';

import fs from "fs";
import path from "path";

// Lee el archivo de prueba y lo retorna como string
function parserString(nombreArchivo) {
  const ruta = path.join(__dirname, "data", nombreArchivo);
  const contenido = fs.readFileSync(ruta, "utf8").trimEnd();
  return contenido;
}


// Test for 3x3 matrix with ratings
test('Permutations of 3x3 matrix with ratings', () => {
  const input1 = `2
5
0 1 0 0 0
0 0 1 0 0
0 0 0 1 0
0 0 0 0 1
1 0 0 0 0
10 30 15 5 8
6
0 0 1 0 0 0
1 0 0 0 0 0
0 1 0 0 0 0
0 0 0 1 0 0
0 0 0 0 0 1
0 0 0 0 0 0
12 21 5 10 8 7`;

  const expectedOutput1 = `0 1 0 0 1 38
0 1 0 0 1 0 29`;
  const expectedOutput2 = `0 1 0 0 1 38
0 1 0 0 1 0 29`;
  const expectedOutput3 = `0 1 0 0 1 38
0 1 0 0 1 0 29`;

  expect(getPermutations(input1)).toBe(expectedOutput1);
  expect(getPermutationsVoraz(input1)).toBe(expectedOutput2);
  expect(getPermutationsFuerzaBruta(input1)).toBe(expectedOutput3);
});

// Test for toy dataset (10 elements)
test('Permutations of 10 elements', () => {
    const input = parserString("test_10_elementos.txt");

    const expectedOutput = '1 0 1 20';
    const expectedOutputVoraz = '1 0 1 20';
    const expectedOutputFuerzaBruta = '1 0 1 20';

    expect(getPermutations(input)).toBe(expectedOutput);
    expect(getPermutationsVoraz(input)).toBe(expectedOutputVoraz);
    expect(getPermutationsFuerzaBruta(input)).toBe(expectedOutputFuerzaBruta);
});

// Test for small dataset (100 elements)
test('Permutations of 100 elements', () => {
  const input = parserString("test_100_elementos.txt");

  const expectedOutput = '0 1 0 1 0 1 0 1 0 1 150';
  const expectedOutputVoraz = '0 1 0 1 0 1 0 1 0 1 150';
  const expectedOutputFuerzaBruta = '0 1 0 1 0 1 0 1 0 1 150';

  expect(getPermutations(input)).toBe(expectedOutput);
  expect(getPermutationsVoraz(input)).toBe(expectedOutputVoraz);
  expect(getPermutationsFuerzaBruta(input)).toBe(expectedOutputFuerzaBruta);
});

// Test for medium dataset (1000 elements)
test('Permutations of 1000 elements', () => {
    const input = parserString("test_1000_elementos.txt");

    const expectedOutput = '1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 5';
    const expectedOutputVoraz = '0 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 1275';
    const expectedOutputFuerzaBruta = '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0';

    // expect(getPermutations(input)).toBe(expectedOutput);
    expect(getPermutationsVoraz(input)).toBe(expectedOutputVoraz);
    expect(getPermutationsFuerzaBruta(input)).toBe(expectedOutputFuerzaBruta);
});

// Test for large dataset (10000 elements)
test('Permutations of 10000 elements', () => {
  const input = parserString("test_10000_elementos.txt");

  const expectedOutput = '0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 2040';
  const expectedOutputVoraz = '0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 12750';
  const expectedOutputFuerzaBruta = '0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 2040';

  expect(getPermutations(input)).toBe(expectedOutput);
  expect(getPermutationsVoraz(input)).toBe(expectedOutputVoraz);
  expect(getPermutationsFuerzaBruta(input)).toBe(expectedOutputFuerzaBruta);
});

// Test for extra large dataset (50000 elements)
test('Permutations of 50000 elements', () => {
  const input = parserString("test_50000_elementos.txt");

  const expectedOutput = '1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 5';
  const expectedOutputVoraz = '1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 62720';
  const expectedOutputFuerzaBruta = '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0';

  //expect(getPermutations(input)).toBe(expectedOutput);
  expect(getPermutationsVoraz(input)).toBe(expectedOutputVoraz);
  expect(getPermutationsFuerzaBruta(input)).toBe(expectedOutputFuerzaBruta);
});