"use client";
import { useState,useEffect } from "react";

interface RemedialClass {
  semester: string;
  type: string;
  course: string;
  courseCode: string;
  classtype: string;
  numberOfClasses: string;
  hoursSpent: string;
  score: string;
}

interface CategoryCProps {
  initialData: RemedialClass[];
  onFormDataChangeAction: (updatedData: RemedialClass[]) => void;
  loginType: "faculty" | "committee" | "hod";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void; 

}

export default function CategoryC({ initialData, onFormDataChangeAction,loginType,employeeId,onCommitteeScoreChange }: CategoryCProps) {
  const [categoryC, setCategoryC] = useState<RemedialClass[]>(initialData || []);
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");
  useEffect(() => {
    if (initialData?.length) {
      setCategoryC(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (employeeId) {
      console.log(`Loading data for employee ID: ${employeeId}`);
    }
  }, [employeeId]);
  const addRow = () => {
    if(loginType !== "hod" && getTotalScore() < 20) {
      const newRecord: RemedialClass = {
        semester: "Odd",
        type: "Lab",
        course: "",
        courseCode: "",
        classtype: "Remedial",
        numberOfClasses: "",
        hoursSpent: "",
        score: "",
      };
    setCategoryC((prev) => [
      ...prev,newRecord]);
  }
  };

  const deleteRow = (index: number) => {
    if(loginType === "hod") return;
    const updated = categoryC.filter((_, i) => i !== index);
    setCategoryC(updated);
    onFormDataChangeAction(updated); // 👈 notify parent
  };

  const getTotalScore = () =>
    categoryC.reduce((total, project) => total + Number(project.score), 0);
  
  const handleInputChange = (
    index: number,
    field: keyof RemedialClass,
    value: string | number
  ) => {
    if (loginType === "hod") return;

    const updatedRecords = [...categoryC];
    const newValue = typeof value === "number" ? String(value) : value;
    if (field === "score" && !isNaN(Number(newValue))) {
      const oldScore = Number(categoryC[index].score);
      const newTotal = getTotalScore() - oldScore + Number(newValue);
  
      if (newTotal > 20) {
        alert("Total score cannot exceed 20.");
        return; // Prevent score overflow
    }}
    updatedRecords[index] = { ...updatedRecords[index], [field]: newValue };
    setCategoryC(updatedRecords);
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
        C. Remedial classes for weak students / Extra classes/tutorials conducted</h3>

 <b className="text-gray-600">
 (Previous 3 years and this semester to improve student’s performance) 
 <br/>[Note:  Remedial class = classes conducted for Academically weak students for 
their improvement<br/>
 Tutorial= Classes conducted specifically to solve more problems (other than 
regular classes) <br/>
 Extra class= Over and above 42 Hours for theory/ over and above 14 lab Sessions]<br/>Maximum Score: 20     </b>
 {employeeId && (
          <div className="text-sm bg-blue-50 p-2 rounded mt-2 mb-2">
            Viewing data for Employee ID: {employeeId}
          </div>
        )}
      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Semester</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Course Code</th>
            <th className="border p-2">Type of Class</th>
            <th className="border p-2">Number of Classes</th>
            <th className="border p-2">Hours Spent</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryC.map((row, index) => (
            <tr key={index} className="border">
              <td className="p-2">
                <select disabled={loginType === "hod" || loginType === "committee"} value={row.semester}  onChange={(e) => handleInputChange(index, "semester", e.target.value)} className="w-full px-2 py-1 border rounded">
                  <option value="Odd">Odd</option>
                  <option value="Even">Even</option>
                </select>
              </td>
              <td className="p-2 w-32">
                <select value={row.type} disabled={loginType === "hod" || loginType === "committee"} onChange={(e) => handleInputChange(index, "type", e.target.value)} className="w-full px-2 py-1 border rounded">
                  <option value="Lab">Lab</option>
                  <option value="Theory">Theory</option>
                </select>
              </td>
              <td className="p-2">
                <input type="text" disabled={loginType === "hod" || loginType === "committee"} value={row.course} onChange={(e) => handleInputChange(index, "course", e.target.value)} className="w-full px-2 py-1 border rounded" />
              </td>
              <td className="p-2">
                <input type="text" disabled={loginType === "hod" || loginType === "committee"} value={row.courseCode} onChange={(e) => handleInputChange(index, "courseCode", e.target.value)} className="w-full px-2 py-1 border rounded" />
              </td>
              <td className="p-2 w-32">
                <select disabled={loginType === "hod" || loginType === "committee"}
                    value={row.classtype}
                    onChange={(e) => handleInputChange(index, "classtype", e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                >
                    <option value="Remedial">Remedial</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Extra">Extra</option>
                </select>
            </td>
            <td className="p-2">
                <input type="number" disabled={loginType === "hod" || loginType === "committee"} value={row.numberOfClasses} onChange={(e) => handleInputChange(index, "numberOfClasses", e.target.value)} className="w-full px-2 py-1 border rounded" />
              </td>
              <td className="p-2">
                <input type="number" disabled={loginType === "hod" || loginType === "committee"} value={row.hoursSpent} onChange={(e) => handleInputChange(index, "hoursSpent", e.target.value)} className="w-full px-2 py-1 border rounded" />
              </td>
              <td className="p-2">
                <input type="number" disabled={loginType === "hod" || loginType === "committee"} value={row.score} onChange={(e) => handleInputChange(index, "score", e.target.value)} className="w-full px-2 py-1 border rounded" />
              </td>
              <td>
                <button type="button" disabled={loginType === "hod" || loginType === "committee"} onClick={() => deleteRow(index)} className={`bg-red-500 text-white px-2 py-1 rounded ${
                      loginType === "hod" || loginType === "committee"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}>
                  Delete
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
          totalScore >= 20 ||loginType === "hod" || loginType === "committee" ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
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
