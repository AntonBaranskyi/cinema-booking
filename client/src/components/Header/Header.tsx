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
import { useNavigate } from "react-router-dom";

import logo from "../../assets/icons/logo.png";
import { HEADER_LANG } from "../../constants/headerLanguage";
import { FLAG_ICON_BASE_URL } from "../../constants/iconUrl";
import { useLanguage } from "../../hooks/useLanguage";
import { useUpdateTime } from "../../hooks/useUpdateTime";
import styles from "./Header.module.scss";

export const Header = () => {
  const { formattedTime } = useUpdateTime();
  const { currentLanguage, handleChangeLang } = useLanguage();
  // const navigate = useNavigate();

  const handleLogoClick = () => {
    // navigate("/");
  };

  return (
    <AppBar position="static" className={styles.headerMargin}>
      <Container maxWidth="xl">
        <Toolbar className={styles.headerToolbar}>
          <Box onClick={handleLogoClick} className={styles.headerLogoBox}>
            <img src={logo} alt="logo" className={styles.logo} />
            <Typography
              className={styles.headerTextLogo}
              color="white"
              variant="h5"
              component="h2"
              fontWeight={700}
              letterSpacing={0.2}
            >
              Our cinema
            </Typography>
          </Box>
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
