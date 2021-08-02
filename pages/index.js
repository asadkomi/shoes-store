import Layout from "../components/layout/Layout";

import Main from "../components/home/Main.jsx";
import db from "../Backend/database/dbConnect.jsx";
import Product from "../Backend/models/product.jsx";
import { Typography } from "@material-ui/core";

export default function Home(props) {
  const { products, featuredProducts } = props;

  return (
    <Layout>
      <Main products={products} featuredProducts={featuredProducts} />
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProducts = await Product.find(
    { isFeatured: true },
    "-productReviews"
  )
    .lean()
    .limit(3);
  const topRatedProducts = await Product.find({}, "-productReviews")
    .lean()
    .sort({
      rating: -1,
    })
    .limit(6);
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: topRatedProducts.map(db.convertDocToObj),
    },
  };
}
