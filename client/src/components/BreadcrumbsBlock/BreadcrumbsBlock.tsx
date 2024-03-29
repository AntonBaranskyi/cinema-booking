import { Box, Link } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Bredcrumbs.module.scss";

type Props = {
  movieTitle: string;
};

export const BreadcrumbsBlock: React.FC<Props> = ({ movieTitle }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <Box m={5}>
      <Breadcrumbs>
        <Link
          color="grey"
          underline="hover"
          onClick={handleNavigate}
          className={styles.BreadLink}
        >
          Our cinema
        </Link>

        <Link underline="hover" href="#" color="white">
          {movieTitle}
        </Link>
      </Breadcrumbs>
    </Box>
  );
};
