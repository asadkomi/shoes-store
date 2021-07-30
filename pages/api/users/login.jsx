import nc from "next-connect";
import { signToken } from "../../../Backend/database/auth.jsx";
import db from "../../../Backend/database/dbConnect.jsx";
import User from "../../../Backend/models/user.jsx";
import bcrypt from "bcryptjs";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
});

export default handler;
