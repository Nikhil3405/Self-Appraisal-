import { NextResponse } from "next/server";
import sql from "mssql";
import { connectToDatabase } from "../../../lib/db";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const contentType = req.headers.get("content-type");

        // Handle Document Upload
        if (contentType?.includes("multipart/form-data")) {
            const formData = await req.formData();
            const employeeId = formData.get('employeeId') as string;
            const academicYear = formData.get('academicYear') as string;

            if (!employeeId) {
                return NextResponse.json({ error: "Employee ID required" }, { status: 401 });
            }

            if (!academicYear) {
                return NextResponse.json({ error: "Academic Year required" }, { status: 401 });
            }
            const documentType = formData.get('documentType') as string;
            const documentTitle = formData.get('documentTitle') as string;
            const uploadDate = formData.get('uploadDate') as string;
            const remarks = formData.get('remarks') as string;
            const file = formData.get('file') as File;

            if (!documentType || !documentTitle || !file || !uploadDate) {
                return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
            }

            const fileBuffer = Buffer.from(await file.arrayBuffer());
            const fileName = file.name;
            const fileType = file.type;

            // Insert the document into the database
            const result = await sql.query`
                INSERT INTO teacher_documents (
                    employee_id,
                    document_type,
                    document_title,
                    upload_date,
                    file_name,
                    file_type,
                    file_data,
                    remarks,
                    status,
                    academicyear
                ) VALUES (
                    ${employeeId},
                    ${documentType},
                    ${documentTitle},
                    ${uploadDate},
                    ${fileName},
                    ${fileType},
                    ${fileBuffer},
                    ${remarks},
                    'Pending',
                    ${academicYear}
                );
                SELECT SCOPE_IDENTITY() AS id;
            `;

            const documentId = result.recordset[0].id;

            return NextResponse.json({
                message: "Document uploaded successfully",
                document: {
                    id: documentId,
                    documentType,
                    documentTitle,
                    uploadDate,
                    fileName,
                    status: 'Pending'
                }
            }, { status: 200 });
        }

        // Handle Academic Data Submission (JSON)
        const body = await req.json();
        const {
            employeeId,
            academicYear,
            papers,
            chapters,
            books,
            conferencePapers,
            projects,
            patents,
            designPatents,
            copyrights,
            fundProjects,
            guidanceList,
            consultancyWorks,
            programs,
            developedprojects,
            activities,
            data
        } = body;

        if (!employeeId) {
            return NextResponse.json({ error: "Employee ID required" }, { status: 400 });
        }

        // Academic Inserts
        // Using transactions to ensure data integrity
        const transaction = new sql.Transaction();
        await transaction.begin();
        
        try {
            if (papers?.length > 0) {
                for (const p of papers) {
                    await transaction.request().query(`
                        INSERT INTO PublishedJournals
                        (PaperTitle, JournalName, ISSN_ISBN, PeerReviewedOrImpactFactor, NumberOfCoAuthors, IsMainAuthor, JournalType, SelfAppraisalScore, EmployeeID,academicyear)
                        VALUES ('${p.title}', '${p.journalName}', '${p.issnIsbn}', '${p.peerReviewed}', ${p.coAuthors}, '${p.mainAuthor}', '${p.journalType}', ${p.score}, '${employeeId}','${academicYear}')
                    `);
                }
            }

            if (chapters?.length > 0) {
                for (const c of chapters) {
                    await transaction.request().query(`
                        INSERT INTO BookChapterPublications 
                        (BookChapterTitle, PublisherDetails, ISSN_ISBN, NumberOfCoAuthors, IsMainAuthor, SelfAppraisalScore, EmployeeID,academicyear)
                        VALUES ('${c.title}', '${c.publisherDetails}', '${c.issnIsbn}', ${c.coAuthors}, '${c.isMainAuthor}', ${c.score}, '${employeeId}','${academicYear}')
                    `);
                }
            }
            if (books?.length > 0) {
                for (const b of books) {
                    await sql.query`
                    INSERT INTO AuthoredBooks 
                    (BookTitle, PublisherDetails, ISSN_ISBN, NumberOfCoAuthors, PublicationLevel, AuthorRole, SelfAppraisalScore, EmployeeID,academicyear)
                    VALUES (${b.title}, ${b.publisherDetails}, ${b.issnIsbn}, ${b.coAuthors}, ${b.publicationType}, ${b.role}, ${b.score}, ${employeeId},${academicYear})`;
                }
            }

            if (conferencePapers?.length > 0) {
                for (const cp of conferencePapers) {
                    await sql.query`
                    INSERT INTO ConferencePapers 
                    (PaperTitle, ConferenceDetails, ISSN_ISBN, NumberOfCoAuthors, AuthorRole, SelfAppraisalScore, EmployeeID,academicyear)
                    VALUES (${cp.title}, ${cp.conferenceDetails}, ${cp.issnIsbn}, ${cp.coAuthors}, ${cp.authorRole}, ${cp.score}, ${employeeId},${academicYear})`;
                }
            }

            if (projects?.length > 0) {
                for (const pj of projects) {
                    await sql.query`
                    INSERT INTO UGProjects 
                    (ProjectTitle, UGCompletionPercent, PaperPublished, PatentPublished, IsFunded, SelfAppraisalScore, EmployeeID,academicyear)
                    VALUES (${pj.projectTitle}, ${pj.ugPercentageCompletion}, ${pj.hasPaper}, ${pj.hasPatent}, ${pj.hasFunding}, ${pj.score}, ${employeeId},${academicYear})`;
                }
            }

            if (patents?.length > 0) {
                for (const pt of patents) {
                    await sql.query`
                    INSERT INTO PatentStatus 
                    (PatentTitle, FilingDate, PatentType, Status, SelfAppraisalScore, EmployeeID,academicyear)
                    VALUES (${pt.title}, ${pt.date}, ${pt.type}, ${pt.status}, ${pt.score}, ${employeeId},${academicYear})`;
                }
            }

            if (designPatents?.length > 0) {
                for (const dp of designPatents) {
                    await sql.query`
                    INSERT INTO DesignPatents 
                    (DesignTitle, FilingDate, PatentType, Status, SelfAppraisalScore, EmployeeID,academicyear)
                    VALUES (${dp.title}, ${dp.date}, ${dp.type}, ${dp.status}, ${dp.score}, ${employeeId},${academicYear})`;
                }
            }

            if (copyrights?.length > 0) {
                for (const cr of copyrights) {
                    await sql.query`
                    INSERT INTO Copyrights 
                    (CopyrightTitle, RegistrationDate, CopyrightType, SelfAppraisalScore, EmployeeID,academicyear)
                    VALUES (${cr.title}, ${cr.date}, ${cr.type}, ${cr.score}, ${employeeId},${academicYear})`;
                }
            }

            if (fundProjects?.length > 0) {
                for (const fp of fundProjects) {
                    await sql.query`
                    INSERT INTO FundedResearchProjects 
                    (ProjectTitle, FundingAgency, SanctionYear, ProjectPeriod, AmountMobilized, ProjectStatus, SelfAppraisalScore, EmployeeID,academicyear)
                    VALUES (${fp.title}, ${fp.agency}, ${fp.year}, ${fp.period}, ${fp.grant}, ${fp.status}, ${fp.score}, ${employeeId},${academicYear})`;
                }
            }

            if (guidanceList?.length > 0) {
                for (const g of guidanceList) {
                    await sql.query`
                    INSERT INTO ResearchGuidance 
                    (Degree, CandidateName, ThesisTitle, Status, University, SelfAppraisalScore, EmployeeID,academicyear)
                    VALUES (${g.degree}, ${g.candidateName}, ${g.thesisTitle}, ${g.status}, ${g.university}, ${g.score}, ${employeeId},${academicYear})`;
                }
            }

            if (consultancyWorks?.length > 0) {
                for (const cw of consultancyWorks) {
                    await sql.query`
                    INSERT INTO ConsultancyWorks 
                    (ConsultancyTitle, StartDate, EndDate, ClientType, NatureOfWork, Amount, SelfAppraisalScore, EmployeeID,academicyear)
                    VALUES (${cw.title}, ${cw.startDate}, ${cw.endDate}, ${cw.clientType}, ${cw.natureOfWork}, ${cw.amount}, ${cw.score}, ${employeeId},${academicYear})`;
                }
            }

            if (programs?.length > 0) {
                for (const pr of programs) {
                    await sql.query`
                    INSERT INTO FacultyTraining  
                    (ProgramTitle, Duration, OrganizedBy, ProgramType, SelfAppraisalScore, EmployeeID,academicyear)
                    VALUES (${pr.title}, ${pr.duration}, ${pr.organizedBy}, ${pr.type}, ${pr.score}, ${employeeId},${academicYear})`;
                }
            }

            if (developedprojects?.length > 0) {
                for (const dj of developedprojects) {
                    await sql.query`
                    INSERT INTO InnovativeProjects 
                    (ProjectTitle, ProjectStatus, TRLLevel, SelfAppraisalScore, EmployeeID,academicyear)
                    VALUES (${dj.title}, ${dj.status}, ${dj.trl}, ${dj.score}, ${employeeId},${academicYear})`;
                }
            }

            if (activities?.length > 0) {
                for (const ac of activities) {
                    await sql.query`
                    INSERT INTO ProfessionalBodyActivities 
                    (ProfessionalBodyName, ActivityType, SelfAppraisalScore, EmployeeID,academicyear)
                    VALUES (${ac.name}, ${ac.activityType}, ${ac.score}, ${employeeId},${academicYear})`;
                }
            }

            if (data?.length > 0) {
                for (const dt of data) {
                    await sql.query`
                    INSERT INTO DisciplinaryCharges 
                    (Section, Details, Remarks, EmployeeID,academicyear)
                    VALUES (${dt.section}, ${dt.details}, ${dt.remarks}, ${employeeId},${academicYear})`;
                }
            }


            // Commit transaction if everything was successful
            await transaction.commit();
        } catch (error) {
            // Rollback the transaction in case of error
            await transaction.rollback();
            throw error;
        }

        return NextResponse.json({ message: "Data stored successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(req.url);
        const employeeId = searchParams.get('employeeId');
        const academicYear = searchParams.get('academicYear');

        if (!employeeId) {
            return NextResponse.json({ error: "Employee ID required" }, { status: 400 });
        }
        if (!academicYear) {
            return NextResponse.json({ error: "Academic Year required" }, { status: 400 });
        }
        const docResult = await sql.query`
            SELECT 
                document_id as id,
                document_type as documentType,
                document_title as documentTitle,
                FORMAT(upload_date, 'yyyy-MM-dd') as uploadDate,
                file_name as fileName,
                status,
                remarks,
                '/api/view-document/' + CAST(document_id AS VARCHAR(10)) as fileUrl
            FROM teacher_documents
            WHERE employee_id = ${employeeId} AND academicyear = ${academicYear}
            ORDER BY upload_date DESC, document_id DESC`;

        return NextResponse.json({ documents: docResult.recordset }, { status: 200 });

    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}