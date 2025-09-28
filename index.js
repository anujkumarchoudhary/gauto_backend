import express, { json } from "express";
const app = express();
import dotenv from "dotenv";
import { DbConnect } from "./config/db.js";
import cors from "cors";
import userRoutes from "./route/user.route.js";
import serviceRoutes from "./route/service.route.js";
import memberRoutes from "./route/member.route.js";
import carRoutes from "./route/car.route.js";
import blogRoutes from "./route/blog.route.js";

dotenv.config();
app.use(json());
app.use(cors());

// Routes
app.use("/api/user/", userRoutes);
app.use("/api/service/", serviceRoutes);
app.use("/api/member/", memberRoutes);
app.use("/api/car/", carRoutes);
app.use("/api/blog/", blogRoutes);

(async () => {
  await DbConnect();

  app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
  });
})();
