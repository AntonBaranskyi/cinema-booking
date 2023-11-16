import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
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