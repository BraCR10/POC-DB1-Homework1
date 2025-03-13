import { config, ConnectionPool, IResult } from "mssql";
import { config as SQLAuth } from "dotenv";
import { SqlParameters } from "../types/queryParams.type";
import { cp } from "fs";
import { console } from "inspector";

SQLAuth();
let dbListener: any = null;

const dbConfig: config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER || "",
  port: Number(process.env.SQL_PORT) || 1433,
  database: process.env.SQL_DATABASE,
  options: {
    trustServerCertificate: true,
    encrypt: true,
  },
};
export async function initConnection(): Promise<void> {
  try {
    console.log("Connecting to the database...");
    dbListener = new ConnectionPool(dbConfig);
    await dbListener.connect();
  } catch (error) {
    console.log("Connection failed due to: " + error);
    throw error;
  }
}

export async function query(
  storedProcedure: string,
  params: SqlParameters | any,
): Promise<IResult<any>> {
  try {
    
    const request = dbListener.request();
    if (Object.keys(params).length > 0){
      for (const key of Object.keys(params)) {
        const type = params[key][1];
        const value = params[key][0];
        request.input(key, type, value);
        }
    }
    

    const result = await request.execute(storedProcedure);

    return result;
  } catch (error) {
    console.log("Query failed due to: " + error);
    throw error;
  } 
}
