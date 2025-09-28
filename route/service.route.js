import express from "express";
import {
  createService,
  deleteService,
  getAllService,
  getServiceById,
  updateService,
} from "../controller/service.controller.js";
import { Authorization } from "../middleware/authorization.middleware.js";
import upload from "../config/multer.config.js";

const router = express.Router();

router.post("/create", Authorization, upload.single("image"), createService);
router.patch("/:id", Authorization, upload.single("image"), updateService);
router.get("/getAll", Authorization, getAllService);
router.get("/:id", Authorization, getServiceById);
router.delete("/:id", Authorization, deleteService);

export default router;
