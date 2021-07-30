import nc from "next-connect";
import { isAuth, isAdmin } from "../../../Backend/database/auth.jsx";
import { onError } from "../../../utils/error.js";
import db from "../../../Backend/database/dbConnect.jsx";
import Product from "../../../Backend/models/product.jsx";

const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});

  res.send(products);
});

export default handler;
