import express from "express";
import {
  createCar,
  deleteCar,
  getAllCar,
  getCarById,
  updateCar,
} from "../controller/car.controller.js";
import { Authorization } from "../middleware/authorization.middleware.js";
import upload from "../config/multer.config.js";

const router = express.Router();

router.post("/create", Authorization, upload.single("image"), createCar);
router.patch("/:id", Authorization, upload.single("image"), updateCar);
router.get("/getAll", Authorization, getAllCar);
router.get("/:id", Authorization, getCarById);
router.delete("/:id", Authorization, deleteCar);

export default router;
