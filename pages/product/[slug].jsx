import React, { useContext } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import {
  Typography,
  Link,
  Grid,
  List,
  ListItem,
  Card,
  Button,
} from "@material-ui/core";

import Layout from "../../components/layout/Layout.jsx";
import Product from "../../Backend/models/product.jsx";
import db from "../../Backend/database/dbConnect.jsx";
import { Store } from "../../utils/store.jsx";
import styles from "../../styles/style.jsx";

const ProductDetails = (props) => {
  const style = styles();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { product } = props;

  if (!product) {
    return <div>Product Not Found</div>;
  }

  const addToCardHandler = async () => {
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
    <Layout title={product.name} description={product.description}>
      <div className="mt-4 mb-4">
        <NextLink href="/" passHref>
          <Link>
            <Typography>Back home</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.imag}
            width={600}
            height={800}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category : {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand : {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating : {product.rating} stars ({product.reviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography> Description : {product.brand} </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>In Stock</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.inStock > 0 ? "In stock" : "Out of stock"}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCardHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}

export default ProductDetails;
