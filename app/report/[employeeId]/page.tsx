import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface CategoryData {
  category: string;
  score: number;
  details: any; // You can improve typing here based on your real data
}

export default function FacultyReportPage() {
  const router = useRouter();
  const { eid } = router.query;

  const [facultyName, setFacultyName] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eid) {
      fetchData();
    }
  }, [eid]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/getFacultyReport?eid=${eid}`);
      const data = await res.json();

      setFacultyName(data.name);
      setAcademicYear(data.academicYear);
      setCategories(data.categories);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch report data", error);
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 print:p-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Faculty Self-Appraisal Report</h1>
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 print:hidden"
        >
          Print
        </button>
      </div>

      <div className="mb-4">
        <p><strong>Name:</strong> {facultyName}</p>
        <p><strong>Employee ID:</strong> {eid}</p>
        <p><strong>Academic Year:</strong> {academicYear}</p>
      </div>

      <div className="space-y-8">
        {categories.map((cat, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold mb-2">{cat.category} (Score: {cat.score})</h2>
            <table className="w-full border border-gray-300 mb-4">
              <thead className="bg-gray-200">
                <tr>
                  {/* Assuming all details objects have similar keys */}
                  {Object.keys(cat.details[0] || {}).map((header, i) => (
                    <th key={i} className="border p-2">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cat.details.map((item: any, idx: number) => (
                  <tr key={idx}>
                    {Object.values(item).map((val, j) => (
                      <td key={j} className="border p-2">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Add total score section if needed */}
    </div>
  );
}
