import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import {
  AppBar,
  Input,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";

import logo from "../../assets/icons/logo.png";
import { HEADER_LANG } from "../../constants/HeaderLanguage";
import { FLAG_ICON_BASE_URL } from "../../constants/IconURl";
import { useLanguage } from "../../hooks/useLanguage";
import styles from "./Header.module.scss";

export const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { currentLanguage, handleChangeLang } = useLanguage();

  useEffect(() => {
    const intervalTime = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(intervalTime);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <AppBar position="static" className={styles.headerMargin}>
      <Container maxWidth="xl">
        <Toolbar className={styles.headerToolbar}>
          <img src={logo} alt="logo" className={styles.logo} />
          <Typography
            className={styles.headerTextLogo}
            color="white"
            variant="h5"
            component="a"
            href="#"
            fontWeight={700}
            letterSpacing={0.2}
          >
            Our cinema
          </Typography>
          <Box className={styles.headerClock}>
            <AccessTimeOutlinedIcon />
            <Typography variant="h6">{formattedTime}</Typography>
          </Box>
          <Select
            defaultValue="en"
            input={<Input id="language-select" />}
            value={currentLanguage}
            onChange={handleChangeLang}
            className={styles.headerLanguage}
          >
            {HEADER_LANG.map((headerLang) => (
              <MenuItem value={headerLang.value} key={headerLang.value}>
                <Box className={styles.headerLanguageWrapper}>
                  {headerLang.title}
                  <img
                    src={`${FLAG_ICON_BASE_URL}${headerLang.img}.svg`}
                    alt={headerLang.value}
                    className={styles.icon}
                  />
                </Box>
              </MenuItem>
            ))}
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
