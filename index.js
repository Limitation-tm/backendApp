import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import {
  loginValidation,
  postCreateValidation,
  productCreateValidation,
  registerValidation,
} from "./validations/validation.js";
import checkAuth from "./utils/checkAuth.js";
import {
  getAllUsersController,
  getMeController,
  loginController,
  registerController,
  updateUserController,
} from "./controllers/UserController.js";
import {
  createPostController,
  deletePostController,
  getAllPostController,
  getOnePostController,
  getUserPostController,
  updatePostController,
} from "./controllers/PostController.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import {
  createProductController,
  deleteProductController,
  getAllProductsController,
  getOneProductController,
  updateProductController,
} from "./controllers/ProductController.js";
import checkAdmin from "./utils/checkAdmin.js";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB ERROR", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, true);
    return cb(new Error("Only png, jpg and jpeg"));
  }
};

const upload = multer({ storage, fileFilter });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("SERVER IS WORKING");
});

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  registerController
);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  loginController
);
app.get("/auth/me", checkAuth, getMeController);

app.get("/users", checkAuth, checkAdmin, getAllUsersController);

app.post(
  "/upload",
  checkAuth,
  checkAdmin,
  upload.single("image"),
  (req, res) => {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  }
);

app.post(
  "/uploaduserimage",
  checkAuth,

  upload.single("image"),
  (req, res) => {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  }
);

app.get("/products", getAllProductsController);

app.get("/products/:id", getOneProductController);

app.post(
  "/products",
  checkAuth,
  checkAdmin,
  productCreateValidation,
  handleValidationErrors,
  createProductController
);

app.delete("/products/:id", checkAuth, checkAdmin, deleteProductController);

app.patch(
  "/products/:id",
  checkAuth,
  checkAdmin,
  handleValidationErrors,
  updateProductController
);

app.get("/posts", checkAuth, checkAdmin, getAllPostController);

app.get(
  "/userposts/",
  checkAuth,
  handleValidationErrors,
  getUserPostController
);

app.get("/posts/:id", checkAuth, checkAdmin, getOnePostController);

app.post(
  "/posts",
  checkAuth,

  postCreateValidation,
  handleValidationErrors,
  createPostController
);

app.delete("/posts/:id", checkAuth, deletePostController);

app.patch(
  "/posts/:id",
  checkAuth,
  checkAdmin,
  handleValidationErrors,
  updatePostController
);

app.patch(
  "/changeuser",
  checkAuth,
  handleValidationErrors,
  updateUserController
);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("SERVER OK");
});
