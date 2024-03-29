import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from './src/services/axios.js';

import mongoose from 'mongoose';
import Movie from './src/models/Movie.js';

dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.kfl4azz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log('DB ok');
  })
  .catch((err) => {
    console.log('DB error ' + err);
  });
const PORT = 3000;

const app = express();

app.use(cors());

app.use(express.json());

app.get('/movies', async (req, resp) => {
  try {
    const page = req.query.page ? String(req.query.page) : '1';
    const query = req.query.query ? String(req.query.query) : '';
    const sort = req.query.sort && String(req.query.sort);
    const filter = req.query.filter && String(req.query.filter);

    await Movie.deleteMany({});

    const moviesData = await axios.get(`/discover/movie`);

    const genres = await axios.get('/genre/movie/list');

    const moviesToInsert = moviesData.data.results.map((movie) => {
      const movieGenres = movie.genre_ids.map((genreId) => {
        const genre = genres.data.genres.find((genre) => genre.id === genreId);

        return genre ? genre.name : '';
      });
      return {
        ...movie,
        is_3D: +movie.id % 2 === 0,
        genres: movieGenres,
      };
    });

    await Movie.insertMany(moviesToInsert);

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
      .skip((page - 1) * 6)
      .limit(6)
      .sort(sortQuery);

    const moviesCount = await Movie.find(findQuery)
      .find(filterQuery)
      .countDocuments();

    resp.status(200).json({
      totalItems: moviesCount,
      results: moviesOnPage,
    });
  } catch (error) {
    console.log(error);

    resp.status(404).json({
      message: 'Failed to fetch from API ' + error,
    });
  }
});

app.get('/movies/upcoming', async (req, resp) => {
  try {
    await Movie.deleteMany({ type: 'upcoming' });

    const upcomingMovies = await axios.get('/trending/movie/day');

    const mutatedMovies = upcomingMovies.data.results.map((movie) => ({
      ...movie,
      type: 'upcoming',
    }));

    await Movie.insertMany(mutatedMovies);

    const upcomingDB = await Movie.find({ type: 'upcoming' });

    resp.status(200).json(upcomingDB);
  } catch (error) {
    console.log(error);
    resp.status(404).json({
      messgae: "Can't get upcoming movies",
    });
  }
});

app.get('/movies/:id', async (req, resp) => {
  try {
    const { id } = req.params;

    const singleMovie = await Movie.findById(id);

    if (singleMovie) {
      const videoRequest = await axios.get(`/movie/${singleMovie.id}/videos`);

      const mutatedVideo = videoRequest.data.results.find((video) => {
        return video.type === 'Trailer';
      });

      resp.status(200).json({ ...singleMovie._doc, video: mutatedVideo });
    } else {
      const movieAPI = await axios.get(`/movie/${id}`);

      const movieAPIVideo = await axios.get(`/movie/${id}/videos`);

      const mutatedVideo = movieAPIVideo.data.results.find((video) => {
        return video.type === 'Trailer';
      });
      console.log('Extra case');

      resp
        .status(200)
        .json({ ...movieAPI.data, video: mutatedVideo, type: 'upcoming' });
    }
  } catch (error) {
    console.log(error);
    resp.status(404).json({
      messgae: "Can't get single movie",
      error,
    });
  }
});

app.listen(PORT, () => {
  console.log('Server is working on port ' + PORT);
});
