import { useState } from "react";

interface OutreachResponsibility {
  responsibility: string;
  maxScore: number;
  score: string;
}

interface Category2DProps {
  initialData: OutreachResponsibility[];
  onFormDataChangeAction: (data: OutreachResponsibility[]) => void;
}

export default function Category2D({
  initialData,
  onFormDataChangeAction,
}: Category2DProps) {
  const [entries, setEntries] = useState<OutreachResponsibility[]>(initialData);

  const getTotalScore = () =>
    entries.reduce((total, entry) => total + Number(entry.score), 0);

  const handleInputChange = (
    index: number,
    field: keyof OutreachResponsibility,
    value: string | number
  ) => {
    const updated = [...entries];

    let newValue: string | number = value;

    if (field === "score") {
      let score = Number(value);
      if (score > 5) score = 5;
      if (score < 0) score = 0;

      const oldScore = Number(entries[index].score);
      const newTotal = getTotalScore() - oldScore + score;
      if (newTotal > 10) return;

      newValue = score;
    }

    updated[index] = { ...updated[index], [field]: newValue };
    setEntries(updated);
    onFormDataChangeAction(updated);
  };

  const deleteRow = (index: number) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    setEntries([
      ...entries,
      { responsibility: "", maxScore: 5, score: "" },
    ]);
  };

  const totalScore = getTotalScore();

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        D. Academic and Administrative Outreaches and Responsibilities
      </h3>
      <b className="text-gray-600">
        [BoS, BoE, Academic Council Members, LIC, NBA, AICTE, UGC, NAAC etc]
        <br />
        Maximum Score: 10 @ 5 marks each
      </b>
      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Responsibilities</th>
            <th className="border p-2">Max Score</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.responsibility}
                  onChange={(e) =>
                    handleInputChange(index, "responsibility", e.target.value)
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
        disabled={totalScore >= 10}
        className={`mt-2 px-3 py-2 rounded text-white ${
          totalScore >= 10 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
        }`}
      >
        + Add Row
      </button>

      <p className="text-base font-semibold mt-1 text-gray-700">
        Total Score: {totalScore} / 10
      </p>
    </div>
  );
}
