import { createTheme } from "@material-ui/core";
const theme = createTheme({
  typography: {
    h1: {
      fontSize: "1.6rem",
      fontWeight: 400,
      margin: "1rem 0",
    },
    h2: {
      fontSize: "1.4rem",
      fontWeight: 400,
      margin: "1rem 0",
    },
    body1: {
      fontWeight: "normal",
    },
  },
  palette: {
    type: "light",
    primary: {
      main: "#982479",
    },
    secondary: {
      main: "#6B63FF",
    },
  },
});
