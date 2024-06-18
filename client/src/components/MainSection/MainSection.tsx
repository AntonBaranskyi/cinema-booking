import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";

import { POSTER } from "../../constants/posterURL";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  onChangeMovieKey,
  onToggleYoutubeModal,
} from "../../store/slices/commonSlice";
import { IMovieServer } from "../../types/movieServer";
import styles from "./MainSection.module.scss";

type Props = {
  movieData: IMovieServer;
};

export const MainSection: React.FC<Props> = ({ movieData }) => {
  const dispatch = useAppDispatch();

  const handleOpenTrailer = () => {
    dispatch(onChangeMovieKey(movieData.video.key));
    dispatch(onToggleYoutubeModal(true));
  };

  return (
    <div className={styles.mainWrapper}>
      <div
        className={styles.photoPoster}
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url("${POSTER}${movieData.backdrop_path}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Box className={styles.buttonWrapper}>
          <Button
            variant="contained"
            className={styles.buttonWatch}
            endIcon={<PlayCircleIcon sx={{ height: "31px", width: "31px" }} />}
            onClick={handleOpenTrailer}
          >
            Watch trailer
          </Button>
        </Box>
        <Container maxWidth="xl" className={styles.container}>
          <Box sx={{ width: "50%" }}>
            <Typography fontWeight={700} fontSize={32} mb={1.5} color="white">
              {movieData.title}
            </Typography>
            <Box className={styles.movieInfo} mb={"24px"}>
              <Box className={styles.genreWrapper}>
                {movieData.genres.map((genre) => (
                  <Box className={styles.genreGroup} key={genre}>
                    <Typography color="black" fontWeight={600} fontSize={16}>
                      {genre}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Stack gap={2} direction="row">
                <Box className={styles.genreWrapper}>
                  <CalendarMonthOutlinedIcon
                    sx={{ height: "28px", width: "28px", color: "#fff" }}
                  />
                  <Typography color="white" fontWeight={500} fontSize={16}>
                    {movieData.release_date.slice(0, 4)}
                  </Typography>
                </Box>

                <Box className={styles.genreWrapper}>
                  <StarOutlinedIcon
                    sx={{ height: "28px", width: "28px", color: "#fff" }}
                  />
                  <Typography color="white" fontWeight={500} fontSize={16}>
                    {movieData.vote_average.toFixed(1)}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Typography fontSize={16} fontWeight={600} color="white">
              {movieData.overview}
            </Typography>
          </Box>
        </Container>
      </div>
    </div>
  );
};
