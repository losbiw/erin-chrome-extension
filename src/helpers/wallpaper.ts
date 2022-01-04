/* eslint-disable camelcase */
import dimensions from '../constants/dimensions';
import { WALLPAPER_COLLECTION } from '../constants/local-storage-keys';
import { Response, Picture } from '../types/pexels';

const fetchCollection = async (query: string) => {
  const headers = new Headers();

  headers.set('content-type', 'application/json');
  headers.set('Authorization', process.env.PEXELS_KEY || '');

  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=78`,
    { headers },
  );

  const json = await res.json();

  return json.photos as Response[];
};

const getURL = async (query: string) => {
  const cachedImages = JSON.parse(localStorage.getItem(WALLPAPER_COLLECTION) || '[]') as Picture[];
  let wallpapers = cachedImages;

  if (!cachedImages.length) {
    const collection = await fetchCollection(query);
    const { width, height } = dimensions;

    const mapped: Picture[] = collection.map(({ src, photographer, photographer_url }) => ({
      src: `${src.original}?auto=compress&cs=tinysrgb&dpr=2&width=${width}&height=${height}`,
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

export default { getURL, fetchCollection };
