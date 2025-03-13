import { TYPES } from "mssql";

// param name : [value, type]
export type SqlParameters = Record<string, [string, typeof TYPES]>;
