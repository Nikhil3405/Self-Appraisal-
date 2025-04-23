import { useState , useEffect} from "react";

interface ArticleContribution {
  articleDetails: string;
  articleDate: string;
  maxScore: number;
  score: string;
}

interface Category2CProps {
  initialData: ArticleContribution[];
  onFormDataChangeAction: (data: ArticleContribution[]) => void;
  loginType: "faculty" | "hod" | "committee";
  employeeId?: string;
  onCommitteeScoreChange?: (score: string) => void;
}

export default function Category2C({ initialData, onFormDataChangeAction, loginType,
  employeeId,
  onCommitteeScoreChange, }: Category2CProps) {
  const [articles, setArticles] = useState<ArticleContribution[]>(initialData);
  
  const [committeeTotalScore, setCommitteeTotalScore] = useState<string>("");
  
  useEffect(() => {
        if (initialData?.length) {
          setArticles(initialData);
        }
      }, [initialData]);
    
      useEffect(() => {
        if (employeeId) {
          console.log(`Loading data for employee ID: ${employeeId}`);
        }
      }, [employeeId]);

  const getTotalScore = () =>
    articles.reduce((total, article) => total + Number(article.score), 0);

  const handleInputChange = (
    index: number,
    field: keyof ArticleContribution,
    value: string | number
  ) => {
    if (loginType === "hod") return;

    const updated = [...articles];

    let newValue: string | number = value;

    if (field === "score" && !isNaN(Number(newValue))) {
      let score = Number(value);
      if (score > 5) score = 5;
      if (score < 0) score = 0;

      const oldScore = Number(articles[index].score);
      const newTotal = getTotalScore() - oldScore + score;
      if (newTotal > 15) return;

      newValue = score;
    }

    updated[index] = { ...updated[index], [field]: newValue };
    setArticles(updated);
    onFormDataChangeAction(updated);
  };

  const deleteRow = (index: number) => {
    if (loginType === "hod") return;
    const updated = articles.filter((_, i) => i !== index);
    setArticles(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    if (loginType !== "hod" && getTotalScore() < 15) {

    setArticles([
      ...articles,
      { articleDetails: "", articleDate: "", maxScore: 5, score: "" },
    ]);
  }
  };
  const handleCommitteeTotalScoreChange = (value: string) => {
    if (Number(value) > 15) {
      alert("Committee total score cannot exceed 15.");
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
        C. Contribution of Articles to College / Department Newsletters / Magazines
      </h3>
      <b className="text-gray-600">
        Maximum Score: 15 @ 5 marks per article
      </b>
      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Article Details</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Max Score</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  disabled={loginType === "hod" || loginType === "committee"}
                  placeholder="Enter article details"
                  value={row.articleDetails}
                  onChange={(e) =>
                    handleInputChange(index, "articleDetails", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  value={row.articleDate}
                  disabled={loginType === "hod" || loginType === "committee"}
                  onChange={(e) =>
                    handleInputChange(index, "articleDate", e.target.value)
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">5</td>
              <td className="border p-2">
                <input
                  type="number"
                  disabled={loginType === "hod" || loginType === "committee"}

                  min={0}
                  max={5}
                  value={row.score}
                  onChange={(e) =>
                    handleInputChange(index, "score", Number(e.target.value))
                  }
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td>
                <button
                  type="button"
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
          loginType === "hod" || loginType === "committee" || totalScore >= 15 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
        }`}
      >
        + Add Row
      </button>
      <p className="text-base font-semibold mt-1 text-gray-700">
        Total Score: {totalScore} / 15
      </p>
      {loginType === "committee" && (
        <div className="mt-4">
          <label className="block mb-1 font-semibold text-yellow-600">
            Committee Total Score (out of 15):
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