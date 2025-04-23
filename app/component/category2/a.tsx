import { useState,useEffect } from "react";

interface ActivityRecord {
  activityDetails: string;
  activityType: string;
  maxScore: number;
  score: string;
}

interface Category2AProps {
  initialData: ActivityRecord[];
  onFormDataChangeAction: (data: ActivityRecord[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void; 
}

export default function Category2A({ initialData, onFormDataChangeAction,
  loginType, employeeId, onCommitteeScoreChange
 }: Category2AProps) {
  const [activities, setActivities] = useState<ActivityRecord[]>(initialData);
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");
  const getTotalScore = () =>
    activities.reduce((total, a) => total + Number(a.score), 0);
  
  useEffect(() => {
     if (initialData?.length) {
      setActivities(initialData);
     }
   }, [initialData]);
 
   useEffect(() => {
     if (employeeId) {
       console.log(`Loading data for employee ID: ${employeeId}`);
     }
   }, [employeeId]); 

  const handleInputChange = (
    index: number,
    field: keyof ActivityRecord,
    value: string | number
  ) => {
    if (loginType === "hod") return;
    const updated = [...activities];
    let newValue: string | number = typeof value === "number" ? String(value) : value;
    if (field === "score" && !isNaN(Number(newValue))) {
      let score = Number(value);
      if (score > 5) score = 5;
      if (score < 0) score = 0;
      const oldScore = Number(activities[index].score);
      const newTotal = getTotalScore() - oldScore + score;
      if (newTotal > 20) {
        alert("Total score cannot exceed 20.");
        return;
      } // Max score limit
      newValue = score.toString();

    }

    updated[index] = { ...updated[index], [field]: newValue };
    setActivities(updated);
    onFormDataChangeAction(updated);
  };

  const deleteRow = (index: number) => {
    if (loginType === "hod") return;
    const updated = activities.filter((_, i) => i !== index);
    setActivities(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    if (loginType !== "hod" && getTotalScore() < 20) {
    setActivities([
      ...activities,
      { activityDetails: "", activityType: "", maxScore: 5, score: "" },
    ]);}
  };

  const totalScore = getTotalScore();

  const handleCommitteeTotalScoreChange = (value: string) => {
    if (Number(value) > 20) {
      alert("Committee total score cannot exceed 10.");
      return;
    }
    setCommitteeTotalScore(value);
    onCommitteeScoreChange?.(value); // 👈 call the parent function
  }
  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        A. Co-curricular, Extra-curricular, Professional development related Activities
      </h3>
      <b className="text-gray-600">
        Maximum Score: 20 @ 5 mark each
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
            <th className="border p-2">Activity Details</th>
            <th className="border p-2">Type of Activity (Dept./College/Univ.)</th>
            <th className="border p-2">Max Score</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((row, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.activityDetails}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) =>
                    handleInputChange(index, "activityDetails", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.activityType}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) =>
                    handleInputChange(index, "activityType", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
5
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  min={0}
                  max={5}
                  value={row.score}
                  disabled={loginType === "hod" || loginType === "committee"}
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
          loginType==="hod"|| loginType==="committee"||totalScore >= 20 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
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
