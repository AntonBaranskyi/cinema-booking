import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Njg2M2JmYTEyMmNhZTliZDczYzI5YTQ1YjVlOGM5NyIsInN1YiI6IjY1ZTg2OGUzOTYzODY0MDE4MWM5ZjQ3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.emvJOE2p99slhD_nIgX53UAiw5eXY4Th944h7cHBJYE",
  },
});

export default instance;
