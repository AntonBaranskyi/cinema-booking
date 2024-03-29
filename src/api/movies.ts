import { client } from "../services/fetchClient";

export const getNewMovies = () => {
  return client.get("/search/movie?query=Anatomie d'une chute");
  //   return client.get("/discover/movie");
};
