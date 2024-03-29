import { Box, Modal } from "@mui/material";
import React from "react";
import YouTube from "react-youtube";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { onToggleYoutubeModal } from "../../store/slices/commonSlice";
import { IMovieServer } from "../../types/movieServer";

type Props = {
  currentMovie: IMovieServer;
};

export const YoutubeModal: React.FC<Props> = ({ currentMovie }) => {
  const { isOpenYoutubeModal } = useAppSelector((state) => state.common);

  const dispatch = useAppDispatch();

  const handleCloseYoutubeModal = () => {
    dispatch(onToggleYoutubeModal(false));
  };

  return (
    <Modal open={isOpenYoutubeModal} onClick={handleCloseYoutubeModal}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {currentMovie && currentMovie.video && (
          <YouTube videoId={currentMovie.video.key} />
        )}
      </Box>
    </Modal>
  );
};
