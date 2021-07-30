import nc from "next-connect";
import db from "../../../../Backend/database/dbConnect.jsx";
import Order from "../../../../Backend/models/Order.jsx";
import { isAuth } from "../../../../Backend/database/auth.jsx";

const handler = nc();
handler.use(isAuth);
handler.get(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  res.send(order);
});

export default handler;
