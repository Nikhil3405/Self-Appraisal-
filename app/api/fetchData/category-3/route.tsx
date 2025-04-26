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
        papers: `
        SELECT * FROM PublishedJournals WHERE EmployeeID = @employeeId and AcademicYear= @academicYear 
        `,
        chapters: `
        SELECT * FROM BookChapterPublications WHERE EmployeeID = @employeeId and AcademicYear= @academicYear
        `,
        books: `
        SELECT * FROM AuthoredBooks WHERE EmployeeID = @employeeId and AcademicYear= @academicYear
        `,
        conferencePapers: `
        SELECT * FROM ConferencePapers WHERE EmployeeID = @employeeId and AcademicYear= @academicYear
        `,
        projects: `
        SELECT * FROM UGProjects WHERE EmployeeID = @employeeId and AcademicYear= @academicYear
        `,
        patents: `
        SELECT * FROM PatentStatus WHERE EmployeeID = @employeeId and AcademicYear= @academicYear
        `,
        designPatents: `
        SELECT * FROM DesignPatents WHERE EmployeeID = @employeeId and AcademicYear= @academicYear
        `,
        copyrights: `
        SELECT * FROM Copyrights WHERE EmployeeID = @employeeId and AcademicYear= @academicYear
        `,
        fundProjects: `
        SELECT * FROM FundedResearchProjects WHERE EmployeeID = @employeeId and AcademicYear= @academicYear
        `,
        guidanceList: `
        SELECT * FROM ResearchGuidance WHERE EmployeeID = @employeeId and AcademicYear= @academicYear
        `,
        consultancyWorks: `
        SELECT * FROM ConsultancyWorks WHERE EmployeeID = @employeeId and AcademicYear= @academicYear
        `,
        programs: `
        SELECT * FROM FacultyTraining WHERE EmployeeID = @employeeId and AcademicYear= @academicYear
        `,
        developedprojects: `
        SELECT * FROM InnovativeProjects WHERE EmployeeID = @employeeId and AcademicYear= @academicYear
        `,
        activities: `
        SELECT * FROM ProfessionalBodyActivities WHERE EmployeeID = @employeeId and AcademicYear= @academicYear
        `,
        data: `
        SELECT * FROM DisciplinaryCharges WHERE EmployeeID = @employeeId and AcademicYear= @academicYear    
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
