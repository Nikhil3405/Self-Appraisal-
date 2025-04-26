import { useState,useEffect } from "react";

interface ProfessionalBodyActivity {
  name: string;
  activityType: string;
  score: number;
}

interface Category3NProps {
  initialData: ProfessionalBodyActivity[];
  onFormDataChangeAction: (data: ProfessionalBodyActivity[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void;
}

export default function Category3N({ initialData, onFormDataChangeAction,
  loginType, employeeId, onCommitteeScoreChange
 }: Category3NProps) {
  const [activities, setActivities] = useState<ProfessionalBodyActivity[]>(initialData);
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");
  const [warning, setWarning] = useState("");
  const MAX_SCORE = 10;
  const SCORE_PER_ACTIVITY = 5;
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
  const getTotalScore = () => activities.reduce((total, item) => total + item.score, 0);

  const handleInputChange = (
    index: number,
    field: keyof ProfessionalBodyActivity,
    value: string
  ) => {
    if (loginType === "hod") return;
    const updated = [...activities];
    updated[index] = { ...updated[index], [field]: value };
    setActivities(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    if (loginType !== "hod" && getTotalScore() < MAX_SCORE) {
    const hypotheticalTotal = getTotalScore() + SCORE_PER_ACTIVITY;
    if (hypotheticalTotal > MAX_SCORE) {
      setWarning("Cannot add more. Maximum score of 10 will be exceeded.");
      return;
    }

    setWarning("");
    const updated = [
      ...activities,
      {
        name: "",
        activityType: "",
        score: SCORE_PER_ACTIVITY,
      },
    ];
    setActivities(updated);
    onFormDataChangeAction(updated);
  }
  };

  const deleteRow = (index: number) => {
    if (loginType === "hod") return;
    const updated = activities.filter((_, i) => i !== index);
    setActivities(updated);
    onFormDataChangeAction(updated);
    setWarning("");
  };

  const totalScore = getTotalScore();
  const handleCommitteeTotalScoreChange = (value: string) => {
    if (Number(value) > 10) {
      alert("Committee total score cannot exceed 10.");
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
        N. Activities in the Recognized Professional Bodies
      </h3>
      <b className="text-gray-600">
        [5 per professional body activity] <br />
        Maximum Score: 10
      </b>

      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Name of the Professional Body</th>
            <th className="border p-2">Type of Activity</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={activity.name}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "name", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={activity.activityType}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "activityType", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">{activity.score}</td>
              <td className="border p-2">
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
          loginType === "hod" || loginType === "committee" || totalScore >= MAX_SCORE ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
        }`}
      >
        + Add Row
      </button>

      {warning && <p className="text-sm text-red-600 font-semibold mt-1">{warning}</p>}

      <p className="text-base font-semibold mt-1 text-gray-700">
        Total Score: {totalScore} / 10
      </p>
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
