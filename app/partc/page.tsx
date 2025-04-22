'use client'
import React, { useState, useRef,useEffect } from 'react';
import jsPDF from 'jspdf';
import Navbar from '../navbar/page';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
interface FacultyInfo {
    eid:string;
    name: string;
    branch: string;
    role: string;
    designation: string;
  }
export default function FacultyAppraisalForm() {
  const [appraisal, setAppraisal] = useState<FacultyAppraisal>(initialAppraisal);
  const formRef = useRef<HTMLFormElement>(null);
  const [facultyInfo, setFacultyInfo] = useState<FacultyInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve faculty details from session storage
    const storedData = sessionStorage.getItem("record");
    if (storedData) {
      setFacultyInfo(JSON.parse(storedData));
    } else {
      router.push("/login"); // Redirect if no data found
    }
  }, [router]);

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

  const generateReport = () => {
    const doc = new jsPDF();
    const lineHeight = 7;
    let yPos = 15;

    // Report Title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('HOD EVALUATION REPORT', 105, yPos, { align: 'center' });
    yPos += 15;

    // Faculty Information
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Faculty Name: ${appraisal.facultyName}`, 20, yPos);
    doc.text(`Designation: ${appraisal.designation}`, 20, yPos + lineHeight);
    doc.text(`Department: ${appraisal.department}`, 20, yPos + lineHeight * 2);
    yPos += lineHeight * 4;

    // Evaluation Sections
    const sections = [
      { title: 'Claims Verification', content: appraisal.hodComments.claimsVerified },
      { title: 'Academic Attitude', content: appraisal.hodComments.academicAttitude },
      { title: 'Intelligence & Learning', content: appraisal.hodComments.intelligence },
      { title: 'Additional Responsibilities', content: appraisal.hodComments.additionalResponsibilities.join('\n') },
      { title: 'Discipline & Amenability', content: appraisal.hodComments.amenability },
      { title: 'Regularity & Punctuality', content: appraisal.hodComments.regularity },
      { title: 'Integrity & Morality', content: appraisal.hodComments.integrity },
      { title: 'Trustworthiness', content: appraisal.hodComments.trustworthiness },
      { title: 'Score Information', content: `Quoted Score: ${appraisal.hodComments.scoreQuoted}\nActual Score: ${appraisal.hodComments.actualScore}` },
      { title: 'Recommendation', content: appraisal.hodComments.recommendation },
    ];

    sections.forEach((section, index) => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 15;
      }

      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${section.title}:`, 20, yPos);
      doc.setFont('helvetica', 'normal');
      const splitText = doc.splitTextToSize(section.content, 170);
      doc.text(splitText, 25, yPos + 5);
      yPos += (splitText.length * lineHeight) + 10;
    });

    // Signature Section
    doc.addPage();
    yPos = 50;
    doc.setFontSize(14);
    doc.text('HOD Certification', 105, yPos, { align: 'center' });
    yPos += 20;

    doc.setFontSize(12);
    doc.text(`I hereby certify that the above evaluation of ${appraisal.facultyName}`, 20, yPos);
    yPos += lineHeight;
    doc.text(`is accurate to the best of my knowledge.`, 20, yPos);
    yPos += 20;

    // Signature Line
    doc.text(`Date: ${appraisal.date}`, 20, yPos);
    doc.text('Signature:', 20, yPos + 20);
    doc.setLineWidth(0.5);
    doc.line(40, yPos + 25, 100, yPos + 25);
    doc.setFont('helvetica', 'bold');
    doc.text(appraisal.hodName, 45, yPos + 30);

    doc.save(`hod-report-${appraisal.facultyName}.pdf`);
  };

  const resetForm = () => {
    setAppraisal(initialAppraisal);
    formRef.current?.reset();
  };

  return (
<div className="min-h-screen">

      <Navbar />

      <div className="flex flex-col md:flex-row items-start space-x-2">
        {/* Sidebar Menu */}
        <div className="text-white font-semibold w-64 p-6 space-y-4 mt-5 md:mt-0">
          <Link href="/facultyhome">
            <button className="w-full text-left px-4 py-2 mb-6 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Home
            </button>
          </Link>
          <Link href="/faculty_part_a">
            <button className="w-full text-left px-4 py-2 mb-6 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Part-A
            </button>
          </Link>
          <Link href="/partb/category-1">
        <button
          className="w-full text-left mb-6 px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500 flex justify-between items-center"
        >
          Part-B
        </button>
        </Link>
        {facultyInfo && facultyInfo.role === "hod" && (
          <>
          <Link href="/partc">
            <button className="w-full mb-6 text-left px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Part-C
            </button>
          </Link>
          <Link href="/viewreport">
          <button className="w-full text-left px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500">
            View Report
          </button>
        </Link>
        </>
        )}
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
<div className="bg-indigo-600 text-white px-6 py-4">
          <h1 className="text-2xl font-bold uppercase tracking-wide">Faculty Self-Appraisal</h1>
            <h2 className="text-lg font-medium">Part - C</h2>
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
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                      className="form-radio h-4 w-4 text-indigo-600"
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
                      className="form-radio h-4 w-4 text-indigo-600"
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
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                      className="form-radio h-4 w-4 text-indigo-600"
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
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
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
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Submit Form
            </button>
            <button
              type="button"
              onClick={generateReport}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Generate Report
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
    </div>
  );
}