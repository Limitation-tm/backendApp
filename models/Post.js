import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    // adress: {
    //   type: String,
    //   requared: true,
    // },

    // viewsCount: {
    //   type: Number,
    //   default: 0,
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: {
      type: Array,
      requared: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    delivery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    // product: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Product",
    //   required: true,
    // },
    // imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
