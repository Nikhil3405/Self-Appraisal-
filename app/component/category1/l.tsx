import { useState,useEffect } from "react";

interface MiniProject {
  particulars: string;
  score: string;
}

interface CategoryLProps {
  initialData: MiniProject[];
  onFormDataChangeAction: (data: MiniProject[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void;
}

export default function CategoryL({ initialData, onFormDataChangeAction,
  loginType, employeeId, onCommitteeScoreChange
 }: CategoryLProps) {
  const [miniProjects, setMiniProjects] = useState<MiniProject[]>(initialData);
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");
  useEffect(() => {
     if (initialData?.length) {
      setMiniProjects(initialData);
     }
   }, [initialData]);
 
   useEffect(() => {
     if (employeeId) {
       console.log(`Loading data for employee ID: ${employeeId}`);
     }
   }, [employeeId]); 
  const getTotalScore = () =>
    miniProjects.reduce((total, project) => total + Number(project.score), 0);
  
  const handleInputChange = (
    index: number,
    field: keyof MiniProject,
    value: string | number
  ) => {
    if (loginType === "hod") return;
    const updatedProjects = [...miniProjects];
    const newValue = typeof value === "number" ? String(value) : value;
  
    if (field === "score" && !isNaN(Number(newValue))) {
      const oldScore = Number(miniProjects[index].score);
      const newTotal = getTotalScore() - oldScore + Number(newValue);
  
      if (newTotal > 10) {
        alert("Total score cannot exceed 10.");
        return;
      } // Prevent score overflow
    }
  
    updatedProjects[index] = { ...updatedProjects[index], [field]: newValue };
    setMiniProjects(updatedProjects);
    onFormDataChangeAction(updatedProjects);
  };
  

  const deleteRow = (index: number) => {
    if (loginType === "hod") return;
    const updatedProjects = miniProjects.filter((_, i) => i !== index);
    setMiniProjects(updatedProjects);
    onFormDataChangeAction(updatedProjects);
  };

  const addRow = () => {
    if (loginType !== "hod" && getTotalScore() < 10) {
      setMiniProjects((prev) => [...prev, { particulars: "", score: "" }]);
    }
  };

  const totalScore = getTotalScore();

  const handleCommitteeTotalScoreChange = (value: string) => {
    if (Number(value) > 10) {
      alert("Committee total score cannot exceed 10.");
      return;
    }
    setCommitteeTotalScore(value);
    onCommitteeScoreChange?.(value); // 👈 call the parent function
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        L. Guiding of Mini Projects
      </h3>
      <b className="text-gray-600">Maximum Score 10, 5 per project</b>
      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Particulars</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {miniProjects.map((row, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  disabled={loginType === "hod" || loginType === "committee"}
                  value={row.particulars}
                  onChange={(e) =>
                    handleInputChange(index, "particulars", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={row.score}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) =>
                    handleInputChange(index, "score", Number(e.target.value))
                  }
                  className="w-full px-2 py-1 border rounded"
                  max={5}
                  min={0}
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
        disabled={loginType === "hod" || loginType === "committee"}
        className={`mt-2 px-3 py-2 rounded text-white ${
          loginType==="hod"|| loginType==="committee"||totalScore >= 10 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
        }`}
      >
        + Add Row
      </button>
      <p className="text-base font-semibold mt-1 text-gray-700">Total Score: {totalScore} / 10</p>
      {loginType === "committee" && (
          <div className="mt-4">
            <label className="block mb-1 font-semibold text-yellow-600">
              Committee Total Score (out of 10):
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
