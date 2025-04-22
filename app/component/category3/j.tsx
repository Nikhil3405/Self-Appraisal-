import { useState } from "react";

interface ResearchGuidance {
  degree: "Ph.D" | "M.Tech" | string;
  candidateName: string;
  thesisTitle: string;
  university: string;
  status: string;
  score: number;
}

interface Category3JProps {
  initialData: ResearchGuidance[];
  onFormDataChangeAction: (data: ResearchGuidance[]) => void;
}

export default function Category3J({ initialData, onFormDataChangeAction }: Category3JProps) {
  const [guidanceList, setGuidanceList] = useState<ResearchGuidance[]>(initialData);
  const [warning, setWarning] = useState("");
  const MAX_SCORE = 25;

  const calculateScore = (degree: "Ph.D" | "M.Tech") => {
    return degree === "Ph.D" ? 10 : 5;
  };

  const getTotalScore = () =>
    guidanceList.reduce((total, entry) => total + Number(entry.score), 0);

  const handleInputChange = (
    index: number,
    field: keyof ResearchGuidance,
    value: string
  ) => {
    const updated = [...guidanceList];
    const updatedItem = { ...updated[index], [field]: value };

    if (field === "degree") {
      const newScore = calculateScore(value as "Ph.D" | "M.Tech");
      const hypotheticalTotal = getTotalScore() - updated[index].score + newScore;

      if (hypotheticalTotal > MAX_SCORE) {
        setWarning("Total score cannot exceed 25.");
        return;
      } else {
        setWarning("");
        updatedItem.score = newScore;
      }
    }

    updated[index] = updatedItem;
    setGuidanceList(updated);
    onFormDataChangeAction(updated);
  };

  const deleteRow = (index: number) => {
    const updated = guidanceList.filter((_, i) => i !== index);
    setGuidanceList(updated);
    onFormDataChangeAction(updated);
    setWarning("");
  };

  const addRow = () => {
    const defaultScore = 0;
    const hypotheticalTotal = getTotalScore() + defaultScore;

    if (hypotheticalTotal > MAX_SCORE) {
      setWarning("Cannot add row. Maximum total score of 25 will be exceeded.");
      return;
    }

    setWarning("");
    const newEntry: ResearchGuidance = {
      degree: "",
      candidateName: "",
      thesisTitle: "",
      university: "",
      status: "",
      score: defaultScore,
    };

    setGuidanceList([...guidanceList, newEntry]);
  };

  const totalScore = getTotalScore();

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        J. Research Guidance
      </h3>
      <b className="text-gray-600">
        [Ph.D Guidance – 10 per candidate, M.Tech – 5 per candidate]
        <br />
        Maximum Score: 25
      </b>

      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Degree</th>
            <th className="border p-2">Candidate Name</th>
            <th className="border p-2">Thesis Title</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">University</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {guidanceList.map((entry, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <select
                  value={entry.degree}
                  onChange={(e) => handleInputChange(index, "degree", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                >
                    <option value="0">Select Degree</option>
                  <option value="Ph.D">Ph.D</option>
                  <option value="M.Tech">M.Tech</option>
                </select>
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={entry.candidateName}
                  onChange={(e) => handleInputChange(index, "candidateName", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={entry.thesisTitle}
                  onChange={(e) => handleInputChange(index, "thesisTitle", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={entry.status}
                  onChange={(e) => handleInputChange(index, "status", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={entry.university}
                  onChange={(e) => handleInputChange(index, "university", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">{entry.score}</td>
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

      {warning && <p className="text-sm text-red-600 font-semibold mt-1">{warning}</p>}

      <p className="text-base font-semibold mt-1 text-gray-700">
        Total Score: {totalScore} / {MAX_SCORE}
      </p>
    </div>
  );
}
