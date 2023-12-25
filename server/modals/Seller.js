const mongoose = require("mongoose");

// Define the schema for the seller
const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create a model for the seller schema
const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;
