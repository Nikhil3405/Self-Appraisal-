'use client'
import React, { useState, useRef, ChangeEvent } from 'react';

interface FacultyAppraisal {
  facultyName: string;
  designation: string;
  department: string;
  hodComments: {
    claimsVerified: string;
    academicAttitude: string;
    intelligence: string;
    additionalResponsibilities: string[];
    amenability: string;
    regularity: string;
    integrity: string;
    admonition: string;
    trustworthiness: string;
    minimumPointAchieved: string;
    scoreQuoted: string;
    actualScore: string;
    remarks: string;
    recommendation: string;
  };
  date: string;
  hodName: string;
}

const initialAppraisal: FacultyAppraisal = {
  facultyName: '',
  designation: '',
  department: '',
  hodComments: {
    claimsVerified: '',
    academicAttitude: '',
    intelligence: '',
    additionalResponsibilities: ['', ''],
    amenability: '',
    regularity: '',
    integrity: '',
    admonition: '',
    trustworthiness: '',
    minimumPointAchieved: 'Yes',
    scoreQuoted: '',
    actualScore: '',
    remarks: '',
    recommendation: 'Recommended'
  },
  date: '',
  hodName: ''
};

export default function FacultyAppraisalForm() {
  const [appraisal, setAppraisal] = useState<FacultyAppraisal>(initialAppraisal);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.') as [keyof FacultyAppraisal, string];
      setAppraisal(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent] as any),
          [child]: value
        }
      }));
    } else {
      setAppraisal(prev => ({
        ...prev,
        [name]: value
      }));
    }

  };

  const handleResponsibilityChange = (index: number, value: string) => {
    const newResponsibilities = [...appraisal.hodComments.additionalResponsibilities];
    newResponsibilities[index] = value;

    setAppraisal(prev => ({
      ...prev,
      hodComments: {
        ...prev.hodComments,
        additionalResponsibilities: newResponsibilities
      }
    }));
  };

  const resetForm = () => {
    setAppraisal(initialAppraisal);
    formRef.current?.reset();
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
    <title>Faculty Appraisal Form</title>
    <style>
        body {
<<<<<<< HEAD
            margin: 20px;
            line-height: 1.5;
            font-size: 12px;
=======
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.5;
            font-size: 12px;
            color: #333;
>>>>>>> c1723971a88ae42fe4fca2eb42be2da08dde6111
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            border: 1px solid #ddd;
            padding: 20px;
<<<<<<< HEAD
=======
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
>>>>>>> c1723971a88ae42fe4fca2eb42be2da08dde6111
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
<<<<<<< HEAD
        }
        .faculty-info {
            margin-bottom: 20px;
=======
            color: #00366e;
        }
        .faculty-info {
            margin-bottom: 20px;
            background-color: #f9f9f9;
>>>>>>> c1723971a88ae42fe4fca2eb42be2da08dde6111
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
<<<<<<< HEAD
=======
            border-left: 3px solid #00366e;
>>>>>>> c1723971a88ae42fe4fca2eb42be2da08dde6111
            padding-left: 10px;
        }
        .question-text {
            font-weight: bold;
            margin-bottom: 8px;
        }
        .question .number {
<<<<<<< HEAD
            padding: 2px 6px;
=======
            background-color: #00366e;
            color: white;
            padding: 2px 6px;
            border-radius: 50%;
>>>>>>> c1723971a88ae42fe4fca2eb42be2da08dde6111
            margin-right: 8px;
            font-size: 11px;
        }
        .answer {
            margin-top: 8px;
            padding: 8px;
            min-height: 40px;
            border: 1px solid #ddd;
            border-radius: 3px;
<<<<<<< HEAD
=======
            background-color: #fff;
>>>>>>> c1723971a88ae42fe4fca2eb42be2da08dde6111
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
            <h1>FACULTY SELF-APPRAISAL</h1>
            <h1>PART - C (To be filled by HoD)</h1>
        </div>

        <div class="faculty-info">
            <div class="info-row">
                <div class="label">Name of the faculty member:</div>
                <div class="value">${appraisal.facultyName}</div>
            </div>
            <div class="info-row">
                <div class="label">Designation:</div>
                <div class="value">${appraisal.designation}</div>
            </div>
            <div class="info-row">
                <div class="label">Department:</div>
                <div class="value">${appraisal.department}</div>
            </div>
        </div>

        <div class="questions">
            ${[
            'Are the Reporting Officer claims with the evidence made in part-A covered?',
            'State of attitude of the Faculty towards academics:',
            'Intelligence, devotion, hardworking and desire of learning:',
            'Does the faculty has carried out any additional responsibilities? Mention:',
            'Amenability to discipline and attitude towards subordinates:',
            'Regularity and punctuality:',
            'Integrity and Morality:',
            'Admonition of employee due to negligence in work:',
            'Trust worthiness and handling confidential matters:'
          ].map((q, i) => `
            <div class="question">
                <div class="question-text"><span class="number">${i + 1}</span>${q}</div>
                <div class="answer">${i === 3 ? appraisal.hodComments.additionalResponsibilities
              .map((r, idx) => `(${idx + 1}) ${r}`).join('<br>') :
              appraisal.hodComments[Object.keys(appraisal.hodComments)[i] as keyof typeof appraisal.hodComments]
            }</div>
            </div>`).join('')}

            <div class="question">
                <div class="question-text"><span class="number">10</span>Minimum Points Achievement</div>
                <div class="answer">
                    <strong>Minimum Point Achieved:</strong> ${appraisal.hodComments.minimumPointAchieved}<br>
                    <strong>Score Quoted:</strong> ${appraisal.hodComments.scoreQuoted}<br>
                    <strong>Actual Score:</strong> ${appraisal.hodComments.actualScore}
                </div>
            </div>

            <div class="question">
                <div class="question-text"><span class="number">11</span>Remarks</div>
                <div class="answer">${appraisal.hodComments.remarks}</div>
            </div>

            <div class="question">
                <div class="question-text"><span class="number">12</span>Recommendation</div>
                <div class="answer">${appraisal.hodComments.recommendation}</div>
            </div>
        </div>

        <div class="footer">
            <div>
                <div class="label">Date:</div>
                <div class="value">${appraisal.date}</div>
            </div>
            <div class="signature">
                <div class="signature-line"></div>
                <div><strong>(HEAD OF DEPARTMENT)</strong></div>
                <div>${appraisal.hodName}</div>
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
      console.error("Error printing faculty appraisal form:", error);
      alert("Error printing faculty appraisal form.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white px-6 py-4 print:hidden">
          <h1 className="text-2xl font-bold uppercase tracking-wide">Faculty Self-Appraisal</h1>
          <div className="mt-2 flex justify-between items-center">
            <h2 className="text-lg font-medium">Part - C</h2>
            <span className="text-sm bg-blue-700 px-3 py-1 rounded-full">HOD Section</span>
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
                  value={appraisal.facultyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={appraisal.designation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input
                  type="text"
                  name="department"
                  value={appraisal.department}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Assessment Sections */}
          <div className="space-y-6">
            {[
              { name: 'hodComments.claimsVerified', label: 'Are the Reporting Officer claims with the evidence made in part-A covered? If not, the extent of the unfound facts.' },
              { name: 'hodComments.academicAttitude', label: 'State of attitude of the Faculty towards academics.' },
              { name: 'hodComments.intelligence', label: 'Intelligence, devotion, hardworking and desire of learning.' },
              { name: 'hodComments.amenability', label: 'Amenability to discipline and attitude towards subordinates.' },
              { name: 'hodComments.regularity', label: 'Regularity and punctuality.' },
              { name: 'hodComments.integrity', label: 'Integrity and Morality.' },
              { name: 'hodComments.admonition', label: 'Admonition of employee due to negligence in work, If yes, give details.' },
              { name: 'hodComments.trustworthiness', label: 'Trustworthiness and handling confidential matters.' },
              { name: 'hodComments.remarks', label: 'Remarks' },
            ].map((section, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {index + 1}. {section.label}
                </label>
                <textarea
                  name={section.name}
                  value={appraisal.hodComments[section.name.split('.')[1] as keyof typeof appraisal.hodComments]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>
            ))}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                4. Does the faculty has carried out any  Additional Responsibilities? Mention
              </label>
              {appraisal.hodComments.additionalResponsibilities.map((resp, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <span className="text-sm">({index + 1})</span>
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                10.Whether the Faculty achieved minimum point.
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Minimum Achieved</label>
                  <select
                    name="hodComments.minimumPointAchieved"
                    value={appraisal.hodComments.minimumPointAchieved}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Score Quoted</label>
                  <input
                    type="text"
                    name="hodComments.scoreQuoted"
                    value={appraisal.hodComments.scoreQuoted}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Actual Score</label>
                  <input
                    type="text"
                    name="hodComments.actualScore"
                    value={appraisal.hodComments.actualScore}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                12. Recommendation
              </label>
              <select
                name="hodComments.recommendation"
                value={appraisal.hodComments.recommendation}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="Recommended">Recommended</option>
                <option value="Recommended conditionally">Recommended conditionally</option>
                <option value="Not recommended">Not recommended</option>
              </select>
            </div>
          </div>

          {/* Signature Section */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={appraisal.date}
                onChange={handleInputChange}
                className="px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">HOD Signature</label>
              <input
                type="text"
                name="hodName"
                value={appraisal.hodName}
                onChange={handleInputChange}
                className="w-64 px-4 py-2 border-b-2 border-gray-400 bg-transparent"
                placeholder="HOD Name"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Print Report
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}