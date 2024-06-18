import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from './src/services/axios.js';

import mongoose from 'mongoose';
import { getMovieVideo } from './src/helpers/getMovieVideo.js';

import movieController from './src/controllers/movies.js';
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
const PORT = 8000;

const app = express();

app.use(cors());

app.use(express.json());

app.get('/movies', movieController.getAllMovies);

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
      const movieVideo = getMovieVideo(singleMovie.id);
      // @ts-ignore:next-line
      resp.status(200).json({ ...singleMovie._doc, video: movieVideo });
    } else {
      const movieAPI = await axios.get(`/movie/${id}`);

      const movieVideo = getMovieVideo(+id);
      console.log('Extra case');

      resp
        .status(200)
        .json({ ...movieAPI.data, video: movieVideo, type: 'upcoming' });
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
