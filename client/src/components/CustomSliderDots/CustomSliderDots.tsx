import { Box, Stack } from "@mui/material";
import React from "react";

import styles from "./CustomSliderDots.module.scss";

type Props = {
  dots: React.ReactNode;
  activeSlide: number;
  onDotClick: (index: number) => void;
};

export const CustomSliderDots: React.FC<Props> = ({
  dots,
  onDotClick,
  activeSlide,
}) => {
  return (
    <Stack
      direction="row"
      gap={"16px"}
      justifyContent="center"
      className={styles.dots}
    >
      {React.Children.map(dots, (dot, index) =>
        activeSlide === index ? (
          <Box className={styles.activeDot} key={dot?.toString()} />
        ) : (
          <Box
            className={styles.dot}
            key={dot?.toString()}
            onClick={() => onDotClick(index)}
          />
        ),
      )}
    </Stack>
  );
};
