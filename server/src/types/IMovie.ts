import { IVideo } from './IVideo';

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  title: string;
  overview: string;
  poster_path: string;
  video: boolean | IVideo;
  vote_average: number;
  genres: string[];
}

export interface IMovieResponse {
  results: IMovie[];
}
