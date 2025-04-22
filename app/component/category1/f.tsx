import { useState,useEffect } from "react";

interface IndustryInteraction {
  industryName: string;
  contactDetails: string;
  date: string;
  activitiesPlanned: string;
  score: string;
}

interface CategoryFProps {
  initialData: IndustryInteraction[];
  onFormDataChangeAction: (data: IndustryInteraction[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void;
}

export default function CategoryF({ initialData, onFormDataChangeAction
, loginType, employeeId, onCommitteeScoreChange
 }: CategoryFProps) {
  const [industryInteractions, setIndustryInteractions] = useState<IndustryInteraction[]>(initialData);
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");

    useEffect(() => {
      if (initialData?.length) {
        setIndustryInteractions(initialData);
      }
    }, [initialData]);
  
    useEffect(() => {
      if (employeeId) {
        console.log(`Loading data for employee ID: ${employeeId}`);
      }
    }, [employeeId]);
  const getTotalScore = () =>
    industryInteractions.reduce((total, project) => total + Number(project.score), 0);
  
  const handleInputChange = (
    index: number,
    field: keyof IndustryInteraction,
    value: string | number
  ) => {
    if (loginType === "hod") return;
    const updatedRecords = [...industryInteractions];
    const newValue = typeof value === "number" ? String(value) : value;
    if (field === "score" && !isNaN(Number(newValue))) {
      const oldScore = Number(industryInteractions[index].score);
      const newTotal = getTotalScore() - oldScore + Number(newValue);
  
      if (newTotal > 20) {
        alert("Total score cannot exceed 20.");
        return;
      }// Prevent score overflow
    }
    updatedRecords[index] = { ...updatedRecords[index], [field]: value };
    setIndustryInteractions(updatedRecords);
    onFormDataChangeAction(updatedRecords);
  };

  const totalScore = getTotalScore();

  const addRow = () => {
    if (loginType !== "hod" && getTotalScore() < 20) {
    setIndustryInteractions([...industryInteractions, { industryName: "", contactDetails: "", date: "", activitiesPlanned: "", score: "" }]);
  }};

  const deleteRow = (index: number) => {
    if (loginType === "hod") return;

    const updatedRecords = industryInteractions.filter((_, i) => i !== index);
    setIndustryInteractions(updatedRecords);
    onFormDataChangeAction(updatedRecords);
  };
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
      F. Involvement in arranging Industry Academic Interactions      </h3>
      <b className="text-gray-600">
      Maximum Score: 20      </b>
      {employeeId && (
          <div className="text-sm bg-blue-50 p-2 rounded mt-2 mb-2">
            Viewing data for Employee ID: {employeeId}
          </div>
        )}
      <table className="w-full border-collapse border mt-4 border-gray-300 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Industry Name</th>
            <th className="border p-2">Contact Details</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Activities Planned</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {industryInteractions.map((row, index) => (
            <tr key={index} className="border">
              <td className="p-2">
                <input
                  type="text"
                  value={row.industryName}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "industryName", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="p-2">
                <input
                  type="text"
                  value={row.contactDetails}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "contactDetails", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="p-2">
                <input
                  type="date"
                  value={row.date}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "date", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="p-2">
                <input
                  type="text"
                  value={row.activitiesPlanned}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "activitiesPlanned", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  value={row.score}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "score", Number(e.target.value))}
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
                  >
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
