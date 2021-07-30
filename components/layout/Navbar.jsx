import React, { useContext, useState, useEffect } from "react";
import NextLink from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import styles from "../../styles/style.jsx";
import { Store } from "../../utils/store.jsx";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Navbar = () => {
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
    <AppBar position="static" className={style.navbar}>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link>
            <Typography className={style.brand} variant="h6">
              Shoes <span style={{ color: "#982479" }}>Store</span>
            </Typography>
          </Link>
        </NextLink>
        <div className={style.gap}></div>
        <div>
          {/* <Switch
            checked={darkModeState}
            onChange={darkModeChangeHandler}
          ></Switch> */}
          <NextLink href="/cart" passHref>
            <Link>
              {cart.cartItems.length > 0 ? (
                <Badge color="secondary" badgeContent={cart.cartItems.length}>
                  Cart
                </Badge>
              ) : (
                "Cart"
              )}
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
                <MenuItem onClick={(e) => menuCloseHandler(e, "/orderHistory")}>
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
              <Link>Login</Link>
            </NextLink>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
