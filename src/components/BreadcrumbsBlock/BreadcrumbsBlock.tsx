import { Box, Link } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useNavigate } from "react-router-dom";

import { useMoviePageData } from "../../hooks/useMoviePageData";
import { useMovieInfoTranslations } from "../../hooks/useMovieTranslations";

export const BreadcrumbsBlock = () => {
  const navigate = useNavigate();
  const { langTitle } = useMovieInfoTranslations();
  const { currentMovie } = useMoviePageData();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <Box m={5}>
      <Breadcrumbs>
        <Link
          color="grey"
          sx={{ cursor: "pointer" }}
          underline="hover"
          onClick={handleNavigate}
        >
          Our cinema
        </Link>

        <Link underline="hover" href="#" color="white">
          {currentMovie && currentMovie[langTitle]}
        </Link>
      </Breadcrumbs>
    </Box>
  );
};
