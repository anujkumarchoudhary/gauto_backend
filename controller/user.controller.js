import mongoose from "mongoose";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const data = req.body;
  const { email, phone, password } = data;

  try {
    const user = await User.findOne({ $or: [{ email }, { phone }] });

    if (user) {
      return res.status(409).json({
        status: "error",
        data: data,
        message: "User phone or email already exit",
      });
    }
    const hatchedPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...data,
      password: hatchedPass,
    });
    await newUser.save();
    return res.status(201).json({
      status: "success",
      data: data,
      message: "User Register successfully!",
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return res
        .status(401)
        .json({ status: 401, message: "Credential not valid" });
    }
    if (!process.env.SECRET_CODE) {
      console.log("SECRET_CODE is missing!");
    }
    const token = await jwt.sign({ id: user._id }, process.env.SECRET_CODE, {
      expiresIn: "7d",
    });

    return res
      .status(200)
      .json({ status: 200, message: "Login successfully!", token });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ status: 500, message: "internal server error" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();

    return res
      .status(200)
      .json({ status: "success", message: "all users", data: users });
  } catch (error) {
    console.log("error", error);
  }
};

export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid Obj Id" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    return res.status(201).json({
      status: "success",
      message: "User Register successfully!",
      user,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const updateUser = async (req, res) => {
  const data = req.body;
  const { email, password } = data;
  const { id } = req.params;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found!" });
    }
    const hatchedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...data, password: hatchedPassword },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "User Register successfully!", updatedUser });
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteUser = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await User.find({ email });

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found!" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    return res
      .status(201)
      .json({ message: "User deleted successfully!", deletedUser });
  } catch (error) {
    console.log("error", error);
  }
};
