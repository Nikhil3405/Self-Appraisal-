import { useState,useEffect } from "react";

interface OutreachActivity {
  details: string;
  date: string;
  maxScore: number;
  score: string;
}

interface Category2GProps {
  initialData: OutreachActivity[];
  onFormDataChangeAction: (data: OutreachActivity[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void;
}

export default function Category2G({ initialData, onFormDataChangeAction, loginType,
  employeeId,
  onCommitteeScoreChange, }: Category2GProps) {
   
  const [outreachActivities, setOutreachActivities] = useState<OutreachActivity[]>(initialData);
   const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");
  
    
   useEffect(() => {
        if (initialData?.length) {
          setOutreachActivities(initialData);
        }
      }, [initialData]);
    
      useEffect(() => {
        if (employeeId) {
          console.log(`Loading data for employee ID: ${employeeId}`);
        }
      }, [employeeId]);
  const getTotalScore = () =>
    outreachActivities.reduce((total, item) => total + Number(item.score), 0);

  const handleInputChange = (
    index: number,
    field: keyof OutreachActivity,
    value: string | number
  ) => {
    if (loginType === "hod") return;
    const updated = [...outreachActivities];
    let newValue: string | number = value;

    if (field === "score" && !isNaN(Number(newValue))) {

        let score = Number(value);
        if (score > 5) score = 5;
        if (score < 0) score = 0;
      const oldScore = Number(outreachActivities[index].score);
      const newTotal = getTotalScore() - oldScore + Number(newValue);
      if (newTotal > 10) return; // max score limit
      newValue = score;

    }

    updated[index] = { ...updated[index], [field]: newValue };
    setOutreachActivities(updated);
    onFormDataChangeAction(updated);
  };

  const deleteRow = (index: number) => {
    if (loginType === "hod") return;
    const updated = outreachActivities.filter((_, i) => i !== index);
    setOutreachActivities(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    if (loginType !== "hod" && getTotalScore() < 10) {

    setOutreachActivities([
      ...outreachActivities,
      { details: "", date: "", maxScore: 5, score: "" },
    ]);
  }
  };
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
  const totalScore = getTotalScore();

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        G. Participation in Outreach Activities
      </h3>
      <b className="text-gray-600">
 [e.g. NCC, NSS, Reviewer, Conference Chair, Technical Committee Member, Industry Rep, Red Cross, Rotary, Student Clubs, etc.]
 <br />Maximum Score: 10 [5 per activity] 
      </b>
      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Details</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Max Score</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {outreachActivities.map((row, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.details}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) =>
                    handleInputChange(index, "details", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  value={row.date}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) =>
                    handleInputChange(index, "date", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">5</td>
              <td className="border p-2">
                <input
                  type="number"
                  min={0}
                  max={5}
                  disabled={loginType === "hod" || loginType === "committee"}
                  value={row.score}
                  onChange={(e) =>
                    handleInputChange(index, "score", Number(e.target.value))
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <button
                  type="button"
                  disabled={loginType === "hod" || loginType === "committee"}
                  onClick={() => deleteRow(index)}
                  className={`bg-red-500 text-white px-2 py-1 rounded ${loginType === "hod" || loginType === "committee"
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
          loginType === "hod" || loginType === "committee" || totalScore >= 10 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
        }`}
      >
        + Add Row
      </button>
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