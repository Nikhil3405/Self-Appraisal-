import { NextResponse } from "next/server";
import sql from "mssql";
import { connectToDatabase } from "../../../lib/db";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const {
      employeeId,
      teachingactivities,
      studentperformance,
      remedialclass,
      teachingmethodology,
      counselingrecord,
      industryinteraction,
      industryvisit,
      examduty,
      partialdelivery,
      studentfeedback,
      daytodayactivity,
      miniproject,
      academicfile,
      academicYear,
    } = body;

    // Insert (same as your logic)
    // ... your existing insert logic here (no changes needed) ...
    // ✅ Insert Teaching Activities (Category A)
    if (teachingactivities && teachingactivities.length > 0) {
        for (const q of teachingactivities) {
            await sql.query`
                INSERT INTO FacultyPerformance 
                (AcademicYear, Semester, CourseCode, Level, TeachingMode, ClassesPerWeek, SelfAppraisalScore, EmployeeID)
                VALUES (${q.academicYear}, ${q.semester}, ${q.courseCode}, ${q.level}, ${q.mode}, ${q.classesPerWeek}, ${q.score}, ${employeeId})
            `;
        }
    }

    // ✅ Insert Student Performance (Category B)
    if (studentperformance && studentperformance.length > 0) {
        for (const sp of studentperformance) {
            await sql.query`
                INSERT INTO CoursePerformance 
                (CourseName, CourseCode, StudentsRegistered, StudentsPassed, NotEligibleStudents, PassPercentage, SelfAppraisalScore, EmployeeID,academicyear)
                VALUES (${sp.course}, ${sp.courseCode}, ${sp.studentsRegistered}, ${sp.studentsPassed}, ${sp.notEligible}, ${sp.passPercentage}, ${sp.score}, ${employeeId},${academicYear})
            `;
        }
    }

    // ✅ Insert Remedial Classes (Category C)
    if (remedialclass && remedialclass.length > 0) {
        for (const rc of remedialclass) {
            await sql.query`
                INSERT INTO CourseEvaluation 
                (Semester, CourseType,CourseName, CourseCode, TotalClasses, TotalHoursSpent, SelfAppraisalScore, EmployeeID,ClassType,academicyear)
                VALUES (${rc.semester}, ${rc.type},${rc.course}, ${rc.courseCode}, ${rc.numberOfClasses}, ${rc.hoursSpent}, ${rc.score}, ${employeeId},${rc.classtype},${academicYear})
            `;
        }
    }

    // ✅ Insert Teaching Methodology (Category D)
    if (teachingmethodology && teachingmethodology.length > 0) {
        for (const tm of teachingmethodology) {
            await sql.query`
                INSERT INTO SemesterEvaluation 
                (Semester, ShortDescription, SelfAppraisalScore, EmployeeID,course,academicyear)
                VALUES (${tm.semester}, ${tm.description}, ${tm.score}, ${employeeId},${tm.course},${academicYear})
            `;
        }
    }

    //Category E
    if (counselingrecord && counselingrecord.length > 0) {
        for (const cr of counselingrecord) {
            await sql.query`
                INSERT INTO StudentMentorship
                (Semester, AcademicYear, StudentsMentored, ActionTaken, Outcome, SelfAppraisalScore, EmployeeID)
                VALUES (${cr.semester}, ${cr.academicYear}, ${cr.studentsMentored}, ${cr.actionTaken}, ${cr.outcome}, ${cr.score}, ${employeeId})
            `;
        }
    }

    //Category F
    if (industryinteraction && industryinteraction.length > 0) {
        for (const i of industryinteraction) {
            await sql.query`
                INSERT INTO IndustryInteraction
  (IndustryName,IndustryContactDetails,InteractionDate,ActivitiesPlanned,SelfAppraisalScore,EmployeeID,academicyear)
  VALUES (${i.industryName}, ${i.contactDetails}, ${i.date}, ${i.activitiesPlanned}, ${i.score}, ${employeeId},${academicYear})
            `;
        }
    }

    //Category G
    if (industryvisit && industryvisit.length > 0) {
        for (const iv of industryvisit) {
            await sql.query`
                INSERT INTO fieldvisits
  (sem,industryname,visitdate,numberofstudents,outcome,SelfAppraisalScore,EmployeeID,academicyear)
  VALUES (${iv.semester}, ${iv.industryName}, ${iv.date}, ${iv.studentsCount}, ${iv.outcome},${iv.score}, ${employeeId},${academicYear})
            `;
        }
    }

    //Category H
    if (examduty && examduty.length > 0) {
        for (const ed of examduty) {
            await sql.query`
                INSERT INTO ExaminationDuties
         (ExamDutyType,DutiesAssigned,Squad,RoomInvigilation,Relief,DCS,BOE,Invigilation,Coordination,QuestionPaperSetting,SelfAppraisalScore,EmployeeID,academicyear)
  VALUES (${ed.dutyType}, ${ed.duties}, ${ed.squad}, ${ed.roomInvigilation}, ${ed.relief},${ed.dcs}, ${ed.boe},
  ${ed.invigilation},${ed.coordination},${ed.questionPaperSetting},${ed.score},${employeeId},${academicYear})
            `;
        }
    }

    //Category I
    if (partialdelivery && partialdelivery.length > 0) {
        for (const pd of partialdelivery) {
            await sql.query`
                INSERT INTO IndustryInvolvement
  (IndustryExpert,Course,DeliveryDate,SelfAppraisalScore,EmployeeID,academicyear)
  VALUES (${pd.industryExpert}, ${pd.course},${pd.date},${pd.score},${employeeId},${academicYear})
            `;
        }
    }

    //Category J
    if (studentfeedback && typeof studentfeedback.score === "string") {
        await sql.query`
          INSERT INTO EmployeeFeedback
            (score, EmployeeID,academicyear)
          VALUES (${studentfeedback.score}, ${employeeId},${academicYear})
        `;
      }
      

    //Category K
    if (daytodayactivity && daytodayactivity.length > 0) {
        for (const da of daytodayactivity) {
            await sql.query`
                INSERT INTO ActivityRecords
                (Particulars,SelfAppraisalScore,EmployeeID,academicyear)
                VALUES (${da.particulars}, ${da.score},${employeeId},${academicYear})
            `;
        }
    }
    //Category L
    if (miniproject && miniproject.length > 0) {
        for (const m of miniproject) {
            await sql.query`
                INSERT INTO MiniProject
                (Particulars,SelfAppraisalScore,EmployeeID,academicyear)
                VALUES (${m.particulars}, ${m.score},${employeeId},${academicYear})
            `;
        }
    }
    //Category M
    if (academicfile && academicfile.length > 0) {
        for (const a of academicfile) {
            await sql.query`
                INSERT INTO PersonalAcademic
                (Details,SelfAppraisalScore,EmployeeID,academicyear)
                VALUES (${a.details}, ${a.score},${employeeId},${academicYear})
            `;
        }
    }

    return NextResponse.json({ message: "Data stored successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error storing data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

