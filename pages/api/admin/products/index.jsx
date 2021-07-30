import nc from "next-connect";
import { isAdmin, isAuth } from "../../../../Backend/database/auth.jsx";
import Product from "../../../../Backend/models/product.jsx";
import db from "../../../../Backend/database/dbConnect.jsx";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  res.send(products);
});

handler.post(async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: "sample name",
    slug: "sample-slug-" + Math.random(),
    image: "/images/shirt1.jpg",
    price: 0,
    category: "sample category",
    brand: "sample brand",
    inStock: 0,
    description: "sample description",
    rating: 0,
    reviews: 0,
  });

  const product = await newProduct.save();
  res.send({ message: "Product Created", product });
});

export default handler;
