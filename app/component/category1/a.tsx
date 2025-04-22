import { useState, useEffect } from "react";

interface TeachingActivity {
  // academicYear: string;
  semester: string;
  courseCode: string;
  level: string;
  mode: string;
  classesPerWeek: string;
  score: string;
}

interface CategoryAProps {
  initialData: TeachingActivity[];
  onFormDataChangeAction: (updatedData: TeachingActivity[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void;
  selectedAcademicYear?: string;
}

export default function CategoryA({
  initialData,
  onFormDataChangeAction,
  loginType,
  employeeId,
  onCommitteeScoreChange,
  // selectedAcademicYear,
}: CategoryAProps) {
  const [categoryA, setCategoryA] = useState<TeachingActivity[]>(initialData || []);
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");

  useEffect(() => {
    if (initialData?.length) {
      setCategoryA(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (employeeId) {
      console.log(`Loading data for employee ID: ${employeeId}`);
    }
  }, [employeeId]);

  const handleInputChange = (
    index: number,
    field: keyof TeachingActivity,
    value: string | number
  ) => {
    if (loginType === "hod") return;

    const updatedRecords = [...categoryA];
    const newValue = typeof value === "number" ? String(value) : value;

    if (field === "score" && !isNaN(Number(newValue))) {
      const oldScore = Number(categoryA[index].score);
      const newTotal = getTotalScore() - oldScore + Number(newValue);

      if (newTotal > 50) {
        alert("Total score cannot exceed 50.");
        return;
      }
    }

    updatedRecords[index] = { ...updatedRecords[index], [field]: newValue };
    setCategoryA(updatedRecords);
    onFormDataChangeAction(updatedRecords);
  };

  const addRow = () => {
    if (loginType !== "hod" && getTotalScore() < 50) {
      const newRecord: TeachingActivity = {
        // academicYear: selectedAcademicYear || "",
        semester: "Odd",
        courseCode: "",
        level: "UG",
        mode: "Lecture",
        classesPerWeek: "",
        score: "",
      };
      setCategoryA(prev => [...prev, newRecord]);
    }
  };

  const deleteRow = (index: number) => {
    if (loginType === "hod") return;

    const updated = categoryA.filter((_, i) => i !== index);
    setCategoryA(updated);
    onFormDataChangeAction(updated);
  };

  const getTotalScore = () =>
    categoryA.reduce((total, item) => total + (Number(item.score) || 0), 0);

  const totalScore = getTotalScore();

  const handleCommitteeTotalScoreChange = (value: string) => {
    if (Number(value) > 50) {
      alert("Committee total score cannot exceed 50.");
      return;
    }
    setCommitteeTotalScore(value);
    if (onCommitteeScoreChange) {
      onCommitteeScoreChange(value); // 👈 call the parent function
    }
  };

  return (
    <div>
      <div>
        <h3 className="text-lg font-bold text-indigo-600 mt-6">
          A. Lectures, Tutorials, Practical, Contact hours (At least for the past 3 years ODD and EVEN semesters):
        </h3>
        <b className="text-gray-600">
          [20 points per Lecture and Tutorial subject for taking 100% classes and 50 points for covering 100 percent syllabus, 20 points for Practical of 3 batches covering all the experiments from the lab syllabus]
          <br />
          Maximum Score: 50
        </b>

        {employeeId && (
          <div className="text-sm bg-blue-50 p-2 rounded mt-2 mb-2">
            Viewing data for Employee ID: {employeeId}
          </div>
        )}

        <table className="w-full border-collapse border border-gray-300 text-center mt-4">
          <thead className="bg-gray-100">
            <tr>
              {/* <th className="border p-2">Academic Year</th> */}
              <th className="border p-2">Semester</th>
              <th className="border p-2">Course Code</th>
              <th className="border w-24 p-2">Level</th>
              <th className="border p-2">Mode of Teaching</th>
              <th className="border p-2">Classes/Week</th>
              <th className="border p-2">Score</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryA.map((row, index) => (
              <tr key={index} className="border">
                {/* <td className="p-2">
                  <input
                    type="text"
                    value={row.academicYear}
                    onChange={(e) => handleInputChange(index, "academicYear", e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                    disabled={true}
                  />
                </td> */}
                <td className="p-2">
                  <select
                    value={row.semester}
                    onChange={(e) => handleInputChange(index, "semester", e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                    disabled={loginType === "hod" || loginType === "committee"}
                  >
                    <option value="Odd">Odd</option>
                    <option value="Even">Even</option>
                  </select>
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={row.courseCode}
                    onChange={(e) => handleInputChange(index, "courseCode", e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                    disabled={loginType === "hod" || loginType === "committee"}
                  />
                </td>
                <td className="p-2">
                  <select
                    value={row.level}
                    onChange={(e) => handleInputChange(index, "level", e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                    disabled={loginType === "hod" || loginType === "committee"}
                  >
                    <option value="UG">UG</option>
                    <option value="PG">PG</option>
                  </select>
                </td>
                <td className="p-2">
                  <select
                    value={row.mode}
                    onChange={(e) => handleInputChange(index, "mode", e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                    disabled={loginType === "hod" || loginType === "committee"}
                  >
                    <option value="Lecture">Lecture</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Practical">Practical</option>
                  </select>
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={row.classesPerWeek}
                    onChange={(e) => handleInputChange(index, "classesPerWeek", e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                    disabled={loginType === "hod" || loginType === "committee"}
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={row.score}
                    onChange={(e) => handleInputChange(index, "score", e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                    disabled={loginType === "hod" || loginType === "committee"}
                  />
                </td>
                <td className="p-2">
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
          disabled={loginType === "hod" || loginType === "committee" || totalScore >= 50}
          className={`mt-2 px-3 py-2 rounded text-white ${
            loginType === "hod" || loginType === "committee" || totalScore >= 50
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-500"
          }`}
        >
          + Add Row
        </button>

        <p className="text-base font-semibold mt-2 text-gray-700">
          Total Score: {totalScore} / 50
        </p>

        {loginType === "committee" && (
          <div className="mt-4">
            <label className="block mb-1 font-semibold text-yellow-600">
              Committee Total Score (out of 50):
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
