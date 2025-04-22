"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Login() {
  const [activeTab, setActiveTab] = useState("faculty");
  const [userid, setUserid] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (activeTab === "hod") {
        const res = await axios.post(`/api/hodlogin`, { userid });

        const departmentinfo = {
          eid: res.data.eid,
          name: res.data.ename,
          branch: res.data.department,
          role: res.data.role,
          designation: res.data.designation,
          loginType: "hod" // Add loginType to match CategoryA requirements
        };
        
        if (departmentinfo.role === "hod") {
          sessionStorage.setItem("record", JSON.stringify(departmentinfo));
          router.push(`/facultyhome`);
        } else {
          alert("You are not HOD!");
        }
      } else if (activeTab === "faculty") {
        const res = await axios.post(`/api/hodlogin`, { userid });
        const departmentinfo = {
          eid: res.data.eid,
          name: res.data.ename,
          branch: res.data.department,
          designation: res.data.designation,
          loginType: "faculty" // Add loginType to match CategoryA requirements
        };
        sessionStorage.setItem("record", JSON.stringify(departmentinfo));
        router.push(`/facultyhome`);
      } else if (activeTab === "principal") {
        if (userid === "DRAIT" && pass === "drait") {
          const principalInfo = {
            role: "principal",
            loginType: "principal" // Add loginType to match CategoryA requirements
          };
          sessionStorage.setItem("record", JSON.stringify(principalInfo));
          router.push(`/principal`);
        } else {
          alert("Invalid principal credentials!");
        }
      } else if (activeTab === "committee") {
        if (userid === "DRAIT" && pass === "drait") {
          const committeeInfo = {
            role: "committee",
            loginType: "committee" // Add loginType to match CategoryA requirements
          };
          sessionStorage.setItem("record", JSON.stringify(committeeInfo));
          router.push(`/facultyhome`);
        } else {
          alert("Invalid committee credentials!");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Enter valid UserID and Password!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-4 text-indigo-600">
          Dr. Ambedkar Institute of Technology
        </h1>
        <h2 className="text-center font-semibold text-indigo-600 text-2xl mb-6">
          Self-Appraisal System
        </h2>

        <div className="flex justify-center space-x-8 mb-6">
          {["faculty", "hod", "committee", "principal"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-6 py-2 rounded ${
                activeTab === tab
                  ? "bg-indigo-600 text-white font-semibold"
                  : "bg-gray-200 text-gray-600 font-semibold"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {activeTab === "faculty" && (
            <>
              <div className="flex justify-center">
                <Image
                  src="/hod.png"
                  alt="Faculty Icon"
                  className="mb-2 bg-sky-800 rounded-full h-32 place-items-center"
                  width={128}
                  height={128}
                />
              </div>
              <label className="block mb-2 text-gray-700 text-lg">UserID</label>
              <input
                type="text"
                placeholder="Enter your UserID"
                className="w-full px-3 py-2 border rounded mb-4"
                value={userid}
                onChange={(e) => setUserid(e.target.value)}
                required
              />
            </>
          )}
          {activeTab === "hod" && (
            <>
              <div className="flex justify-center">
                <Image
                  width={128}
                  height={128}
                  alt="HOD Icon"
                  src="/hod.png"
                  className="mb-2 bg-sky-800 rounded-full h-32 place-items-center"
                />
              </div>
              <label className="block mb-2 text-gray-700 text-lg">UserID</label>
              <input
                type="text"
                placeholder="Enter your UserID"
                className="w-full px-3 py-2 border rounded mb-4"
                value={userid}
                onChange={(e) => setUserid(e.target.value)}
                required
              />
            </>
          )}
          {activeTab === "committee" && (
            <>
              <div className="flex justify-center">
                <Image
                  width={128}
                  height={128}
                  src="/principal.png"
                  alt="Committee Icon"
                  className="mb-2 bg-sky-800 rounded-full h-32 place-items-center"
                />
              </div>
              <label className="block mb-2 text-gray-700 text-lg">UserID</label>
              <input
                type="text"
                placeholder="Enter your UserID"
                className="w-full px-3 py-2 border rounded mb-4"
                value={userid}
                onChange={(e) => setUserid(e.target.value)}
                required
              />
            </>
          )}
          {activeTab === "principal" && (
            <>
              <div className="flex justify-center">
                <Image
                  width={128}
                  height={128}
                  alt="Principal Icon"
                  src="/principal.png"
                  className="mb-2 bg-sky-800 rounded-full h-32 place-items-center"
                />
              </div>
              <label className="block mb-2 text-gray-700 text-lg">UserID</label>
              <input
                type="text"
                placeholder="Enter your UserID"
                className="w-full px-3 py-2 border rounded mb-4"
                value={userid}
                onChange={(e) => setUserid(e.target.value)}
                required
              />
            </>
          )}
          <label className="block mb-2 text-gray-700 text-lg">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full px-3 py-2 border rounded mb-4"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}