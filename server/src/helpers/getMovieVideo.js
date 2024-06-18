import axios from '../services/axios.js';

export const getMovieVideo = async (movieId) => {
  const videoRequest =
    (await axios.get) < IVideoResponse > `/movie/${movieId}/videos`;

  const mutatedVideo = videoRequest.data.results.find((video) => {
    return video.type === 'Trailer';
  });

  return mutatedVideo;
};
