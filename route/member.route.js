import express from "express";
import {
  createMember,
  deleteMember,
  getAllMember,
  getMemberById,
  updateMember,
} from "../controller/member.controller.js";
import { Authorization } from "../middleware/authorization.middleware.js";
import upload from "../config/multer.config.js";

const router = express.Router();

router.post("/create", upload.single("image"), createMember);
router.patch("/:id", upload.single("image"), updateMember);
router.get("/getAll", getAllMember);
router.get("/:id", getMemberById);
router.delete("/:id", deleteMember);

export default router;
