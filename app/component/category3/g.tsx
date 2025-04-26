import { useState,useEffect } from "react";

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
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void;
}

export default function Category3G({
  initialData,
  onFormDataChangeAction,
  loginType, employeeId, onCommitteeScoreChange
}: Category3GProps) {
  const [designPatents, setDesignPatents] = useState<DesignPatent[]>(initialData);
  const [warning, setWarning] = useState("");
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");
  const MAX_SCORE = 5;


  useEffect(() => {
     if (initialData?.length) {
      setDesignPatents(initialData);
     }
   }, [initialData]);
 
   useEffect(() => {
     if (employeeId) {
       console.log(`Loading data for employee ID: ${employeeId}`);
     }
   }, [employeeId]);

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
    if (loginType === "hod") return;
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
    if (loginType === "hod") return;
    const updated = designPatents.filter((_, i) => i !== index);
    setDesignPatents(updated);
    onFormDataChangeAction(updated);
    setWarning("");
  };

  const addRow = () => {
    if(loginType !== "hod" && getTotalScore() < MAX_SCORE) {
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
  }
  };

  const totalScore = getTotalScore();

  const handleCommitteeTotalScoreChange = (value: string) => {
    if (Number(value) > 5) {
      alert("Committee total score cannot exceed 5.");
      return;
    }
    setCommitteeTotalScore(value);
    if (onCommitteeScoreChange) {
      onCommitteeScoreChange(value); // 👈 call the parent function
    }
  };

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
                  disabled={loginType === "hod" || loginType === "committee"}
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
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) =>
                    handleInputChange(index, "date", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={patent.type}
                  disabled={loginType === "hod" || loginType === "committee"}
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
                  disabled={loginType === "hod" || loginType === "committee"}
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

      {warning && (
        <p className="text-sm text-red-600 font-semibold mt-1">{warning}</p>
      )}

      <p className="text-base font-semibold mt-1 text-gray-700">
        Total Score: {totalScore} / {MAX_SCORE}
      </p>
      {loginType === "committee" && (
          <div className="mt-4">
            <label className="block mb-1 font-semibold text-yellow-600">
              Committee Total Score (out of 5):
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
