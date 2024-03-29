import nc from "next-connect";
import { isAdmin, isAuth } from "../../../../../Backend/database/auth.jsx";
import Product from "../../../../../Backend/models/product.jsx";
import db from "../../../../../Backend/database/dbConnect.jsx";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  res.send(product);
});

handler.put(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    product.name = req.body.name;
    product.slug = req.body.slug;
    product.price = req.body.price;
    product.category = req.body.category;
    product.image = req.body.image;
    product.featuredImage = req.body.featuredImage;
    product.isFeatured = req.body.isFeatured;
    product.brand = req.body.brand;
    product.inStock = req.body.inStock;
    product.description = req.body.description;
    await product.save();
    res.send({ message: "Product Updated Successfully" });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    await product.remove();

    res.send({ message: "Product Deleted" });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

export default handler;
