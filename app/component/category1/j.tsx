import { useState,useEffect } from "react";

interface StudentFeedback {
  score: string;
}

interface CategoryJProps {
  initialData: StudentFeedback;
  onFormDataChangeAction: (data: StudentFeedback) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void; 
}

export default function CategoryJ({ initialData, onFormDataChangeAction,
  loginType, employeeId, onCommitteeScoreChange
 }: CategoryJProps) {
  const [score, setScore] = useState<string>(initialData.score);
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");

    useEffect(() => {
      if (initialData?.score) {
        setScore(initialData.score);
      }
    }, [initialData]);
  
    useEffect(() => {
      if (employeeId) {
        console.log(`Loading data for employee ID: ${employeeId}`);
      }
    }, [employeeId]);
  const handleScoreChange = (value: string) => {
    if (loginType === "hod") return;
    if (Number(value) < 0 || Number(value) > 10) {
      alert("Score must be between 0 and 10.");
      return;
    }
    setScore(value);
    onFormDataChangeAction({ score: value });
  };

  const feedbackLevels = [
    { label: "Excellent", value: 10 },
    { label: "Very Good", value: 8 },
    { label: "Good", value: 6 },
    { label: "Satisfactory", value: 4 },
    { label: "Poor", value: 0 },
  ];

  const handleCommitteeTotalScoreChange = (value: string) => {
    if (Number(value) > 10) {
      alert("Committee total score cannot exceed 10.");
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
        J. Student Feedback
      </h3>
      <b className="text-gray-600 mb-2">
        [Take the average of the feedback given by students on all subjects taught]
      <br/>Maximum Score: 10
      </b>
      {employeeId && (
          <div className="text-sm bg-blue-50 p-2 rounded mt-2 mb-2">
            Viewing data for Employee ID: {employeeId}
          </div>
        )}
      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Feedback Level</th>
            <th className="border p-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {feedbackLevels.map((level, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2 font-semibold">{level.label}</td>
              <td className="border p-2">{level.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <label className="font-medium text-gray-700">
          Enter Average Feedback Score (0 - 10):
        </label>
        <input
          type="number"
          min={0}
          max={10}
          value={score}
          disabled={loginType === "hod" || loginType === "committee"}
          onChange={(e) => handleScoreChange(String(e.target.value))}
          className="block mt-1 w-32 px-3 py-2 border rounded text-center"
        />
        {loginType === "committee" && (
          <div className="mt-4">
            <label className="block mb-1 font-semibold text-yellow-600">
              Committee Total Score (out of 10):
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
    </div>
  );
}
