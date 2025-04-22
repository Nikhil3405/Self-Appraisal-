import { useState } from "react";

interface FundedProject {
  title: string;
  agency: string;
  year: string;
  period: string;
  grant: string;
  status: "Completed" | "Ongoing";
  score: number;
}

interface Category3IProps {
  initialData: FundedProject[];
  onFormDataChangeAction: (data: FundedProject[]) => void;
}

export default function Category3I({ initialData, onFormDataChangeAction }: Category3IProps) {
  const [fundProjects, setFundProjects] = useState<FundedProject[]>(initialData);
  const [warning, setWarning] = useState("");
  const MAX_SCORE = 50;

  const calculateScore = (grant: number): number => {
    if (grant >= 30) return 25;
    if (grant >= 5) return 20;
    if (grant >= 1) return 15;
    if (grant > 0) return 5;
    return 0;
  };

  const getTotalScore = () =>
    fundProjects.reduce((total, project) => total + Number(project.score), 0);

  const handleInputChange = (
    index: number,
    field: keyof FundedProject,
    value: string | number
  ) => {
    const updated = [...fundProjects];
    const updatedProject = { ...updated[index], [field]: value };

    if (field === "grant") {
      const grantValue = Number(value);
      const newScore = calculateScore(grantValue);
      const hypotheticalTotal = getTotalScore() - updated[index].score + newScore;

      if (hypotheticalTotal > MAX_SCORE) {
        setWarning("Total score cannot exceed 50.");
        return;
      } else {
        setWarning("");
        updatedProject.score = newScore;
      }
    }

    updated[index] = updatedProject;
    setFundProjects(updated);
    onFormDataChangeAction(updated);
  };

  const deleteRow = (index: number) => {
    const updated = fundProjects.filter((_, i) => i !== index);
    setFundProjects(updated);
    onFormDataChangeAction(updated);
    setWarning("");
  };

  const addRow = () => {
    const hypotheticalTotal = getTotalScore();
    if (hypotheticalTotal >= MAX_SCORE) {
      setWarning("Cannot add row. Maximum total score of 50 will be exceeded.");
      return;
    }

    setWarning("");
    setFundProjects([
      ...fundProjects,
      {
        title: "",
        agency: "",
        year: "",
        period: "",
        grant: "",
        status: "Completed",
        score: 0,
      },
    ]);
  };

  const totalScore = getTotalScore();

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        I. Funded Research Projects
      </h3>
      <b className="text-gray-600">
        [30 lakhs and above – 25, 05 to 30 lakhs – 20, 01 to 5 lakhs – 15, less than 1 lakh – 5]
        <br />
        Maximum Score: 50
      </b>

      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Agency</th>
            <th className="border p-2">Year of Sanction</th>
            <th className="border p-2">Project Period</th>
            <th className="border p-2">Grant (₹ in Lakhs)</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {fundProjects.map((project, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handleInputChange(index, "title", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={project.agency}
                  onChange={(e) => handleInputChange(index, "agency", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={project.year}
                  onChange={(e) => handleInputChange(index, "year", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={project.period}
                  onChange={(e) => handleInputChange(index, "period", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  min={0}
                  value={project.grant}
                  onChange={(e) => handleInputChange(index, "grant", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={project.status}
                  onChange={(e) => handleInputChange(index, "status", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                >
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
              </td>
              <td className="border p-2">{project.score}</td>
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
        Total Score: {totalScore} / 50
      </p>
    </div>
  );
}
