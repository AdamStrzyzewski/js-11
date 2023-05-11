function loadProducts(page = 1) {
  showLoader();
  getProducts({ page, limit: limitForm.limit.value })
    .then((response) => {
      drawPages(response.metadata);
      drawProducts(response.data);
    })
    .catch((err) => {
      errorToast(err.toString());
    })
    .finally(() => {
      hideLoader();
    });
}

function loadProductsButton() {
  loadProducts(this.dataset.page);
}

function changeLimit(e) {
  e.preventDefault();
  if (!Number.isNaN(parseInt(this.limit.value))) loadProducts();
}
