import axios from 'axios';

const apiKey = '39312182-b7eb18265bc4ee5d951bc0073';

axios.defaults.baseURL = `https://pixabay.com/api`;

export const fetchStartImages = async () => {
  const responce = await axios.get(`/?key=${apiKey}&per_page=12`);
  return responce.data;
};

export const fetchRequestImages = async (query, page) => {
  const responce = await axios.get(
    `/?key=${apiKey}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return responce.data;
};
