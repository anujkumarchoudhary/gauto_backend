import express from "express";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  login,
  signUp,
  updateUser,
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/getAll", getAllUser);
router.get("/:id", getSingleUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
