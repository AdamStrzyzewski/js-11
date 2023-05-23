const API_PATH = 'http://localhost:3000';

function pingUrl({
  url = API_PATH,
  method = 'get',
  body,
  headers = {
    'Content-Type': 'application/json',
  },
}) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      body,
      headers,
    })
      .then((response) => {
        if (!response.ok) {
          reject(`Error code ${response.status}`);
        }
        if (response.status === 204) {
          resolve({});
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err.toString());
      });
  });
}

const bookAPI = {
  get: () => pingUrl({ url: `${API_PATH}/books` }),
  post: (body) =>
    pingUrl({
      url: `${API_PATH}/books`,
      method: 'post',
      body: JSON.stringify(body),
    }),
  put: (bookId, body) =>
    pingUrl({
      url: `${API_PATH}/books/${bookId}`,
      method: 'put',
      body: JSON.stringify(body),
    }),
  post: (body) =>
    pingUrl({
      url: `${API_PATH}/books`,
      method: 'post',
      body: JSON.stringify(body),
    }),
  delete: (bookId) =>
    pingUrl({ url: `${API_PATH}/books/${bookId}`, method: 'delete' }),
};
