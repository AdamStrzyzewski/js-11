const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './fe')));
app.use(express.urlencoded({ extended: false }));

const getId = () => uuidv4();

const books = [
  { id: getId(), name: 'Hobbit', author: 'J.R.R Tolkien', genres: 'Fantasy' },
];

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { name, author, genres } = req.body;
  if (!name) {
    return res.status(422).json({ message: 'Missing value for name' });
  }
  if (!author) {
    return res.status(422).json({ message: 'Missing value for author' });
  }
  const id = getId();
  const book = { id, name, author, genres };
  books.push(book);
  return res.status(201).json(book);
});

app.put('/books/:bookId', (req, res) => {
  const { name, author, genres } = req.body;
  const { bookId } = req.params;
  const book = books.find((el) => el.id === bookId);
  if (book) {
    book.name = name;
    book.author = author;
    book.genres = genres;
    res.json(book);
  } else {
    const book = { id: bookId, name, author, genres };
    books.push(book);
    res.status(201).json(book);
  }
});

app.delete('/books/:bookId', (req, res) => {
  const index = books.findIndex((el) => el.id === req.params.bookId);
  if (index !== -1) {
    books.splice(index, 1);
  }
  res.status(204).json();
});

app.use((req, res) => {
  res.status(404).json({ message: 'not found' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
