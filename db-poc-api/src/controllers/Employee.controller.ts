import { Request, Response } from "express";
import EmployeeService from "../services/Employee.service";

export const createEmployee = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, money } = req.body;

    if (!name || name === "") {
      res.status(400).json({ message: "Name is required" });
      return;
    }
    if (!money || money < 0) {
      res.status(400).json({ message: "Valid money value is required" });
      return;
    }

    const response = await EmployeeService.createEmployee(name, money);

    res.status(201).json({ success: true, data: response });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, error: errorMessage });
  }
};

export const getEmployees = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await EmployeeService.getEmployees();
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ success: false, error: errorMessage });
    }
};

export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const response = await EmployeeService.getEmployeeById(Number(id));
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ success: false, error: errorMessage });
    }
};

