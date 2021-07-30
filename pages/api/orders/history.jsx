import nc from "next-connect";
import Order from "../../../Backend/models/Order.jsx";
import { isAuth } from "../../../Backend/database/auth.jsx";
import db from "../../../Backend/database/dbConnect.jsx";
import { onError } from "../../../utils/error.js";

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

export default handler;
