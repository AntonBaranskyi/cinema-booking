import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  title: String,
  video: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  vote_average: Number,
  vote_count: Number,
  id: Number,
  is_3D: Boolean,

  genre_ids: [Number],

  genres: [String],

  type: String,
});

export default mongoose.model('Movie', MovieSchema);
