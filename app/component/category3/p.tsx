import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
interface ScannedDocument {
    id?: number;
    documentType: string;
    documentTitle: string;
    uploadDate: string;
    fileUrl: string;
    fileName?: string;
    status: "Pending" | "Verified" | "Rejected";
    remarks: string;
}

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    document: ScannedDocument | null;
}
interface FacultyInfo {
    eid: string;
    name: string;
    branch: string;
    loginType: "faculty" | "hod" | "committee";
  }
// Popup component for confirmation after upload
const UploadSuccessPopup = ({ isOpen, onClose, document }: PopupProps) => {
    if (!isOpen || !document) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-indigo-600">Upload Successful</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="mb-4">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    <p className="text-gray-700 mb-2">Your document has been uploaded successfully.</p>

                    <div className="bg-gray-50 p-3 rounded">
                        <p className="font-medium text-gray-700">Document Details:</p>
                        <p><span className="font-medium">Title:</span> {document.documentTitle}</p>
                        <p><span className="font-medium">Type:</span> {document.documentType}</p>
                        <p><span className="font-medium">Date:</span> {document.uploadDate}</p>
                        <p><span className="font-medium">Status:</span> {document.status}</p>
                    </div>
                </div>

                <div className="flex justify-end space-x-2">
                    <a
                        href={document.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
                    >
                        View Document
                    </a>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// Document viewer popup
const DocumentViewerPopup = ({ isOpen, onClose, document }: PopupProps) => {
    if (!isOpen || !document) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full h-5/6 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-indigo-600">{document.documentTitle}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 mb-4 overflow-hidden">
                    <iframe
                        src={document.fileUrl}
                        className="w-full h-full border-0 rounded"
                        title={document.documentTitle}
                    />
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Type:</span> {document.documentType} |
                            <span className="font-medium"> Uploaded:</span> {document.uploadDate} |
                            <span className="font-medium"> Status:</span> <span className={`px-2 py-1 rounded-full text-xs font-medium ${document.status === "Verified" ? "bg-green-100 text-green-800" :
                                    document.status === "Rejected" ? "bg-red-100 text-red-800" :
                                        "bg-yellow-100 text-yellow-800"
                                }`}>{document.status}</span>
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <a
                            href={document.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
                        >
                            Open in New Tab
                        </a>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Delete confirmation popup
const DeleteConfirmationPopup = ({ isOpen, onClose, document, onConfirm }: PopupProps & { onConfirm: () => void }) => {
    if (!isOpen || !document) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-red-600">Confirm Deletion</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="mb-6">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-red-100 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                    </div>

                    <p className="text-gray-700 mb-2 text-center">Are you sure you want to delete this document?</p>

                    <div className="bg-gray-50 p-3 rounded">
                        <p className="font-medium text-gray-700">Document Details:</p>
                        <p><span className="font-medium">Title:</span> {document.documentTitle}</p>
                        <p><span className="font-medium">Type:</span> {document.documentType}</p>
                    </div>

                    <p className="text-red-600 text-sm mt-3">This action cannot be undone.</p>
                </div>

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function TeacherDocumentUpload() {
    const [isUploading, setIsUploading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [documents, setDocuments] = useState<ScannedDocument[]>([]);
    const router = useRouter();
    const [alert, setAlert] = useState<{ type: "success" | "error", message: string } | null>(null);
    const [newDocument, setNewDocument] = useState<ScannedDocument>({
        documentType: "Certificate",
        documentTitle: "",
        uploadDate: new Date().toISOString().split("T")[0],
        fileUrl: "",
        status: "Pending",
        remarks: ""
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadPopupOpen, setUploadPopupOpen] = useState(false);
    const [viewPopupOpen, setViewPopupOpen] = useState(false);
    const [deletePopupOpen, setDeletePopupOpen] = useState(false);
    const [currentDocument, setCurrentDocument] = useState<ScannedDocument | null>(null);
    const [employeeId, setEmployeeId] = useState<string>("");
    const [academicYear, setAcademicYear] = useState<string>("");
    const [facultyInfo, setFacultyInfo] = useState<FacultyInfo | null>(null);

    // Get employee ID from session storage when component mounts
    useEffect(() => {
        const storedData = sessionStorage.getItem("record");
        const employeeId = sessionStorage.getItem("employeeId");
        const academicYear = sessionStorage.getItem("academicYear");
        if (storedData) {
          setFacultyInfo(JSON.parse(storedData)); // Parse the stored data
        } 
        if(employeeId){
          setEmployeeId(employeeId);
        }
        if(academicYear){
          setAcademicYear(academicYear);
        }
        else if(!storedData || !employeeId || !academicYear){
            console.log("No data found");
        }
      }, [router]);
      console.log("Academic Year Problem: ", academicYear);
    // Load existing documents when component mounts or employee ID changes

    const documentTypes = [
        "Certificate",
        "Degree",
        "Publication",
        "ID Card",
        "Resume/CV",
        "Appraisal Document",
        "Research Paper",
        "Other"
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewDocument(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const showAlert = (type: "success" | "error", message: string) => {
        setAlert({ type, message });
        // Auto-dismiss after 3 seconds
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    };

    useEffect(() => {
        
        const loadDocuments = async () => {
            if (!employeeId || !academicYear) return;
    
            try {
                const response = await fetch(`/api/category-3?employeeId=${employeeId}&academicYear=${academicYear}`);
                if (!response.ok) throw new Error('Failed to load documents');
    
                const data = await response.json();
                setDocuments(data.documents || []);
            } catch (error) {
                console.error('Error loading documents:', error);
                showAlert("error", "Failed to load documents");
            }
        };
        if (employeeId && academicYear) {
            loadDocuments();
        }
    }, [employeeId, academicYear]);

    const openViewPopup = (document: ScannedDocument) => {
        setCurrentDocument(document);
        setViewPopupOpen(true);
    };

    const openDeletePopup = (document: ScannedDocument) => {
        setCurrentDocument(document);
        setDeletePopupOpen(true);
    };

    const deleteDocument = async () => {
        if (!currentDocument || !currentDocument.id) return;

        setIsDeleting(true);

        try {
            const response = await fetch(`/api/delete-document/${currentDocument.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ employeeId })
            });

            if (!response.ok) {
                throw new Error("Failed to delete document");
            }

            // Remove from local state
            setDocuments(prev => prev.filter(doc => doc.id !== currentDocument.id));
            showAlert("success", "Document deleted successfully");
            setDeletePopupOpen(false);
        } catch (error) {
            console.error("Delete error:", error);
            showAlert("error", "Failed to delete document");
        } finally {
            setIsDeleting(false);
        }
    };

    const uploadDocument = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFile) {
            showAlert("error", "Please select a file to upload");
            return;
        }

        if (!employeeId) {
            showAlert("error", "Employee ID not found. Please log in again.");
            return;
        }

        if (!newDocument.documentTitle.trim()) {
            showAlert("error", "Document title is required");
            return;
        }

        // Check file size (2MB max)
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes
        if (selectedFile.size > maxSize) {
            showAlert("error", "File size exceeds 2MB limit");
            return;
        }

        // Check file type (PDF only)
        if (!selectedFile.type.includes('pdf')) {
            showAlert("error", "Only PDF files are accepted");
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("documentType", newDocument.documentType);
            formData.append("documentTitle", newDocument.documentTitle);
            formData.append("uploadDate", newDocument.uploadDate);
            formData.append("remarks", newDocument.remarks);
            formData.append("status", newDocument.status);
            formData.append("employeeId", employeeId);
            formData.append("academicYear", academicYear);

            const response = await fetch("/api/category-3", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const savedDoc = await response.json();

            // Create document object for local state
            const newDocumentWithUrl: ScannedDocument = {
                ...newDocument,
                id: savedDoc.document.id || Date.now(), // Use returned ID or fallback
                fileUrl: `/api/view-document/${savedDoc.document.id || ""}`, // Construct URL for viewing
                fileName: savedDoc.document.fileName || selectedFile.name,
                uploadDate: savedDoc.document.uploadDate || newDocument.uploadDate,
            };

            setDocuments(prev => [...prev, newDocumentWithUrl]);

            // Set current document and open popup
            setCurrentDocument(newDocumentWithUrl);
            setUploadPopupOpen(true);

            showAlert("success", "Document uploaded successfully");

            // Reset form
            setNewDocument({
                documentType: "Certificate",
                documentTitle: "",
                uploadDate: new Date().toISOString().split("T")[0],
                fileUrl: "",
                status: "Pending",
                remarks: ""
            });
            setSelectedFile(null);

            const fileInput = document.getElementById("file-upload") as HTMLInputElement;
            if (fileInput) fileInput.value = "";

        } catch (error) {
            showAlert("error", "Failed to upload document");
            console.error("Upload error:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-indigo-600 mb-6">Supporting Documents</h2>

            {alert && (
                <div className={`mb-4 p-4 rounded ${alert.type === "success" ? "bg-green-100 text-green-800 border border-green-400" : "bg-red-100 text-red-800 border border-red-400"}`}>
                    {alert.message}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="documentType" className="block text-sm font-medium text-gray-700 mb-1">
                        Document Type
                    </label>
                    <select
                        id="documentType"
                        name="documentType"
                        value={newDocument.documentType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {documentTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="documentTitle" className="block text-sm font-medium text-gray-700 mb-1">
                        Document Title*
                    </label>
                    <input
                        type="text"
                        id="documentTitle"
                        name="documentTitle"
                        value={newDocument.documentTitle}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">
                        Upload PDF Document*
                    </label>
                    <input
                        type="file"
                        id="file-upload"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Accepted format: PDF (Max size: 2MB)
                    </p>
                </div>

                <div>
                    <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">
                        Remarks (Optional)
                    </label>
                    <textarea
                        id="remarks"
                        name="remarks"
                        value={newDocument.remarks}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={uploadDocument}
                    disabled={isUploading}
                    className={`px-4 py-2 rounded text-white ${isUploading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
                >
                    {isUploading ? "Uploading..." : "Upload Document"}
                </button>
            </div>

            <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Uploaded Documents</h3>

                {documents.length === 0 ? (
                    <div className="bg-gray-50 p-4 rounded text-center">
                        <p className="text-gray-500 italic">No documents uploaded yet</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left border-b">ID</th>
                                    <th className="px-4 py-2 text-left border-b">Document Type</th>
                                    <th className="px-4 py-2 text-left border-b">Title</th>
                                    <th className="px-4 py-2 text-left border-b">Upload Date</th>
                                    <th className="px-4 py-2 text-left border-b">Status</th>
                                    <th className="px-4 py-2 text-center border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border-b">{doc.id}</td>
                                        <td className="px-4 py-2 border-b">{doc.documentType}</td>
                                        <td className="px-4 py-2 border-b">{doc.documentTitle}</td>
                                        <td className="px-4 py-2 border-b">{doc.uploadDate}</td>
                                        <td className="px-4 py-2 border-b">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${doc.status === "Verified" ? "bg-green-100 text-green-800" :
                                                    doc.status === "Rejected" ? "bg-red-100 text-red-800" :
                                                        "bg-yellow-100 text-yellow-800"
                                                }`}>
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 border-b text-center">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={() => openViewPopup(doc)}
                                                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                                                >
                                                    View
                                                </button>
                                                {doc.status === "Pending" && (
                                                    <button
                                                        onClick={() => openDeletePopup(doc)}
                                                        className="text-red-600 hover:text-red-800 font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Upload Success Popup */}
            <UploadSuccessPopup
                isOpen={uploadPopupOpen}
                onClose={() => setUploadPopupOpen(false)}
                document={currentDocument}
            />

            {/* Document Viewer Popup */}
            <DocumentViewerPopup
                isOpen={viewPopupOpen}
                onClose={() => setViewPopupOpen(false)}
                document={currentDocument}
            />

            {/* Delete Confirmation Popup */}
            <DeleteConfirmationPopup
                isOpen={deletePopupOpen}
                onClose={() => setDeletePopupOpen(false)}
                document={currentDocument}
                onConfirm={deleteDocument}
            />
        </div>
    );
}