import { useState } from "react";

interface ResourceParticipation {
  details: string;
  date: string;
  maxScore: number;
  score: string;
}

interface Category2FProps {
  initialData: ResourceParticipation[];
  onFormDataChangeAction: (data: ResourceParticipation[]) => void;
}

export default function Category2F({ initialData, onFormDataChangeAction }: Category2FProps) {
  const [resourceParticipations, setResourceParticipations] = useState<ResourceParticipation[]>(initialData);

  const getTotalScore = () =>
    resourceParticipations.reduce((total, item) => total + Number(item.score), 0);

  const handleInputChange = (
    index: number,
    field: keyof ResourceParticipation,
    value: string | number
  ) => {
    const updated = [...resourceParticipations];
    let newValue: string | number = value;

    if (field === "score") {
        let score = Number(value);
        if (score > 5) score = 5;
        if (score < 0) score = 0;
      const oldScore = Number(resourceParticipations[index].score);
      const newTotal = getTotalScore() - oldScore + Number(newValue);
      if (newTotal > 10) return;
      newValue = score;

    }

    updated[index] = { ...updated[index], [field]: newValue };
    setResourceParticipations(updated);
    onFormDataChangeAction(updated);
  };

  const deleteRow = (index: number) => {
    const updated = resourceParticipations.filter((_, i) => i !== index);
    setResourceParticipations(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    setResourceParticipations([
      ...resourceParticipations,
      { details: "", date: "", maxScore: 5, score: "" },
    ]);
  };

  const totalScore = getTotalScore();

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        F. Participation as a Resource Person in Symposium, Conferences, FDPs/Workshops/Other Events
      </h3>
      <b className="text-gray-600">
        Maximum Score: 10 (5 marks per event)
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
          {resourceParticipations.map((row, index) => (
            <tr key={index} className="border">
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
                  type="date"
                  value={row.date}
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
