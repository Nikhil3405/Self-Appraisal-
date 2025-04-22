import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/db"; // Assuming you have a connectToDatabase function
import sql from "mssql"; // Import mssql for SQL Server connection
export async function POST(request: Request) {
    try {
        // Parse the request body
        const { userid } = await request.json();

        // Validate input
        if (!userid) {
            return NextResponse.json(
                { error: "userid is required" },
                { status: 400 }
            );
        }

        // Establish database connection
        const pool = await connectToDatabase();
        console.log("Database connected successfully.");

        // Query the database for branch_id, semester, and usn
        const result = await pool.request().input("eid", sql.VarChar, userid) // Pass the `usn` parameter to prevent SQL injection
            .query(`
        SELECT  eid,ename , department,role,designation
        FROM employee_table
        WHERE eid = @eid
      `);
        console.log("Query executed:", result.recordset);

        // Check if USN exists in the database
        const rows = result.recordset;
        if (rows.length === 0) {
            return NextResponse.json(
                { error: "employee not found" },
                { status: 404 }
            );
        }

        // Respond with the query result
        return NextResponse.json(
            { ename: rows[0].ename, department: rows[0].department,role: rows[0].role,eid:rows[0].eid ,designation:rows[0].designation },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in API route:", (error as Error).message);

        // Send an error response
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
