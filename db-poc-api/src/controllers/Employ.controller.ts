import { Request, Response } from "express";
import EmployService from "../services/Employ.service";

export const createEmploy = async (
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

    const response = await EmployService.createEmploy(name, money);

    res.status(201).json({ success: true, data: response });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, error: errorMessage });
  }
};
