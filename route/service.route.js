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

router.post("/create", upload.single("image"), createService);
router.patch("/:id", upload.single("image"), updateService);
router.get("/getAll", getAllService);
router.get("/:id", getServiceById);
router.delete("/:id", deleteService);

export default router;
