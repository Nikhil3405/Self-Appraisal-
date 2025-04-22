import { useState,useEffect } from "react";

interface DayToDayActivity {
  particulars: string;
  score: string;
}

interface CategoryKProps {
    initialData: DayToDayActivity[];
  onFormDataChangeAction: (data: DayToDayActivity[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void;
}

export default function CategoryK({ initialData,onFormDataChangeAction,
  loginType, employeeId, onCommitteeScoreChange
 }: CategoryKProps) {
  const [dayToDayActivities, setDayToDayActivities] = useState<DayToDayActivity[]>(initialData);
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");
  useEffect(() => {
    if (initialData?.length) {
      setDayToDayActivities(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (employeeId) {
      console.log(`Loading data for employee ID: ${employeeId}`);
    }
  }, [employeeId]);
  
  const getTotalScore = () =>
    dayToDayActivities.reduce((total, project) => total + Number(project.score), 0);
  
  const handleInputChange = (
    index: number,
    field: keyof DayToDayActivity,
    value: string | number
  ) => {
    if (loginType === "hod") return;
    const updatedActivities = [...dayToDayActivities];
    const newValue = typeof value === "number" ? String(value) : value;
    if (field === "score" && !isNaN(Number(newValue))) {
      const oldScore = Number(dayToDayActivities[index].score);
      const newTotal = getTotalScore() - oldScore + Number(newValue);
  
      if (newTotal > 10){
        alert("Total score cannot exceed 10.");
        return;
      } // Prevent score overflow
    }
    updatedActivities[index] = { ...updatedActivities[index], [field]: newValue };
    setDayToDayActivities(updatedActivities);
    onFormDataChangeAction(updatedActivities);
  };

  const deleteRow = (index: number) => {
    if(loginType === "hod") return;

    const updatedActivities = dayToDayActivities.filter((_, i) => i !== index);
    setDayToDayActivities(updatedActivities);
    onFormDataChangeAction(updatedActivities);
  };

  const addRow = () => {
    if (loginType !== "hod" && getTotalScore() < 10) {
      setDayToDayActivities((prev) => [...prev, { particulars: "", score: "" }]);
    }
  };
  const totalScore = getTotalScore();

  const handleCommitteeTotalScoreChange = (value: string) => {
    if (Number(value) > 10) {
      alert("Committee total score cannot exceed 10.");
      return;
    }
    setCommitteeTotalScore(value);
    onCommitteeScoreChange?.(value);
  };
  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        K. Day to Day activity records maintenance in the department 
      </h3>
      <b className="text-gray-600">
        Maximum Score: 10, Attendance register: 5, Blue books: 5,etc
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
            <th className="border p-2">Particulars</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {dayToDayActivities.map((row, index) => (
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
                  min={0}
                  max={10}
                  disabled={loginType === "hod" || loginType === "committee"}
                  value={row.score}
                  onChange={(e) =>
                    handleInputChange(index, "score", Number(e.target.value))
                  }
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
