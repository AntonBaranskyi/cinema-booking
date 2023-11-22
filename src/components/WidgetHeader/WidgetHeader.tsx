import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

import poster from "../../assets/movie_poster.jpg";
import styles from "./WidgetHeader.module.scss";

export const WidgetHeader = () => {
  return (
    <AppBar position="sticky" className={styles.BookingAppBar}>
      <Container maxWidth="xl">
        <Toolbar className={styles.widgetToolbar}>
          <Box className={styles.AppBarInfo}>
            <img src={poster} alt="poster" className={styles.BookingPoster} />
            <Box>
              <Typography variant="h4">Тролі: Знову разом</Typography>
              <Typography paragraph>
                22 листопада 11:00 · Основний зал · Старт
              </Typography>
              <Typography paragraph color="gray">
                вулиця Івана Миколайчука, 15А, м.Київ
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6">Час на оплату: 10:00</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
