import axios from '../services/axios.js';
import { IVideo, IVideoResponse } from '../types/IVideo';

export const getMovieVideo = async (movieId: number): Promise<IVideo> => {
  const videoRequest = await axios.get<IVideoResponse>(
    `/movie/${movieId}/videos`
  );

  const mutatedVideo = videoRequest.data.results.find((video) => {
    return video.type === 'Trailer';
  }) as IVideo;

  return mutatedVideo;
};
