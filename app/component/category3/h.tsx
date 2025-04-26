import { useState,useEffect } from "react";

interface Copyright {
  title: string;
  date: string;
  type: "Indian" | "Foreign";
  score: string;
}

interface Category3HProps {
  initialData: Copyright[];
  onFormDataChangeAction: (data: Copyright[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void;
}

export default function Category3H({ initialData, onFormDataChangeAction,
  loginType, employeeId, onCommitteeScoreChange
 }: Category3HProps) {
  const [copyrights, setCopyrights] = useState<Copyright[]>(initialData);
  const [warning, setWarning] = useState("");
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");
  const MAX_SCORE = 5;
  useEffect(() => {
     if (initialData?.length) {
      setCopyrights(initialData);
     }
   }, [initialData]);
 
   useEffect(() => {
     if (employeeId) {
       console.log(`Loading data for employee ID: ${employeeId}`);
     }
   }, [employeeId]);
  const getTotalScore = () =>
    copyrights.reduce((total, c) => total + Number(c.score), 0);

  const handleInputChange = (
    index: number,
    field: keyof Copyright,
    value: string | number
  ) => {
    if (loginType === "hod") return;
    const updated = [...copyrights];
    const updatedItem = { ...updated[index], [field]: value };

    if (field === "score") {
      const newScore = Number(value);
      const hypotheticalTotal = getTotalScore() - Number(updated[index].score) + newScore;

      if (hypotheticalTotal > MAX_SCORE) {
        setWarning("Total score cannot exceed 5.");
        return;
      } else {
        setWarning("");
      }
    }

    updated[index] = updatedItem;
    setCopyrights(updated);
    onFormDataChangeAction(updated);
  };

  const deleteRow = (index: number) => {
    if (loginType === "hod") return;
    const updated = copyrights.filter((_, i) => i !== index);
    setWarning("");
    setCopyrights(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    if(loginType !== "hod" && getTotalScore() < MAX_SCORE) {
    const hypotheticalTotal = getTotalScore() + 1;
    if (hypotheticalTotal > MAX_SCORE) {
      setWarning("Cannot add row. Maximum score of 5 will be exceeded.");
      return;
    }
  
    setWarning("");
    const updated = [
      ...copyrights,
      {
        title: "",
        date: "",
        type: "Indian" as const,
        score: "",
      },
    ];
    setCopyrights(updated);
    onFormDataChangeAction(updated);
  }
  };
  
  const totalScore = getTotalScore();

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
  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">H. Copyrights</h3>
      <b className="text-gray-600">
        Maximum Score: 5
      </b>

      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Title of the Copyright</th>
            <th className="border p-2">Date of Registration</th>
            <th className="border p-2">Type (Indian/Foreign)</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {copyrights.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.title}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "title", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  value={row.date}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "date", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={row.type}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "type", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                >
                  <option value="Indian">Indian</option>
                  <option value="Foreign">Foreign</option>
                </select>
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  min={0}
                  max={5}
                  disabled={loginType === "hod" || loginType === "committee"}
                  value={row.score}
                  onChange={(e) => handleInputChange(index, "score", Number(e.target.value))}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
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

      {warning && (
        <p className="text-sm text-red-600 font-semibold mt-1">{warning}</p>
      )}

      <p className="text-base font-semibold mt-1 text-gray-700">
        Total Score: {totalScore} / {MAX_SCORE}
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
