import { useState } from "react";

interface DisciplinaryChargeRow {
  section: "Institutional" | "Society";
  details: string;
  remarks: string;
}

interface Category3OProps {
  initialData: DisciplinaryChargeRow[];
  onFormDataChangeAction: (data: DisciplinaryChargeRow[]) => void;
}

export default function Category3O({ initialData, onFormDataChangeAction }: Category3OProps) {
  const [rows, setRows] = useState<DisciplinaryChargeRow[]>(initialData);

  const handleChange = (index: number, field: keyof DisciplinaryChargeRow, value: string) => {
    const updated = [...rows];
    updated[index] = { ...updated[index], [field]: value };
    setRows(updated);
    onFormDataChangeAction(updated);
  };

  const addRow = () => {
    const updated = [
      ...rows,
      {
        section: "Institutional" as const,
        details: "",
        remarks: "",
      },
    ];
    setRows(updated);
    onFormDataChangeAction(updated);
  };

  const deleteRow = (index: number) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
    onFormDataChangeAction(updated);
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-indigo-600 mt-6">
        O. Disciplinary Charges Faced, If Any
      </h3>

      <table className="w-full border-collapse border border-gray-300 text-center mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Sl. No.</th>
            <th className="border p-2">Section</th>
            <th className="border p-2">Details</th>
            <th className="border p-2">Remarks</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <select
                  value={row.section}
                  onChange={(e) => handleChange(index, "section", e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="Institutional">Institutional</option>
                  <option value="Society">Society</option>
                </select>
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.details}
                  onChange={(e) => handleChange(index, "details", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.remarks}
                  onChange={(e) => handleChange(index, "remarks", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </td>
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
        className="mt-3 px-3 py-2 rounded text-white bg-indigo-500"
      >
        + Add Row
      </button>
    </div>
  );
}
