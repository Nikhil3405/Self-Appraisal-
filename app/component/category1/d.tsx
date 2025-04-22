"use client";
import { useState,useEffect } from "react";

interface TeachingMethodology {
  semester: string;
  course: string;
  description: string;
  score: string;
}

interface CategoryDProps {
  initialData: TeachingMethodology[];
  onFormDataChangeAction: (updatedData: TeachingMethodology[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void; 
}

export default function CategoryD({ initialData, onFormDataChangeAction,loginType,employeeId,onCommitteeScoreChange }: CategoryDProps) {
  const [teachingMethods, setTeachingMethods] = useState<TeachingMethodology[]>(initialData || []);
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");
  useEffect(() => {
    if (initialData?.length) {
      setTeachingMethods(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (employeeId) {
      console.log(`Loading data for employee ID: ${employeeId}`);
    }
  }, [employeeId]);
  
  const addRow = () => {
    if(loginType !=="hod" && getTotalScore() < 20) {
    setTeachingMethods((prev) => [...prev, { semester: "Odd",course:"", description: "", score: "" }]);
    }
  };

  const deleteRow = (index: number) => {
    if(loginType === "hod") return;
    const updated = teachingMethods.filter((_, i) => i !== index);
    setTeachingMethods(updated);
    onFormDataChangeAction(updated); // 👈 notify parent
  };

  const getTotalScore = () =>
    teachingMethods.reduce((total, project) => total + Number(project.score), 0);
  
  const handleInputChange = (
    index: number,
    field: keyof TeachingMethodology,
    value: string | number
  ) => {
    if (loginType === "hod") return;

    const updatedRecords = [...teachingMethods];
    const newValue = typeof value === "number" ? String(value) : value;
    if (field === "score" && !isNaN(Number(newValue))) {
      const oldScore = Number(teachingMethods[index].score);
      const newTotal = getTotalScore() - oldScore + Number(newValue);
  
      if (newTotal > 20) {
        alert("Total score cannot exceed 20.");
        return; // Prevent score overflow
    }}
    updatedRecords[index] = { ...updatedRecords[index], [field]: newValue };
    setTeachingMethods(updatedRecords);
    onFormDataChangeAction(updatedRecords);
  };
  const totalScore = getTotalScore();
  const handleCommitteeTotalScoreChange = (value: string) => {
    if (Number(value) > 20) {
      alert("Committee total score cannot exceed 20.");
      return;
    }
    setCommitteeTotalScore(value);
    if (onCommitteeScoreChange) {
      onCommitteeScoreChange(value); // 👈 call the parent function
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        D. Use of Participatory and Innovative Teaching-Learning methodologies, Updating of 
Subject Content, Course Improvement etc.,</h3>
<b className="text-gray-600">                                                         
[ICT based teaching material = 10 points each, Number of Interactive courses = 
10 points each, Number of participatory learning modules = 5 points each, 
Demonstration models =  5 points each] <br/>Maximum Score: 20      </b> 
        {employeeId && (
          <div className="text-sm bg-blue-50 p-2 rounded mt-2 mb-2">
            Viewing data for Employee ID: {employeeId}
          </div>
        )}
      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Semester</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Description of Methodology</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {teachingMethods.map((row, index) => (
            <tr key={index} className="border">
              <td className="p-2">
                <select
                  value={row.semester}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "semester", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                >
                  <option value="Odd">Odd</option>
                  <option value="Even">Even</option>
                </select>
              </td>
              <td className="p-2">
                <input
                  type="text"
                  value={row.course}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "course", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="p-2">
                <input
                  type="text"
                  value={row.description}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "description", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  value={row.score}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "score", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td>
              <button
                    type="button"
                    onClick={() => deleteRow(index)}
                    disabled={loginType === "hod" || loginType === "committee"}
                    className={`bg-red-500 text-white px-2 py-1 rounded ${
                      loginType === "hod" || loginType === "committee"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button
        type="button"
        onClick={addRow}
        disabled={loginType === "hod" || loginType === "committee" || totalScore >= 20}
        className={`mt-2 px-3 py-2 rounded text-white ${
          loginType==="hod"|| loginType==="committee"|| totalScore >= 20 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
        }`}
      >
        + Add Row
      </button>
      <p className="text-base font-semibold mt-1 text-gray-700">Total Score: {totalScore} / 20</p>
      {loginType === "committee" && (
          <div className="mt-4">
            <label className="block mb-1 font-semibold text-yellow-600">
              Committee Total Score (out of 20):
            </label>
            <input
              type="number"
              value={committeeTotalScore}
              onChange={(e) => handleCommitteeTotalScoreChange(e.target.value)}
              className="w-32 px-2 py-1 border border-yellow-400 rounded"
            />
          </div>
        )}
    </div>
  );
}
