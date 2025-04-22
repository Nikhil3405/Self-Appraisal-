import { useState } from "react";

interface CommitteeActivity {
  activityType: string;
  score: number;
}

interface Category2BProps {
  initialData: CommitteeActivity[];
  onFormDataChangeAction: (data: CommitteeActivity[]) => void;
}

const activityOptions = [
  { label: "Dean", score: 5 },
  { label: "HOD", score: 5 },
  { label: "Placement Officer", score: 5 },
  { label: "Deputy/Associate/Assistant Deans", score: 4 },
  { label: "Hostel Warden", score: 5 },
  { label: "Assistant Warder", score: 3 },
  { label: "Member of Academic Council", score: 4 },
  { label: "Member of Governing Body", score: 4 },
  { label: "Member of IQAC", score: 3 },
  { label: "College Level Committee - In charge", score: 3 },
  { label: "College Level Committee - Member", score: 2 },
  { label: "Department Level - In charge", score: 2 },
  { label: "Department Level - Member", score: 1 },
];

export default function Category2B({ initialData, onFormDataChangeAction }: Category2BProps) {
  const [committeeResponsibilities, setCommitteeResponsibilities] = useState<CommitteeActivity[]>(initialData);

  const getTotalScore = () =>
    committeeResponsibilities.reduce((total, a) => total + Number(a.score), 0);

  const handleInputChange = (index: number, value: string) => {
    const option = activityOptions.find((opt) => opt.label === value);
    if (!option) return;

    const updated = [...committeeResponsibilities];
    const oldScore = committeeResponsibilities[index].score;
    const newTotal = getTotalScore() - oldScore + option.score;

    if (newTotal > 10) return; // Enforce max limit

    updated[index] = { activityType: option.label, score: option.score };
    setCommitteeResponsibilities(updated);
    onFormDataChangeAction(updated);
  };

  const deleteRow = (index: number) => {
    const updated = committeeResponsibilities.filter((_, i) => i !== index);
    setCommitteeResponsibilities(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    setCommitteeResponsibilities([
      ...committeeResponsibilities,
      { activityType: "", score: 0 },
    ]);
  };

  const totalScore = getTotalScore();

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        B. Academic and Administrative Committees and Responsibilities
      </h3>
      <b className="text-gray-600">Maximum Score: 10</b>

      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Type of Activity Co-Curricular Activities 
            <br/>(Departmental/College / university level)</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {committeeResponsibilities.map((row, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <select
                  value={row.activityType}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                >
                  <option value="">-- Select Activity --</option>
                  {activityOptions.map((opt) => (
                    <option key={opt.label} value={opt.label}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border p-2">{row.score}</td>
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
      <p className="text-base font-semibold mt-1 text-gray-700">Total Score: {totalScore} / 10</p>
    </div>
  );
}
