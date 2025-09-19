"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../navbar/page";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define the interface for Department data
interface Department {
  departmentName: string;
  totalTeachers: number | null;
  department: string;
}

const PrincipalDashboard: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch departments when the component mounts
    fetchDepartments();
  }, []);
  const fetchDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/principal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch departments. Please try again later.");
      }

      const data = await response.json();

      if (data && data.data) {
        setDepartments(data.data);
      } else {
        throw new Error("Unexpected data format received.");
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentClick = (department: string, departmentName: string) => {
    sessionStorage.setItem("department", department);
    sessionStorage.setItem("departmentName", departmentName);
    router.push(`/partb`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-col md:flex-row items-start space-x-2 px-10 pt-7">
        {/* Sidebar Menu */}


        {/* Main Content */}
        <div className="bg-white rounded-xl flex-1 py-4 p-6 ">
          <div className="p-6 mb-6 mt-2">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-bold mb-2 text-indigo-600">
                Principal Dashboard - Self Appraisal
              </h2>
              <Link href="/">
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md shadow">
                  Logout
                </button>
              </Link>
            </div>
          </div>
          <hr className="bg-slate-300 h-0.5 mb-6"></hr>

          <div className="flex justify-around">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : departments.length > 0 ? (
              <div className="grid grid-cols-3 gap-6 mt-4">
                {departments.map((department, index) => (
                  <div
                    key={index}
                    onClick={() => handleDepartmentClick(department.department, department.departmentName)}
                    className="cursor-pointer border border-gray-300 rounded-md p-4 hover:shadow-lg"
                  >
                    <h3 className="font-semibold">
                      {department.departmentName || "Unknown Department"}
                    </h3>
                  </div>
                ))}
              </div>
            ) : (
              <div>Error fetching departments.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalDashboard;
