import { Box, Typography } from "@mui/material";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { IMovieServer } from "../../types/movieServer";
import UpcomingMovieCard from "../UpcomingMovieCard";

type Props = {
  upcomingMovies: IMovieServer[];
};

export const UpcomingMovies: React.FC<Props> = ({ upcomingMovies }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "25px",
        }}
      >
        <Typography color="#fff" textTransform="uppercase">
          Upcoming movies
        </Typography>
      </Box>
      <Swiper
        spaceBetween={100}
        slidesPerView={5}
        modules={[Navigation]}
        navigation
        centeredSlides={true}
        initialSlide={2}
      >
        {upcomingMovies.map((movie) => (
          <SwiperSlide key={movie._id}>
            <UpcomingMovieCard upcomingMovie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
