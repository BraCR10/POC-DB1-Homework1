-- =======================================================
-- Create Stored Procedure Template for Azure SQL Database
-- =======================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <BRACR10>
-- Create Date: <13/3/2025>
-- Description: <Insert Employee>
-- =============================================
CREATE PROCEDURE sp_create_employee
(
	@name VARCHAR(32),
	@salary MONEY
)
AS
BEGIN
    DECLARE @employeeID Int
    SELECT @employeeID = id FROM dbo.Empleado AS Emp WHERE Emp.Nombre = @name
    
    IF (@employeeID IS  NULL)
    BEGIN
        INSERT INTO dbo.Empleado (Nombre, Salario)
        VALUES (@name, @salary)
        
        -- Retun data to backend
        SELECT 
          id AS ID, 
          Nombre AS Name,
          Salario AS Salary
        FROM dbo.Empleado AS Emp
        WHERE Emp.id = SCOPE_IDENTITY()
    END
    ELSE
    BEGIN
      RAISERROR (
        'Error: The employee name "%s" already exists.', 
        16,    -- Severity 
        127,     -- State 
        @name  
      );
    END
END
GO
