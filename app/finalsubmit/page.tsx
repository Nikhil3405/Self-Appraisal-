"use client";
import { useState, useEffect } from "react";
import Navbar from "../navbar/page";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";

interface FacultyInfo {
  eid: string;
  name: string;
  branch: string;
  designation?: string; // Added designation for minimum score check
  loginType: "faculty" | "hod" | "committee";
}
export default function FinalSubmit() {
  const [categoryScores, setCategoryScores] = useState({
    category1: 0,
    category2: 0,
    category3: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [committeeScore1, setCommitteeScore1] = useState<number>(0);
  const [committeeScore2, setCommitteeScore2] = useState<number>(0);
  const [committeeScore3, setCommitteeScore3] = useState<number>(0);
  const [academicYear, setAcademicYear] = useState<string>("");
  const [facultyInfo, setFacultyInfo] = useState<FacultyInfo | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [faculty, setFaculty] = useState<FacultyInfo | null>(null);
  const [EmployeeId, setEmployeeId] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = sessionStorage.getItem("record");
    const employeeId = sessionStorage.getItem("employeeId");
    const academicYear = sessionStorage.getItem("academicYear");
      const Score1 = sessionStorage.getItem("committeeScore1");
      const Score2 = sessionStorage.getItem("committeeScore2");
      const Score3 = sessionStorage.getItem("committeeScore3");
      if (storedData && academicYear && employeeId) {
        if(facultyInfo?.loginType === "committee") {
          setCommitteeScore1(Number(Score1));
          setCommitteeScore2(Number(Score2));
          setCommitteeScore3(Number(Score3));
        }
        
        setFacultyInfo(JSON.parse(storedData));
        setEmployeeId(employeeId); // Set the employee ID
        setAcademicYear(academicYear);
      }
      const c1 = sessionStorage.getItem("category1");
      const c2 = sessionStorage.getItem("category2");
      const c3 = sessionStorage.getItem("category3");
      setCategoryScores({
        category1: c1 ? JSON.parse(c1).score || 0 : 0,
        category2: c2 ? JSON.parse(c2).score || 0 : 0,
        category3: c3 ? JSON.parse(c3).score || 0 : 0,
      });
    }
  }, [facultyInfo?.loginType]);
  const CommitteeScore = committeeScore1 + committeeScore2 + committeeScore3;
  console.log("Committee 1:", committeeScore1);
  console.log("Committee 2:", committeeScore2);
  console.log("Committee 3:", committeeScore3);
  const employeeId = facultyInfo?.eid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/information", {
          method: "POST", // <-- POST not GET
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userid: employeeId }), // <-- send userid in body
        });
  
        const data = await response.json();
        setFaculty(data);
      } catch (error) {
        console.error("Error fetching faculty info:", error);
      }
    };
    
    if (employeeId) { // avoid calling if employeeId is not set
      fetchData();
    }
  }, [employeeId]);
  
  // const handleConfirmSubmit = async () => {
  //   setIsSubmitting(true);
  
  //   const loginType = facultyInfo?.loginType;
  //   const errors: string[] = [];
  
  //   const category1 = sessionStorage.getItem("category1");
  //   const category2 = sessionStorage.getItem("category2");
  //   const category3 = sessionStorage.getItem("category3");
  
  //   interface CategoryData {
  //     score: number;
  //     [key: string]: number | string | boolean;
  //   }
  
  //   const submitCategory = async (url: string, data: CategoryData, label: string) => {
  //     try {
  //       const response = await fetch(url, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ employeeId, ...data }),
  //       });
  
  //       if (!response.ok) throw new Error(`${label} submission failed`);
  //     } catch (err) {
  //       console.error(`Error submitting ${label}:`, err);
  //       errors.push(label);
  //     }
  //   };
  
  //   try {
  //     if (loginType !== "committee") {
  //       // Only faculty and HOD can submit category data
  //       if (category1) {
  //         await submitCategory("/api/category-1", JSON.parse(category1), "Category 1");
  //       }
  
  //       if (category2) {
  //         await submitCategory("/api/category-2", JSON.parse(category2), "Category 2");
  //       }
  
  //       if (category3) {
  //         await submitCategory("/api/category-3", JSON.parse(category3), "Category 3");
  //       }
  
  //       await submitCategory(
  //         "/api/final-submit",
  //         { score: totalScore, ...categoryScores, academicYear },
  //         "Final Submit"
  //       );
  //     } else {
  //       // Committee can only update the final score (PUT request)
  //       await fetch("/api/final-submit", {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           employeeId:EmployeeId,
  //           academicYear,
  //           loginType,
  //           committeeScore: CommitteeScore,
  //         }),
  //       });
  //     }
  //     console.log("employeeId", EmployeeId);
  //     console.log("loginType", loginType);
  //     console.log("CommitteeScore", CommitteeScore);
  //     if (errors.length > 0) {
  //       toast.error(`Submission failed for: ${errors.join(", ")}`);
  //     } else {
  //       toast.success("Submitted successfully!");
  
  //       // Clear sessionStorage drafts
  //       sessionStorage.removeItem("category1");
  //       sessionStorage.removeItem("category2");
  //       sessionStorage.removeItem("category3");
  //       sessionStorage.removeItem("committeeScore1");
  //       sessionStorage.removeItem("committeeScore2");
  //       sessionStorage.removeItem("committeeScore3");
  
  //       // Only faculty and HOD need to delete drafts
  //       if (employeeId && loginType !== "committee") {
  //         await fetch("/api/drafts/category-1", {
  //           method: "DELETE",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ employeeId, category: "category-1" }),
  //         });
  //         await fetch("/api/drafts/category-2", {
  //           method: "DELETE",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ employeeId, category: "category-2" }),
  //         });
  //         await fetch("/api/drafts/category-3", {
  //           method: "DELETE",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ employeeId, category: "category-3" }),
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Unexpected error submitting form:", error);
  //     toast.error("Unexpected error occurred. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //     setShowConfirmation(false);
  //   }
  // };
  const checkAlreadySubmitted = async (): Promise<boolean> => {
    const res = await fetch(`/api/final-submit?facultyId=${employeeId}&academicYear=${academicYear}`);
    const data = await res.json();
    return data.submitted === true;
  };
  
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    const loginType = facultyInfo?.loginType;
    const errors: string[] = [];
  
    // 🔒 Prevent duplicate submission for faculty/HOD
    if (loginType !== "committee") {
      const alreadySubmitted = await checkAlreadySubmitted();
      if (alreadySubmitted) {
        toast.error("You have already submitted for this academic year.");
        setIsSubmitting(false);
        setShowConfirmation(false);
        return;
      }
    }
  
    const category1 = sessionStorage.getItem("category1");
    const category2 = sessionStorage.getItem("category2");
    const category3 = sessionStorage.getItem("category3");
  
    interface CategoryData {
      score: number;
      [key: string]: number | string | boolean;
    }
  
    const submitCategory = async (url: string, data: CategoryData, label: string) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ employeeId, ...data }),
        });
  
        if (!response.ok) throw new Error(`${label} submission failed`);
      } catch (err) {
        console.error(`Error submitting ${label}:`, err);
        errors.push(label);
      }
    };
  
    try {
      if (loginType !== "committee") {
        if (category1) {
          await submitCategory("/api/category-1", JSON.parse(category1), "Category 1");
        }
  
        if (category2) {
          await submitCategory("/api/category-2", JSON.parse(category2), "Category 2");
        }
  
        if (category3) {
          await submitCategory("/api/category-3", JSON.parse(category3), "Category 3");
        }
  
        await submitCategory(
          "/api/final-submit",
          { score: totalScore, ...categoryScores, academicYear },
          "Final Submit"
        );
      } else {
        // Committee can only update the final score (PUT request)
        await fetch("/api/final-submit", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            employeeId: EmployeeId,
            academicYear,
            loginType,
            committeeScore: CommitteeScore,
          }),
        });
      }
  
      if (errors.length > 0) {
        toast.error(`Submission failed for: ${errors.join(", ")}`);
      } else {
        toast.success("Submitted successfully!");
  
        // Clear sessionStorage
        sessionStorage.removeItem("category1");
        sessionStorage.removeItem("category2");
        sessionStorage.removeItem("category3");
        sessionStorage.removeItem("committeeScore1");
        sessionStorage.removeItem("committeeScore2");
        sessionStorage.removeItem("committeeScore3");
  
        // Delete drafts if needed
        if (employeeId && loginType !== "committee") {
          await fetch("/api/drafts/category-1", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ employeeId, category: "category-1" }),
          });
          await fetch("/api/drafts/category-2", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ employeeId, category: "category-2" }),
          });
          await fetch("/api/drafts/category-3", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ employeeId, category: "category-3" }),
          });
        }
      }
    } catch (error) {
      console.error("Unexpected error submitting form:", error);
      toast.error("Unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
      setShowConfirmation(false);
    }
  };
  

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
  };

  // Function to check if minimum API score is met based on designation
  const checkMinimumApiScore = (category: number, score: number): boolean => {
    const designation = faculty?.designation?.toLowerCase() || "";
    
    // Default to Assistant Professor requirements if designation is not available
    let minScore = 0;
    
    if (category === 1) { // Category I
      minScore = 180; // Same for all designations
    } else if (category === 2) { // Category II
      minScore = 60; // Same for all designations
    } else if (category === 3) { // Category III
      if (designation.includes("professor") && designation.includes("associate")) {
        minScore = 360; // Associate Professor
      } else if (designation.includes("professor") && !designation.includes("associate") && !designation.includes("assistant")) {
        minScore = 420; // Professor
      } else {
        minScore = 240; // Assistant Professor or default
      }
    }
    
    return score >= minScore;
  };

  // Get approval status with appropriate styling
  const getApprovalStatus = (category: number, score: number) => {
    const isApproved = checkMinimumApiScore(category, score);
    const textColorClass = isApproved ? "text-green-600" : "text-red-600";
    const statusText = isApproved ? "Approved" : "Not Approved";
    
    return (
      <span className={`font-bold ${textColorClass}`}>
        {statusText}
      </span>
    );
  };

  const totalScore = categoryScores.category1 + categoryScores.category2 + categoryScores.category3;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex flex-col md:flex-row items-start space-x-2">
        {/* Sidebar */}
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
            className="w-full text-left px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500 flex justify-between items-center"
          >
            Part-B
          </button>
          </Link>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Main Content */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl mt-4">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">
            SUMMARY OF SELF API SCORES REQUIRED IN EACH CATEGORY
          </h2>
          <div className="flex justify-center items-center mb-4">
          <table className="w-10/12 border border-black border-collapse text-sm text-center">
            <thead>
              <tr className="bg-gray-100">
                <th rowSpan={2} className="border border-black p-2">Category</th>
                <th rowSpan={2} className="border border-black p-2">Criteria</th>
                <th rowSpan={2} className="border border-black p-2">Maximum API Score</th>
                <th colSpan={3} className="border border-black p-2">Minimum Required</th>
                <th rowSpan={2} className="border border-black p-2">Self-Appraisal Score</th>
                <th rowSpan={2} className="border border-black p-2">Status</th>
              </tr>
              <tr className="bg-gray-100">
                <th className="border border-black p-2">Asst. Prof.</th>
                <th className="border border-black p-2">Assoc. Prof.</th>
                <th className="border border-black p-2">Prof.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2">I</td>
                <td className="border border-black p-2">Teaching, Learning And Evaluation Related Activities</td>
                <td className="border border-black p-2">300</td>
                <td className="border border-black p-2">180</td>
                <td className="border border-black p-2">180</td>
                <td className="border border-black p-2">180</td>
                <td className="border border-black p-2">{categoryScores.category1}</td>
                <td className="border border-black p-2">{getApprovalStatus(1, categoryScores.category1)}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">II</td>
                <td className="border border-black p-2">
                  Co-curricular, Extra-curricular, Professional development related Activities
                </td>
                <td className="border border-black p-2">100</td>
                <td className="border border-black p-2">60</td>
                <td className="border border-black p-2">60</td>
                <td className="border border-black p-2">60</td>
                <td className="border border-black p-2">{categoryScores.category2}</td>
                <td className="border border-black p-2">{getApprovalStatus(2, categoryScores.category2)}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">III</td>
                <td className="border border-black p-2">Research, Publication & Academic Contribution related Activities</td>
                <td className="border border-black p-2">600</td>
                <td className="border border-black p-2">240</td>
                <td className="border border-black p-2">360</td>
                <td className="border border-black p-2">420</td>
                <td className="border border-black p-2">{categoryScores.category3}</td>
                <td className="border border-black p-2">{getApprovalStatus(3, categoryScores.category3)}</td>
              </tr>
              <tr className="font-bold bg-gray-100">
                <td className="border border-black p-2" colSpan={6}>
                  <div>Total</div>
                </td>
                <td className="border border-black p-2">{totalScore}</td>
                <td className="border border-black p-2">
                  {checkMinimumApiScore(1, categoryScores.category1) &&
                   checkMinimumApiScore(2, categoryScores.category2) &&
                   checkMinimumApiScore(3, categoryScores.category3) ? (
                    <span className="text-green-600">All Approved</span>
                   ) : (
                    <span className="text-red-600">Not All Approved</span>
                   )}
                </td>
              </tr>
            </tbody>
          </table>
          </div>
          {/* Submit Button Section */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-lg text-gray-600">Total Self-Appraisal Score: {totalScore}</div>
            
            {/* Back and Next buttons on the right */}
            <div className="flex space-x-4">
              <Link href="/partb/category-3"> {/* Replace with your correct previous page URL */}
                <button
                  type="button"
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                >
                  Back
                </button>
              </Link>
              <button
                onClick={() => setShowConfirmation(true)}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
              >
                Submit
              </button>
            </div>
          </div>
          {facultyInfo?.loginType === "committee" && (
                  <div className="text-lg text-gray-600">Committee Total Score: {CommitteeScore}</div>
                )}
        </div>

        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <h3 className="text-xl font-bold mb-4 text-indigo-700">Confirm Submission</h3>
              <p className="mb-6">Are you sure you want to submit all your data? This action cannot be undone.</p>
              <p className="mb-4 font-semibold">Total Score: <span className="text-green-600">{totalScore}</span></p>
              {facultyInfo?.loginType === "committee" && (
                <p className="mb-4 font-semibold">Committee Total Score: <span className="text-yellow-600">{CommitteeScore}</span></p>
              )}
              {/* Display approval status warnings */}
              {(!checkMinimumApiScore(1, categoryScores.category1) || 
                !checkMinimumApiScore(2, categoryScores.category2) || 
                !checkMinimumApiScore(3, categoryScores.category3)) && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  <p className="font-semibold">Warning: Not all categories meet minimum requirements</p>
                  <ul className="ml-5 list-disc">
                    {!checkMinimumApiScore(1, categoryScores.category1) && (
                      <li>Category I score does not meet minimum requirement</li>
                    )}
                    {!checkMinimumApiScore(2, categoryScores.category2) && (
                      <li>Category II score does not meet minimum requirement</li>
                    )}
                    {!checkMinimumApiScore(3, categoryScores.category3) && (
                      <li>Category III score does not meet minimum requirement</li>
                    )}
                  </ul>
                </div>
              )}
              
              <div className="flex justify-end space-x-4">
                <button 
                  onClick={handleCancelSubmit}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmSubmit}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Confirm & Submit"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}