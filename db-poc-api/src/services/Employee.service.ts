import { Employee } from "../models/Employee";
import { query } from "../config/db.config";
import { TYPES } from "mssql";
import { SqlParameters } from "../types/queryParams.type";

class EmployeeService {
  async createEmployee(name: string, money: number): Promise<Employee> {
    const params: SqlParameters = {
      name: [name, TYPES.VarChar],
      salary: [money.toString(), TYPES.Money],
    };

    try {
      const response = await query("sp_create_employee", params);

      if (response.recordset.length > 0) {
        return response.recordset[0];
      } else {
        throw new Error("Employ was not created");
      }
    } catch (error) {
      console.error("Error details:", error);
      throw new Error(`An error occurred while creating the employ: ${error}`);
    }
  }

  async getEmployees(): Promise<Employee[]> {
    try {
      const response = await query("sp_get_all_employees", {});
      if (response.recordset) {
        return response.recordset;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error("Error fetching the data.");
    }
  }

  async getEmployeeById(id: number): Promise<Employee[]> {
    if (!id || id < 1) {
      throw new Error("Invalid id");
    }

    const params: SqlParameters = {
      id: [id.toString(), TYPES.Int],
    };

    try {
      const response = await query("sp_get_employee_by_id", params);
      if (response.recordset && response.recordset.length > 0) {
        return response.recordset[0];
      } else {
        throw new Error("Employee not found");
      }
    } catch (error) {
      throw new Error("Error fetching the data.");
    }
  }

  async getEmployeesSortedByName(): Promise<Employee[]> {
    try {
      const response = await query("sp_get_all_employees", {});
      if (response.recordset) {
        return response.recordset.sort((a, b) => a.Name.localeCompare(b.Name));
      } else {
        return [];
      }
    } catch (error) {
      throw new Error("Error fetching the data.");
    }
  }
}

export default new EmployeeService();
