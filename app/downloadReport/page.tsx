"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../navbar/page";
import Link from "next/link";

interface FacultyInfo {
  eid: string;
  name: string;
  branch: string;
  loginType: "faculty" | "hod" | "committee";
}

interface FacultyData {
  EmployeeID: string;
  Name: string;
  TotalScore: number;
  CommitteeScore: number;
  academicyear: string;
}

export default function FacultyHome() {
  const router = useRouter();
  const [facultyInfo, setFacultyInfo] = useState<FacultyInfo | null>(null);
  const [facultyList, setFacultyList] = useState<FacultyData[]>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  useEffect(() => {
    const storedData = sessionStorage.getItem("record");
    if (storedData) {
      setFacultyInfo(JSON.parse(storedData));
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  useEffect(() => {
    const fetchFacultyList = async (branch: string) => {
      try {
        let response;
        if (facultyInfo?.loginType === "hod") {
          response = await fetch(`/api/final-submit?branch=${encodeURIComponent(branch)}`);
        } else {
          response = await fetch(`/api/final-submit`);
        }
        if (!response.ok) {
          throw new Error("Failed to fetch faculty list");
        }
        const data = await response.json();
        console.log("facultyList", data);
        setFacultyList(data);
      } catch (error) {
        console.error("Error fetching faculty list:", error);
      }
    };

    const storedData = sessionStorage.getItem("record");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFacultyInfo(parsedData);
      if (parsedData.loginType === "hod" || parsedData.loginType === "committee" || parsedData.loginType === "principal") {
        fetchFacultyList(parsedData.branch);
      }
    } else {
      router.push("/login");
    }
  }, [router, facultyInfo?.loginType]);

  const handleDownload = async (employeeId: string) => {
    try {
      const response = await fetch(`/api/download-report?employeeId=${employeeId}`, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error("Failed to download report");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${employeeId}_report.pdf`; // or .docx or whatever format
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error downloading report:", error);
    }
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
          {facultyInfo && facultyInfo.loginType !== "hod" && facultyInfo.loginType !== "committee" && (
            <>
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

        <div className="flex flex-col w-full mt-5">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
            {/* Page Header */}
            <div className="p-6 mb-6 mt-2">
              <div className="flex justify-between items-center">
                <h2 className="text-4xl font-bold mb-2 text-indigo-600">
                  Download Report
                </h2>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md shadow"
                >
                  Logout
                </button>
              </div>
            </div>
            <hr className="bg-slate-300 h-0.5 mb-6" />
          </div>

          {/* Report Filters */}
          {facultyList.length > 0 && (
            <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-6xl mb-4">
              <div className="flex space-x-4 mb-4">
                <input
                  type="text"
                  placeholder="Filter by Name"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className="px-4 py-2 border rounded-md"
                />
                <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="px-4 py-2 border rounded-md"
                    >
                    <option value="">All Academic Years</option>
                    {[...new Set(facultyList.map((item) => item.academicyear))]
                        .filter((year) => year) // Filter out empty/null
                        .sort((a, b) => (a > b ? -1 : 1)) // Sort descending (latest year first)
                        .map((year, index) => (
                        <option key={index} value={year}>
                            {year}
                        </option>
                        ))}
                    </select>

              </div>

              <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Report Data</h2>
              <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
  <tr className="bg-indigo-100">
    <th className="border border-gray-300 px-4 py-2">Name</th>
    <th className="border border-gray-300 px-4 py-2">Category Total Score</th>
    <th className="border border-gray-300 px-4 py-2">Committee Total Score</th>
    <th className="border border-gray-300 px-4 py-2">Academic Year</th>
    <th className="border border-gray-300 px-4 py-2">Download</th> 
  </tr>
</thead>

<tbody>
  {facultyList.map((item, index) => (
    <tr key={index} className="hover:bg-gray-100">
      <td className="border border-gray-300 px-4 py-2">{item.Name}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">{item.TotalScore}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">{item.CommitteeScore}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">{item.academicyear}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <button
          onClick={() => handleDownload(item.EmployeeID)}
          className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-md"
        >
          Download
        </button>
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
