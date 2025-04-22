import { NextResponse } from "next/server";
import sql from "mssql";
import { connectToDatabase } from "../../../lib/db";


export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();

        const { employeeId,
            activityrecords,
            committeeResponsibilities,
            articles,
            outreachResponsibilities
            ,seminars,
            resourceParticipations,
            outreachActivities,
            professionalBodies,
            fellowships,
            honors
         } = body;

        // ✅ Insert Teaching Activities (Category A)
        if (activityrecords && activityrecords.length > 0) {
            for (const a of activityrecords) {
                await sql.query`
                    INSERT INTO FacultyActivities
                          (ActivityDetails,ActivityType,SelfAppraisalScore,EmployeeID)
                    VALUES (${a.activityDetails}, ${a.activityType}, ${a.score},${employeeId})
                `;
            }
        }

        // ✅ Insert Student Performance (Category B)
        if (committeeResponsibilities && committeeResponsibilities.length > 0) {
            for (const cr of committeeResponsibilities) {
                await sql.query`
                    INSERT INTO AcademicResponsibilities 
                    (activityType,SelfAppraisalScore,EmployeeID)
                    VALUES (${cr.activityType}, ${cr.score}, ${employeeId})
                `;
            }
        }

        // ✅ Insert Remedial Classes (Category C)
        if (articles && articles.length > 0) {
            for (const ac of articles) {
                await sql.query`
                    INSERT INTO ArticleContributions 
                    (ArticleDetails,DatePublished,SelfAppraisalScore,EmployeeID)                 
      VALUES (${ac.articleDetails}, ${ac.articleDate}, ${ac.score}, ${employeeId})
                `;
            }
        }

        // ✅ Insert Teaching Methodology (Category D)
        if (outreachResponsibilities && outreachResponsibilities.length > 0) {
            for (const et of outreachResponsibilities) {
                await sql.query`
                    INSERT INTO AcademicOutreaches 
      (Responsibility,SelfAppraisalScore,EmployeeID)
                    VALUES (${et.responsibility}, ${et.score}, ${employeeId})
                `;
            }
        }

        //Category E
        if (seminars && seminars.length > 0) {
            for (const sm of seminars) {
                await sql.query`
                    INSERT INTO EventsArranged
      (EventDetails,EventDate,SelfAppraisalScore,EmployeeID)
                          VALUES (${sm.details}, ${sm.date}, ${sm.score}, ${employeeId})
                `;
            }
        }

        //Category F
        if (resourceParticipations && resourceParticipations.length > 0) {
            for (const rp of resourceParticipations) {
                await sql.query`
                    INSERT INTO ResourcePersonActivities
      (EventDetails,EventDate,SelfAppraisalScore,EmployeeID)
      VALUES (${rp.details}, ${rp.date}, ${rp.score}, ${employeeId})
                `;
            }
        }

        //Category G
        if (outreachActivities && outreachActivities.length > 0) {
            for (const oa of outreachActivities) {
                await sql.query`
                    INSERT INTO OutreachActivities
                    (ActivityDetails,ActivityDate,SelfAppraisalScore,EmployeeID)
      VALUES (${oa.details}, ${oa.date},${oa.score}, ${employeeId})
                `;
            }
        }

        //Category H
        if (professionalBodies && professionalBodies.length > 0) {
            for (const pb of professionalBodies) {
                await sql.query`
                    INSERT INTO ProfessionalBodyMemberships
      (activityType,SelfAppraisalScore,EmployeeID)
      VALUES (${pb.activityType}, ${pb.score}, ${employeeId})
                `;
            }
        }

        //Category I
        if (fellowships && fellowships.length > 0) {
            for (const fs of fellowships) {
                await sql.query`
INSERT INTO FellowshipsAwards 
(Awards, SelfAppraisalScore,EmployeeID)
      VALUES (${fs.details},${fs.score},${employeeId})
                `;
            }
        }

        //Category J
        if (honors && honors.length > 0) {
            for (const hr of honors) {
                await sql.query`
INSERT INTO HonorsConferred 
(HonorTitle, ConferredDate, ConferredBy, IsPaid, SelfAppraisalScore,EmployeeID)
                    VALUES (${hr.title},${hr.date},${hr.conferredBy},${hr.unpaid}, ${hr.score},${employeeId})
                `;
            }
        }
        return NextResponse.json({ message: "Data stored successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error storing data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
