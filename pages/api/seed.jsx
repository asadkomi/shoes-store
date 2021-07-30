import nc from "next-connect";

import db from "../../Backend/database/dbConnect.jsx";
import User from "../../Backend/models/user.jsx";
import data from "../../Backend/data/data.jsx";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);

  res.send({ message: "seeded successfully" });
});

export default handler;
