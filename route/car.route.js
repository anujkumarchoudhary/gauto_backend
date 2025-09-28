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

router.post("/create", upload.single("image"), createCar);
router.patch("/:id", upload.single("image"), updateCar);
router.get("/getAll", getAllCar);
router.get("/:id", getCarById);
router.delete("/:id", deleteCar);

export default router;
