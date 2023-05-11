function showLoader() {
  loadIcon.classList.add('visible');
}
function hideLoader() {
  loadIcon.classList.remove('visible');
}

function createHeader(obj) {
  const row = document.createElement('tr');
  row.insertAdjacentHTML(
    'beforeend',
    Object.keys(obj)
      .map((key) => `<th>${key}</th>`)
      .join('')
  );

  return row;
}

function createRow(post) {
  const row = document.createElement('tr');

  row.insertAdjacentHTML(
    'beforeend',
    Object.values(post)
      .map((value) => `<td>${value}</td>`)
      .join('')
  );
  return row;
}

function createNoRowsMessage() {
  const msg = document.createElement('h2');
  msg.classList.add('no-result');
  msg.innerText = "No results found :'(";
  return msg;
}

function drawProducts(posts) {
  productsTable.innerHTML = '';
  posts = posts.map((post) => ({
    _id: post._id,
    title: post.title,
    price: post.price,
    category: post.category.name,
    slug: post.slug,
  }));
  if (!posts.length) {
    // message about no data
    productsTable.append(createNoRowsMessage());
    return;
  }

  const headerRow = createHeader(posts[0]);
  productsTable.append(headerRow);
  const rows = [];
  posts.forEach((post) => {
    rows.push(createRow(post));
  });
  productsTable.append(...rows);
}

function createButton(metadata, i) {
  const pageButton = document.createElement('button');
  pageButton.innerText = i;
  pageButton.classList.add('page-button');
  pageButton.dataset.page = i;
  if (metadata.currentPage === i) {
    pageButton.classList.add('page-button--active');
  }
  pageButton.addEventListener('click', loadProductsButton);
  return pageButton;
}

function drawPages(metadata) {
  const limitProducts = limitForm.limit.value;
  const { totalPages, currentPage, totalProducts } = metadata;
  const buttonsDrawn = pages.childElementCount;
  if (totalPages - 1 === buttonsDrawn) {
    // no need to redraw
    // delete active class from current button
    document
      .querySelector(`.page-button--active`)
      .classList.remove('page-button--active');
    // add class to new active page button
    document
      .querySelector(`.page-button[data-page='${currentPage}']`)
      .classList.add('page-button--active');
  } else {
    pages.innerHTML = '';
    const buttons = [];
    for (let i = 1; i <= Math.ceil(totalProducts / limitProducts); i += 1) {
      buttons.push(createButton(metadata, i));
    }
    pages.append(...buttons);
  }
}
