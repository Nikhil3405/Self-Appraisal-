import { connectToDatabase } from "../../../lib/db";

export async function POST() {
    try {
        // Get database pool
        const pool = await connectToDatabase();

        // Define SQL query with named parameter
        const departmentQuery = `
SELECT 
    b.brcode_title AS departmentName,
    COUNT(DISTINCT e.eid) AS totalTeachers,
    e.department AS department
FROM 
    branch b
INNER JOIN
    employee_table e ON b.brcode = e.department
GROUP BY 
    b.brcode_title, e.department
    `;

        // Create request and set input parameter
        const request = pool.request();

        // Execute the query
        const result = await request.query(departmentQuery);
        console.log(result);
        // Handle empty result set
        if (!result.recordset || result.recordset.length === 0) {
            return new Response(
                JSON.stringify({ error: "No data found." }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        // Return successful response
        return new Response(JSON.stringify({ data: result.recordset }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching feedback:", error.message);
        } else {
            console.error("Error fetching feedback:", error);
        }
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
