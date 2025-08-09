"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/app/navbar/page";

interface FacultyData {
  facultyId: string;
  facultyName: string;
  resultYear: string;
}

const Departmentinfo: React.FC = () => {
  const [faculties, setFaculties] = useState<FacultyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentName, setDepartmentName] = useState("");
const [resultYear, setResultYear] = useState("");

  useEffect(() => {
    const storedDepartment = sessionStorage.getItem("department");
    const storedDepartmentName = sessionStorage.getItem("departmentName");

    if (storedDepartment) setDepartment(storedDepartment);
    if (storedDepartmentName) setDepartmentName(storedDepartmentName);
  }, []);

  useEffect(() => {
    const fetchDepartmentInfo = async () => {
      try {
        const response = await fetch("/api/department-info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ department }),
        });

        if (!response.ok) throw new Error("Failed to fetch faculty data.");

        const data = await response.json();
        if (data?.stud) {
          setFaculties(data.stud as FacultyData[]);
        } else {
          throw new Error("Invalid data format.");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (department) fetchDepartmentInfo();
  }, [department]);

  const filteredFaculties = faculties.filter(
    (f) =>
      f.facultyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.facultyId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-col md:flex-row items-start space-x-2">
        {/* Sidebar */}
        <div className="text-white font-semibold w-64 p-6 space-y-4 mt-5 md:mt-0">
          <Link href="/principaldash">
            <button className="w-full text-left px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Home
            </button>
          </Link>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-xl flex-1 py-4 px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-indigo-600">{departmentName}</h2>
            <Link href="/principaldash">
              <button className="px-4 py-2 w-24 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md shadow">
                Back
              </button>
            </Link>
          </div>

          {/* Search bar */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search faculty by name or ID"
            className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
          />
{/* Result Year Selector */}
<div className="mb-6">
  <label htmlFor="resultYear" className="block mb-2 text-sm font-medium text-gray-700">
    Select Result Year
  </label>
  <select
    id="resultYear"
    value={resultYear}
    onChange={(e) => setResultYear(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
  >
    <option value="">-- Select Year --</option>
    <option value="2025">2025</option>
    <option value="2026">2026</option>
    <option value="2027">2027</option>
    <option value="2028">2028</option>
    <option value="2029">2029</option>
    <option value="2030">2030</option>
  </select>
    {/* {!resultYear && (
    <p className="mt-2 text-sm text-gray-600 font-semibold">
      Please select a result year to view faculty data.
    </p>
  )} */}
</div>

{/* Faculty table */}
<table className="w-full table-auto border border-gray-300 rounded-md">
  <thead className="bg-gray-200">
    <tr>
      <th className="border border-gray-300 px-4 py-2 text-left">Faculty ID</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Faculty Name</th>
      <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
    </tr>
  </thead>
<tbody>
  {filteredFaculties.length > 0 ? (
    filteredFaculties.map((f, index) => (
      <tr key={index} className="hover:bg-gray-50">
        <td className="border border-gray-300 px-4 py-2">{f.facultyId}</td>
        <td className="border border-gray-300 px-4 py-2">{f.facultyName}</td>
<td className="border border-gray-300 px-4 py-2">
  <div className="h-10 flex items-center">
    {resultYear ? (
      <Link href={`/partb/category-1`}
      >
        <button className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white text-sm font-semibold rounded-md shadow">
          View Data
        </button>
      </Link>
    ) : (
      <span className="text-gray-400 text-sm">Select result year to view</span>
    )}
  </div>
</td>

      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan={3}
        className="border border-gray-300 px-4 py-4 text-center text-gray-500"
      >
        No matching faculties found.
      </td>
    </tr>
  )}
</tbody>


</table>

        </div>
      </div>
    </div>
  );
};

export default Departmentinfo;
