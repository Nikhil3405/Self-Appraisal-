'use client'
import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface FacultyReviewFormProps {
    facultyName?: string;
    designation?: string;
    department?: string;
    submitForm?: (formData: FacultyReviewData) => void;
}

interface FacultyReviewData {
    facultyName: string;
    designation: string;
    department: string;
    genuineClaims: string;
    satisfiedWithHoD: string;
    agreementWithHoD: string;
    generalObservations: string;
    specialCharacteristics: string;
    reportDuration: string;
}

const FacultyReviewForm: React.FC<FacultyReviewFormProps> = ({
    facultyName = '',
    designation = '',
    department = '',
    submitForm
}) => {
    const [formData, setFormData] = useState<FacultyReviewData>({
        facultyName,
        designation,
        department,
        genuineClaims: '',
        satisfiedWithHoD: '',
        agreementWithHoD: '',
        generalObservations: '',
        specialCharacteristics: '',
        reportDuration: ''
    });

    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitForm?.(formData);
    };

    const generatePDF = async () => {
        if (!formRef.current) return;
        setIsGeneratingPDF(true);

        try {
            const formElement = formRef.current;
            const container = document.createElement('div');
            container.className = 'pdf-container bg-white p-8 w-[800px]';

            const clone = formElement.cloneNode(true) as HTMLElement;
            clone.querySelectorAll('button').forEach(button => button.remove());
            container.appendChild(clone);
            document.body.appendChild(container);

            const canvas = await html2canvas(container, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            document.body.removeChild(container);

            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const imgRatio = canvas.width / canvas.height;

            pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, (pdfWidth - 20) / imgRatio);
            pdf.save(`faculty_review_${formData.facultyName.replace(/\s+/g, '_')}.pdf`);
        } catch (error) {
            console.error('PDF generation error:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <div ref={formRef} className="space-y-8">
                <header className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-blue-600 mb-2">PART - D</h1>
                    <h2 className="text-xl font-semibold text-gray-700">
                        REMARKS OF REVIEWING AUTHORITY (PRINCIPAL)
                    </h2>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <section className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Name of the faculty member
                                </label>
                                <input
                                    type="text"
                                    name="facultyName"
                                    value={formData.facultyName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Designation
                                </label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Department
                                </label>
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {[
                            {
                                number: 1,
                                question: "Are the claims of the faculty genuine and needs further encouragement/promotion?",
                                name: "genuineClaims",
                                rows: 3
                            },
                            {
                                number: 2,
                                question: "Does reviewing authority satisfied with the assessment given by HoD, keeping all related parameters with care.",
                                name: "satisfiedWithHoD",
                                rows: 3
                            },
                            {
                                number: 3,
                                question: "Do you agree or disagree with the assessment of the HoD? Is there anything you will modify or add?",
                                name: "agreementWithHoD",
                                rows: 3
                            },
                            {
                                number: 4,
                                question: "General Observations with specific comments about the general claims and remarks given by HoD and remark about the outstanding work of the faculty.",
                                name: "generalObservations",
                                rows: 4
                            },
                            {
                                number: 5,
                                question: "Does the faculty has any special characteristics and/or any outstanding work or ability which would justify his/her advancement? If yes, please mention the characteristic briefly.",
                                name: "specialCharacteristics",
                                rows: 3
                            },
                            {
                                number: 6,
                                question: "Duration of report",
                                name: "reportDuration",
                                rows: 1
                            }
                        ].map((section) => (
                            <div key={section.number} className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    <span className="text-blue-600 mr-2">{section.number}.</span>
                                    {section.question}
                                </label>
                                {section.rows > 1 ? (
                                    <textarea
                                        name={section.name}
                                        value={formData[section.name as keyof FacultyReviewData]}
                                        onChange={handleChange}
                                        rows={section.rows}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        name={section.name}
                                        value={formData[section.name as keyof FacultyReviewData]}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                )}
                            </div>
                        ))}
                    </section>

                    <div className="pt-8 border-t border-gray-200">
                        <div className="text-center space-y-2">
                            <div className="text-sm font-medium text-gray-600">Reviewing Authority</div>
                            <div className="text-lg font-semibold text-blue-600">(PRINCIPAL)</div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
                <button
                    type="button"
                    onClick={generatePDF}
                    disabled={isGeneratingPDF}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-emerald-400 transition-colors flex items-center justify-center gap-2"
                >
                    {isGeneratingPDF ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating PDF...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Generate PDF
                        </>
                    )}
                </button>

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Submit Review
                </button>
            </div>
        </div>
    );
};

export default FacultyReviewForm;