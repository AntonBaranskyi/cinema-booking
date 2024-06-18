export const getMovieGenres = ({ movieData, genres }) => {
  const moviesToInsert = movieData.map((movie) => {
    const movieGenres = movie.genre_ids.map((genreId) => {
      const genre = genres.find((genre) => genre.id === genreId);

      return genre ? genre.name : '';
    });

    return {
      ...movie,
      is_3D: +movie.id % 2 === 0,
      genres: movieGenres,
    };
  });

  return moviesToInsert;
};
