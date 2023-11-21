import { Box, Link } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";

export const BreadcrumbsBlock = () => {
  return (
    <Box m={5}>
      <Breadcrumbs>
        <Link color="grey" underline="hover" href="#">
          Our cinema
        </Link>

        <Link underline="hover" color="grey" href="#">
          Movies
        </Link>

        <Link underline="hover" href="#" color="white">
          Current Movie
        </Link>
      </Breadcrumbs>
    </Box>
  );
};
