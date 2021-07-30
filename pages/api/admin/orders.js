import nc from "next-connect";
import { isAuth, isAdmin } from "../../../Backend/database/auth.jsx";
import { onError } from "../../../utils/error.js";
import db from "../../../Backend/database/dbConnect.jsx";
import Order from "../../../Backend/models/Order.jsx";

const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({}).populate("user", "name");

  res.send(orders);
});

export default handler;
