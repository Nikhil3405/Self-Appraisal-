"use client";
import { useRouter } from "next/navigation";
import Navbar from "../navbar/page";
import Link from "next/link";


export default function FacultyHome() {
  const router = useRouter();

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
            <Link href="/partd">
            <button className="w-full mb-6 text-left px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500">
              Part-D
            </button>
          </Link>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">

          <div className="p-6 mb-6 mt-2">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-bold mb-2 text-indigo-600">
                Princiapl Dashboard
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
