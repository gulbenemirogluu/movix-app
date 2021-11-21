import {api} from '../api';

const API_KEY = process.env.REACT_APP_API_KEY;
const MOVIES_BY_GENRE_SUFFIX = '/discover/movie';
const MOVIE_SUFFIX = '/movie/';

export class MovieAPIService {
    static getByGenre(genreId, page) {
        return api.get(MOVIES_BY_GENRE_SUFFIX + API_KEY + `&with_genres=${genreId}` + (page ? `&page=${page}` : ''))
            .then((response) => response.data);
    }

    static getById(movieId) {
        return api.get(MOVIE_SUFFIX + movieId + process.env.REACT_APP_API_KEY)
            .then((response) => response.data);
    }
}
