import { Box, Modal } from "@mui/material";
import React from "react";
import YouTube from "react-youtube";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { onToggleYoutubeModal } from "../../store/slices/commonSlice";

type Props = {
  movieKey: string;
};

export const YoutubeModal: React.FC<Props> = ({ movieKey }) => {
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
        {movieKey && <YouTube videoId={movieKey} />}
      </Box>
    </Modal>
  );
};
