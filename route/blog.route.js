import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
} from "../controller/blog.controller.js";
import { Authorization } from "../middleware/authorization.middleware.js";
import upload from "../config/multer.config.js";

const router = express.Router();

router.post("/create", upload.single("image"), createBlog);
router.patch("/:id", upload.single("image"), updateBlog);
router.get("/getAll", getAllBlog);
router.get("/:id", getBlogById);
router.delete("/:id", deleteBlog);

export default router;
