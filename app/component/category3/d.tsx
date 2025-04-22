import { useState } from "react";

interface ConferencePaper {
  title: string;
  conferenceDetails: string;
  issnIsbn: string;
  coAuthors: number;
  authorRole: "Main Author" | "Co-author" | " ";
  score: number;
}

interface Category3DProps {
  initialData: ConferencePaper[];
  onFormDataChangeAction: (data: ConferencePaper[]) => void;
}

export default function Category3D({ initialData, onFormDataChangeAction }: Category3DProps) {
  const [papers, setPapers] = useState<ConferencePaper[]>(initialData);

  const calculateScore = (role: string) => (role === "Main Author" ? 20 : 10);

  const getTotalScore = () =>
    papers.reduce((total, paper) => total + Number(paper.score), 0);

  const handleInputChange = (
    index: number,
    field: keyof ConferencePaper,
    value: string | number
  ) => {
    const updated = [...papers];
    const updatedPaper = { ...updated[index], [field]: value };

    if (field === "authorRole") {
      updatedPaper.score = calculateScore(value as string);
    }

    updated[index] = updatedPaper;
    setPapers(updated);
    onFormDataChangeAction(updated);
  };

  const deleteRow = (index: number) => {
    const updated = papers.filter((_, i) => i !== index);
    setPapers(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    setPapers([
      ...papers,
      {
        title: "",
        conferenceDetails: "",
        issnIsbn: "",
        coAuthors: 0,
        authorRole: " ",
        score: 0,
      },
    ]);
  };

  const totalScore = getTotalScore();

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        D. Published Full Papers / Presented in Conference Proceedings
      </h3>
      <b className="text-gray-600">
        Peer-reviewed & recognized by professional societies <br />
        [First author – 20 per paper, Co-author – 10 per paper]<br/>
        Maximum Score: 100 
      </b>

      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Conference Details</th>
            <th className="border p-2">ISSN/ISBN No.</th>
            <th className="border p-2">No. of Co-authors</th>
            <th className="border p-2">Author Role</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {papers.map((paper, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={paper.title}
                  onChange={(e) => handleInputChange(index, "title", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={paper.conferenceDetails}
                  onChange={(e) => handleInputChange(index, "conferenceDetails", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={paper.issnIsbn}
                  onChange={(e) => handleInputChange(index, "issnIsbn", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  min={0}
                  value={paper.coAuthors}
                  onChange={(e) => handleInputChange(index, "coAuthors", Number(e.target.value))}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={paper.authorRole}
                  onChange={(e) => handleInputChange(index, "authorRole", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                >
                  <option value="">Select Role</option>
                  <option value="Main Author">Main Author</option>
                  <option value="Co-author">Co-author</option>
                </select>
              </td>
              <td className="border p-2">{paper.score}</td>
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
        disabled={totalScore >= 100}
        className={`mt-2 px-3 py-2 rounded text-white ${
          totalScore >= 100 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
        }`}
      >
        + Add Row
      </button>

      <p className="text-base font-semibold mt-1 text-gray-700">
        Total Score: {totalScore} / 100
      </p>
    </div>
  );
}
