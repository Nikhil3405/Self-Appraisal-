import { useState } from "react";

interface UGProject {
  projectTitle: string;
  ugPercentageCompletion: number;
  hasPaper: string;
  hasPatent: string;
  hasFunding: string;
  score: number;
}

interface Category3EProps {
  initialData: UGProject[];
  onFormDataChangeAction: (data: UGProject[]) => void;
}

export default function Category3E({ initialData, onFormDataChangeAction }: Category3EProps) {
  const [projects, setProjects] = useState<UGProject[]>(initialData);
  const [warning, setWarning] = useState("");

  const MAX_SCORE = 20;

  const calculateScore = (paper: string, patent: string, funding: string): number => {
    const scorePerYes = 5;
    const count =
      (paper === "Yes" ? 1 : 0) +
      (patent === "Yes" ? 1 : 0) +
      (funding === "Yes" ? 1 : 0);
    return count > 0 ? count * scorePerYes : 2;
  };

  const getTotalScore = () =>
    projects.reduce((total, proj) => total + Number(proj.score), 0);

  const handleInputChange = (
    index: number,
    field: keyof UGProject,
    value: string | number
  ) => {
    const updated = [...projects];
    const tempProject = { ...updated[index], [field]: value };

    // Recalculate score based on updated values
    const newScore = calculateScore(
      field === "hasPaper" ? value as string : tempProject.hasPaper,
      field === "hasPatent" ? value as string : tempProject.hasPatent,
      field === "hasFunding" ? value as string : tempProject.hasFunding
    );

    const currentTotal = getTotalScore();
    const oldScore = updated[index].score;
    const projectedTotal = currentTotal - oldScore + newScore;

    if (projectedTotal > MAX_SCORE) {
      setWarning("Total score cannot exceed 20.");
      return;
    }

    setWarning("");
    updated[index] = { ...tempProject, score: newScore };
    setProjects(updated);
    onFormDataChangeAction(updated);
  };

  const deleteRow = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
    onFormDataChangeAction(updated);
    setWarning("");
  };

  const addRow = () => {
    if (getTotalScore() >= MAX_SCORE) {
      setWarning("Cannot add more rows. Max total score reached.");
      return;
    }

    setWarning("");
    const newProject: UGProject = {
      projectTitle: "",
      ugPercentageCompletion: 0,
      hasPaper: "No",
      hasPatent: "No",
      hasFunding: "No",
      score: 2,
    };

    const projectedTotal = getTotalScore() + newProject.score;
    if (projectedTotal > MAX_SCORE) {
      setWarning("Adding this row would exceed the maximum score.");
      return;
    }

    const updated = [...projects, newProject];
    setProjects(updated);
    onFormDataChangeAction(updated);
  };

  const totalScore = getTotalScore();

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">E. Project Works (UG)</h3>
      <b className="text-gray-600">
        [5 per paper/patent out of project or with funding (Dr. AIT/others), otherwise 2 per project.]
        <br />Maximum Score: {MAX_SCORE}
      </b>

      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Project Title</th>
            <th className="border p-2">UG % Completion</th>
            <th className="border p-2">Paper Published?</th>
            <th className="border p-2">Patent Published?</th>
            <th className="border p-2">Fund Received?</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={proj.projectTitle}
                  onChange={(e) => handleInputChange(index, "projectTitle", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={proj.ugPercentageCompletion}
                  onChange={(e) =>
                    handleInputChange(index, "ugPercentageCompletion", Number(e.target.value))
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              {["hasPaper", "hasPatent", "hasFunding"].map((field) => (
                <td className="border p-2" key={field}>
                  <select
                    value={proj[field as keyof UGProject] as string}
                    onChange={(e) =>
                      handleInputChange(index, field as keyof UGProject, e.target.value)
                    }
                    className="w-full px-2 py-1 border rounded"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </td>
              ))}
              <td className="border p-2">{proj.score}</td>
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
        <div className="text-red-600 font-semibold mt-2">{warning}</div>
      )}
      <p className="text-base font-semibold mt-1 text-gray-700">
        Total Score: {totalScore} / {MAX_SCORE}
      </p>
    </div>
  );
}
