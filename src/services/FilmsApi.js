import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "16dd4007a11c090de0b3928cbf438e94";

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
};

async function fetchFilms(url, query) {
  const response = await axios(url, { params: { query } });
  return response.data;
}

export async function fetchPopularFilms() {
  const response = await fetchFilms("trending/movie/day");
  return response.results;
}

export async function fetchFilmById(movieId) {
  const response = await fetchFilms(`movie/${movieId}`);
  return response;
}

export async function fetchFilmCredits(movieId) {
  const response = await fetchFilms(`movie/${movieId}/credits`);
  return response.cast;
}

export async function fetchFilmReviews(movieId) {
  const response = await fetchFilms(`movie/${movieId}/reviews`);
  return response.results;
}

export async function fetchFilmQuery(query) {
  const response = await fetchFilms(`search/movie`, query);
  return response.results;
}
