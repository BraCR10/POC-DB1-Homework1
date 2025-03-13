import { Router } from "express";
import { createEmployee, getEmployees, getEmployeeById,getEmployeesSortedByName } from "./controllers/Employee.controller";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "API is running" });
});

router.post("/employee", createEmployee);
router.get("/employee", getEmployees);
router.get('/employee/:id', getEmployeeById);
router.get('/sorted_employees', getEmployeesSortedByName);

export default router;
