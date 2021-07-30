import nc from "next-connect";
import { isAdmin, isAuth } from "../../../../Backend/database/auth.jsx";
import User from "../../../../Backend/models/user.jsx";
import db from "../../../../Backend/database/dbConnect.jsx";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const users = await User.find({});
  res.send(users);
});

export default handler;
