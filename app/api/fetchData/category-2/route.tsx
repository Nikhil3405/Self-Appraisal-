import { NextResponse } from "next/server";
import sql from "mssql";
import { connectToDatabase } from "../../../../lib/db";

export async function GET(req: Request) { // Use GET for data fetching
  try {
    await connectToDatabase(); // Connection is handled by your function

    const url = new URL(req.url);
    const employeeId = url.searchParams.get("employeeId");
    const academicYear = url.searchParams.get("academicYear"); 
    if (!employeeId && !academicYear) {
      return NextResponse.json(
        { error: "Employee ID and Academic year is required " },
        { status: 400 }
      );
    }

    // Queries with parameterized inputs to prevent SQL Injection
    const queries = {
        activityrecords: `
        SELECT * FROM FacultyActivities WHERE EmployeeID = @employeeId and AcademicYear= @academicYear
      `,
      committeeResponsibilities: `
        SELECT * FROM AcademicResponsibilities WHERE EmployeeID = @employeeId and academicyear= @academicYear
      `,
      articles: `
        SELECT * FROM ArticleContributions WHERE EmployeeID = @employeeId and academicyear= @academicYear
      `,
      outreachResponsibilities: `
        SELECT * FROM AcademicOutreaches WHERE EmployeeID = @employeeId and academicyear= @academicYear
      `,
      seminars: `
        SELECT * FROM EventsArranged WHERE EmployeeID = @employeeId and AcademicYear= @academicYear
      `,
      resourceParticipations: `
        SELECT * FROM ResourcePersonActivities WHERE EmployeeID = @employeeId and academicyear= @academicYear
      `,
      outreachActivities: `
        SELECT * FROM OutreachActivities WHERE EmployeeID = @employeeId and academicyear= @academicYear
      `,
      professionalBodies: `
        SELECT * FROM ProfessionalBodyMemberships WHERE EmployeeID = @employeeId and academicyear= @academicYear
      `,
      fellowships: `
        SELECT * FROM FellowshipsAwards WHERE EmployeeID = @employeeId and academicyear= @academicYear
      `,
      honors: `
        SELECT * FROM HonorsConferred WHERE EmployeeID = @employeeId and academicyear= @academicYear
      `,

    };

    const results: Record<string, sql.IRecordSet<Record<string, unknown>>> = {};

    // Using parameterized queries
    for (const [key, query] of Object.entries(queries)) {
      const ps = new sql.PreparedStatement();
      ps.input('employeeId', sql.VarChar); // Define the parameter type
      ps.input('academicYear', sql.VarChar); // Define the parameter type
      await ps.prepare(query); // Prepare the query
      const result = await ps.execute({ employeeId,academicYear }); // Execute with parameters
      await ps.unprepare(); // Clean up the prepared statement
      results[key] = result.recordset;
    }
    console.log(results); // Log the results for debugging
    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
