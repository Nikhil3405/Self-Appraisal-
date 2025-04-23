import { useState ,useEffect} from "react";

interface ProfessionalBodyActivity {
  activityType: string;
  score: string;
}

interface Category2HProps {
  initialData: ProfessionalBodyActivity[];
  onFormDataChangeAction: (data: ProfessionalBodyActivity[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void;
}

export default function Category2H({ initialData, onFormDataChangeAction,
  loginType,
  employeeId,
  onCommitteeScoreChange,
 }: Category2HProps) {
  const [professionalBodies, setProfessionalBodies] = useState<ProfessionalBodyActivity[]>(initialData);
  
    const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");
     useEffect(() => {
        if (initialData?.length) {
          setProfessionalBodies(initialData);
        }
      }, [initialData]);
    
      useEffect(() => {
        if (employeeId) {
          console.log(`Loading data for employee ID: ${employeeId}`);
        }
      }, [employeeId]);
  const getTotalScore = () =>
    professionalBodies.reduce((total, item) => total + Number(item.score), 0);

  const handleInputChange = (
    index: number,
    field: keyof ProfessionalBodyActivity,
    value: string | number
  ) => {
    if (loginType === "hod") return;

    const updated = [...professionalBodies];
    const newValue = field === "score" ? Number(value) : value;

    if (field === "score" && !isNaN(Number(newValue))) {

      const oldScore = Number(professionalBodies[index].score);
      const newTotal = getTotalScore() - oldScore + Number(newValue);
      if (newTotal > 5) return; // max score limit
    }

    updated[index] = { ...updated[index], [field]: newValue };
    setProfessionalBodies(updated);
    onFormDataChangeAction(updated);
  };

  const deleteRow = (index: number) => {
    if (loginType === "hod") return;

    const updated = professionalBodies.filter((_, i) => i !== index);
    setProfessionalBodies(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    if (loginType !== "hod" && getTotalScore() < 5) {

    setProfessionalBodies([
      ...professionalBodies,
      { activityType: "", score: "" },
    ]);
  }
  };
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

  const totalScore = getTotalScore();

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        H. Member of Professional Bodies
      </h3>
      <b className="text-gray-600">
        Maximum Score: 5
      </b>
      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Type of Activity Co-Curricular Activities<br/>
            (Departmental/College / university level)</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {professionalBodies.map((row, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.activityType}
                  disabled={loginType === "hod" || loginType === "committee"}
                  placeholder="Enter activity type"
                  onChange={(e) =>
                    handleInputChange(index, "activityType", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  min={0}
                  max={5}
                  disabled={loginType === "hod" || loginType === "committee"}
                  value={row.score}
                  onChange={(e) =>
                    handleInputChange(index, "score", Number(e.target.value))
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <button
                  type="button"
                  disabled={loginType === "hod" || loginType === "committee"}
                  onClick={() => deleteRow(index)}
                  className={`bg-red-500 text-white px-2 py-1 rounded ${loginType === "hod" || loginType === "committee"
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
          loginType === "hod" || loginType === "committee" || totalScore >= 5 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
        }`}
      >
        + Add Row
      </button>
      <p className="text-base font-semibold mt-1 text-gray-700">
        Total Score: {totalScore} / 5
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