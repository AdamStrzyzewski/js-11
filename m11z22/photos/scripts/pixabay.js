import { API_PATH, DEFAULT_PIXABAY_PARAMS } from './config.js';

export default async function pingPixabay({ q = '', page = '1' }) {
  try {
    const querystring = new URLSearchParams({
      ...DEFAULT_PIXABAY_PARAMS,
      page,
      q,
    });

    const response = await fetch(`${API_PATH}?${querystring}`);
    if (!response.ok) {
      if (response.status === 400) {
        return [];
      }
      return { error: response.status };
    }

    const { hits: photos } = await response.json();

    return photos;
  } catch (e) {
    return { error: e.toString() };
  }
}
