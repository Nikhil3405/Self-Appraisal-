import { useState } from "react";

interface ConsultancyWork {
  title: string;
  startDate: string;
  endDate: string;
  clientType: string; // Government/Private/Institutional
  natureOfWork: string;
  amount: number;
  score: number;
}

interface Category3KProps {
  initialData: ConsultancyWork[];
  onFormDataChangeAction: (data: ConsultancyWork[]) => void;
}

export default function Category3K({ initialData, onFormDataChangeAction }: Category3KProps) {
  const [consultancyWorks, setConsultancyWorks] = useState<ConsultancyWork[]>(initialData);
  const [warning, setWarning] = useState("");
  const MAX_SCORE = 25;

  const calculateScore = (amount: number): number => {
    if (amount >= 300000) return 10;
    if (amount >= 100000) return 5;
    if (amount >= 10000) return 2;
    return 0;
  };

  const getTotalScore = () =>
    consultancyWorks.reduce((total, entry) => total + entry.score, 0);

  const handleInputChange = (
    index: number,
    field: keyof ConsultancyWork,
    value: string | number
  ) => {
    const updated = [...consultancyWorks];
    const updatedEntry = { ...updated[index], [field]: value };

    if (field === "amount") {
      const newScore = calculateScore(Number(value));
      const hypotheticalTotal = getTotalScore() - updated[index].score + newScore;

      if (hypotheticalTotal > MAX_SCORE) {
        setWarning("Total score cannot exceed 25.");
        return;
      } else {
        setWarning("");
        updatedEntry.score = newScore;
      }
    }

    updated[index] = updatedEntry;
    setConsultancyWorks(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    const newScore = 0;
    const hypotheticalTotal = getTotalScore() + newScore;

    if (hypotheticalTotal > MAX_SCORE) {
      setWarning("Cannot add row. Maximum total score of 25 will be exceeded.");
      return;
    }

    setConsultancyWorks([
      ...consultancyWorks,
      {
        title: "",
        startDate: "",
        endDate: "",
        clientType: "Government",
        natureOfWork: "",
        amount: 0,
        score: newScore,
      },
    ]);
    setWarning("");
  };

  const deleteRow = (index: number) => {
    const updated = consultancyWorks.filter((_, i) => i !== index);
    setConsultancyWorks(updated);
    onFormDataChangeAction(updated);
    setWarning("");
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        K. Consultancy Works and IRG
      </h3>
      <b className="text-gray-600">
        [3 Lakhs and above – 10, 1 to 3 Lakhs – 5, 10,000 to 1 Lakh – 2] <br />
        Maximum Score: 25
      </b>

      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Start Date</th>
            <th className="border p-2">End Date</th>
            <th className="border p-2">Client Type</th>
            <th className="border p-2">Nature of Work</th>
            <th className="border p-2">Amount (₹)</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {consultancyWorks.map((entry, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={entry.title}
                  onChange={(e) => handleInputChange(index, "title", e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  value={entry.startDate}
                  onChange={(e) => handleInputChange(index, "startDate", e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  value={entry.endDate}
                  onChange={(e) => handleInputChange(index, "endDate", e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={entry.clientType}
                  onChange={(e) => handleInputChange(index, "clientType", e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                >
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                  <option value="Institutional">Institutional</option>
                </select>
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={entry.natureOfWork}
                  onChange={(e) => handleInputChange(index, "natureOfWork", e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  min={0}
                  value={entry.amount}
                  onChange={(e) => handleInputChange(index, "amount", Number(e.target.value))}
                  className="w-full border px-2 py-1 rounded"
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
        disabled={getTotalScore() >= MAX_SCORE}
        className={`mt-2 px-3 py-2 rounded text-white ${
          getTotalScore() >= MAX_SCORE ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
        }`}
      >
        + Add Row
      </button>

      {warning && <p className="text-sm text-red-600 font-semibold mt-2">{warning}</p>}

      <p className="text-base font-semibold mt-2 text-gray-700">
        Total Score: {getTotalScore()} / {MAX_SCORE}
      </p>
    </div>
  );
}
