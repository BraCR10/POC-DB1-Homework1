export interface Employee {
  ID: number;
  Name: string;
  Salary: number;
}

export async function getEmployees(): Promise<Employee[]> {
  try {
    console.log("Fetching employee data");
    const response = await fetch(
      "https://employeesapi-beta.vercel.app/api/employee",
    );
    if (!response.ok) {
      console.log(response);
      throw new Error("Employee data not found");
    }
    const employees = await response.json();
    console.log("Employee data found");
    return employees.data;
  } catch (e) {
    console.log("Employee data not found ${e}");
    if (e instanceof Error) {
      throw new Error("Employee data not found: " + e.message);
    } else {
      throw new Error("Employee data not found");
    }
  }
}
