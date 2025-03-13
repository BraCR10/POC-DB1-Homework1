import { Employ } from "../models/Employ";
import { query } from "../config/db.config";
import { TYPES } from "mssql";
import { SqlParameters } from "../types/queryParams.type";

export async function createEmploy(
  name: string,
  money: number,
): Promise<Employ> {
  if (!name || typeof name !== "string") {
    throw new Error("Invalid name");
  }
  if (!money || money < 0) {
    throw new Error("Invalid salary value");
  }

  const params: SqlParameters = {
    nombre: [name, TYPES.VarChar],
    salario: [money.toString(), TYPES.Money],
  };

  try {
    const response = await query("createEmploy", params);

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
