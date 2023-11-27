import { useParams } from "react-router-dom";

import { normalizeTitlePath } from "../utils/pathTitle";
import { useAppSelector } from "./useAppSelector";

export const useMoviePageData = () => {
  const { id } = useParams();
  const { allMovies } = useAppSelector((state) => state.movies);

  const titleForPath = normalizeTitlePath(id as string);

  const currentMovie = allMovies.find(
    (movie) => movie.title_en.toLowerCase() === titleForPath,
  );

  return { currentMovie };
};
