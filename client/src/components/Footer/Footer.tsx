import { Box, Container } from "@mui/material";

import logo from "../../assets/icons/logo.png";
import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container maxWidth="xl" className={styles.footerWrapper}>
        <img src={logo} alt="logo" className={styles.logo} />

        <Box className={styles.buttonsWrapper}>
          <a href="#">GitHub</a>
          <a href="#">Contacts</a>
          <a href="#">About me</a>
        </Box>

        <Box className={styles.upWrapper}>
          <p>Back to top</p>
          <Box className={styles.arrowUp}>

          </Box>
        </Box>
      </Container>
    </footer>
  );
};
