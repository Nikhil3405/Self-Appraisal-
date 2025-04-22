import { useState } from "react";

interface TrainingProgram {
  title: string;
  duration: string;
  organizedBy: string;
  type: "Certification" | "FDP" | "Workshop" | "Pedagogy";
  score: number;
}

interface Category3LProps {
  initialData: TrainingProgram[];
  onFormDataChangeAction: (data: TrainingProgram[]) => void;
}

export default function Category3L({ initialData, onFormDataChangeAction }: Category3LProps) {
  const [programs, setPrograms] = useState<TrainingProgram[]>(initialData);
  const [warning, setWarning] = useState("");
  const MAX_SCORE = 25;

  const calculateScore = (type: string): number => {
    switch (type) {
      case "Certification":
        return 3;
      case "FDP":
      case "Workshop":
      case "Pedagogy":
        return 2;
      default:
        return 0;
    }
  };

  const getTotalScore = () =>
    programs.reduce((total, prog) => total + prog.score, 0);

  const handleInputChange = (
    index: number,
    field: keyof TrainingProgram,
    value: string
  ) => {
    const updated = [...programs];
    const updatedProgram = { ...updated[index], [field]: value };

    if (field === "type") {
      const newScore = calculateScore(value);
      const hypotheticalTotal = getTotalScore() - updated[index].score + newScore;
      if (hypotheticalTotal > MAX_SCORE) {
        setWarning("Total score cannot exceed 25.");
        return;
      }
      setWarning("");
      updatedProgram.score = newScore;
    }

    updated[index] = updatedProgram;
    setPrograms(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    const defaultScore = 2;
    const hypotheticalTotal = getTotalScore() + defaultScore;
    if (hypotheticalTotal > MAX_SCORE) {
      setWarning("Cannot add row. Maximum total score of 25 will be exceeded.");
      return;
    }

    setWarning("");
    const newPrograms = [
      ...programs,
      {
        title: "",
        duration: "",
        organizedBy: "",
        type: "FDP" as const,
        score: defaultScore,
      },
    ];
    setPrograms(newPrograms);
    onFormDataChangeAction(newPrograms);
  };

  const deleteRow = (index: number) => {
    const updated = programs.filter((_, i) => i !== index);
    setPrograms(updated);
    onFormDataChangeAction(updated);
    setWarning("");
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        L. Training Courses, Pedagogy, FDPs
      </h3>
      <b className="text-gray-600">
        [Certification courses (NPTEL/SWAYAM/Udemy/Coursera) – 3, FDP – 2, Workshop – 2, Pedagogy – 2]
        <br />
        Maximum Score: 25
      </b>

      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Title of the Programme</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Organized By</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((prog, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={prog.title}
                  onChange={(e) => handleInputChange(index, "title", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={prog.duration}
                  onChange={(e) => handleInputChange(index, "duration", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={prog.organizedBy}
                  onChange={(e) => handleInputChange(index, "organizedBy", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={prog.type}
                  onChange={(e) => handleInputChange(index, "type", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                >
                  <option value="FDP">FDP</option>
                  <option value="Certification">Certification</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Pedagogy">Pedagogy</option>
                </select>
              </td>
              <td className="border p-2">{prog.score}</td>
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
        className={`mt-2 px-3 py-2 rounded text-white ${
          getTotalScore() >= MAX_SCORE ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
        }`}
        disabled={getTotalScore() >= MAX_SCORE}
      >
        + Add Row
      </button>

      {warning && <p className="text-sm text-red-600 font-semibold mt-1">{warning}</p>}

      <p className="text-base font-semibold mt-1 text-gray-700">
        Total Score: {getTotalScore()} / 25
      </p>
    </div>
  );
}
