import { useState,useEffect } from "react";

interface PublishedPaper {
  title: string;
  journalName: string;
  issnIsbn: string;
  peerReviewed: string;
  coAuthors: number;
  mainAuthor: string;
  journalType: "Q1" | "Q2" | "Q3" | "Q4" | "OTHERS" | " ";
  score: number;
}

interface Category3AProps {
  initialData: PublishedPaper[];
  onFormDataChangeAction: (data: PublishedPaper[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void;
}

const MAX_SCORE = 100;

export default function Category3A({ initialData, onFormDataChangeAction,
  loginType,
  employeeId,
  onCommitteeScoreChange,
 }: Category3AProps) {
  const [papers, setPapers] = useState<PublishedPaper[]>(initialData);
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");

  const getTotalScore = () => papers.reduce((total, p) => total + Number(p.score), 0);
  useEffect(() => {
    if (initialData?.length) {
      setPapers(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (employeeId) {
      console.log(`Loading data for employee ID: ${employeeId}`);
    }
  }, [employeeId]);

  const mainAuthorOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const handleInputChange = (
    index: number,
    field: keyof PublishedPaper,
    value: string | number | boolean
  ) => {
    if (loginType === "hod") return;
  
    const updated = [...papers];
    let updatedScore = updated[index].score;
  
    if (field === "journalType") {
      switch (value) {
        case "Q1":
        case "Q2":
          updatedScore = 20;
          break;
        case "Q3":
          updatedScore = 15;
          break;
        default:
          updatedScore = 5;
      }
    }
  
    const oldScore = papers[index].score;
    const scoreToAdd = field === "journalType" ? updatedScore : oldScore;
    const newTotal = getTotalScore() - oldScore + scoreToAdd;
  
    if (newTotal > MAX_SCORE) {
      alert(`Total score cannot exceed ${MAX_SCORE}`);
      return;
    }
  
    updated[index] = {
      ...updated[index],
      [field]: value,
      ...(field === "journalType" && { score: updatedScore }),
    };
  
    setPapers(updated);
    onFormDataChangeAction(updated);
  };
  

  const deleteRow = (index: number) => {
    if (loginType === "hod") return;
    
    const updated = papers.filter((_, i) => i !== index);
    setPapers(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    if (loginType !== "hod" && getTotalScore() < MAX_SCORE) {
    setPapers([
      ...papers,
      {
        title: "",
        journalName: "",
        issnIsbn: "",
        peerReviewed: "",
        coAuthors: 0,
        mainAuthor: "Yes",
        journalType: " ",
        score: 0,
      },
    ]);}
  };

  const handleCommitteeTotalScoreChange = (value: string) => {
    if (Number(value) > 100) {
      alert("Committee total score cannot exceed 100.");
      return;
    }
    setCommitteeTotalScore(value);
    if (onCommitteeScoreChange) {
      onCommitteeScoreChange(value); // 👈 call the parent function
    }
  };
  const totalScore = getTotalScore();

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        A. Published Papers in Journals (SCI/Scopus/Web of Science)
      </h3>
      <b className="text-gray-600">
        [Q1/Q2: 20 pts, Q3: 15 pts, Q4/Others: 5 pts] <br/>Maximum Score: 100
      </b>
      <table className="w-full border-collapse border border-gray-300 text-center mt-4 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Title with Page Nos.</th>
            <th className="border p-2">Journal Name</th>
            <th className="border p-2">ISSN/ISBN No.</th>
            <th className="border p-2">Peer Reviewed / Impact Factor</th>
            <th className="border p-2">No. of Co-authors</th>
            <th className="border p-2">Are You Main Author?</th>
            <th className="border p-2">Journal Type</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {papers.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  disabled={loginType === "hod" || loginType === "committee"}
                  value={row.title}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  disabled={loginType === "hod" || loginType === "committee"}
                  value={row.journalName}
                  onChange={(e) =>
                    handleInputChange(index, "journalName", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.issnIsbn}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) =>
                    handleInputChange(index, "issnIsbn", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  disabled={loginType === "hod" || loginType === "committee"}
                  value={row.peerReviewed}
                  onChange={(e) =>
                    handleInputChange(index, "peerReviewed", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  min={0}
                  disabled={loginType === "hod" || loginType === "committee"}
                  value={row.coAuthors}
                  onChange={(e) =>
                    handleInputChange(index, "coAuthors", Number(e.target.value))
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
  <select
    value={row.mainAuthor}
    disabled={loginType === "hod" || loginType === "committee"}
    onChange={(e) =>
      handleInputChange(index, "mainAuthor", e.target.value)
    }
    className="w-full px-2 py-1 border rounded"
  >
    {mainAuthorOptions.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
</td>

              <td className="border p-2">
                <select
                  value={row.journalType}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) =>
                    handleInputChange(index, "journalType", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                >
                  <option value=" ">
                    Select Journal Type</option>
                  <option value="Q1">Q1</option>
                  <option value="Q2">Q2</option>
                  <option value="Q3">Q3</option>
                  <option value="Q4">Q4</option>
                  <option value="OTHERS">OTHERS</option>
                </select>
              </td>
              <td className="border p-2">{row.score}</td>
              <td>
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
          loginType === "hod" || loginType === "committee"||totalScore >= MAX_SCORE ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
        }`}
      >
        + Add Row
      </button>
      <p className="text-base font-semibold mt-2 text-gray-700">
        Total Score: {totalScore} / {MAX_SCORE}
      </p>
      {loginType === "committee" && (
        <div className="mt-4">
          <label className="block mb-1 font-semibold text-yellow-600">
            Committee Total Score (out of {MAX_SCORE}):
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
