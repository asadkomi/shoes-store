import nc from "next-connect";
import { isAdmin, isAuth } from "../../../../../Backend/database/auth.jsx";
import User from "../../../../../Backend/models/user.jsx";
import db from "../../../../../Backend/database/dbConnect.jsx";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);

  res.send(user);
});

handler.put(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    user.name = req.body.name;
    user.isAdmin = Boolean(req.body.isAdmin);
    await user.save();

    res.send({ message: "User Updated Successfully" });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    await user.remove();

    res.send({ message: "User Deleted" });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

export default handler;
