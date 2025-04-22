import { useState } from "react";

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
}

export default function Category2J({ initialData, onFormDataChangeAction }: Category2JProps) {
  const [honors, setHonors] = useState<Honor[]>(initialData);

  const getTotalScore = () =>
    honors.reduce((total, item) => total + Number(item.score), 0);

  const handleInputChange = (
    index: number,
    field: keyof Honor,
    value: string | number
  ) => {
    const updated = [...honors];
    const newValue = field === "score" ? Number(value) : value;

    if (field === "score") {
      const oldScore = Number(honors[index].score);
      const newTotal = getTotalScore() - oldScore + Number(newValue);
      if (newTotal > 5) return; // Max total score
    }

    updated[index] = { ...updated[index], [field]: newValue };
    setHonors(updated);
    onFormDataChangeAction(updated);
  };

  const deleteRow = (index: number) => {
    const updated = honors.filter((_, i) => i !== index);
    setHonors(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    setHonors([
      ...honors,
      { title: "", date: "", conferredBy: "", unpaid: "Yes", score: "" },
    ]);
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
                  onChange={(e) =>
                    handleInputChange(index, "conferredBy", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={row.unpaid}
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
