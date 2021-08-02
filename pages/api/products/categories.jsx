import nc from "next-connect";

import db from "../../../Backend/database/dbConnect.jsx";
import Product from "../../../Backend/models/product.jsx";

const handler = nc();
handler.get(async (req, res) => {
  await db.connect();
  const categories = await Product.find().distinct("category");

  res.send(categories);
});

export default handler;
