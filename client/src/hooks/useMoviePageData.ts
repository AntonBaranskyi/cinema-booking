import { useParams } from "react-router-dom";

import { useGetSingleMovieQuery } from "../services/moviesService";

export const useMoviePageData = () => {
  const { id } = useParams();
  if (id) {
    const { data, isLoading } = useGetSingleMovieQuery({ id });

    return { currentMovie: data, loading: isLoading };
  }
};
