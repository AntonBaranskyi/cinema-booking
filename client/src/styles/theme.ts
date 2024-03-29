import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: red,
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1300,
      xl: 1536,
    },
  },

  components: {
    MuiDivider: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

if (
  theme.components &&
  theme.components.MuiDivider &&
  theme.components.MuiDivider.styleOverrides &&
  theme.components.MuiDivider.styleOverrides.root
) {
  const rootStyles = theme.components.MuiDivider.styleOverrides.root as Record<
    string,
    React.CSSProperties
  >;

  rootStyles["@media (max-width: 899px)"] = {
    whiteSpace: "initial",
  };
}

export default theme;
