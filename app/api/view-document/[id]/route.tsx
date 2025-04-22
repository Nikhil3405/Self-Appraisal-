// File: app/api/view-document/[id]/route.ts
import { NextResponse } from "next/server";
import sql from "mssql";
import { connectToDatabase } from "../../../../lib/db";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const documentId = params.id;
        if (!documentId) {
            return NextResponse.json({ error: "Document ID is required" }, { status: 400 });
        }

        await connectToDatabase();

        // Fetch document data
        const result = await sql.query`
            SELECT 
                document_id,
                document_title,
                file_type,
                file_data,
                file_name
            FROM teacher_documents 
            WHERE document_id = ${documentId}
        `;

        if (result.recordset.length === 0) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        const document = result.recordset[0];

        // Convert the file data to a Buffer
        const fileBuffer = Buffer.from(document.file_data);

        // Create response with appropriate headers for PDF
        const response = new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                "Content-Type": document.file_type || "application/pdf",
                "Content-Disposition": `inline; filename="${document.file_name}"`,
            },
        });

        return response;
    } catch (error) {
        console.error("Error retrieving document:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}