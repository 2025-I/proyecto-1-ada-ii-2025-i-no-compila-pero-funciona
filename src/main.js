import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  getPermutations,
  getPermutationsVoraz,
  getPermutationsFuerzaBruta,
} from './logic/combinations.js';
import {
  bruteForcePalindromicSubsequence,
  dinamicPalindromeSubsequence,
  vorazPalindromeSubsequence,
} from './logic/palindrome.js';
import { get } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.static(path.join(rootDir, 'public')));

app.post('/upload', upload.array('archivos'), (req, res) => {
  try {
    const problema = req.body.problema;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No se recibieron archivos.' });
    }

    const resultados = req.files.map((file) => {
      const content = file.buffer.toString('utf-8');
      let resultado;

      switch (problema) {
        case '1':
          console.log('IsPalindrome Dinamica: Contenido del archivo:', content);
          resultado = dinamicPalindromeSubsequence(content);
          break;
        case '2':
          console.log('IsPalindrome Voraz: Contenido del archivo:', content);
          resultado = vorazPalindromeSubsequence(content);
          break;
        case '3':
          console.log('IsPalindrome Fuerza Bruta: Contenido del archivo:', content);
          resultado = bruteForcePalindromicSubsequence(content);
          break;
        case '4':
          resultado = getPermutations(content);
          break;
        case '5':
          resultado = getPermutationsVoraz(content);
          break;
        case '6':
          resultado = getPermutationsFuerzaBruta(content);
          break;
        default:
          throw new Error('Problema no válido');
      }

      return {
        archivo: file.originalname,
        resultado: Array.isArray(resultado) ? resultado : [resultado],
      };
    });

    res.json({ resultado: resultados });
  } catch (err) {
    res.status(500).json({ error: 'Error procesando archivos: ' + err.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
