import Movie from '../models/Movie.js';
import axios from '../services/axios.js';
import { getMovieGenres } from '../helpers/getMovieGenres.js';

const getAllMovies = async (
  req,
  resp,
  next
) => {
  const page = req.query.page ? String(req.query.page) : '1';
  const query = req.query.query ? String(req.query.query) : '';
  const sort = req.query.sort && String(req.query.sort);
  const filter = req.query.filter && String(req.query.filter);

  await Movie.deleteMany({});

  const moviesData = await axios.get<IMovieResponse>(`/discover/movie`);

  const genres = await axios.get<IGenreResponse>('/genre/movie/list');

  const movieWithGenres = getMovieGenres({
    movieData: moviesData.data.results,
    genres: genres.data.genres,
  });

  await Movie.insertMany(movieWithGenres);

  const sortParam = sort === 'desc' ? -1 : sort === 'asc' && 1;

  const sortQuery = sortParam ? { title: sortParam } : {};
  const findQuery = { title: { $regex: query, $options: 'i' } };
  const filterQuery = filter
    ? filter === '2D'
      ? { is_3D: false }
      : filter === '3D'
      ? { is_3D: true }
      : {}
    : {};

  const moviesOnPage = await Movie.find(findQuery)
    .find(filterQuery)
    .skip((+page - 1) * 6)
    .limit(6)
    // @ts-ignore:next-line
    .sort(sortQuery);

  const moviesCount = await Movie.find(findQuery)
    .find(filterQuery)
    .countDocuments();

  resp.status(200).json({
    totalItems: moviesCount,
    results: moviesOnPage,
  });
};

export default {
  getAllMovies,
};
