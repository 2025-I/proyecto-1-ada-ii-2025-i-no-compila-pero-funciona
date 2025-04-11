import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { isPalindrome } from './logic/palindrome.js';
import { getPermutations } from './logic/combinations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.static(path.join(rootDir, 'public')));

app.post('/upload', upload.single('archivo'), (req, res) => {
  try {
    const problema = req.body.problema;

    const content = req.file.buffer.toString('utf-8');
    let resultado;

    if (problema === '1') {
      console.log('IsPalindrome: Contenido del archivo:', content);
      resultado = isPalindrome(content);
    } else if (problema === '2') {
      console.log('Fiesta: Contenido del archivo:', content);
      resultado = getPermutations(content);
    } else {
      return res.status(400).json({ error: 'Problema no válido' });
    }

    res.json({ resultado });
  } catch (err) {
    res.status(500).json({ error: 'Error procesando el archivo: ' + err.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
