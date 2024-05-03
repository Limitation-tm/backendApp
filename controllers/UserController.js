import UserModel from "../models/User.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },

      "secret123",
      { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to register",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return req.status(400).json({
        message: "User is not finded",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPass) {
      return res.status(404).json({
        message: "Pass is not right",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },

      "secret123",
      { expiresIn: "30d" }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    res.status(500).json({
      message: "Failed to sign in",
    });
  }
};

export const getMeController = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    res.status(500).json({
      message: "Error",
    });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await UserModel.find();

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get users ",
    });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const userId = req.userId;
    UserModel.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        avatarUrl: req.body.avatarUrl,
      }
    )
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: "Article not found",
          });
        }

        res.json({ success: true });
      })
      .catch((err) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Error return article",
          });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get posts ",
    });
  }
};
