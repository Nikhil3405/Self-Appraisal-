import { useState } from "react";

interface DesignPatent {
  title: string;
  date: string;
  type: "Indian" | "Foreign";
  status: "Filed" | "Published" | "Awarded";
  score: number;
}

interface Category3GProps {
  initialData: DesignPatent[];
  onFormDataChangeAction: (data: DesignPatent[]) => void;
}

export default function Category3G({
  initialData,
  onFormDataChangeAction,
}: Category3GProps) {
  const [designPatents, setDesignPatents] = useState<DesignPatent[]>(initialData);
  const [warning, setWarning] = useState("");

  const MAX_SCORE = 5;

  const calculateScore = (status: string): number => {
    switch (status) {
      case "Awarded":
        return 5;
      case "Published":
        return 4;
      case "Filed":
        return 3;
      default:
        return 0;
    }
  };

  const getTotalScore = () =>
    designPatents.reduce((total, patent) => total + Number(patent.score), 0);

  const handleInputChange = (
    index: number,
    field: keyof DesignPatent,
    value: string
  ) => {
    const updated = [...designPatents];
    const updatedPatent = { ...updated[index], [field]: value };

    if (field === "status") {
      const newScore = calculateScore(value);
      const hypotheticalTotal =
        getTotalScore() - updated[index].score + newScore;

      if (hypotheticalTotal > MAX_SCORE) {
        setWarning("Total score cannot exceed 5.");
        return;
      } else {
        setWarning("");
        updatedPatent.score = newScore;
      }
    }

    updated[index] = updatedPatent;
    setDesignPatents(updated);
    onFormDataChangeAction(updated);
  };

  const deleteRow = (index: number) => {
    const updated = designPatents.filter((_, i) => i !== index);
    setDesignPatents(updated);
    onFormDataChangeAction(updated);
    setWarning("");
  };

  const addRow = () => {
    const newscore = 3;
    const hypotheticalTotal = getTotalScore()+newscore// Default: Filed = 3
    if (hypotheticalTotal > MAX_SCORE) {
      setWarning("Cannot add row. Maximum total score of 5 will be exceeded.");
      return;
    }

    setWarning("");
    const newPatent: DesignPatent = {
      title: "",
      date: "",
      type: "Indian",
      status: "Filed",
      score: newscore,
    };

    const updated = [...designPatents, newPatent];
    setDesignPatents(updated);
    onFormDataChangeAction(updated);
  };

  const totalScore = getTotalScore();

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">G. Design Patents</h3>
      <b className="text-gray-600">
        [Granted = 5, Published = 4, Filed = 3]
        <br />
        Maximum Score: 5
      </b>

      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Title of the Design Patent</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Type (Indian/Foreign)</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {designPatents.map((patent, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={patent.title}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  value={patent.date}
                  onChange={(e) =>
                    handleInputChange(index, "date", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={patent.type}
                  onChange={(e) =>
                    handleInputChange(index, "type", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                >
                  <option value="Indian">Indian</option>
                  <option value="Foreign">Foreign</option>
                </select>
              </td>
              <td className="border p-2">
                <select
                  value={patent.status}
                  onChange={(e) =>
                    handleInputChange(index, "status", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                >
                  <option value="Filed">Filed</option>
                  <option value="Published">Published</option>
                  <option value="Awarded">Awarded</option>
                </select>
              </td>
              <td className="border p-2">{patent.score}</td>
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
