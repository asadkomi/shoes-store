/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import NextLink from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Carousel from "react-material-ui-carousel";
import Image from "next/image";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Link,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import data from "../../Backend/data/data";
import styles from "../../styles/style";
import { Store } from "../../utils/store.jsx";
const Main = (props) => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { products, featuredProducts } = props;

  const style = styles();

  const addToCardHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.inStock < quantity) {
      window.alert("Sorry! product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });

    router.push("/cart");
  };

  return (
    <div>
      <Grid className={style.mt1} container spacing={1}>
        <Grid md={12} xs={12}>
          <Carousel animation="slide">
            {featuredProducts.map((product) => (
              <NextLink
                key={product._id}
                href={`/product/${product.slug}`}
                passHref
              >
                <Link>
                  <img
                    src={product.featuredImage}
                    alt={product.name}
                    // layout="fill"
                    className={style.image}
                  ></img>
                </Link>
              </NextLink>
            ))}
          </Carousel>
        </Grid>
      </Grid>
      <Typography variant="h2">Popular Shoes</Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item md={4} xs={12} key={product.name}>
            <Card>
              <NextLink href={`/product/${product.slug}`} passHref>
                <CardActionArea>
                  <CardMedia
                    height="400"
                    component="img"
                    image={product.image}
                    title={product.name}
                  ></CardMedia>
                  <CardContent>
                    <Typography>{product.name}</Typography>
                    <Rating value={product.rating} readOnly></Rating>
                  </CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions>
                <Typography>${product.price}</Typography>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => addToCardHandler(product)}
                >
                  +
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Main;
