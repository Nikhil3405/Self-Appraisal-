import { NextResponse } from "next/server";
import sql from "mssql";
import { connectToDatabase } from "../../../../lib/db";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { employeeId, category = "category-2", academicYear, data } = body;

    // Properly handle the data from the frontend
    const jsonData = JSON.stringify(data || {});

    // Check if draft already exists for this employee, category AND academic year
    const result = await sql.query`
      SELECT * FROM Drafts 
      WHERE EmployeeID = ${employeeId} 
      AND Category = ${category}
      AND academicyear = ${academicYear}
    `;

    if (result.recordset.length > 0) {
      // Update existing draft
      await sql.query`
        UPDATE Drafts
        SET Data = ${jsonData}, LastUpdated = GETDATE()
        WHERE EmployeeID = ${employeeId} 
        AND Category = ${category}
        AND academicyear = ${academicYear}
      `;
    } else {
      // Insert new draft
      await sql.query`
        INSERT INTO Drafts (EmployeeID, Category, Data, academicyear)
        VALUES (${employeeId}, ${category}, ${jsonData}, ${academicYear})
      `;
    }

    return NextResponse.json({ message: "Draft saved successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error saving draft:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const employeeId = searchParams.get("employeeId");
    const category = searchParams.get("category") || "category-2";
    const academicYear = searchParams.get("academicYear");

    if (!employeeId) {
      return NextResponse.json({ error: "Missing employeeId" }, { status: 400 });
    }

    if (!academicYear) {
      return NextResponse.json({ error: "Missing academicYear" }, { status: 400 });
    }

    const result = await sql.query`
      SELECT Data FROM Drafts 
      WHERE EmployeeID = ${employeeId} 
      AND Category = ${category} 
      AND academicyear = ${academicYear}
    `;
    
    console.log("Query results:", result.recordset);
    
    if (result.recordset.length > 0) {
      // Parse the stored JSON data
      const parsedData = JSON.parse(result.recordset[0].Data);
      console.log("Returning data:", parsedData);
      
      // Return the data directly without nesting it under 'data'
      return NextResponse.json(parsedData, { status: 200 });
    } else {
      // Return empty data structures that match what the frontend expects
      return NextResponse.json({
        activityrecords: [],
        committeeResponsibilities: [],
        articles: [],
        outreachResponsibilities: [],
        seminars: [],
        resourceParticipations: [],
        outreachActivities: [],
        professionalBodies: [],
        fellowships: [],
        honors: []
      }, { status: 200 });
    }
  } catch (error) {
    console.error("Error retrieving draft:", error);
    return NextResponse.json({ error: "Internal Server Error"}, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { employeeId, category = "category-2", academicYear } = body;

    // Validate input
    if (!employeeId) {
      return NextResponse.json({ error: "Missing employeeId" }, { status: 400 });
    }

    if (!academicYear) {
      return NextResponse.json({ error: "Missing academicYear" }, { status: 400 });
    }

    // Delete the draft from the database
    await sql.query`
      DELETE FROM Drafts 
      WHERE EmployeeID = ${employeeId} 
      AND Category = ${category}
      AND academicyear = ${academicYear}
    `;

    return NextResponse.json({ message: "Draft deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting draft:", error);
    return NextResponse.json({ error: "Internal Server Error"}, { status: 500 });
  }
}