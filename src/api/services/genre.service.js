import {api} from '../api';

const API_KEY = process.env.REACT_APP_API_KEY;
const GENRE_MOVIE_SUFFIX = '/genre/movie/list';

export class GenreAPIService {
    static getGenres() {
        return api.get(GENRE_MOVIE_SUFFIX + API_KEY)
            .then((response) => response.data);
    }
}
