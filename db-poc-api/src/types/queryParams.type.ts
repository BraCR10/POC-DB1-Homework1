import { SqlTypes } from "../enums/sqlTypes.enum";

// param name : [value, type]
export type SqlParameters = Record<string, [string, SqlTypes]>;
