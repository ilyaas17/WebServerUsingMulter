import express from 'express';
import multer from 'multer';
import storage from './multer/multer.mjs';

const app = express();
const port = 8080;

const upload = multer({ storage });

app.use('/files', express.static('uploads'));

app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.send(`File uploaded successfully! Download it <a href="/files/${req.file.filename}">here</a>.`);
  } else {
    res.status(400).send('No file uploaded.');
  }
});

app.get('/', (req, res) => {
  res.send(`
    <h1>File Upload</h1>
    <form ref='uploadForm' 
      id='uploadForm' 
      action='/upload' 
      method='post' 
      encType="multipart/form-data">
        <input type="file" name="file" />
        <input type='submit' value='Upload!' />
    </form>
  `);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
