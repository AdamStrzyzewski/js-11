function showLoader() {
  loadIcon.classList.add('visible');
}
function hideLoader() {
  loadIcon.classList.remove('visible');
}

function createNoRowsMessage() {
  const msg = document.createElement('h2');
  msg.classList.add('no-result');
  msg.innerText = "No results found :'(";
  return msg;
}

function createHeader(obj) {
  const row = document.createElement('tr');

  row.insertAdjacentHTML(
    'beforeend',
    [
      ...Object.keys(obj).map((key) => `<th>${key}</th>`),
      `<th>delete</th>`,
    ].join('')
  );
  return row;
}

function getBookDeleteButtonInCell({ id }) {
  const cell = document.createElement('td');
  const btn = document.createElement('button');

  btn.type = 'button';
  btn.dataset.bookId = id;
  btn.innerHTML = `Delete book`;
  btn.addEventListener('click', deleteBook);
  cell.append(btn);

  return cell;
}

function createRow(book) {
  const row = document.createElement('tr');

  const cells = Object.values(book).map((value) => {
    const cell = document.createElement('td');
    cell.innerText = value;
    return cell;
  });

  cells.push(getBookDeleteButtonInCell({ id: book.id }));

  row.append(...cells);

  return row;
}

function drawBooks(books) {
  booksTable.innerHTML = '';

  if (books.length === 0) {
    booksTable.append(createNoRowsMessage());
    return;
  }

  const headerRow = createHeader(books[0]);

  const rows = books.map((book) => createRow(book));
  booksTable.append(headerRow, ...rows);
}
