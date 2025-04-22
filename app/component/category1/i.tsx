"use client";
import { useState, useEffect } from "react";

interface PartialDelivery {
  industryExpert: string;
  course: string;
  date: string;
  score: string; // Keeping as string like CategoryD
}

interface CategoryIProps {
  initialData: PartialDelivery[];
  onFormDataChangeAction: (data: PartialDelivery[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void;
}

export default function CategoryI({ initialData, onFormDataChangeAction, loginType, employeeId, onCommitteeScoreChange }: CategoryIProps) {
  const [partialDelivery, setPartialDelivery] = useState<PartialDelivery[]>(initialData || []);
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");

  useEffect(() => {
    if (initialData?.length) {
      setPartialDelivery(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (employeeId) {
      console.log(`Loading data for employee ID: ${employeeId}`);
    }
  }, [employeeId]);

  const getTotalScore = () =>
    partialDelivery.reduce((total, item) => total + Number(item.score), 0);

  const handleInputChange = (index: number, field: keyof PartialDelivery, value: string | number) => {
    if (loginType === "hod") return; // Prevent editing if HOD

    const updatedRecords = [...partialDelivery];
    const newValue = typeof value === "number" ? String(value) : value;

    if (field === "score" && !isNaN(Number(newValue))) {
      const oldScore = Number(partialDelivery[index].score);
      const newTotal = getTotalScore() - oldScore + Number(newValue);

      if (newTotal > 20) {
        alert("Total score cannot exceed 20.");
        return;
      }
    }

    updatedRecords[index] = { ...updatedRecords[index], [field]: newValue };
    setPartialDelivery(updatedRecords);
    onFormDataChangeAction(updatedRecords);
  };

  const addRow = () => {
    if (loginType !== "hod" && getTotalScore() < 20) {
      setPartialDelivery((prev) => [...prev, { industryExpert: "", course: "", date: "", score: "" }]);
    }
  };

  const deleteRow = (index: number) => {
    if (loginType === "hod") return;
    const updatedRecords = partialDelivery.filter((_, i) => i !== index);
    setPartialDelivery(updatedRecords);
    onFormDataChangeAction(updatedRecords);
  };

  const handleCommitteeTotalScoreChange = (value: string) => {
    if (Number(value) > 20) {
      alert("Committee total score cannot exceed 20.");
      return;
    }
    setCommitteeTotalScore(value);
    if (onCommitteeScoreChange) {
      onCommitteeScoreChange(value);
    }
  };

  const totalScore = getTotalScore();

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        I. Industry involvement in Partial delivery in your courses
      </h3>
      <b className="text-gray-600">
        Maximum Score: 20
      </b>

      {employeeId && (
        <div className="text-sm bg-blue-50 p-2 rounded mt-2 mb-2">
          Viewing data for Employee ID: {employeeId}
        </div>
      )}

      <table className="w-full border-collapse border mt-4 border-gray-300 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Industry Expert</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {partialDelivery.map((row, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.industryExpert}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "industryExpert", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.course}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "course", e.target.value)}
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
                <input
                  type="number"
                  value={row.score}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "score", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => deleteRow(index)}
                  disabled={loginType === "hod" || loginType === "committee"}
                  className={`bg-red-500 text-white px-2 py-1 rounded ${
                    loginType === "hod" || loginType === "committee" ? "opacity-50 cursor-not-allowed" : ""
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
        disabled={loginType === "hod" || loginType === "committee" || totalScore >= 20}
        className={`mt-2 px-3 py-2 rounded text-white ${
          loginType === "hod" || loginType === "committee" || totalScore >= 20
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-500"
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
