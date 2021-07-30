import React, { useContext } from "react";
import Head from "next/head";

import {
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core";
import styles from "../../styles/style";
import Navbar from "./Navbar";
import { Store } from "../../utils/store.jsx";

const Layout = ({ title, children, description }) => {
  const style = styles();
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;

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
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#982479",
      },
      secondary: {
        main: "#6B63FF",
      },
    },
  });
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Shoes Store` : "Shoes Store"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Container className={style.main}>{children}</Container>
        <footer className={style.footer}>
          <Typography className="pt-4 pb-4">
            All rights reserved Shoe Store
          </Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
