import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/db"; 
import sql from "mssql"; 

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { userid } = await request.json();

    // Validate input
    if (!userid) {
      return NextResponse.json({ error: "userid is required" }, { status: 400 });
    }

    // Establish database connection
    const pool = await connectToDatabase();
    console.log("Database connected successfully.");

    // Query the database
    const result = await pool
      .request()
      .input("eid", sql.VarChar, userid)
      .query(`
        SELECT employeeid, name, department, currentdesignation
        FROM general_information
        WHERE employeeid = @eid
      `);

    console.log("Query executed:", result.recordset);

    const rows = result.recordset;
    if (rows.length === 0) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    const employee = rows[0];

    // Respond with correctly mapped keys
    return NextResponse.json(
      {
        ename: employee.name,
        department: employee.department,
        eid: employee.employeeid,
        designation: employee.currentdesignation
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in API route:", (error as Error).message);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
