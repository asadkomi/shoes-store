import Layout from "../components/layout/Layout";

import Main from "../components/home/Main.jsx";
import db from "../Backend/database/dbConnect.jsx";
import Product from "../Backend/models/product.jsx";

export default function Home(props) {
  const { products } = props;

  return (
    <Layout>
      <Main products={products} />
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}, "-productReviews").lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
