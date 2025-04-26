import { useState,useEffect } from "react";

interface Project3M {
  title: string;
  status: "Ongoing" | "Completed";
  trl: number | null;
  score: number;
}

interface Category3MProps {
  initialData: Project3M[];
  onFormDataChangeAction: (data: Project3M[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void;
}

export default function Category3M({ initialData, onFormDataChangeAction,
  loginType, employeeId, onCommitteeScoreChange
 }: Category3MProps) {
  const [developedprojects, setdevelopedProjects] = useState<Project3M[]>(initialData);
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");
  const [warning, setWarning] = useState("");
  const [showTRLInfo, setShowTRLInfo] = useState(false);
  const MAX_SCORE = 25;
  useEffect(() => {
     if (initialData?.length) {
      setdevelopedProjects(initialData);
     }
   }, [initialData]);
 
   useEffect(() => {
     if (employeeId) {
       console.log(`Loading data for employee ID: ${employeeId}`);
     }
   }, [employeeId]);
  const calculateScore = (trl: number): number => {
    if (trl > 7) return 5;
    if (trl > 4) return 3;
    return 2;
  };

  const getTotalScore = () => developedprojects.reduce((sum, p) => sum + p.score, 0);

  const handleChange = (index: number, field: keyof Project3M, value: string | number) => {
    if (loginType === "hod") return;
    const updated = [...developedprojects];
    const updatedProject = { ...updated[index], [field]: value };

    if (field === "trl") {
      const trlValue = Number(value);
      const newScore = calculateScore(trlValue);
      const hypotheticalTotal = getTotalScore() - updated[index].score + newScore;

      if (hypotheticalTotal > MAX_SCORE) {
        setWarning("Total score cannot exceed 25.");
        return;
      } else {
        setWarning("");
        updatedProject.trl = trlValue;
        updatedProject.score = newScore;
      }
    }

    updated[index] = updatedProject;
    setdevelopedProjects(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    if(loginType !== "hod" && getTotalScore() < MAX_SCORE) {
    setWarning("");
    setdevelopedProjects([
      ...developedprojects,
      {
        title: "",
        status: "Completed",
        trl: null,
        score: 0,
      },
    ]);
  }
  };

  const deleteRow = (index: number) => {
    if (loginType === "hod") return;
    const updated = developedprojects.filter((_, i) => i !== index);
    setdevelopedProjects(updated);
    onFormDataChangeAction(updated);
    setWarning("");
  };

  const totalScore = getTotalScore();
  const handleCommitteeTotalScoreChange = (value: string) => {
    if (Number(value) > 25) {
      alert("Committee total score cannot exceed 25.");
      return;
    }
    setCommitteeTotalScore(value);
    if (onCommitteeScoreChange) {
      onCommitteeScoreChange(value); // 👈 call the parent function
    }
  };
  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        M. Innovative Developed Projects
      </h3>
      <b className="text-gray-600">
        [5 per project for TRL &gt; 7, 3 for TRL &gt; 4, 2 for TRL ≤ 4] <br />
        Maximum Score: 25
      </b>

      <button
        type="button"
        className="text-sm text-blue-600 mt-2 underline"
        onClick={() => setShowTRLInfo(!showTRLInfo)}
      >
        {showTRLInfo ? "Hide TRL Levels" : "Show TRL Levels"}
      </button>

      {showTRLInfo && (
        <div className="border rounded p-3 mt-2 bg-gray-50 text-sm text-left">
          <p><strong>Technology Readiness Levels (TRL):</strong></p>
          <ul className="list-disc ml-5">
            <li>TRL 1 — Basic principles observed</li>
            <li>TRL 2 — Technology concept formulated</li>
            <li>TRL 3 — Experimental proof of concept</li>
            <li>TRL 4 — Technology validated in lab</li>
            <li>TRL 5 — Technology validated in relevant environment</li>
            <li>TRL 6 — Technology demonstrated in relevant environment</li>
            <li>TRL 7 — System prototype demonstration in operational environment</li>
            <li>TRL 8 — System complete and qualified</li>
            <li>TRL 9 — Actual system proven in operational environment</li>
          </ul>
        </div>
      )}

      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Title of the Project</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">TRL</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {developedprojects.map((proj, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={proj.title}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={proj.status}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleChange(index, "status", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                >
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  min={1}
                  disabled={loginType === "hod" || loginType === "committee"}
                  max={9}
                  value={proj.trl ?? ""}
                  onChange={(e) => handleChange(index, "trl", Number(e.target.value))}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">{proj.score}</td>
              <td className="border p-2">
              <button
                type="button"
                onClick={() => deleteRow(index)}
                disabled={loginType === "hod" || loginType === "committee"}
                className={`bg-red-500 text-white px-2 py-1 rounded ${
                  loginType === "hod" || loginType === "committee"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
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
        disabled={loginType === "hod" || loginType === "committee"}
        className={`mt-2 px-3 py-2 rounded text-white ${
          loginType === "hod" || loginType === "committee" || totalScore >= MAX_SCORE ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
        }`}
      >
        + Add Row
      </button>

      {warning && <p className="text-sm text-red-600 font-semibold mt-1">{warning}</p>}

      <p className="text-base font-semibold mt-1 text-gray-700">
        Total Score: {totalScore} / 25
      </p>
      {loginType === "committee" && (
          <div className="mt-4">
            <label className="block mb-1 font-semibold text-yellow-600">
              Committee Total Score (out of 25):
            </label>
            <input
              type="number"
              value={committeeTotalScore}
              onChange={(e) => handleCommitteeTotalScoreChange(e.target.value)}
              className="w-32 px-2 py-1 border border-yellow-400 rounded"
            />
          </div>
        )}
    </div>
  );
}
