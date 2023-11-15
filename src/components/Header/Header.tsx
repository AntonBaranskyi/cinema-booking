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

import eng from "../../assets/icons/eng.png";
import logo from "../../assets/icons/logo.png";
import ukraine from "../../assets/icons/ukraine.png";
import styles from "./Header.module.scss";

const headerLangData = [
  { title: "English", value: "en", source: eng },
  {
    title: "Ukrainian",
    value: "ukr",
    source: ukraine,
  },
];

export const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

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
        <Toolbar
          sx={{
            padding: 2,
            gap: 4,
            alignItems: "center",
          }}
        >
          <img src={logo} alt="logo" className={styles.logo} />
          <Typography
            color="white"
            variant="h5"
            component="a"
            href="#"
            sx={{
              textDecoration: "none",
              fontWeight: 700,
              letterSpacing: ".2rem",
              flexGrow: 1,
            }}
          >
            Our cinema
          </Typography>
          <div className={styles.headerLang}>
            <AccessTimeOutlinedIcon />
            <Typography variant="h6">{formattedTime}</Typography>
          </div>
          <Select
            defaultValue="en"
            input={<Input id="language-select" />}
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            {headerLangData.map((headerItem) => (
              <MenuItem value={headerItem.value} key={headerItem.value}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {headerItem.title}
                  <img
                    src={headerItem.source}
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
