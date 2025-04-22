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

            if (!employeeId) {
                return NextResponse.json({ error: "Employee ID required" }, { status: 401 });
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
                    status
                ) VALUES (
                    ${employeeId},
                    ${documentType},
                    ${documentTitle},
                    ${uploadDate},
                    ${fileName},
                    ${fileType},
                    ${fileBuffer},
                    ${remarks},
                    'Pending'
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
                        (PaperTitle, JournalName, ISSN_ISBN, PeerReviewedOrImpactFactor, NumberOfCoAuthors, IsMainAuthor, JournalType, SelfAppraisalScore, EmployeeID)
                        VALUES ('${p.title}', '${p.journalName}', '${p.issnIsbn}', '${p.peerReviewed}', ${p.coAuthors}, '${p.mainAuthor}', '${p.journalType}', ${p.score}, '${employeeId}')
                    `);
                }
            }

            if (chapters?.length > 0) {
                for (const c of chapters) {
                    await transaction.request().query(`
                        INSERT INTO BookChapterPublications 
                        (BookChapterTitle, PublisherDetails, ISSN_ISBN, NumberOfCoAuthors, IsMainAuthor, SelfAppraisalScore, EmployeeID)
                        VALUES ('${c.title}', '${c.publisherDetails}', '${c.issnIsbn}', ${c.coAuthors}, '${c.isMainAuthor}', ${c.score}, '${employeeId}')
                    `);
                }
            }
            if (books?.length > 0) {
                for (const b of books) {
                    await sql.query`
                    INSERT INTO AuthoredBooks 
                    (BookTitle, PublisherDetails, ISSN_ISBN, NumberOfCoAuthors, PublicationLevel, AuthorRole, SelfAppraisalScore, EmployeeID)
                    VALUES (${b.title}, ${b.publisherDetails}, ${b.issnIsbn}, ${b.coAuthors}, ${b.publicationType}, ${b.role}, ${b.score}, ${employeeId})`;
                }
            }

            if (conferencePapers?.length > 0) {
                for (const cp of conferencePapers) {
                    await sql.query`
                    INSERT INTO ConferencePapers 
                    (PaperTitle, ConferenceDetails, ISSN_ISBN, NumberOfCoAuthors, AuthorRole, SelfAppraisalScore, EmployeeID)
                    VALUES (${cp.title}, ${cp.conferenceDetails}, ${cp.issnIsbn}, ${cp.coAuthors}, ${cp.authorRole}, ${cp.score}, ${employeeId})`;
                }
            }

            if (projects?.length > 0) {
                for (const pj of projects) {
                    await sql.query`
                    INSERT INTO UGProjects 
                    (ProjectTitle, UGCompletionPercent, PaperPublished, PatentPublished, IsFunded, SelfAppraisalScore, EmployeeID)
                    VALUES (${pj.projectTitle}, ${pj.ugPercentageCompletion}, ${pj.hasPaper}, ${pj.hasPatent}, ${pj.hasFunding}, ${pj.score}, ${employeeId})`;
                }
            }

            if (patents?.length > 0) {
                for (const pt of patents) {
                    await sql.query`
                    INSERT INTO PatentStatus 
                    (PatentTitle, FilingDate, PatentType, Status, SelfAppraisalScore, EmployeeID)
                    VALUES (${pt.title}, ${pt.date}, ${pt.type}, ${pt.status}, ${pt.score}, ${employeeId})`;
                }
            }

            if (designPatents?.length > 0) {
                for (const dp of designPatents) {
                    await sql.query`
                    INSERT INTO DesignPatents 
                    (DesignTitle, FilingDate, PatentType, Status, SelfAppraisalScore, EmployeeID)
                    VALUES (${dp.title}, ${dp.date}, ${dp.type}, ${dp.status}, ${dp.score}, ${employeeId})`;
                }
            }

            if (copyrights?.length > 0) {
                for (const cr of copyrights) {
                    await sql.query`
                    INSERT INTO Copyrights 
                    (CopyrightTitle, RegistrationDate, CopyrightType, SelfAppraisalScore, EmployeeID)
                    VALUES (${cr.title}, ${cr.date}, ${cr.type}, ${cr.score}, ${employeeId})`;
                }
            }

            if (fundProjects?.length > 0) {
                for (const fp of fundProjects) {
                    await sql.query`
                    INSERT INTO FundedResearchProjects 
                    (ProjectTitle, FundingAgency, SanctionYear, ProjectPeriod, AmountMobilized, ProjectStatus, SelfAppraisalScore, EmployeeID)
                    VALUES (${fp.title}, ${fp.agency}, ${fp.year}, ${fp.period}, ${fp.grant}, ${fp.status}, ${fp.score}, ${employeeId})`;
                }
            }

            if (guidanceList?.length > 0) {
                for (const g of guidanceList) {
                    await sql.query`
                    INSERT INTO ResearchGuidance 
                    (Degree, CandidateName, ThesisTitle, Status, University, SelfAppraisalScore, EmployeeID)
                    VALUES (${g.degree}, ${g.candidateName}, ${g.thesisTitle}, ${g.status}, ${g.university}, ${g.score}, ${employeeId})`;
                }
            }

            if (consultancyWorks?.length > 0) {
                for (const cw of consultancyWorks) {
                    await sql.query`
                    INSERT INTO ConsultancyWorks 
                    (ConsultancyTitle, StartDate, EndDate, ClientType, NatureOfWork, Amount, SelfAppraisalScore, EmployeeID)
                    VALUES (${cw.title}, ${cw.startDate}, ${cw.endDate}, ${cw.clientType}, ${cw.natureOfWork}, ${cw.amount}, ${cw.score}, ${employeeId})`;
                }
            }

            if (programs?.length > 0) {
                for (const pr of programs) {
                    await sql.query`
                    INSERT INTO FacultyTraining  
                    (ProgramTitle, Duration, OrganizedBy, ProgramType, SelfAppraisalScore, EmployeeID)
                    VALUES (${pr.title}, ${pr.duration}, ${pr.organizedBy}, ${pr.type}, ${pr.score}, ${employeeId})`;
                }
            }

            if (developedprojects?.length > 0) {
                for (const dj of developedprojects) {
                    await sql.query`
                    INSERT INTO InnovativeProjects 
                    (ProjectTitle, ProjectStatus, TRLLevel, SelfAppraisalScore, EmployeeID)
                    VALUES (${dj.title}, ${dj.status}, ${dj.trl}, ${dj.score}, ${employeeId})`;
                }
            }

            if (activities?.length > 0) {
                for (const ac of activities) {
                    await sql.query`
                    INSERT INTO ProfessionalBodyActivities 
                    (ProfessionalBodyName, ActivityType, SelfAppraisalScore, EmployeeID)
                    VALUES (${ac.name}, ${ac.activityType}, ${ac.score}, ${employeeId})`;
                }
            }

            if (data?.length > 0) {
                for (const dt of data) {
                    await sql.query`
                    INSERT INTO DisciplinaryCharges 
                    (Section, Details, Remarks, EmployeeID)
                    VALUES (${dt.section}, ${dt.details}, ${dt.remarks}, ${employeeId})`;
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

        if (!employeeId) {
            return NextResponse.json({ error: "Employee ID required" }, { status: 400 });
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
            WHERE employee_id = ${employeeId}
            ORDER BY upload_date DESC, document_id DESC`;

        return NextResponse.json({ documents: docResult.recordset }, { status: 200 });

    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}