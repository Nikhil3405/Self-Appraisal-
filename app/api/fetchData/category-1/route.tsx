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
      teachingactivities: `
        SELECT * FROM FacultyPerformance WHERE EmployeeID = @employeeId and AcademicYear= @academicYear
      `,
      studentperformance: `
        SELECT * FROM CoursePerformance WHERE EmployeeID = @employeeId and academicyear= @academicYear
      `,
      remedialclass: `
        SELECT * FROM CourseEvaluation WHERE EmployeeID = @employeeId and academicyear= @academicYear
      `,
      teachingmethodology: `
        SELECT * FROM SemesterEvaluation WHERE EmployeeID = @employeeId and academicyear= @academicYear
      `,
      counselingrecord: `
        SELECT * FROM StudentMentorship WHERE EmployeeID = @employeeId and AcademicYear= @academicYear
      `,
      industryinteraction: `
        SELECT * FROM IndustryInteraction WHERE EmployeeID = @employeeId and academicyear= @academicYear
      `,
      industryvisit: `
        SELECT * FROM fieldvisits WHERE EmployeeID = @employeeId and academicyear= @academicYear
      `,
      examduty: `
        SELECT * FROM ExaminationDuties WHERE EmployeeID = @employeeId and academicyear= @academicYear
      `,
      partialdelivery: `
        SELECT * FROM IndustryInvolvement WHERE EmployeeID = @employeeId and academicyear= @academicYear
      `,
      studentfeedback: `
        SELECT * FROM EmployeeFeedback WHERE EmployeeID = @employeeId and academicyear= @academicYear
      `,
      daytodayactivity: `
        SELECT * FROM ActivityRecords WHERE EmployeeID = @employeeId and academicyear= @academicYear
      `,
      miniproject: `
        SELECT * FROM MiniProject WHERE EmployeeID = @employeeId and academicyear= @academicYear
      `,
      academicfile: `
        SELECT * FROM PersonalAcademic WHERE EmployeeID = @employeeId and academicyear= @academicYear
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
