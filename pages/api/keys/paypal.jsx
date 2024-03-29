import nc from "next-connect";
import { isAuth } from "../../../Backend/database/auth.jsx";

const handler = nc();
handler.use(isAuth);
handler.get(async (req, res) => {
  res.send(process.env.PAYPAL_ID || "sb");
});

export default handler;
