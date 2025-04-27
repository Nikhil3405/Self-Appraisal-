'use client';
import React, { useState, useRef, ChangeEvent } from 'react';

interface FormData {
    facultyName: string;
    designation: string;
    department: string;
    question1: string;
    question2: string;
    question3: string;
    question4: string;
    question5: string;
    reportDuration: string;
    date: string;
    principalName: string;
}

const FacultyReviewForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        facultyName: '',
        designation: '',
        department: '',
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
        reportDuration: '',
        date: '',
        principalName: ''
    });

    const formRef = useRef<HTMLFormElement>(null);
    const printRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData({
            facultyName: '',
            designation: '',
            department: '',
            question1: '',
            question2: '',
            question3: '',
            question4: '',
            question5: '',
            reportDuration: '',
            date: '',
            principalName: ''
        });
    };

    const handlePrint = () => {
        try {
            const printWindow = window.open("", "_blank");

            if (printWindow) {
                printWindow.document.write(`
                   
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Faculty Review Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.5;
            font-size: 12px;
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            border: 1px solid #ddd;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #00366e;
            padding-bottom: 10px;
        }
        .header h1 {
            font-size: 16px;
            margin: 5px 0;
            color: #00366e;
        }
        .faculty-info {
            margin-bottom: 20px;
            background-color: #f9f9f9;
            padding: 10px;
            border-radius: 5px;
        }
        .info-row {
            display: flex;
            margin-bottom: 10px;
        }
        .label {
            min-width: 180px;
            font-weight: bold;
            padding-right: 10px;
        }
        .value {
            border-bottom: 1px solid #aaa;
            flex-grow: 1;
            padding: 2px 5px;
            min-height: 18px;
        }
        .questions {
            margin: 20px 0;
        }
        .question {
            margin-bottom: 25px;
            page-break-inside: avoid;
            border-left: 3px solid #00366e;
            padding-left: 10px;
        }
        .question-text {
            font-weight: bold;
            margin-bottom: 8px;
        }
        .question .number {
            background-color: #00366e;
            color: white;
            padding: 2px 6px;
            border-radius: 50%;
            margin-right: 8px;
            font-size: 11px;
        }
        .answer {
            margin-top: 8px;
            padding: 8px;
            min-height: 40px;
            border: 1px solid #ddd;
            border-radius: 3px;
            background-color: #fff;
        }
        .footer {
            margin-top: 30px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            border-top: 1px solid #ddd;
            padding-top: 15px;
        }
        .signature {
            text-align: center;
        }
        .signature-line {
            border-top: 1px solid #000;
            width: 200px;
            margin: 40px auto 5px;
        }
        @media print {
            body {
                margin: 0;
                font-size: 11px;
            }
            .container {
                border: none;
                box-shadow: none;
                padding: 10px;
            }
            .header h1 {
                font-size: 14px;
            }
            .question {
                margin-bottom: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>PART - D</h1>
            <h1>REMARKS OF REVIEWING AUTHORITY (PRINCIPAL)</h1>
        </div>

        <div class="faculty-info">
            <div class="info-row">
                <div class="label">Name of the faculty member:</div>
                <div class="value" id="facultyName">${formData.facultyName}</div>
            </div>
            <div class="info-row">
                <div class="label">Designation:</div>
                <div class="value" id="designation">${formData.designation}</div>
            </div>
            <div class="info-row">
                <div class="label">Department:</div>
                <div class="value" id="department">${formData.department}</div>
            </div>
        </div>

        <div class="questions">
            <div class="question">
                <div class="question-text"><span class="number">1</span>Are the claims of the faculty genuine and needs further encouragement/promotion?</div>
                <div class="answer" id="question1">${formData.question1}</div>
            </div>
            <div class="question">
                <div class="question-text"><span class="number">2</span>Does reviewing authority satisfied with the assessment given by HoD, keeping all related parameters with care?</div>
                <div class="answer" id="question2">${formData.question2}</div>
            </div>
            <div class="question">
                <div class="question-text"><span class="number">3</span>Do you agree or disagree with the assessment of the HoD? Is there anything you will modify or add?</div>
                <div class="answer" id="question3">${formData.question3}</div>
            </div>
            <div class="question">
                <div class="question-text"><span class="number">4</span>General Observations with specific comments about the general claims and remarks given by HoD and remark about the outstanding work of the faculty.</div>
                <div class="answer" id="question4">${formData.question4}</div>
            </div>
            <div class="question">
                <div class="question-text"><span class="number">5</span>Does the faculty have any special characteristics and/or any outstanding work or ability which would justify his/her advancement? If yes, please mention the characteristic briefly.</div>
                <div class="answer" id="question5">${formData.question5}</div>
            </div>
            <div class="question">
                <div class="question-text"><span class="number">6</span>Duration of report</div>
                <div class="answer" id="reportDuration">${formData.reportDuration}</div>
            </div>
        </div>

        <div class="footer">
            <div>
                <div class="label">Date:</div>
                <div class="value" id="date">${formData.date}</div>
            </div>
            <div class="signature">
                <div class="signature-line"></div>
                <div><strong>(PRINCIPAL)</strong></div>
                <div id="principalName">${formData.principalName}</div>
            </div>
        </div>
    </div>

   
</body>
</html>
                `);

                printWindow.document.close();
                printWindow.focus();
                setTimeout(() => {
                    printWindow.print();
                }, 250);
            }
        } catch (error) {
            console.error("Error printing faculty review form:", error);
            alert("Error printing faculty review form.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-blue-600 text-white px-6 py-4 print:hidden">
                    <h1 className="text-2xl font-bold uppercase tracking-wide">Faculty Review</h1>
                    <div className="mt-2 flex justify-between items-center">
                        <h2 className="text-lg font-medium">Part - D</h2>
                        <span className="text-sm bg-blue-700 px-3 py-1 rounded-full">Principal Section</span>
                    </div>
                </div>

                <form ref={formRef} className="p-6 space-y-8">
                    {/* Faculty Information */}
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200 print:bg-white print:border-none">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4 print:hidden">Faculty Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Faculty Name</label>
                                <input
                                    type="text"
                                    name="facultyName"
                                    value={formData.facultyName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter faculty name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter designation"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter department"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Review Sections */}
                    <div className="space-y-6">
                        {[
                            {
                                description: 'Are the claims of the faculty genuine and needs further encouragement/promotion?',
                                name: 'question1',
                                value: formData.question1
                            },
                            {
                                description: 'Does reviewing authority satisfied with the assessment given by HoD, keeping all related parameters with care.',
                                name: 'question2',
                                value: formData.question2
                            },
                            {
                                description: 'Do you agree or disagree with the assessment of the HoD? Is there anything you will modify or add?',
                                name: 'question3',
                                value: formData.question3
                            },
                            {
                                description: 'General Observations with specific comments about the general claims and remarks given by HoD and remark about the outstanding work of the faculty.',
                                name: 'question4',
                                value: formData.question4
                            },
                            {
                                description: 'Does the faculty has any special characteristics and/or any outstanding work or ability which would justify his/her advancement? If yes, please mention the characteristic briefly.',
                                name: 'question5',
                                value: formData.question5
                            },
                            {
                                description: 'Duration of report',
                                name: 'reportDuration',
                                value: formData.reportDuration
                            }
                        ].map((section, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-medium">{index + 1}.</span>
                                    <span>{section.description}</span>
                                </div>
                                <textarea
                                    name={section.name}
                                    value={section.value}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    rows={3}
                                    placeholder="Enter details..."
                                />
                            </div>
                        ))}
                    </div>

                    {/* Signature Section */}
                    <div className="flex flex-col md:flex-row justify-between gap-4 mt-8 p-4 bg-gray-50 rounded-lg">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Principal's Name</label>
                            <input
                                type="text"
                                name="principalName"
                                value={formData.principalName}
                                onChange={handleInputChange}
                                className="w-64 px-4 py-2 border-b-2 border-gray-400 bg-transparent focus:outline-none"
                                placeholder="Enter Principal's name"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8 print:hidden">
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Print Report
                        </button>
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                        >
                            Reset Form
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FacultyReviewForm;