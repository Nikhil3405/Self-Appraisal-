import { NextResponse } from "next/server";
import sql from "mssql";
import { connectToDatabase } from "../../../lib/db";


export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();

        const {
            name,
            employeeId,
            department,
            designation,
            dateOfJoining,
            mobile,
            email,
            address,
            qualifications,
            experience,
        } = body;

        // Insert general information
        await sql.query`
            INSERT INTO general_information 
            (Name, EmployeeId, Department, CurrentDesignation, DateOfJoining, MobileNo, EmailID, AddressForCorrespondence)
            VALUES (${name}, ${employeeId}, ${department}, ${designation}, ${dateOfJoining}, ${mobile}, ${email}, ${address})
        `;

        // Insert qualifications
        for (const q of qualifications) {
            await sql.query`
                INSERT INTO EmployeeQualifications 
                (EmployeeId, Degree, Specialization, University, YearOfAward, ClassObtained)
                VALUES (${employeeId}, ${q.degree}, ${q.specialization}, ${q.university}, ${q.yearOfAward}, ${q.classObtained})
            `;
        }

        // Insert experience
        for (const exp of experience) {
            const [years, months] = exp.yearsAndMonths.split(" ").map(Number);
            await sql.query`
                INSERT INTO ExperienceDetails 
                (EmployeeId, PositionHeld, Years, Months, Institution, Remarks)
                VALUES (${employeeId}, ${exp.position}, ${years || 0}, ${months || 0}, ${exp.institution}, ${exp.remarks})
            `;
        }

        return NextResponse.json({ message: "Data stored successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error storing data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        await connectToDatabase();

        const url = new URL(req.url);
        const employeeId = url.searchParams.get("employeeId");
        if (!employeeId) {
            return NextResponse.json({ error: "Employee ID required" }, { status: 400 });
        }

        // Fetch general information
        const generalInfo = await sql.query`
            SELECT * FROM general_infromation WHERE EmployeeId = ${employeeId}
        `;

        // Fetch qualifications
        const qualifications = await sql.query`
            SELECT * FROM EmployeeQualifications WHERE EmployeeId = ${employeeId}
        `;

        // Fetch experience
        const experience = await sql.query`
            SELECT * FROM ExperienceDetails WHERE EmployeeId = ${employeeId}
        `;

        return NextResponse.json({
            generalInfo: generalInfo.recordset[0] || {},
            qualifications: qualifications.recordset || [],
            experience: experience.recordset || [],
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
