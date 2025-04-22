import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/db"; // Adjust path if needed
import sql from "mssql";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { employeeId, category1, category2, category3 } = await request.json();

    // Validate input
    if (!employeeId || category1 == null || category2 == null || category3 == null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Calculate total score
    const totalScore = category1 + category2 + category3;

    // Connect to the database
    const pool = await connectToDatabase();

    // Insert into the CategoryScores table
    await pool.request()
      .input("employeeId", sql.NVarChar(20), employeeId)
      .input("category1", sql.Int, category1)
      .input("category2", sql.Int, category2)
      .input("category3", sql.Int, category3)
      .input("totalScore", sql.Int, totalScore)
    //   .input("academicYear", sql.NVarChar(10), academicYear)
      .query(`
        INSERT INTO CategoryScores (EmployeeID, Category1Score, Category2Score, Category3Score, TotalScore)
        VALUES (@employeeId, @category1, @category2, @category3, @totalScore)
      `);

    return NextResponse.json({ message: "Score inserted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error inserting scores:", (error as Error).message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const branch = searchParams.get("branch");

    const pool = await connectToDatabase();

    let result;
    if (branch) {
      // Fetch faculty of specific branch
      result = await pool.request()
        .input("branch", branch)
        .query(`
          SELECT 
            cs.EmployeeID,
            gi.Name,
            cs.Category1Score,
            cs.Category2Score,
            cs.Category3Score,
            cs.TotalScore
          FROM 
            CategoryScores cs
          INNER JOIN 
            general_information gi
          ON 
            cs.EmployeeID = gi.EmployeeID
          WHERE 
            gi.Department = @branch
        `);
    } else {
      // Fetch all faculty (no branch filtering)
      result = await pool.request()
        .query(`
          SELECT 
            cs.EmployeeID,
            gi.Name,
            cs.Category1Score,
            cs.Category2Score,
            cs.Category3Score,
            cs.TotalScore
          FROM 
            CategoryScores cs
          INNER JOIN 
            general_information gi
          ON 
            cs.EmployeeID = gi.EmployeeID
        `);
    }

    return NextResponse.json(result.recordset, { status: 200 });

  } catch (error) {
    console.error("Error fetching scores:", (error as Error).message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
