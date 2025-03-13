import { config, ConnectionPool, IResult, TYPES } from "mssql";
import { config as SQLAuth } from "dotenv";
import { SqlParameters } from "../types/queryParams.type";
import { convertToSqlType } from "../utils/getSqlType";

SQLAuth();

const dbConfig: config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER || '',
  database: process.env.SQL_DATABASE,
  options: {
    trustServerCertificate: true,
    encrypt: true,
  },
};


async function query(storedProcedure: string, params: SqlParameters | any) : Promise<IResult<any>>  {
    let dbListener = null;
    try {
        dbListener = new ConnectionPool(dbConfig);
        await dbListener.connect();
        const request = dbListener.request();
      
   
        for (const key in Object.keys(params)) {
            const param = key;
            const type = convertToSqlType(params[param][0], params[param][1]);
            const value = params[param][1];
            request.input(param, type, value);
        }
        const result = await request.execute(storedProcedure);
      
        return result;
    }
    catch (error) {
        console.log("Query failed due to: " + error);
        throw error; 
    }
    finally {
        if (dbListener) {
            await dbListener.close();
        }
    }
}
 