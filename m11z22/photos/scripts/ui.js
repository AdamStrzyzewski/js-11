import pingPixabay from './pixabay.js';

const getPhotoElement = (photo) => {
  const img = document.createElement('img');
  img.classList.add('photo');
  img.src = photo.webformatURL;
  return img;
};

function drawPhotos({ photos, page }) {
  const photoContainer = document.querySelector('#photos');
  if (page === '1') {
    photoContainer.innerHTML = '';
  }

  const children = photos.map(getPhotoElement);
  photoContainer.append(...children);
}

export async function loadPhotos({ q, page }) {
  const photos = await pingPixabay({ q, page });
  if (photos.error) {
    alert(photos.error);
    return;
  }
  drawPhotos({ photos, page });
  return;
}
