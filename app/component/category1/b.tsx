"use client";
import { useState,useEffect} from "react";

interface StudentPerformance {
  course: string;
  courseCode: string;
  studentsRegistered: string;
  studentsPassed: string;
  notEligible: string;
  passPercentage: string;
  score: string;
}

interface CategoryBProps {
  initialData: StudentPerformance[];
  onFormDataChangeAction: (updatedData: StudentPerformance[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void; 

}

export default function CategoryB({ initialData, onFormDataChangeAction,loginType,employeeId,onCommitteeScoreChange }: CategoryBProps) {
  const [categoryB, setCategoryB] = useState<StudentPerformance[]>(initialData || []);
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");

  useEffect(() => {
      if (initialData?.length) {
        setCategoryB(initialData);
      }
    }, [initialData]);
  
    useEffect(() => {
      if (employeeId) {
        console.log(`Loading data for employee ID: ${employeeId}`);
      }
    }, [employeeId]);
  const addRow = () => {
    if(loginType !== "hod" && getTotalScore() < 50) {
      const newRecord: StudentPerformance = {
        course: "",
        courseCode: "",
        studentsRegistered: "",
        studentsPassed: "",
        notEligible: "",
        passPercentage: "",
        score: "",
      };
      setCategoryB((prev) => [...prev, newRecord]); // 👈 notify parent
    }
  };

  const deleteRow = (index: number) => {
    if(loginType === "hod") return;
    const updated = categoryB.filter((_, i) => i !== index);
    setCategoryB(updated);
    onFormDataChangeAction(updated); // 👈 notify parent
  };

  const getTotalScore = () =>
    categoryB.reduce((total, project) => total + Number(project.score), 0);
  
  const handleInputChange = (
    index: number,
    field: keyof StudentPerformance,
    value: string | number
  ) => {
    if(loginType === "hod") return;
    const updatedRecords = [...categoryB];
    const newValue = typeof value === "number" ? String(value) : value;
    if (field === "score" && !isNaN(Number(newValue))) {
      const oldScore = Number(categoryB[index].score);
      const newTotal = getTotalScore() - oldScore + Number(newValue);
  
      if (newTotal > 50) {
        alert("Total score cannot exceed 50.");
        return; // Prevent score overflow
    }}
    updatedRecords[index] = { ...updatedRecords[index], [field]: value };
    setCategoryB(updatedRecords);
    onFormDataChangeAction(updatedRecords);
  };
  const totalScore = getTotalScore();
  const handleCommitteeTotalScoreChange = (value: string) => {
    if (Number(value) > 50) {
      alert("Committee total score cannot exceed 50.");
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
        B. Performance of students in your Lab and/or theory classes (Previous 3 Years for odd and even semesters):</h3>
        <b className="text-gray-600">
        [Self-appraisal score: if pass percentage (i) 40% to 50% - 5 (ii) 51% to 60% - 6 (iii) 61% to 70% - 7 
        (iv) 71% to 80% - 8 (v) 81% to 90% - 9 (vi) above 90% - 10]
<br/>Maximum Score: 50 
      </b>
      {employeeId && (
          <div className="text-sm bg-blue-50 p-2 rounded mt-2 mb-2">
            Viewing data for Employee ID: {employeeId}
          </div>
        )}
      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Course</th>
            <th className="border p-2">Course Code</th>
            <th className="border p-2">Students Registered</th>
            <th className="border p-2">Students Passed</th>
            <th className="border p-2">Not Eligible</th>
            <th className="border p-2">Pass Percentage</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryB.map((row, index) => (
            <tr key={index} className="border">
              <td className="p-2">
                <input type="text" value={row.course}  disabled={loginType === "hod" || loginType === "committee"} onChange={(e) => handleInputChange(index, "course", e.target.value)} className="w-full px-2 py-1 border rounded" />
              </td>
              <td className="p-2">
                <input type="text" value={row.courseCode}  disabled={loginType === "hod" || loginType === "committee"} onChange={(e) => handleInputChange(index, "courseCode", e.target.value)} className="w-full px-2 py-1 border rounded" />
              </td>
              <td className="p-2">
                <input type="number" value={row.studentsRegistered}  disabled={loginType === "hod" || loginType === "committee"} onChange={(e) => handleInputChange(index, "studentsRegistered", e.target.value)} className="w-full px-2 py-1 border rounded" />
              </td>
              <td className="p-2">
                <input type="number" value={row.studentsPassed}  disabled={loginType === "hod" || loginType === "committee"} onChange={(e) => handleInputChange(index, "studentsPassed", e.target.value)} className="w-full px-2 py-1 border rounded" />
              </td>
              <td className="p-2">
                <input type="number" value={row.notEligible}  disabled={loginType === "hod" || loginType === "committee"} onChange={(e) => handleInputChange(index, "notEligible", e.target.value)} className="w-full px-2 py-1 border rounded" />
              </td>
              <td className="p-2">
                <input type="number" value={row.passPercentage}  disabled={loginType === "hod" || loginType === "committee"} onChange={(e) => handleInputChange(index, "passPercentage", e.target.value)} className="w-full px-2 py-1 border rounded" />
              </td>
              <td className="p-2">
                <input type="number" value={row.score}  disabled={loginType === "hod" || loginType === "committee"} onChange={(e) => handleInputChange(index, "score", e.target.value)} className="w-full px-2 py-1 border rounded" />
              </td>
              <td>
                <button type="button"  disabled={loginType === "hod" || loginType === "committee"} onClick={() => deleteRow(index)} className={`bg-red-500 text-white px-2 py-1 rounded ${
                      loginType === "hod" || loginType === "committee"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
          type="button"
          onClick={addRow}
          disabled={loginType === "hod" || loginType === "committee" || totalScore >= 50}
          className={`mt-2 px-3 py-2 rounded text-white ${
            loginType === "hod" || loginType === "committee" || totalScore >= 50
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-500"
          }`}
        >
        + Add Row
      </button>
      <p className="text-base font-semibold mt-1 text-gray-700">Total Score: {totalScore} / 50</p>
      {loginType === "committee" && (
          <div className="mt-4">
            <label className="block mb-1 font-semibold text-yellow-600">
              Committee Total Score (out of 50):
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
