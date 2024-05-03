import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requared: true,
    },
    // text: {
    //   type: String,
    //   requared: true,
    //   unique: true,
    // },
    typeListId: {
      type: Array,
      default: [],
    },
    sizeList: {
      type: Array,
      default: [],
    },
    price: {
      type: Number,
      requared: true,
    },
    category: {
      type: Number,
      requared: true,
    },
    rating: {
      type: Number,
      default: 5,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: String,
  },
  { tymeStamps: true }
);

export default mongoose.model("Product", ProductSchema);
