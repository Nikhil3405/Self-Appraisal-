import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/db"; // Assuming you have a connectToDatabase function
import sql from "mssql";

export async function POST(request: Request) {
    try {
        // Parse the request body
        const { department } = await request.json();

        // Validate input
        if (!department) {
            return NextResponse.json(
                { error: "department is required" },
                { status: 400 }
            );
        }

        // Establish database connection
        const pool = await connectToDatabase();
        console.log("Database connected successfully.");

        // Build the SQL query
        const query = `
SELECT 
    eid AS facultyId,
    ename AS facultyName
FROM 
    employee_table 
WHERE 
    department=@department
`;

        // Query the database with parameters
        const requestQuery = pool
            .request()
            .input("department", sql.VarChar, department);

        const result = await requestQuery.query(query);

        console.log("Query executed:", result.recordset);

        // Check if there are any rows in the result
        const rows = result.recordset;
        if (rows.length === 0) {
            return NextResponse.json({ error: "No data found" }, { status: 404 });
        }

        // Respond with the query result
        return NextResponse.json({ stud: rows }, { status: 200 });
    } catch (error) {
        console.error("Error in API route:", (error as Error).message);

        // Send an error response
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
