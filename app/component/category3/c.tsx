import { useState } from "react";

interface AuthoredBook {
  title: string;
  publisherDetails: string;
  issnIsbn: string;
  coAuthors: number;
  mainAuthor: boolean;
  publicationType: "International" | "National/Local" | " ";
  role: "Main Author" | "Co-author/Editor" | " ";
  score: number;
}

interface Category3CProps {
  initialData: AuthoredBook[];
  onFormDataChangeAction: (data: AuthoredBook[]) => void;
}

export default function Category3C({ initialData, onFormDataChangeAction }: Category3CProps) {
  const [books, setBooks] = useState<AuthoredBook[]>(initialData);
  const [warning, setWarning] = useState("");

  const MAX_SCORE = 100;

  const calculateScore = (publicationType: string, role: string) => {
    const typeScore = publicationType ===" "?0:(publicationType=== "International" ? 50 : 20);
    const roleScore = role === " " ? 0 : (role === "Main Author" ? 50 : 20);
    return (typeScore+ roleScore);
  };

  const getTotalScore = () => books.reduce((total, book) => total + Number(book.score), 0);

  const handleInputChange = (
    index: number,
    field: keyof AuthoredBook,
    value: string | number | boolean
  ) => {
    const updated = [...books];
    const updatedBook = { ...updated[index], [field]: value };

    // Recalculate score if publicationType or role changes
    if (field === "publicationType" || field === "role") {
      const newScore = calculateScore(
        field === "publicationType" ? (value as string) : updatedBook.publicationType,
        field === "role" ? (value as string) : updatedBook.role
      );
      const hypotheticalTotal = getTotalScore() - updated[index].score + newScore;

      if (hypotheticalTotal > MAX_SCORE) {
        setWarning("Total score cannot exceed 100.");
        return;
      } else {
        setWarning("");
        updatedBook.score = newScore;
      }
    }

    updated[index] = updatedBook;
    setBooks(updated);
    onFormDataChangeAction(updated); // ✅ Always notify parent
  };

  const deleteRow = (index: number) => {
    const updated = books.filter((_, i) => i !== index);
    setBooks(updated);
    onFormDataChangeAction(updated);
    setWarning("");
  };

  const addRow = () => {
    const hypotheticalTotal = getTotalScore() + 50;
    if (hypotheticalTotal > MAX_SCORE) {
      setWarning("Cannot add row. Maximum total score of 100 will be exceeded.");
      return;
    }

    const newRow: AuthoredBook = {
      title: "",
      publisherDetails: "",
      issnIsbn: "",
      coAuthors: 0,
      mainAuthor: false,
      publicationType: " ",
      role: " ",
      score: 0,
    };

    const updated = [...books, newRow];
    setBooks(updated);
    onFormDataChangeAction(updated);
    setWarning("");
  };

  const totalScore = getTotalScore();

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">C. Authored Books</h3>
      <b className="text-gray-600">
        [International = 50, National/Local = 20, Co-author/Editor = 20, Main Author = 50]
        <br />
        Maximum Score: 100
      </b>

      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Details of Publishers</th>
            <th className="border p-2">ISSN/ISBN No.</th>
            <th className="border p-2">No. of Co-authors</th>
            <th className="border p-2">Publication Type</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Self-Appraisal Score</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.title}
                  onChange={(e) => handleInputChange(index, "title", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.publisherDetails}
                  onChange={(e) => handleInputChange(index, "publisherDetails", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.issnIsbn}
                  onChange={(e) => handleInputChange(index, "issnIsbn", e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  min={0}
                  value={row.coAuthors}
                  onChange={(e) => handleInputChange(index, "coAuthors", Number(e.target.value))}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={row.publicationType}
                  onChange={(e) => handleInputChange(index, "publicationType", e.target.value)}
                  className="w-full px-2 py-1 border rounded" required
                >
                  <option value=" ">Select Publication Type</option>
                  <option value="International">International</option>
                  <option value="National/Local">National/Local</option>
                </select>
              </td>
              <td className="border p-2">
                <select
                  value={row.role}
                  onChange={(e) => handleInputChange(index, "role", e.target.value)}
                  className="w-full px-2 py-1 border rounded" required
                >
                  <option value=" ">Select Role</option>
                  <option value="Main Author">Main Author</option>
                  <option value="Co-author/Editor">Co-author/Editor</option>
                </select>
              </td>
              <td className="border p-2">{row.score}</td>
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
        disabled={totalScore >= MAX_SCORE}
        className={`mt-2 px-3 py-2 rounded text-white ${
          totalScore >= MAX_SCORE ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500"
        }`}
      >
        + Add Row
      </button>

      {warning && (
        <p className="text-sm text-red-600 font-semibold mt-1">{warning}</p>
      )}

      <p className="text-base font-semibold mt-1 text-gray-700">
        Total Score: {totalScore} / 100
      </p>
    </div>
  );
}
