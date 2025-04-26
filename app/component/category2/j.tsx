import { useState,useEffect } from "react";

interface Honor {
  title: string;
  date: string;
  conferredBy: string;
  unpaid: string; // Yes or No
  score: string;
}

interface Category2JProps {
  initialData: Honor[];
  onFormDataChangeAction: (data: Honor[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void;
}

export default function Category2J({ initialData, onFormDataChangeAction,
  loginType,
  employeeId,
  onCommitteeScoreChange,
 }: Category2JProps) {
  const [honors, setHonors] = useState<Honor[]>(initialData);
  
    const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");
    useEffect(() => {
          if (initialData?.length) {
            setHonors(initialData);
          }
        }, [initialData]);
      
        useEffect(() => {
          if (employeeId) {
            console.log(`Loading data for employee ID: ${employeeId}`);
          }
        }, [employeeId]);

  const getTotalScore = () =>
    honors.reduce((total, item) => total + Number(item.score), 0);

  const handleInputChange = (
    index: number,
    field: keyof Honor,
    value: string | number
  ) => {
    if (loginType === "hod") return;
    const updated = [...honors];
    const newValue = field === "score" ? Number(value) : value;

    if (field === "score" && !isNaN(Number(newValue))) {

      const oldScore = Number(honors[index].score);
      const newTotal = getTotalScore() - oldScore + Number(newValue);
      if (newTotal > 5) return; // Max total score
    }

    updated[index] = { ...updated[index], [field]: newValue };
    setHonors(updated);
    onFormDataChangeAction(updated);
  };

  const deleteRow = (index: number) => {
    if (loginType === "hod") return;
    const updated = honors.filter((_, i) => i !== index);
    setHonors(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    if (loginType !== "hod" && getTotalScore() < 5) {

    setHonors([
      ...honors,
      { title: "", date: "", conferredBy: "", unpaid: "Yes", score: "" },
    ]);
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
        J. Honors Conferred for the Contribution (Unpaid Only)
      </h3>
      <b className="text-gray-600">
        Honors by Government, Statutory Body, Industry, University
        <br />Maximum Score: 5 
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
            <th className="border p-2">Honors / Awards</th>
            <th className="border p-2">When Conferred</th>
            <th className="border p-2">By Whom</th>
            <th className="border p-2">Not Paid (Yes/No)</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {honors.map((row, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.title}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
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
              <td className="border p-2">
                <input
                  type="text"
                  value={row.conferredBy}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) =>
                    handleInputChange(index, "conferredBy", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={row.unpaid}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) =>
                    handleInputChange(index, "unpaid", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  disabled={loginType === "hod" || loginType === "committee"}
                  min={0}
                  max={5}
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
          loginType === "hod" || loginType === "committee"||totalScore >= 5 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
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
