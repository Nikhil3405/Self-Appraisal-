import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/db"; // Adjust path if needed
import sql from "mssql";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { employeeId, category1, category2, category3,academicYear } = await request.json();

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
      .input("academicYear", sql.NVarChar(10), academicYear)
      .input("totalScore", sql.Int, totalScore)
    //   .input("academicYear", sql.NVarChar(10), academicYear)
      .query(`
        INSERT INTO CategoryScores (EmployeeID, Category1Score, Category2Score, Category3Score, TotalScore,academicyear)
        VALUES (@employeeId, @category1, @category2, @category3, @totalScore,@academicYear)
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
    const facultyId = searchParams.get("facultyId");
    const academicYear = searchParams.get("academicYear");

    const pool = await connectToDatabase();

    let result;
    if (facultyId && academicYear) {
      // ✅ Check if the faculty has already submitted for a given academic year
      result = await pool.request()
        .input("facultyId", facultyId)
        .input("academicYear", academicYear)
        .query(`
          SELECT * FROM CategoryScores
          WHERE EmployeeID = @facultyId AND academicyear = @academicYear
        `);

      const hasSubmitted = result.recordset.length > 0;
      return NextResponse.json({ submitted: hasSubmitted }, { status: 200 });
    } else if (branch) {
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
            cs.TotalScore,
            cs.CommitteeScore,
            cs.academicyear
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
            cs.TotalScore,
            cs.CommitteeScore,
            cs.academicyear
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

export async function PUT(request: Request) {
  try {
    // Parse the request body
    const { employeeId, committeeScore, academicYear } = await request.json();

    // Validate input
    if (!employeeId || committeeScore == null || !academicYear) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const pool = await connectToDatabase();

    const result = await pool.request()
      .input("committeeScore", sql.Int, committeeScore)
      .input("employeeId", sql.NVarChar(20), employeeId)
      .input("academicYear", sql.NVarChar(10), academicYear)
      .query(`
        UPDATE CategoryScores
        SET CommitteeScore = @committeeScore
        WHERE EmployeeID = @employeeId AND academicyear = @academicYear
      `);

    // Check if any rows were affected (in case the record doesn't exist)
    if (result.rowsAffected[0] === 0) {
      return NextResponse.json(
        { error: "Record not found or already up to date" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Committee score updated successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error updating committee score:", (error as Error).message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
