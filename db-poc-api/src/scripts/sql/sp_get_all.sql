-- =======================================================
-- Create Stored Procedure Template for Azure SQL Database
-- =======================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <BRAC10>
-- Create Date: <13/3/2025>
-- Description: <Get all employees>
-- =============================================
CREATE PROCEDURE sp_get_all_employees
AS
BEGIN
    -- Retun data to backend
    SELECT 
        E.id AS ID, 
        E.Nombre AS Name, 
        E.Salario AS Salary 
    FROM dbo.Empleado AS E
    ORDER BY E.id
END
GO
