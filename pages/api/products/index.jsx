import nc from "next-connect";

import db from "../../../Backend/database/dbConnect.jsx";
import Product from "../../../Backend/models/product.jsx";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  res.send(products);
});

export default handler;

