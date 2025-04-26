"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function FullReportPage() {
  const params = useParams();
  const employeeId = params?.employeeId;
  const [reportData, setReportData] = useState(null);

//   useEffect(() => {
//     const fetchReportData = async () => {
//       const res = await fetch(`/api/fetch-full-report?employeeId=${employeeId}`);
//       const data = await res.json();
//       setReportData(data);
//     };
//     fetchReportData();
//   }, [employeeId]);

//   if (!reportData) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Full Self-Appraisal Report</h1>

      {/* Part A */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Part A - Activities</h2>
        {/* render Part A tables here */}
      </section>

      {/* Part B */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Part B - Performance</h2>
        {/* render Part B tables here */}
      </section>

      {/* Part C */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Part C - HOD/Committee Evaluation</h2>
        {/* render Part C tables here */}
      </section>

      {/* Extra: add page breaks after each part */}
      <div style={{ pageBreakAfter: "always" }}></div>
    </div>
  );
}
