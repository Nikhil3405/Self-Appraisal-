import { NextResponse } from "next/server";
import sql from "mssql";
import { connectToDatabase } from "../../../../lib/db";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { employeeId, category = "category-3", ...data } = body;

    const jsonData = JSON.stringify(data);

    // Check if draft already exists
    const result = await sql.query`
      SELECT * FROM Drafts WHERE EmployeeID = ${employeeId} AND Category = ${category}
    `;

    if (result.recordset.length > 0) {
      // Update existing draft
      await sql.query`
        UPDATE Drafts
        SET Data = ${jsonData}, LastUpdated = GETDATE()
        WHERE EmployeeID = ${employeeId} AND Category = ${category}
      `;
    } else {
      // Insert new draft
      await sql.query`
        INSERT INTO Drafts (EmployeeID, Category, Data)
        VALUES (${employeeId}, ${category}, ${jsonData})
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
    const category = searchParams.get("category") || "category-3";

    if (!employeeId) {
      return NextResponse.json({ error: "Missing employeeId" }, { status: 400 });
    }

    const result = await sql.query`
      SELECT Data FROM Drafts WHERE EmployeeID = ${employeeId} AND Category = ${category}
    `;
    console.log(result.recordset);
    if (result.recordset.length > 0) {
      const data = JSON.parse(result.recordset[0].Data);
      return NextResponse.json({ data }, { status: 200 });
    } else {
      return NextResponse.json({ data: null }, { status: 200 });
    }
  } catch (error) {
    console.error("Error retrieving draft:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { employeeId, category = "category-3" } = body;

    // Validate input
    if (!employeeId) {
      return NextResponse.json({ error: "Missing employeeId" }, { status: 400 });
    }

    // Delete the draft from the database
    await sql.query`
      DELETE FROM Drafts WHERE EmployeeID = ${employeeId} AND Category = ${category}
    `;

    return NextResponse.json({ message: "Draft deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting draft:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
