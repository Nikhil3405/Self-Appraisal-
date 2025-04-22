import { useState } from "react";

interface Fellowship {
  details: string;
  score: string;
}

interface Category2IProps {
  initialData: Fellowship[];
  onFormDataChangeAction: (data: Fellowship[]) => void;
}

export default function Category2I({ initialData, onFormDataChangeAction }: Category2IProps) {
  const [fellowships, setFellowships] = useState<Fellowship[]>(initialData);

  const getTotalScore = () =>
    fellowships.reduce((total, entry) => total + Number(entry.score), 0);

  const handleInputChange = (
    index: number,
    field: keyof Fellowship,
    value: string | number
  ) => {
    const updated = [...fellowships];
    const newValue = field === "score" ? Number(value) : value;

    if (field === "score") {
      const oldScore = Number(fellowships[index].score);
      const newTotal = getTotalScore() - oldScore + Number(newValue);
      if (newTotal > 5) return; // Max total score
    }

    updated[index] = { ...updated[index], [field]: newValue };
    setFellowships(updated);
    onFormDataChangeAction(updated);
  };

  const deleteRow = (index: number) => {
    const updated = fellowships.filter((_, i) => i !== index);
    setFellowships(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    setFellowships([...fellowships, { details: "", score: "" }]);
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
        disabled={totalScore >= 5}
        className={`mt-2 px-3 py-2 rounded text-white ${
          totalScore >= 5 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
        }`}
      >
        + Add Row
      </button>
      <p className="text-base font-semibold mt-1 text-gray-700">
        Total Score: {totalScore} / 5
      </p>
    </div>
  );
}
