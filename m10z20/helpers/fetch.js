const PRODUCTS_PATH = 'https://api.storerestapi.com/products';

function pingUrl({ url, queryParams }) {
  return new Promise((resolve, reject) => {
    const querystring = new URLSearchParams(queryParams);
    fetch(`${url}?${querystring}`)
      .then((response) => {
        if (!response.ok) {
          reject(`Error code ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });
}

function getProducts({ page = 1, limit = 2 } = {}) {
  return pingUrl({ url: PRODUCTS_PATH, queryParams: { page, limit } });
}
