"use client";

import Navbar from "@/app/navbar/page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";

interface FacultyInfo {
  eid: string;
  name: string;
  branch: string;
  loginType: "faculty" | "hod" | "committee" | "principal";
}

interface FacultyData {
  EmployeeID: string;
  Name: string;
  Department: string;
  TotalScore?: number;
  CommitteeScore?: number;
  academicyear?: string;
  Category1Score?: string;
  Category2Score?: string;
  Category3Score?: string;
}

export default function PartB() {
  const router = useRouter();
  const [facultyInfo, setFacultyInfo] = useState<FacultyInfo | null>(null);
  const [facultyList, setFacultyList] = useState<FacultyData[]>([]);
//   const [loading, setLoading] = useState(true);
  const [academicYear, setAcademicYear] = useState<string>("");
  const [selectedFaculty, setSelectedFaculty] = useState<string>("");

  useEffect(() => {
    const storedData = sessionStorage.getItem("record");
    const storedEmployeeId = sessionStorage.getItem("employeeId");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFacultyInfo(parsedData);
      if (storedEmployeeId) {
        setSelectedFaculty(storedEmployeeId);
      }

      const fetchFacultyList = async (branch: string) => {
        try {
          let response;
          if (parsedData.loginType === "hod" || parsedData.loginType === "principal") {
            response = await fetch(`/api/final-submit?branch=${encodeURIComponent(branch)}`);
          } else {
            response = await fetch(`/api/final-submit`);
          }

          if (!response.ok) {
            throw new Error("Failed to fetch faculty list");
          }

          const data = await response.json();
          setFacultyList(data);
          console.log("facultyList", data);
        } catch (error) {
          console.error("Error fetching faculty list:", error);
        }
      };

      if (parsedData.loginType === "principal") {
        const branch = sessionStorage.getItem("department") ?? "";
        fetchFacultyList(branch);
      } else if (parsedData.loginType === "hod" || parsedData.loginType === "committee") {
        fetchFacultyList(parsedData.branch);
      }
    } else {
      router.push("/");
    }
  }, [router]);

  const filteredFacultyList = facultyList.filter(faculty => faculty.academicyear === academicYear);

  const uniqueFacultyList = Array.from(
    new Map(filteredFacultyList.map(faculty => [faculty.EmployeeID, faculty])).values()
  );


  const handleAcademicYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    console.log("Academic Year: ", selectedYear);
    setAcademicYear(selectedYear);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col md:flex-row items-start space-x-2">
        <div className="text-white font-semibold w-64 p-6 space-y-4 mt-5 md:mt-0">
          
          {facultyInfo && facultyInfo.loginType === "faculty" && (
            <>
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
                <button className="w-full text-left mb-6 px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500 flex justify-between items-center">
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
            <>
            <Link href="/principal">
            <button className="w-full text-left px-4 py-2 mb-6 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Home
            </button>
          </Link>
            <Link href="/partb">
              <button className="w-full text-left mb-6 px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500 flex justify-between items-center">
                Part-B
              </button>
            </Link>
            </>
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

        <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-6xl mb-4">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">Select Academic Year:</h2>
            <div className="mb-4">
              <select
                id="academic-year-select"
                value={academicYear}
                onChange={handleAcademicYearChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Select Academic Year --</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </select>
            </div>
          </div>

          {facultyInfo?.loginType !== "faculty" && academicYear && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-indigo-600 mb-4">Faculty List:</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 border-b text-left">Employee ID</th>
                      <th className="py-3 px-4 border-b text-left">Name</th>
                      <th className="py-3 px-4 border-b text-left">Department</th>
                      <th className="py-3 px-4 border-b text-left">Total Score</th>
                      <th className="py-3 px-4 border-b text-left">Committee Score</th>
                      <th className="py-3 px-4 border-b text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uniqueFacultyList.map((faculty) => (
                      <tr
                        key={faculty.EmployeeID}
                        className={academicYear === faculty.academicyear && selectedFaculty === faculty.EmployeeID ? "bg-indigo-50" : "hover:bg-gray-50"}
                      >
                        <td className="py-2 px-4 border-b">{faculty.EmployeeID}</td>
                        <td className="py-2 px-4 border-b">{faculty.Name}</td>
                        <td className="py-2 px-4 border-b">{faculty.Department || "Not specified"}</td>
                        <td className="py-2 px-4 border-b">
                          {faculty.TotalScore !== undefined ? faculty.TotalScore : "Not available"}
                          </td>
                        <td className="py-2 px-4 border-b">
                          {faculty.CommitteeScore !== undefined ? faculty.CommitteeScore : "Not available"}
                        </td>
                        <td className="py-2 px-4 border-b">
                          <button
                            onClick={() => {
                              setSelectedFaculty(faculty.EmployeeID);
                              sessionStorage.setItem("employeeId", faculty.EmployeeID);
                              console.log("Selected Faculty ID: ", faculty.EmployeeID);
                              sessionStorage.setItem("academicYear", academicYear);
                              router.push("/partb/category-1");
                            }}
                            className={`px-4 py-1 rounded 
                                bg-green-600 text-white
                                :  hover:bg-green-500
                            }`}
                          >
                            View Data
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {facultyInfo?.loginType === "faculty" && (
                        <div className="mt-4">
              <h2 className="text-xl font-semibold text-indigo-600 mb-4">Faculty Info:</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 border-b text-left">Employee ID</th>
                      <th className="py-3 px-4 border-b text-left">Name</th>
                      <th className="py-3 px-4 border-b text-left">Department</th>
                      <th className="py-3 px-4 border-b text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className=""
                    >
                      <td className="py-2 px-4 border-b">{facultyInfo.eid}</td>
                      <td className="py-2 px-4 border-b">{facultyInfo.name}</td>
                      <td className="py-2 px-4 border-b">{facultyInfo.branch}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => {
                            setSelectedFaculty(facultyInfo.eid);
                            sessionStorage.setItem("employeeId", facultyInfo.eid);
                            console.log("Selected Faculty ID: ", facultyInfo.eid);
                            sessionStorage.setItem("academicYear", academicYear);
                            router.push("/partb/category-1");
                          }}
                          className={`px-4 py-1 rounded 
                              bg-green-600 text-white
                              :  hover:bg-green-500
                          `}
                        >
                          Proceed
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>)}
        </div>
      </div>
    </div>
  );
}
