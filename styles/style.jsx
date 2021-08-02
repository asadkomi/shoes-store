import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
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
    fontSize: "1.2rem",
    color: "#333",
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

  searchCard: {
    height: 200,
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

  reviewForm: {
    maxWidth: 800,
    width: "100%",
    alignItems: "start",
  },
  reviewItem: {
    marginRight: "1rem",
    borderRight: "1px #808080 solid",
    paddingRight: "1rem",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  menuButton: { padding: 0 },
  mt1: { marginTop: "1rem" },
  // search
  searchSection: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  searchForm: {
    border: "1px solid #EAEAEA",
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  searchInput: {
    paddingLeft: 5,
    width: 400,
    height: 40,
    color: "#000000",
    "& ::placeholder": {
      color: "#606060",
    },
  },
  iconButton: {
    // backgroundColor: "#972479",
    padding: 5,
    borderRadius: "0 5px 5px 0",
    "& span": {
      color: "#000000",
    },
  },
  sort: {
    marginRight: 5,
  },

  fullContainer: { height: "100vh" },
  mapInputBox: {
    position: "absolute",
    display: "flex",
    left: 0,
    right: 0,
    margin: "10px auto",
    width: 300,
    height: 40,
    "& input": {
      width: 250,
    },
  },
  carosel: {
    maxHeight: "400",
  },

  imageContainer: {
    width: "100%",
  },

  imageContainerDev: {
    position: "unset",
  },

  image: {
    objectFit: "cover",
    width: "100%",

    height: 300,
  },
}));

export default styles;
