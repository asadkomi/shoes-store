import nc from "next-connect";
import db from "../../../../Backend/database/dbConnect.jsx";
import Product from "../../../../Backend/models/product.jsx";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  res.send(product);
});

export default handler;
