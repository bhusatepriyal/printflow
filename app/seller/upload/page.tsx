"use client";

import { useState } from "react";

export default function UploadDesign() {
  const [designName, setDesignName] = useState("");
  const [material, setMaterial] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!designName || !material || !file) {
      alert("Please fill all fields and upload STL file");
      return;
    }

    setLoading(true);

    await fetch("/api/print-jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        designName,
        sellerName: "Rahul Sharma",
        material,
        estimatedTime: 2.5,
        status: "PENDING",
        printer: "Bambu A1",
      }),
    });

    setLoading(false);
    alert("Design submitted successfully!");

    setDesignName("");
    setMaterial("");
    setFile(null);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold">Upload Design</h1>
        <p className="text-slate-500">
          Submit a new STL file for 3D printing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
          <div>
            <label className="text-sm block mb-1">Design Name</label>
            <input
              className="border p-2 w-full rounded"
              placeholder="e.g. Custom Bracket"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm block mb-1">STL File</label>
            <input
              type="file"
              accept=".stl"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="border p-2 w-full rounded"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Filament Type</label>
            <select
              className="border p-2 w-full rounded"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              <option value="">Select filament type</option>
              <option value="PLA">PLA</option>
              <option value="PETG">PETG</option>
              <option value="ABS">ABS</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit for Printing"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-lg border shadow-sm flex items-center justify-center text-slate-400">
          {file ? (
            <p>File selected: {file.name}</p>
          ) : (
            <p>Upload an STL file to see the cost estimate</p>
          )}
        </div>
      </div>
    </div>
  );
}
