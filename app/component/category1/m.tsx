import { useState,useEffect } from "react";

interface AcademicFile {
  details: string;
  score: string;
}

interface CategoryMProps {
  initialData: AcademicFile[];
  onFormDataChangeAction: (data: AcademicFile[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void;
}

export default function CategoryM({ initialData, onFormDataChangeAction,
  loginType, employeeId, onCommitteeScoreChange
 }: CategoryMProps) {
  const [academicFiles, setAcademicFiles] = useState<AcademicFile[]>(initialData);
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");

  useEffect(() => {
      if (initialData?.length) {
        setAcademicFiles(initialData);
      }
    }, [initialData]);
  
    useEffect(() => {
      if (employeeId) {
        console.log(`Loading data for employee ID: ${employeeId}`);
      }
    }, [employeeId]);

  const handleInputChange = (index: number, field: keyof AcademicFile, value: string | number) => {
    if (loginType === "hod") return;
    const updatedFiles = [...academicFiles];
    const newValue = typeof value === "number" ? String(value) : value;
    
    if (field === "score" && !isNaN(Number(newValue))) {
      const newTotal = getTotalScore() - Number(updatedFiles[index].score) + Number(newValue);
      if (newTotal > 20) {
        alert("Total score cannot exceed 20.");
        return;
      } // Prevent exceeding max total score
    }
    
    updatedFiles[index] = { ...updatedFiles[index], [field]: newValue };
    setAcademicFiles(updatedFiles);
    onFormDataChangeAction(updatedFiles);
  };

  const getTotalScore = () =>
    academicFiles.reduce((total, project) => total + Number(project.score), 0);
 
  const deleteRow = (index: number) => {
    if (loginType === "hod") return;
    const updatedFiles = academicFiles.filter((_, i) => i !== index);
    setAcademicFiles(updatedFiles);
    onFormDataChangeAction(updatedFiles);
  };

  const addRow = () => {
    if (loginType !== "hod" && getTotalScore() < 20) {
      setAcademicFiles((prev) => [...prev, { details: "", score: "" }]);
    }
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
        M. Maintenance of Personal Academic File
      </h3>
      <b className="text-gray-600">

        [Documentation of all details of: CIE/Test Question Papers, Scheme, Assignments given and evaluated,
        additional work schedule, lesson plan and other relevant documents: Each document = 2 points]
        <br/>Maximum Score: 20
      </b>
      {employeeId && (
          <div className="text-sm bg-blue-50 p-2 rounded mt-2 mb-2">
            Viewing data for Employee ID: {employeeId}
          </div>
        )}
      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Details</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {academicFiles.map((row, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.details}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "details", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={row.score}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "score", Number(e.target.value))}
                  className="w-full px-2 py-1 border rounded"
                  min={0}
                  max={20}
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
          loginType === "hod" || loginType === "committee"||totalScore >= 20 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
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
