import { TYPES } from 'mssql';
import { SqlTypes } from '../enums/sqlTypes.enum';

export function convertToSqlType(value: string, type: SqlTypes) {
    switch (type) {
        case SqlTypes.STRING:
            return TYPES.VarChar;
        case SqlTypes.NUMBER:
            return TYPES.Int;
        case SqlTypes.BOOLEAN:
            return TYPES.Bit;
        case SqlTypes.DATE:
            return TYPES.DateTime;
        case SqlTypes.NULL:
            return TYPES.VarChar;
        default:
            return TYPES.VarChar;
    }
}