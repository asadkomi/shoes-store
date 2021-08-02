import mongoose from "mongoose";
import nc from "next-connect";
import db from "../../../../Backend/database/dbConnect.jsx";
import Product from "../../../../Backend/models/product.jsx";
import { isAuth } from "../../../../Backend/database/auth.jsx";
import { onError } from "../../../../utils/error.js";

const handler = nc({
  onError,
});

handler.get(async (req, res) => {
  db.connect();
  const product = await Product.findById(req.query.id);

  if (product) {
    res.send(product.productReviews);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

handler.use(isAuth).post(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    const existReview = product.productReviews.find(
      (x) => x.user == req.user._id
    );
    if (existReview) {
      await Product.updateOne(
        { _id: req.query.id, "productReviews._id": existReview._id },
        {
          $set: {
            "productReviews.$.comment": req.body.comment,
            "productReviews.$.rating": Number(req.body.rating),
          },
        }
      );

      const updatedProduct = await Product.findById(req.query.id);
      updatedProduct.reviews = updatedProduct.productReviews.length;
      updatedProduct.rating =
        updatedProduct.productReviews.reduce((a, c) => c.rating + a, 0) /
        updatedProduct.productReviews.length;
      await updatedProduct.save();

      return res.send({ message: "Review updated" });
    } else {
      const review = {
        user: mongoose.Types.ObjectId(req.user._id),
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.productReviews.push(review);
      product.reviews = product.productReviews.length;
      product.rating =
        product.productReviews.reduce((a, c) => c.rating + a, 0) /
        product.productReviews.length;
      await product.save();
      await res.status(201).send({
        message: "Review submitted",
      });
    }
  } else {
    await res.status(404).send({ message: "Product Not Found" });
  }
});

export default handler;
