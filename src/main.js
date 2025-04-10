import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { isPalindrome } from './logic/palindrome.js';
import { getPermutations } from './logic/combinations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');

const app = express();
const upload = multer({ dest: path.join(rootDir, 'uploads/') });

app.use(express.static(path.join(rootDir, 'public')));

app.post('/upload', upload.single('archivo'), (req, res) => {
  try {
    const problema = req.body.problema;
    const filePath = req.file.path;
    const content = fs.readFileSync(filePath, 'utf-8');
    let resultado;

    if (problema === '1') {
      console.log('Contenido del archivo:', content); // Debugging
      resultado = isPalindrome(content);
    } else if (problema === '2') {
      console.log('Contenido del archivo:', content); // Debugging
      resultado = getPermutations(content);
    } else {
      return res.status(400).json({ error: 'Problema no válido' });
    }

    fs.unlinkSync(filePath); // Limpieza del archivo temporal
    res.json({ resultado: 'esta por venir' });
  } catch (err) {
    res.status(500).json({ error: 'Error procesando el archivo: ' + err.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
