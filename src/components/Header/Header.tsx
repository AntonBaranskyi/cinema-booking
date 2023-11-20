import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import {
  AppBar,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import logo from "../../assets/icons/logo.png";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { onChangeLanguage } from "../../store/slices/LangSilce";
import { Language } from "../../types/langType";
import styles from "./Header.module.scss";

const headerLangData = [
  { title: "English", value: "en", img: "GB" },
  {
    title: "Ukrainian",
    value: "ua",
    img: "UA",
  },
];

export const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const { currentLanguage } = useAppSelector((state) => state.language);

  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

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

  const handleChangeLang = (event: SelectChangeEvent) => {
    dispatch(onChangeLanguage(event.target.value as Language));
  };

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
            {headerLangData.map((headerItem) => (
              <MenuItem value={headerItem.value} key={headerItem.value}>
                <Box className={styles.headerLanguageWrapper}>
                  {headerItem.title}
                  <img
                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${headerItem.img}.svg`}
                    alt={headerItem.value}
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
