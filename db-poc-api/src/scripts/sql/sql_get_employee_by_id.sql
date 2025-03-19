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
CREATE PROCEDURE sp_get_employee_by_id(
	@id INT
)
AS
BEGIN
    -- Retun data to backend
    SELECT 
        E.id AS ID, 
        E.Nombre AS Name, 
        E.Salario AS Salary 
    FROM dbo.Empleado AS E
    WHERE (E.id = @id)
END
GO
