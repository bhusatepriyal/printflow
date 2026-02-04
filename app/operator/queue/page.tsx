"use client";

import { useEffect, useState } from "react";

type PrintJob = {
  id: string;
  designName: string;
  sellerName: string;
  material: string;
  estimatedTime: number;
  actualTime?: number;
  filamentUsed?: number;
  status: string;
  printer: string;
};

export default function PrintQueuePage() {
  const [jobs, setJobs] = useState<PrintJob[]>([]);

  async function load() {
    const res = await fetch("/api/print-jobs");
    const data = await res.json();
    setJobs(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateJob(payload: any) {
    await fetch("/api/print-jobs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    load();
  }

  const printing = jobs.filter((j) => j.status === "PRINTING");
  const pending = jobs.filter((j) => j.status === "PENDING");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Print Queue</h1>

      {/* PRINTING */}
      {printing.map((job) => (
        <div key={job.id} className="bg-white border p-6 rounded-lg">
          <p className="font-semibold">{job.designName}</p>
          <p className="text-sm text-slate-500">
            {job.sellerName} • {job.material}
          </p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={async () => {
                const time = prompt("Actual time (hours)?");
                const filament = prompt("Filament used (g)?");

                await updateJob({
                  id: job.id,
                  action: "COMPLETE",
                  actualTime: Number(time),
                  filamentUsed: Number(filament),
                });
              }}
              className="bg-green-600 text-white px-4 rounded"
            >
              Complete
            </button>

            <button
              onClick={() =>
                updateJob({ id: job.id, action: "FAIL" })
              }
              className="text-red-600 text-sm"
            >
              Mark Failed
            </button>
          </div>
        </div>
      ))}

      {/* PENDING */}
      <div>
        <h2 className="font-semibold mb-2">Pending</h2>

        {pending.map((job) => (
          <div
            key={job.id}
            className="bg-white border p-4 rounded flex justify-between"
          >
            <div>
              <p className="font-medium">{job.designName}</p>
              <p className="text-sm text-slate-500">
                {job.sellerName} • {job.material}
              </p>
            </div>

            <button
              onClick={() =>
                updateJob({ id: job.id, action: "START" })
              }
              className="bg-teal-600 text-white px-4 py-2 rounded"
            >
              Start Print
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
