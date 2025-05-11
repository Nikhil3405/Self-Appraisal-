"use client";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../navbar/page";
import Link from "next/link";


interface FacultyInfo {
  eid:string;
  name: string;
  branch: string;
  role: string;
  loginType: "faculty" | "hod"| "committee";
  designation: string;
}
export default function FacultyHome() {
  const router = useRouter();
    const [facultyInfo, setFacultyInfo] = useState<FacultyInfo | null>(null);
  
  useEffect(() => {
    // Retrieve faculty details from session storage
    const storedData = sessionStorage.getItem("record");
    if (storedData) {
      setFacultyInfo(JSON.parse(storedData));
    } else {
      router.push("/login"); // Redirect if no data found
    }
  }, [router]);
  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
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
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">

          <div className="p-6 mb-6 mt-2">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-bold mb-2 text-indigo-600">
                Committee Dashboard
              </h2>
                <button onClick={handleLogout} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md shadow">
                  Logout
                </button>
            </div>
          </div>
          </div>
          </div>
</div>
  );
}
