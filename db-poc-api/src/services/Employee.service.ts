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
    const maxRetries = 5;
    let retryCount = 0;
    let delay = 1000; 
  
    while (retryCount < maxRetries) {
      try {
        const response = await query("sp_get_all_employees", {});
        
        if (!response || !response.recordset) {
          retryCount++;
          if (retryCount >= maxRetries) {
            throw new Error("Database is unreachable");
          }
          
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; 
          continue;
        }
  
        if (response.recordset.length > 0) {
          return response.recordset;
        } else {
          throw new Error("No employees found");
        }
      } catch (error) {
        retryCount++;
        
        if (retryCount >= maxRetries) {
          console.error("Error many attempts:", error);
          throw new Error(`An error occurred after ${maxRetries} attempts: ${error}`);
        }
        
        console.log(`Attempt ${retryCount}/${maxRetries} failed, re-trying ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
    throw new Error("Error fetching employees");
  }

  async getEmployeeById(id: number): Promise<Employee> {
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
      console.error("Error details:", error);
      throw new Error(`An error occurred while fetching the employee: ${error}`);
    }
  }

  async getEmployeesSortedByName(): Promise<Employee[]> {
    try {
      const response = await query("sp_get_all_employees", {});

      if (!response.recordset) {
        throw new Error("No employees data returned from the database.");
      }
  
      return response.recordset.sort((a, b) => a.Name.localeCompare(b.Name));
    } catch (error) {
      console.error("Error details:", error);
      throw new Error(`An error occurred while fetching the employs: ${error}`);
    }
  }
}

export default new EmployeeService();
