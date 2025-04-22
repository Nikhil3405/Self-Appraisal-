// File: app/api/delete-document/[id]/route.ts
import { NextResponse } from "next/server";
import sql from "mssql";
import { connectToDatabase } from "../../../../lib/db";

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const documentId = params.id;
        if (!documentId) {
            return NextResponse.json({ error: "Document ID is required" }, { status: 400 });
        }

        // Get employee ID from request body for authorization
        const body = await req.json();
        const { employeeId } = body;

        if (!employeeId) {
            return NextResponse.json({ error: "Employee ID required" }, { status: 401 });
        }

        await connectToDatabase();

        // First, check if the document belongs to the employee and is in Pending status
        const checkResult = await sql.query`
            SELECT document_id, status, employee_id 
            FROM teacher_documents 
            WHERE document_id = ${documentId}
        `;

        if (checkResult.recordset.length === 0) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        const document = checkResult.recordset[0];

        // Security check - ensure the document belongs to this employee
        if (document.employee_id !== employeeId) {
            return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
        }

        // Only allow deletion of documents with "Pending" status
        if (document.status !== 'Pending') {
            return NextResponse.json(
                { error: "Only documents with 'Pending' status can be deleted" },
                { status: 400 }
            );
        }

        // Delete the document
        await sql.query`
            DELETE FROM teacher_documents 
            WHERE document_id = ${documentId} AND employee_id = ${employeeId}
        `;

        return NextResponse.json({ message: "Document deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting document:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}