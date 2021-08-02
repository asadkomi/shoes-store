import React, { useContext, useState, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useSnackbar } from "notistack";
import Image from "next/image";
import {
  Typography,
  Link,
  Grid,
  List,
  ListItem,
  Card,
  Button,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import Layout from "../../components/layout/Layout.jsx";
import Product from "../../Backend/models/product.jsx";
import db from "../../Backend/database/dbConnect.jsx";
import { Store } from "../../utils/store.jsx";
import styles from "../../styles/style.jsx";
import { getError, onError } from "../../utils/error.js";

const ProductDetails = (props) => {
  const style = styles();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { product } = props;
  const [productReviews, setProductReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `/api/products/${product._id}/reviews`,
        {
          rating,
          comment,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      setLoading(false);
      enqueueSnackbar("Review submitted successfully", { variant: "success" });
      fetchReviews();
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/products/${product._id}/reviews`);
      setProductReviews(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

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
              <Rating value={product.rating} readOnly></Rating>
              <Link href="#reviews">
                <Typography> ({product.reviews} reviews)</Typography>
              </Link>
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
        <List>
          <ListItem>
            <Typography name="reviews" id="reviews" variant="h2">
              Customer Reviews
            </Typography>
          </ListItem>
          {productReviews.length === 0 && <ListItem>No review</ListItem>}
          {productReviews.map((review) => (
            <ListItem key={review._id}>
              <Grid container>
                <Grid item className={style.reviewItem}>
                  <Typography>
                    <strong>{review.name}</strong>
                  </Typography>
                  <Typography>{review.createdAt.substring(0, 10)}</Typography>
                </Grid>
                <Grid item>
                  <Rating value={review.rating} readOnly></Rating>
                  <Typography>{review.comment}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
          <ListItem>
            {userInfo ? (
              <form onSubmit={submitHandler} className={style.reviewForm}>
                <List>
                  <ListItem>
                    <Typography variant="h2">Leave your review</Typography>
                  </ListItem>
                  <ListItem>
                    <TextField
                      multiline
                      variant="outlined"
                      fullWidth
                      name="review"
                      label="Enter comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </ListItem>
                  <ListItem>
                    <Rating
                      name="simple-controlled"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </ListItem>
                  <ListItem>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                    {loading && <CircularProgress></CircularProgress>} 
                  </ListItem>
                </List>
              </form>
            ) : (
              <Typography variant="h2">
                Please{" "}
                <Link href={`/login?redirect=/product/${product.slug}`}>
                  login
                </Link>{" "}
                to write a review
              </Typography>
            )}
          </ListItem>
        </List>
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }, "-productReviews").lean();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}

export default ProductDetails;
