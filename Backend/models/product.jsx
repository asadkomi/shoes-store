import mongoose from "mongoose";

const product = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    reviews: { type: Number, required: true, default: 0 },
    inStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    featuredImage: { type: String },
    isFeatured: { type: Boolean },
    // , required: true, default: false
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model("Product", product);
export default Product;
