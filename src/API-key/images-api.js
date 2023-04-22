import axios from 'axios';

export const fetchImages = async (query, page) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '33821290-d9b9dca8705f81d21105eca87';
  const PER_PAGE = 12;
  const URL = `${BASE_URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;
  const response = await axios.get(URL);
  return response.data;
};
