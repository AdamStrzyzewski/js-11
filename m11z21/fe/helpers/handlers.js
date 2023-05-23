function loadBooks() {
  showLoader();
  bookAPI
    .get()
    .then((books) => {
      drawBooks(books);
    })
    .catch((e) => {
      errorToast(e);
    })
    .finally(() => {
      hideLoader();
    });
}

function deleteBook() {
  const { bookId } = this.dataset;

  bookAPI
    .delete(bookId)
    .then(() => {
      loadBooks();
    })
    .catch((e) => {
      errorToast(e);
    });
}

function insertOrUpdateBook(e) {
  e.preventDefault();
  const {
    id: { value: id },
    name: { value: name },
    author: { value: author },
    genres: { value: genres },
  } = this;

  let request;
  if (id === '') {
    request = bookAPI.post({
      name,
      author,
      genres,
    });
  } else {
    request = bookAPI.put(id, {
      name,
      author,
      genres,
    });
  }

  request
    .then(() => {
      loadBooks();
    })
    .catch((e) => {
      errorToast(e);
    });
  // zrobić zapytanie
  // złapać błędy walidacji
  // narysować książki
}
