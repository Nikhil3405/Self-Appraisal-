import { useState,useEffect } from "react";

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
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void;
}

export default function Category3J({ initialData, onFormDataChangeAction,
  loginType, employeeId, onCommitteeScoreChange
 }: Category3JProps) {
  const [guidanceList, setGuidanceList] = useState<ResearchGuidance[]>(initialData);
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");
  const [warning, setWarning] = useState("");
  const MAX_SCORE = 25;
  useEffect(() => {
     if (initialData?.length) {
      setGuidanceList(initialData);
     }
   }, [initialData]);
 
   useEffect(() => {
     if (employeeId) {
       console.log(`Loading data for employee ID: ${employeeId}`);
     }
   }, [employeeId]);
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
    if (loginType === "hod") return;
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
    if (loginType === "hod") return;
    const updated = guidanceList.filter((_, i) => i !== index);
    setGuidanceList(updated);
    onFormDataChangeAction(updated);
    setWarning("");
  };

  const addRow = () => {
    if(loginType !== "hod" && getTotalScore() < MAX_SCORE) {
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
  }
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
                  disabled={loginType === "hod" || loginType === "committee"}
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
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "candidateName", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  disabled={loginType === "hod" || loginType === "committee"}
                  value={entry.thesisTitle}
                  onChange={(e) => handleInputChange(index, "thesisTitle", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={entry.status}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "status", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={entry.university}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) => handleInputChange(index, "university", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">{entry.score}</td>
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
        Total Score: {totalScore} / {MAX_SCORE}
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
