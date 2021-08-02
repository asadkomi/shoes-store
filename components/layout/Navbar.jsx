import React, { useContext, useState, useEffect } from "react";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemText,
  InputBase,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ShopOutlinedIcon from "@material-ui/icons/ShopOutlined";
import CancelIcon from "@material-ui/icons/Cancel";
import SearchIcon from "@material-ui/icons/Search";
import styles from "../../styles/style.jsx";
import { Store } from "../../utils/store.jsx";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { getError } from "../../utils/error.js";

import useScrollTrigger from "@material-ui/core/useScrollTrigger";

function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Navbar = (props) => {
  const style = styles();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const [darkModeState, setDarkModeState] = useState(false);
  useEffect(() => {
    setDarkModeState(darkMode);
  }, []);

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    setDarkModeState(newDarkMode);
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };

  const [sidbarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [query, setQuery] = useState("");
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const menuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    Cookies.remove("shippinhAddress");
    Cookies.remove("paymentMethod");
    router.push("/");
  };

  return (
    <ElevationScroll {...props}>
      <AppBar color="#fff" className={style.navbar}>
        <Toolbar className={style.toolbar}>
          <Box display="flex" alignItems="center">
            <IconButton
              edge="start"
              aria-label="open drawer"
              onClick={sidebarOpenHandler}
              className={style.menuButton}
            >
              <MenuIcon className={style.navbarButton} />
            </IconButton>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={style.brand} variant="h4">
                  Shoes <span style={{ color: "#982479" }}>Store</span>
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <Drawer
            anchor="left"
            open={sidbarVisible}
            onClose={sidebarCloseHandler}
          >
            <List>
              <ListItem>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography>Shopping by category</Typography>
                  <IconButton aria-label="close" onClick={sidebarCloseHandler}>
                    <CancelIcon />
                  </IconButton>
                </Box>
              </ListItem>
              <Divider light />
              {categories.map((category) => (
                <NextLink
                  key={category}
                  href={`/search?category=${category}`}
                  passHref
                >
                  <ListItem button component="a" onClick={sidebarCloseHandler}>
                    <ListItemText primary={category}></ListItemText>
                  </ListItem>
                </NextLink>
              ))}
            </List>
          </Drawer>

          <div className={style.searchSection}>
            <form onSubmit={submitHandler} className={style.searchForm}>
              <InputBase
                name="query"
                className={style.searchInput}
                placeholder="Search products"
                onChange={queryChangeHandler}
              />
              <IconButton
                type="submit"
                className={style.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </form>
          </div>
          <div>
            <NextLink href="/cart" passHref>
              <Link>
                <Typography component="span">
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      <ShopOutlinedIcon />
                    </Badge>
                  ) : (
                    <ShopOutlinedIcon />
                  )}
                </Typography>
              </Link>
            </NextLink>
            {userInfo ? (
              <>
                <Button
                  className={style.navbarButton}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={loginClickHandler}
                >
                  {userInfo.name}{" "}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={menuCloseHandler}
                >
                  <MenuItem onClick={(e) => menuCloseHandler(e, "/profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => menuCloseHandler(e, "/orderHistory")}
                  >
                    Order History
                  </MenuItem>
                  {userInfo.isAdmin && (
                    <MenuItem
                      onClick={(e) => menuCloseHandler(e, "/admin/dashboard")}
                    >
                      Dashboard
                    </MenuItem>
                  )}
                  <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <NextLink href="/login" passHref>
                <Link>
                  {" "}
                  <Typography component="span">Login</Typography>
                </Link>
              </NextLink>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Navbar;
