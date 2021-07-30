import Order from "../../../../Backend/models/Order.jsx";
import onError from "../../../../utils/error.js";
import nc from "next-connect";
import db from "../../../../Backend/database/dbConnect.jsx";
import { isAuth } from "../../../../Backend/database/auth.jsx";

const handler = nc({
  onError,
});
handler.use(isAuth);
handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const deliveredOrder = await order.save();

    res.send({ message: "order delivered", order: deliveredOrder });
  } else {
    res.status(404).send({ message: "order not found" });
  }
});

export default handler;
