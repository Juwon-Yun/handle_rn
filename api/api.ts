const API_KEY = '34dbe792c998f87663d41737eb203cb2';
const baseUrl = 'https://api.themoviedb.org/3/';

const trending = () => fetch(`${baseUrl}trending/movie/week?api_key=${API_KEY}`).then(
        response => response.json()
    );

const upcomming = () => fetch(`${baseUrl}movie/upcoming?api_key=${API_KEY}`).then(
        response => response.json()
    );

const nowPlaying = () => fetch(`${baseUrl}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`).then(
        response => response.json()
    );

export const moviesApi = {trending, upcomming, nowPlaying};