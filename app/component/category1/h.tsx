"use client";
import { useState, useEffect } from "react";

interface ExamDuty {
  dutyType: string;
  duties: string;
  squad?: string;
  roomInvigilation?: string;
  relief?: string;
  dcs?: string;
  boe?: string;
  invigilation?: string;
  coordination?: string;
  questionPaperSetting?: string;
  score: string;
}

interface CategoryHProps {
  initialData: ExamDuty[];
  onFormDataChangeAction: (data: ExamDuty[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void;
}

export default function CategoryH({ initialData, onFormDataChangeAction, loginType, employeeId, onCommitteeScoreChange }: CategoryHProps) {
  const [examDuties, setExamDuties] = useState<ExamDuty[]>(
    initialData.length
      ? initialData
      : [
          { dutyType: "SEM End Exam Paper Setting", duties: "", score: "" },
          {
            dutyType: "Conduction of SEE Exam",
            duties: "",
            squad: "",
            roomInvigilation: "",
            relief: "",
            dcs: "",
            boe: "",
            score: "",
          },
          {
            dutyType: "Continuous Internal Evaluation (CIE)",
            duties: "",
            invigilation: "",
            coordination: "",
            questionPaperSetting: "",
            score: "",
          },
        ]
  );
  
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");
  const maxScores = [4, 10, 6];

  useEffect(() => {
    if (initialData?.length) {
      setExamDuties(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (employeeId) {
      console.log(`Loading data for employee ID: ${employeeId}`);
    }
  }, [employeeId]);

  const handleInputChange = (index: number, field: keyof ExamDuty, value: string | number) => {
    if (loginType === "hod") return;

    const updated = [...examDuties];
    let newValue: string | number = value;

    if (["score", "squad", "relief", "dcs", "boe", "invigilation", "coordination", "questionPaperSetting"].includes(field)) {
      newValue = Number(value);
      if (field === "score") {
        const max = maxScores[index];
        newValue = Math.min(Math.max(0, newValue), max);
      }
    }

    updated[index] = { ...updated[index], [field]: newValue };
    setExamDuties(updated);
    onFormDataChangeAction(updated);
  };

  const getTotalScore = () =>
    examDuties.reduce((total, project) => total + Number(project.score), 0);

  const totalScore = getTotalScore();

  const handleCommitteeTotalScoreChange = (value: string) => {
    if (Number(value) > 20) {
      alert("Committee total score cannot exceed 20.");
      return;
    }
    setCommitteeTotalScore(value);
    if (onCommitteeScoreChange) {
      onCommitteeScoreChange(value); // Notify parent
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        H. Examination Duties Assigned & Performed
      </h3>
      <b className="text-gray-600">
        Maximum Score = 20, 2 points for each exam-related work
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
            <th className="border p-2">Type of Examination Duties</th>
            <th className="border p-2">Mention the Type of Duties Assigned</th>
            <th className="border p-2">Self-Appraisal Score</th>
          </tr>
        </thead>
        <tbody>
          {examDuties.map((row, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{row.dutyType}</td>
              <td className="border p-2 text-left">
                {index === 0 ? (
                  <input
                    type="text"
                    value={row.duties}
                    onChange={(e) => handleInputChange(index, "duties", e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                    disabled={loginType === "hod" || loginType === "committee"}
                  />
                ) : index === 1 ? (
                  <div>
                    <div>Mention in Numbers:</div>
                    {["squad", "roomInvigilation", "relief", "dcs", "boe"].map((field) => (
                      <div key={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}: 
                        <input
                          type="number"
                          className="border rounded w-20 ml-2"
                          value={row[field as keyof ExamDuty] ?? ""}
                          onChange={(e) => handleInputChange(index, field as keyof ExamDuty, e.target.value)}
                          disabled={loginType === "hod" || loginType === "committee"}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <div>Mention in Numbers:</div>
                    {["invigilation", "coordination", "questionPaperSetting"].map((field) => (
                      <div key={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}: 
                        <input
                          type="number"
                          className="border rounded w-20 ml-2"
                          value={row[field as keyof ExamDuty] ?? ""}
                          onChange={(e) => handleInputChange(index, field as keyof ExamDuty, e.target.value)}
                          disabled={loginType === "hod" || loginType === "committee"}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  min={0}
                  max={maxScores[index]}
                  value={row.score}
                  onChange={(e) => handleInputChange(index, "score", e.target.value)}
                  className="w-full px-2 py-1 border rounded text-center"
                  disabled={loginType === "hod" || loginType === "committee"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-base font-semibold mt-1 text-gray-700">
        Total Score: {totalScore} / 20
      </p>

      {loginType === "committee" && (
        <div className="mt-4">
          <label className="block mb-1 font-semibold text-yellow-600">
            Committee Total Score (out of 20):
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
