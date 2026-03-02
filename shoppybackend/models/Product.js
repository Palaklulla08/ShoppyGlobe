// models/Product.js
// Product schema

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   price: { type: Number, required: true, min: 0 },
//   description: { type: String, default: "" },
//   stock: { type: Number, default: 0 },
//   image:{type: String, required: true},
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("Product", productSchema);
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      required: true,
      default: 0
    },
    category: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true   
  }
);

export default mongoose.model("Product", productSchema);