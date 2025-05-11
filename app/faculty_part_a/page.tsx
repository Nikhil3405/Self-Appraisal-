"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../navbar/page";

interface Qualification {
  degree: string;
  specialization: string;
  university: string;
  yearOfAward: string;
  classObtained: string;
}
interface FacultyInfo {
  eid:string;
  name: string;
  branch: string;
  role: string;
  loginType: "faculty" | "hod"| "committee";
  designation: string;
}
interface Experience {
  position: string;
  institution: string;
  yearsAndMonths: string;
  remarks: string;
}

export default function FacultySelfAppraisal() {
  const router = useRouter();
    const [facultyInfo, setFacultyInfo] = useState<FacultyInfo | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    department: "",
    designation: "",
    dateOfJoining: "",
    mobile: "",
    email: "",
    address: "",
    qualifications: [] as Qualification[],
    experience: [] as Experience[],
  });

  useEffect(() => {
    // Load saved data from local storage on component mount
    const savedData = localStorage.getItem("facultySelfAppraisal");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    // Load faculty info from session storage if available
    const facultyInfo = sessionStorage.getItem("record");
    if (facultyInfo) {
      const parsedInfo = JSON.parse(facultyInfo);
      setFacultyInfo(parsedInfo);
      setFormData(prevData => ({
        ...prevData,
        name: parsedInfo.name || prevData.name,
        department: parsedInfo.branch || prevData.department,
        employeeId: parsedInfo.eid || prevData.employeeId,
      }));
    }
  }, []);

  // const handleSaveChanges = () => {
  //   localStorage.setItem("facultySelfAppraisal", JSON.stringify(formData));
  //   toast.success("Changes saved successfully!");
  // };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  

  // Validation function
  const validateForm = () => {
    const requiredFields = ['name', 'employeeId', 'department', 'designation', 'dateOfJoining', 'mobile', 'email'];
    const missingFields = requiredFields.filter(field => !(formData as Record<string, string | Qualification[] | Experience[]>)[field]);

    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Mobile validation
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return false;
    }

    return true;
  };

  // Qualification Handlers
  const handleQualificationChange = (index: number, field: string, value: string) => {
    const newQualifications = [...formData.qualifications];
    newQualifications[index] = { ...newQualifications[index], [field]: value };
    setFormData({ ...formData, qualifications: newQualifications });
  };

  const addQualification = () => {
    setFormData({
      ...formData,
      qualifications: [...formData.qualifications, { degree: "", specialization: "", university: "", yearOfAward: "", classObtained: "" }],
    });
  };

  const deleteQualification = (index: number) => {
    const newQualifications = [...formData.qualifications];
    newQualifications.splice(index, 1);
    setFormData({ ...formData, qualifications: newQualifications });
  };

  // Experience Handlers
  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExperience = [...formData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setFormData({ ...formData, experience: newExperience });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { position: "", institution: "", yearsAndMonths: "", remarks: "" }],
    });
  };

  const deleteExperience = (index: number) => {
    const newExperience = [...formData.experience];
    newExperience.splice(index, 1);
    setFormData({ ...formData, experience: newExperience });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/part-a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      // Clear localStorage after successful submission
      // localStorage.removeItem("facultySelfAppraisal");

      toast.success("Form submitted successfully!");
      setTimeout(() => {
        router.push('/facultyhome');
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navbar */}
      <Navbar />

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex flex-col md:flex-row items-start p-4">
        {/* Sidebar Menu */}
        <div className="text-white font-semibold w-64 p-6 space-y-4 mt-5 md:mt-0">
          <Link href="/facultyhome">
            <button className="w-full text-left px-4 py-2 mb-6 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Home
            </button>
          </Link>
          {facultyInfo && facultyInfo.loginType==="faculty" &&(
            <>
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
               <Link href="/downloadReport">
            <button className="w-full mb-6 text-left px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Download Report
            </button>
          </Link>
              </>
          )}
          {facultyInfo && facultyInfo.loginType === "committee" && (

            <Link href="/partb/category-1">
            <button
              className="w-full text-left mb-6 px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500 flex justify-between items-center"
            >
              Part-B
            </button>
            </Link>
        )}
        {facultyInfo && facultyInfo.loginType === "hod" && (
          <>
          <Link href="/partc/viewreport">
          <button className="w-full text-left px-4 py-2 mb-6 bg-indigo-600 rounded-md hover:bg-indigo-500">
            View Report
          </button>
        </Link>
          <Link href="/partc">
            <button className="w-full mb-6 text-left px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Part-C
            </button>
          </Link>
          <Link href="/downloadReport">
            <button className="w-full mb-6 text-left px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Download Report
            </button>
          </Link>
        </>
        )}
        </div>
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                Self-Appraisal Information for Career Advancement of Faculty Members
              </h1>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Part A</span>
            </div>

            <div className="mb-6 p-4 bg-indigo-50 rounded-md border-l-4 border-indigo-500">
              <p className="text-gray-800">
                All faculty members of Dr. AIT seeking career advancement shall furnish the information
                sought with documentary evidence in the format provided. You are informed to furnish the
                details of academic credentials within the date mentioned to the office of the Principal Dr. AIT
                for further action of assessment and decision by the competent authority. Any influence from
                external authorities/sources for career advancement would be viewed seriously and may stall
                the process of requesting candidature. <b>Provide the necessary data for the last 3 years. You
                  are informed not to furnish the information if you have not fulfil the necessary years of
                  service in the present/current position with the applied grade pay. Attach additional
                  sheets wherever needed.</b>
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* General Information */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-indigo-600 mb-3 border-b pb-2 flex items-center">
                  General Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Employee ID*</label>
                    <input
                      type="text"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="Enter your employee ID"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Department*</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      required
                    />
                  </div>
                  <div>
  <label className="block text-gray-700 font-semibold mb-1">Designation*</label>
  <select
    name="designation"
    value={formData.designation}
    onChange={handleInputChange}
    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
    required
  >
    <option value="">Select Designation</option>
    <option value="Assistant Professor">Assistant Professor</option>
    <option value="Associate Professor">Associate Professor</option>
    <option value="Professor">Professor</option>
  </select>
</div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Date of Joining*</label>
                    <input
                      type="date"
                      name="dateOfJoining"
                      value={formData.dateOfJoining}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Mobile Number*</label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-1">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Your current residential address"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                </div>
              </div>

              {/* Qualification Table */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-bold text-indigo-600 border-b pb-2 flex items-center">
                    Qualification Details
                  </h2>

                </div>

                <div className="overflow-x-auto mb-3 rounded-lg border">
                  <table className="w-full border-collapse border-gray-300 text-sm">
                    <thead className="bg-indigo-50">
                      <tr>
                        {["Degree", "Specialization", "University", "Year of Award", "Class Obtained", "Action"].map((header) => (
                          <th key={header} className="border border-gray-300 p-2 text-left text-indigo-700">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {formData.qualifications.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-3 text-center text-gray-500">No qualifications added. Click &apos;Add&apos; to add your qualifications.</td>
                        </tr>
                      ) : formData.qualifications.map((q, index) => (
                        <tr key={index} className="border border-gray-300 hover:bg-gray-50">
                          {["degree", "specialization", "university", "yearOfAward", "classObtained"].map((field) => (
                            <td key={field} className="p-2">
                              <input
                                type="text"
                                value={(q as Qualification)[field as keyof Qualification]}
                                onChange={(e) => handleQualificationChange(index, field, e.target.value)}
                                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-400"
                                placeholder={field === "degree" ? "BE/BTech/ME/MTech/PhD" :
                                  field === "specialization" ? "Subject/Branch" :
                                    field === "university" ? "University name" :
                                      field === "yearOfAward" ? "YYYY" :
                                        "First Class/Second Class/Distinction"}
                              />
                            </td>
                          ))}
                          <td className="p-2">
                            <button
                              type="button"
                              onClick={() => deleteQualification(index)}
                              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                    type="button"
                    onClick={addQualification}
                    className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-200 flex items-center gap-1"
                  >
                    <span>+</span> Add
                  </button>
              </div>

              {/* Experience Table */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-bold text-indigo-600 border-b pb-2 flex items-center">
                    Experience
                  </h2>

                </div>

                <div className="overflow-x-auto mb-3 rounded-lg border">
                  <table className="w-full border-collapse border-gray-300 text-sm">
                    <thead className="bg-indigo-50">
                      <tr>
                        {["Position", "Institution", "Years and Months", "Remarks", "Action"].map((header) => (
                          <th key={header} className="border border-gray-300 p-2 text-left text-indigo-700">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {formData.experience.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-3 text-center text-gray-500">No experience added. Click &apos;Add&apos; to add your experience.</td>
                        </tr>
                      ) : formData.experience.map((exp, index) => (
                        <tr key={index} className="border border-gray-300 hover:bg-gray-50">
                          {["position", "institution", "yearsAndMonths", "remarks"].map((field) => (
                            <td key={field} className="p-2">
                              <input
                                type="text"
                                value={(exp as Experience)[field as keyof Experience]}
                                onChange={(e) => handleExperienceChange(index, field, e.target.value)}
                                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-400"
                                placeholder={field === "position" ? "Assistant Professor/etc." :
                                  field === "institution" ? "Institution name" :
                                    field === "yearsAndMonths" ? "2 years 3 months" :
                                      "Any additional information"}
                              />
                            </td>
                          ))}
                          <td className="p-2">
                            <button
                              type="button"
                              onClick={() => deleteExperience(index)}
                              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                </div>
                <button
                    type="button"
                    onClick={addExperience}
                    className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-200 flex items-center gap-1"
                  >
                    <span>+</span> Add
                  </button>
              </div>

              {/* Save Changes & Submit Buttons */}
              <button onClick={handleSubmit} type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit All"}
        </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}