'use client'
import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';

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
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setAppraisal(prev => ({
        ...prev,
        [parent]: {
          
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", appraisal);
    alert("Form submitted successfully!");
  };

  const generateReport = async () => {
    setIsGeneratingPDF(true);
    try {
      // Create a new PDF document
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Page dimensions
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - (margin * 2);
      let y = margin;

      // Helper functions
      const addFormHeader = () => {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("FACULTY SELF-APPRAISAL", pageWidth / 2, y, { align: "center" });
        y += 8;

        doc.text("PART - C", pageWidth / 2, y, { align: "center" });
        y += 8;

        doc.setFontSize(12);
        doc.text("(To be filled by HoD)", pageWidth / 2, y, { align: "center" });
        y += 15;
      };

      const addLine = (text: string, isHeader = false) => {
        if (isHeader) {
          doc.setFont("helvetica", "bold");
        } else {
          doc.setFont("helvetica", "normal");
        }

        const textLines = doc.splitTextToSize(text, contentWidth);
        doc.text(textLines, margin, y);
        y += textLines.length * 7;
      };

      const addFormField = (label: string, value: string, indent = 0) => {
        // Check if we need a new page
        if (y > pageHeight - 20) {
          doc.addPage();
          y = margin;
        }

        doc.setFont("helvetica", "normal");
        doc.text(label, margin + indent, y);

        // Draw underline for the field
        const labelWidth = doc.getTextWidth(label);
        const lineStart = margin + indent + labelWidth + 2;
        const lineEnd = pageWidth - margin;
        doc.setLineWidth(0.1);
        doc.line(lineStart, y, lineEnd, y);

        // Add the value text slightly above the line
        if (value) {
          doc.text(value, lineStart + 2, y - 1);
        }

        y += 8;
      };

      const addNumberedSection = (num: number, text: string, value: string) => {
        // Check if we need a new page
        if (y > pageHeight - 30) {
          doc.addPage();
          y = margin;
        }

        doc.setFont("helvetica", "bold");
        doc.text(`${num}.`, margin, y);

        doc.setFont("helvetica", "normal");
        const textWidth = doc.getTextWidth(`${num}. `);
        doc.text(text, margin + textWidth, y);
        y += 8;

        // Add lines for writing
        doc.setLineWidth(0.1);
        for (let i = 0; i < 3; i++) {
          if (value && i === 0) {
            doc.text(value, margin + 5, y - 2);
          }
          doc.line(margin, y, pageWidth - margin, y);
          y += 8;
        }

        y += 4; // Add some spacing between sections
      };

      const addTableRow = (cells: string[], heights: number[] = [], isBold = false) => {
        const startY = y;
        const cellWidth = contentWidth / cells.length;

        if (isBold) {
          doc.setFont("helvetica", "bold");
        } else {
          doc.setFont("helvetica", "normal");
        }

        // Calculate row height based on the cell with the most text
        let maxHeight = 8;
        cells.forEach((cell, index) => {
          const textLines = doc.splitTextToSize(cell, cellWidth - 4);
          const cellHeight = textLines.length * 7;
          maxHeight = Math.max(maxHeight, cellHeight);
        });

        if (heights.length > 0) {
          maxHeight = Math.max(...heights);
        }

        // Draw cells
        cells.forEach((cell, index) => {
          const x = margin + (cellWidth * index);
          doc.rect(x, y, cellWidth, maxHeight);

          const textLines = doc.splitTextToSize(cell, cellWidth - 4);
          const textY = y + 5;
          doc.text(textLines, x + 2, textY);
        });

        y += maxHeight;
        return maxHeight;
      };

      // Start building the PDF
      addFormHeader();

      // Faculty information section
      addFormField("Name of the faculty member:", appraisal.facultyName);

      // Split line for designation and department
      doc.text("Designation:", margin, y);
      const designationWidth = doc.getTextWidth("Designation:");
      let lineStart = margin + designationWidth + 2;
      let lineEnd = pageWidth / 2 - 5;
      doc.setLineWidth(0.1);
      doc.line(lineStart, y, lineEnd, y);
      if (appraisal.designation) {
        doc.text(appraisal.designation, lineStart + 2, y - 1);
      }

      doc.text("Department:", pageWidth / 2, y);
      const departmentWidth = doc.getTextWidth("Department:");
      lineStart = pageWidth / 2 + departmentWidth + 2;
      lineEnd = pageWidth - margin;
      doc.line(lineStart, y, lineEnd, y);
      if (appraisal.department) {
        doc.text(appraisal.department, lineStart + 2, y - 1);
      }
      y += 15;

      // Numbered sections
      addNumberedSection(1, "Are the Reporting Officer claims with the evidence made in part-A covered.",
        appraisal.hodComments.claimsVerified);
      doc.setFont("helvetica", "normal");
      doc.text("If not, the extent of the unfound facts.", margin + 5, y - 12);

      addNumberedSection(2, "State of attitude of the Faculty towards academics:",
        appraisal.hodComments.academicAttitude);

      addNumberedSection(3, "Intelligence, devotion, hardworking and desire of learning:",
        appraisal.hodComments.intelligence);

      addNumberedSection(4, "Does the faculty has carried out any additional responsibilities? Mention.",
        appraisal.hodComments.additionalResponsibilities.join(", "));

      // Add the responsibility subitems
      if (appraisal.hodComments.additionalResponsibilities.length > 0) {
        y -= 24; // Move back up to write inside the section

        doc.text("(i)", margin + 10, y);
        lineStart = margin + 20;
        lineEnd = pageWidth - margin;
        doc.line(lineStart, y, lineEnd, y);
        if (appraisal.hodComments.additionalResponsibilities[0]) {
          doc.text(appraisal.hodComments.additionalResponsibilities[0], lineStart + 2, y - 1);
        }
        y += 8;

        doc.text("(ii)", margin + 10, y);
        lineStart = margin + 20;
        lineEnd = pageWidth - margin;
        doc.line(lineStart, y, lineEnd, y);
        if (appraisal.hodComments.additionalResponsibilities[1]) {
          doc.text(appraisal.hodComments.additionalResponsibilities[1], lineStart + 2, y - 1);
        }
        y += 16;
      }

      addNumberedSection(5, "Amenability to discipline and attitude towards subordinates:",
        appraisal.hodComments.amenability);

      addNumberedSection(6, "Regularity and punctuality:",
        appraisal.hodComments.regularity);

      addNumberedSection(7, "Integrity and Morality:",
        appraisal.hodComments.integrity);

      // Check if we need a page break
      if (y > pageHeight - 80) {
        doc.addPage();
        y = margin;
      }

      addNumberedSection(8, "Admonition of employee due to negligence in work. If yes, give details:",
        appraisal.hodComments.admonition);

      addNumberedSection(9, "Trust worthiness and handling confidential matters:",
        appraisal.hodComments.trustworthiness);

      // Section 10 - Minimum points
      doc.setFont("helvetica", "bold");
      doc.text("10.", margin, y);

      doc.setFont("helvetica", "normal");
      const textWidth = doc.getTextWidth("10. ");
      doc.text("Whether the Faculty achieved minimum point:", margin + textWidth, y);
      y += 8;

      // Yes/No with scoring
      doc.text("Yes/ No: ", margin + 5, y);
      doc.text(appraisal.hodComments.minimumPointAchieved || "", margin + 25, y);
      doc.text("[Score: ", margin + 40, y);
      doc.text(appraisal.hodComments.scoreQuoted || "", margin + 55, y);
      doc.text("quoted by the employee]", margin + 70, y);
      y += 8;

      doc.text("[Actual score: ", margin + 40, y);
      doc.text(appraisal.hodComments.actualScore || "", margin + 70, y);
      doc.text("by the HoD/committee]", margin + 85, y);
      y += 10;

      // Add grading table
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("11.    Overall Grading (Category I + Category II + Category III)", margin, y);
      y += 8;

      // Create table header
      addTableRow(["Grading", "Actual Score for", "", "", ""], [10], true);
      addTableRow(["", "Assistant Professor", "Associate Professor", "Professor"], [10], true);

      // Table rows
      const tableData = [
        ["Outstanding (A)", "90 to 100", "90 to 100", "90 to 100"],
        ["Excellent (B)", "80 to 89", "80 to 89", "80 to 89"],
        ["Very Good (C)", "70 to 79", "70 to 79", "70 to 79"],
        ["Good (D)", "60 to 79", "60 to 79", "60 to 79"],
        ["Satisfactory (E)", "40 to 59", "40 to 59", "40 to 59"],
        ["Not Satisfactory (F)", "<60", "<65", "<70"]
      ];

      tableData.forEach(row => {
        addTableRow(row);
      });

      y += 5;

      // Section 12 - Remarks
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("12.", margin, y);

      doc.setFont("helvetica", "normal");
      doc.text("Any other remarks:", margin + 10, y);
      y += 8;

      // Add lines for writing remarks
      doc.setLineWidth(0.1);
      for (let i = 0; i < 2; i++) {
        if (appraisal.hodComments.remarks && i === 0) {
          doc.text(appraisal.hodComments.remarks, margin + 5, y - 2);
        }
        doc.line(margin, y, pageWidth - margin, y);
        y += 8;
      }
      y += 5;

      // Section 13 - Recommendation
      doc.setFont("helvetica", "bold");
      doc.text("13.", margin, y);

      doc.setFont("helvetica", "normal");
      const recommendationText = "Recommended/ Recommended conditionally/ Not recommended for increment/staff promotion.";
      doc.text(recommendationText, margin + 10, y);

      // Highlight the selected recommendation
      if (appraisal.hodComments.recommendation) {
        let position;
        if (appraisal.hodComments.recommendation === "Recommended") {
          position = margin + 10 + 6;
        } else if (appraisal.hodComments.recommendation === "Recommended conditionally") {
          position = margin + 10 + doc.getTextWidth("Recommended/ ") + 6;
        } else {
          position = margin + 10 + doc.getTextWidth("Recommended/ Recommended conditionally/ ") + 6;
        }

        // Underline the selected option
        const textWidth = doc.getTextWidth(appraisal.hodComments.recommendation);
        doc.setLineWidth(0.5);
        doc.line(position, y + 1, position + textWidth, y + 1);
      }

      y += 20;

      // Date and signature
      doc.text("Date:", margin, y);
      if (appraisal.date) {
        doc.text(appraisal.date, margin + 20, y);
      }

      doc.text("Name & Signature of HOD", pageWidth - margin - 50, y);
      if (appraisal.hodName) {
        doc.text(appraisal.hodName, pageWidth - margin - 45, y - 10);
      }

      // Save the PDF
      const fileName = `faculty-appraisal-${appraisal.facultyName.replace(/\s+/g, '-')}.pdf`;
      doc.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("An error occurred while generating the PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const resetForm = () => {
    setAppraisal(initialAppraisal);
    formRef.current?.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white px-6 py-4">
          <h1 className="text-2xl font-bold uppercase tracking-wide">Faculty Self-Appraisal</h1>
          <div className="mt-2 flex justify-between items-center">
            <h2 className="text-lg font-medium">Part - C</h2>
            <span className="text-sm bg-blue-700 px-3 py-1 rounded-full">HOD Section</span>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Faculty Information */}
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Faculty Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Faculty Name</label>
                <input
                  type="text"
                  name="facultyName"
                  value={appraisal.facultyName}
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
                  value={appraisal.designation}
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
                  value={appraisal.department}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter department"
                />
              </div>
            </div>
          </div>

          {/* Assessment Sections */}
          <div className="space-y-6">
            {[
              {
                title: 'Claims Verification',
                name: 'hodComments.claimsVerified',
                value: appraisal.hodComments.claimsVerified,
                description: 'Are the Reporting Officer claims with the evidence made in part-A covered if not, the extent of the unfound facts.'
              },
              {
                title: 'Academic Attitude',
                name: 'hodComments.academicAttitude',
                value: appraisal.hodComments.academicAttitude,
                description: 'State of attitude of the Faculty towards academics:'
              },
              {
                title: 'Intelligence and Learning',
                name: 'hodComments.intelligence',
                value: appraisal.hodComments.intelligence,
                description: 'Intelligence, devotion, hardworking and desire of learning:'
              },
              {
                title: 'Additional Responsibilities',
                description: 'Does the faculty has carried out any additional responsibilities? Mention.'
              },
              {
                title: 'Amenability',
                name: 'hodComments.amenability',
                value: appraisal.hodComments.amenability,
                description: 'Amenability to discipline and attitude towards subordinates:'
              },
              {
                title: 'Regularity',
                name: 'hodComments.regularity',
                value: appraisal.hodComments.regularity,
                description: 'Regularity and punctuality:'
              },
              {
                title: 'Integrity',
                name: 'hodComments.integrity',
                value: appraisal.hodComments.integrity,
                description: 'Integrity and Morality:'
              },
              {
                title: 'Admonition',
                name: 'hodComments.admonition',
                value: appraisal.hodComments.admonition,
                description: 'Admonition of employee due to negligence in work. If yes, give details:'
              },
              {
                title: 'Trustworthiness',
                name: 'hodComments.trustworthiness',
                value: appraisal.hodComments.trustworthiness,
                description: 'Trust worthiness and handling confidential matters:'
              }
            ].map((section, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium">{index + 1}.</span>
                  <span>{section.description}</span>
                </div>

                {section.name ? (
                  <textarea
                    name={section.name}
                    value={section.value}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Enter details..."
                  />
                ) : (
                  <div className="pl-6 space-y-3">
                    {appraisal.hodComments.additionalResponsibilities.map((resp, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-sm">({String.fromCharCode(97 + i)})</span>
                        <input
                          type="text"
                          value={resp}
                          onChange={(e) => handleResponsibilityChange(i, e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Responsibility ${i + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Score Section */}
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="font-medium">10.</span>
                <span>Whether the Faculty achieved minimum point:</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="hodComments.minimumPointAchieved"
                      value="Yes"
                      checked={appraisal.hodComments.minimumPointAchieved === 'Yes'}
                      onChange={handleInputChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="hodComments.minimumPointAchieved"
                      value="No"
                      checked={appraisal.hodComments.minimumPointAchieved === 'No'}
                      onChange={handleInputChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span>No</span>
                  </label>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="whitespace-nowrap">Score quoted:</span>
                    <input
                      type="text"
                      name="hodComments.scoreQuoted"
                      value={appraisal.hodComments.scoreQuoted}
                      onChange={handleInputChange}
                      className="w-20 px-2 py-1 border rounded"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="whitespace-nowrap">Actual score:</span>
                    <input
                      type="text"
                      name="hodComments.actualScore"
                      value={appraisal.hodComments.actualScore}
                      onChange={handleInputChange}
                      className="w-20 px-2 py-1 border rounded"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Remarks */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="font-medium">11.</span>
                <span>Any other remarks:</span>
              </div>
              <textarea
                name="hodComments.remarks"
                value={appraisal.hodComments.remarks}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Enter remarks..."
              />
            </div>

            {/* Recommendation */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="font-medium">12.</span>
                <span>Recommendation:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-6">
                {['Recommended', 'Recommended conditionally', 'Not recommended'].map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="hodComments.recommendation"
                      value={option}
                      checked={appraisal.hodComments.recommendation === option}
                      onChange={handleInputChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
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
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">HOD Signature</label>
              <div className="relative">
                <input
                  type="text"
                  name="hodName"
                  value={appraisal.hodName}
                  onChange={handleInputChange}
                  className="w-64 px-4 py-2 border-b-2 border-gray-400 bg-transparent focus:outline-none"
                  placeholder="Enter HOD name"
                />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gray-400"></div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Submit Form
            </button>
            <button
              type="button"
              onClick={generateReport}
              disabled={isGeneratingPDF}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:bg-green-400"
            >
              {isGeneratingPDF ? "Generating PDF..." : "Generate Report"}
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
}