import { Box } from "@mui/material";
import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { useSliderMain } from "../../hooks/useSliderMain";
import { IMovieServer } from "../../types/movieServer";
import CustomSliderDots from "../CustomSliderDots";
import MainSection from "../MainSection";
import styles from "./Main.module.scss";

type Props = {
  mainMovies: IMovieServer[];
};

export const Main: React.FC<Props> = ({ mainMovies }) => {
  const { sliderRef, activeSlide, handleDotClick, onSetCurrentSlide } =
    useSliderMain();

  const settings: Settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    dots: true,
    autoplay: true,
    arrows: false,
    beforeChange: (_, nextSlide) => {
      onSetCurrentSlide(nextSlide);
    },
    appendDots: (dots) => (
      <CustomSliderDots
        dots={dots}
        activeSlide={activeSlide}
        onDotClick={handleDotClick}
      />
    ),
  };

  return (
    <Box className={styles.mainWrapper}>
      <Slider {...settings} ref={sliderRef}>
        {mainMovies.map((movie) => (
          <MainSection key={movie.id} movieData={movie} />
        ))}
      </Slider>
    </Box>
  );
};
