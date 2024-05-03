import { body } from "express-validator";

export const registerValidation = [
  body("email", "Format is not right").isEmail(),
  body("password", "Password should be min 5 symbol").isLength({ min: 5 }),
  body("fullName", "Name is not right").isLength({ min: 2 }),
  body("avatarUrl", " The URL is not right").optional().isString(),
];

export const loginValidation = [
  body("email", "Format is not right").isEmail(),
  body("password", "Password should be min 5 symbol").isLength({ min: 5 }),
];

export const postCreateValidation = [
  // body("adress", "Enter title text").isLength({ min: 2 }).isString(),
  // body("products", "Enter Text").isLength({ min: 3 }).isString(),
  body("products", "Incorrect tag format").optional().isArray(),

  // body("imageUrl", "Wrong image link").optional().isURL(),
];

export const productCreateValidation = [
  body("imageUrl").optional().isString(),
  body("title").isLength({ min: 2 }).isString(),
  body("typeListId").optional().isArray(),
  body("sizeList").optional().isArray(),
  body("price").isNumeric(),
  body("category").isNumeric(),
];
