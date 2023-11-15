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
import React, { useEffect, useState } from "react";

import eng from "../../assets/icons/eng.png";
import logo from "../../assets/icons/logo.png";
import ukraine from "../../assets/icons/ukraine.png";
import styles from "./Header.module.scss";

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
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <AccessTimeOutlinedIcon />
            <Typography variant="h6">{formattedTime}</Typography>
          </Box>
          <Select
            defaultValue="en"
            input={<Input id="language-select" />}
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <MenuItem value="en">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                English
                <img src={eng} alt="eng" className={styles.icon} />
              </Box>
            </MenuItem>
            <MenuItem value="ukr">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                Ukrainian
                <img src={ukraine} alt="ukr" className={styles.icon} />
              </Box>
            </MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
