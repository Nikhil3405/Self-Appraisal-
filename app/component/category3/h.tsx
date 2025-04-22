import { useState } from "react";

interface Copyright {
  title: string;
  date: string;
  type: "Indian" | "Foreign";
  score: string;
}

interface Category3HProps {
  initialData: Copyright[];
  onFormDataChangeAction: (data: Copyright[]) => void;
}

export default function Category3H({ initialData, onFormDataChangeAction }: Category3HProps) {
  const [copyrights, setCopyrights] = useState<Copyright[]>(initialData);
  const [warning, setWarning] = useState("");

  const MAX_SCORE = 5;

  const getTotalScore = () =>
    copyrights.reduce((total, c) => total + Number(c.score), 0);

  const handleInputChange = (
    index: number,
    field: keyof Copyright,
    value: string | number
  ) => {
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
    const updated = copyrights.filter((_, i) => i !== index);
    setWarning("");
    setCopyrights(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
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
  };
  

  const totalScore = getTotalScore();

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
                  onChange={(e) => handleInputChange(index, "title", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  value={row.date}
                  onChange={(e) => handleInputChange(index, "date", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={row.type}
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
                  value={row.score}
                  onChange={(e) => handleInputChange(index, "score", Number(e.target.value))}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <button
                  type="button"
                  onClick={() => deleteRow(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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
        disabled={totalScore >= MAX_SCORE}
        className={`mt-2 px-3 py-2 rounded text-white ${
          totalScore >= MAX_SCORE ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
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
    </div>
  );
}
