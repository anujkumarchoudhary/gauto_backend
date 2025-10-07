import express from "express";
import {
  createCar,
  deleteCar,
  getAllAggregatedCar,
  getAllCar,
  getCarById,
  updateCar,
} from "../controller/car.controller.js";
import upload from "../config/multer.config.js";
import { Authorization } from "../middleware/authorization.middleware.js";

const router = express.Router();

router.post("/create", Authorization, upload.single("image"), createCar);
router.patch("/:id", Authorization, upload.single("image"), updateCar);
router.get("/getAll", getAllCar);
router.get("/getAggregated", getAllAggregatedCar);
router.get("/:id", Authorization, getCarById);
router.delete("/:id", Authorization, deleteCar);

export default router;
