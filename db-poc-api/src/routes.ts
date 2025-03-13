import { Router } from "express";
import { createEmployee, getEmployees, getEmployeeById } from "./controllers/Employee.controller";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "API is running" });
});

router.post("/employee", createEmployee);
router.get("/employees", getEmployees);
router.get("/employees:id", getEmployeeById);

export default router;
