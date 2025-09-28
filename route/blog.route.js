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

router.post("/create", Authorization, upload.single("image"), createBlog);
router.patch("/:id", Authorization, upload.single("image"), updateBlog);
router.get("/getAll", Authorization, getAllBlog);
router.get("/:id", Authorization, getBlogById);
router.delete("/:id", Authorization, deleteBlog);

export default router;
