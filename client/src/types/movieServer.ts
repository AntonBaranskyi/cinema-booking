import { IVideo } from "./video";

export interface IMovieServer {
  backdrop_path: any;
  adult: boolean;
  genreIds: number[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  _id: string;

  video: IVideo;

  is_3D: boolean;

  type?: string;

  genres: string[];
}

export interface IMovieServerData {
  totalItems: number;
  results: IMovieServer[];
}
