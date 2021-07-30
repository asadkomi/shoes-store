import nc from "next-connect";
import { isAuth } from "../../../Backend/database/auth.jsx";
import db from "../../../Backend/database/dbConnect.jsx";
import Order from "../../../Backend/models/Order.jsx";
import { onError } from "../../../utils/error.js";

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.post(async (req, res) => {
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: req.user._id,
  });
  const order = await newOrder.save();
  res.status(201).send(order);
});

export default handler;
