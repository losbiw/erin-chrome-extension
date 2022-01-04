/* eslint-disable camelcase */
import { WALLPAPER_COLLECTION } from '../constants/local-storage-keys';
import { Response, Picture } from '../types/pexels';

const fetchCollection = async (query: string) => {
  const headers = new Headers();

  headers.set('content-type', 'application/json');
  headers.set('authorization', process.env.PEXELS || '');

  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=78`,
  );

  const json = await res.json();

  return json.photos as Response[];
};

const getURL = async (query: string) => {
  const cachedImages = JSON.parse(localStorage.getItem(WALLPAPER_COLLECTION) || '[]') as Picture[];
  let wallpapers = cachedImages;

  if (!cachedImages.length) {
    const collection = await fetchCollection(query);

    const mapped: Picture[] = collection.map(({ src, photographer, photographer_url }) => ({
      src: src.original,
      authorName: photographer,
      authorUrl: photographer_url,
    }));

    wallpapers = mapped;

    const serialized = JSON.stringify(mapped);
    localStorage.setItem(WALLPAPER_COLLECTION, serialized);
  }

  const randomIndex = Math.round(Math.random() * wallpapers.length);

  return wallpapers[randomIndex];
};

export { getURL, fetchCollection };
