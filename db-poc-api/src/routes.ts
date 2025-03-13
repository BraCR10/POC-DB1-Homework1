import { Router } from "express";
import { createEmploy } from "./controllers/Employ.controller";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "API is running" });
});

//router.post("/employ", createEmploy);

export default router;
