const API_KEY = '34dbe792c998f87663d41737eb203cb2';
const baseUrl = 'https://api.themoviedb.org/3/';

interface BaseResponse {
    page : number;
    total_results : number;
    total_pages: number;
} 

interface Movie {
    adult : boolean;
    backdrop_path : string | null;
    genre_ids : number[];
    id : number;
    original_language : string;
    original_title : string;
    overview : string;
    popularity : number;
    poster_path : string | null;
    release_date : string;
    title : string;
    video : boolean;
    vote_average : number;
    vote_count : number;
}

export interface MovieResponse extends BaseResponse {
    results : Movie[]
}


export const moviesApi = {
    trending : () => fetch(`${baseUrl}trending/movie/week?api_key=${API_KEY}`).then(
        response => response.json()
    ),
    upcomming : () => fetch(`${baseUrl}movie/upcoming?api_key=${API_KEY}`).then(
        response => response.json()
    ),
    nowPlaying : () => fetch(`${baseUrl}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`).then(
        response => response.json()
    ),
    search : ({queryKey}) => {
        // key 배열의 두번째꺼 꺼냄
        const [_, query] = queryKey;

        return fetch(`${baseUrl}/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}`).then(
        response => response.json()
    )},
};

export const tvApi = {
    trending : () => fetch(`${baseUrl}trending/tv/week?api_key=${API_KEY}`).then(
        response => response.json()
    ),
    airingToday : () => fetch(`${baseUrl}tv/airing_today?api_key=${API_KEY}`).then(
        response => response.json()
    ),
    topRated: () => fetch(`${baseUrl}tv/top_rated?api_key=${API_KEY}`).then(
        response => response.json()
    ),
     search : ({queryKey}) => {
        const [_, query] = queryKey;

        return fetch(`${baseUrl}/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${query}`).then(
        response => response.json()
    )},
};