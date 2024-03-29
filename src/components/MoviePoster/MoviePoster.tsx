import { Box, Button } from "@mui/material";

import { POSTER } from "../../constants/posterURL";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { onToggleYoutubeModal } from "../../store/slices/commonSlice";
import styles from "./MoviePoster.module.scss";

type Props = {
  posterUrl: string;
};

export const MoviePoster: React.FC<Props> = ({ posterUrl }) => {
  const dispatch = useAppDispatch();

  const handleOpenYoutube = () => {
    dispatch(onToggleYoutubeModal(true));
  };

  return (
    <>
      <Box className={styles.posterWrapper}>
        <img
          src={`${POSTER}/${posterUrl}`}
          alt="poster"
          className={styles.poster}
        />
      </Box>

      <Box className={styles.buttonWrapper}>
        <Button variant="contained" onClick={handleOpenYoutube}>
          Watch trailer
        </Button>
      </Box>
    </>
  );
};
