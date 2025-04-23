import { useState,useEffect } from "react";

interface Fellowship {
  details: string;
  score: string;
}

interface Category2IProps {
  initialData: Fellowship[];
  onFormDataChangeAction: (data: Fellowship[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void;
}

export default function Category2I({ initialData, onFormDataChangeAction,
  loginType,
  employeeId,
  onCommitteeScoreChange, 
 }: Category2IProps) {
  const [fellowships, setFellowships] = useState<Fellowship[]>(initialData);
  
    const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");
     useEffect(() => {
        if (initialData?.length) {
          setFellowships(initialData);
        }
      }, [initialData]);
    
      useEffect(() => {
        if (employeeId) {
          console.log(`Loading data for employee ID: ${employeeId}`);
        }
      }, [employeeId]);
  const getTotalScore = () =>
    fellowships.reduce((total, entry) => total + Number(entry.score), 0);

  const handleInputChange = (
    index: number,
    field: keyof Fellowship,
    value: string | number
  ) => {
    if (loginType === "hod") return;

    const updated = [...fellowships];
    const newValue = field === "score" ? Number(value) : value;

    if (field === "score" && !isNaN(Number(newValue))) {

      const oldScore = Number(fellowships[index].score);
      const newTotal = getTotalScore() - oldScore + Number(newValue);
      if (newTotal > 5) return; // Max total score
    }

    updated[index] = { ...updated[index], [field]: newValue };
    setFellowships(updated);
    onFormDataChangeAction(updated);
  };

  const deleteRow = (index: number) => {
    if (loginType === "hod") return;
    const updated = fellowships.filter((_, i) => i !== index);
    setFellowships(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    if (loginType !== "hod" && getTotalScore() < 5) {
    setFellowships([...fellowships, { details: "", score: "" }]);
    }
  };
  const handleCommitteeTotalScoreChange = (value: string) => {
    if (Number(value) > 5) {
      alert("Committee total score cannot exceed 5.");
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
        I. Fellowships / Awards
      </h3>
      <b className="text-gray-600">
        [International Award/Fellowship – 5, National Level Award – 3, Best Paper – 3]
        <br /> Maximum Score: 5 
      
      </b>
      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Fellowships / Awards</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {fellowships.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  disabled={loginType === "hod" || loginType === "committee"}
                  value={row.details}
                  onChange={(e) =>
                    handleInputChange(index, "details", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
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
          loginType === "hod" || loginType === "committee"|| totalScore >= 5 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
        }`}
      >
        + Add Row
      </button>
      <p className="text-base font-semibold mt-1 text-gray-700">
        Total Score: {totalScore} / 5
      </p>
      {loginType === "committee" && (
        <div className="mt-4">
          <label className="block mb-1 font-semibold text-yellow-600">
            Committee Total Score (out of 5):
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
