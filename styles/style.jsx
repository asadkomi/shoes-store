import { makeStyles } from "@material-ui/core";

const styles = makeStyles({
  navbar: {
    // backgroundColor: "#fff",
    color: "#201F20",

    "& a": {
      color: "#201F20",
      marginLeft: 10,
    },
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  gap: {
    flexGrow: 1,
  },
  main: {
    minHeight: "80vh",
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  footer: {
    textAlign: "center",
  },

  homeCard: {
    maxHeight: "400",
  },
  form: {
    maxWidth: 500,
    margin: "0 auto",
  },

  formEdit: {
    width: "100%",
    maxWidth: 800,
    margin: "0 auto",
  },

  card: {
    maxWidth: 380,
    margin: "0 auto",

    marginTop: 150,
  },
  navbarButton: {
    color: "#333",
    textTransform: "initial",
  },

  transparentBg: {
    backgroundColor: "transparent",
    marginTop: 30,
  },
  error: {
    color: "#f04040",
  },

  fullWidth: {
    width: "100%",
  },
});

export default styles;
