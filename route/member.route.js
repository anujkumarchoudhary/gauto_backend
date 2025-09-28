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

router.post("/create", Authorization, upload.single("image"), createMember);
router.patch("/:id", Authorization, upload.single("image"), updateMember);
router.get("/getAll", Authorization, getAllMember);
router.get("/:id", Authorization, getMemberById);
router.delete("/:id", Authorization, deleteMember);

export default router;
