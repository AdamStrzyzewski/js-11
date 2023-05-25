import { searchForPhotos, scrollHandler } from './handlers.js';

const searchForm = document.querySelector('#searchPhotosForm');

searchForm.addEventListener('submit', searchForPhotos);
searchForm.dispatchEvent(new Event('submit'));

window.addEventListener('scroll', scrollHandler);
