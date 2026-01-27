export const dynamic = "force-dynamic";

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

async function getJobs(): Promise<PrintJob[]> {
  const res = await fetch("http://localhost:3000/api/print-jobs", {
    cache: "no-store",
  });
  return res.json();
}

async function updateJob(payload: any) {
  await fetch("http://localhost:3000/api/print-jobs", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export default async function PrintQueuePage() {
  const jobs = await getJobs();

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

          <form
            action={async (formData) => {
              "use server";
              await updateJob({
                id: job.id,
                action: "COMPLETE",
                actualTime: Number(formData.get("time")),
                filamentUsed: Number(formData.get("filament")),
              });
            }}
            className="flex gap-3 mt-4"
          >
            <input
              name="time"
              placeholder="Actual time (hrs)"
              className="border p-2 rounded w-40"
              required
            />
            <input
              name="filament"
              placeholder="Filament (g)"
              className="border p-2 rounded w-40"
              required
            />
            <button className="bg-green-600 text-white px-4 rounded">
              Complete
            </button>
          </form>

          <button
            onClick={async () => {
              "use server";
              await updateJob({ id: job.id, action: "FAIL" });
            }}
            className="mt-3 text-red-600 text-sm"
          >
            Mark Failed
          </button>
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

            <form
              action={async () => {
                "use server";
                await updateJob({ id: job.id, action: "START" });
              }}
            >
              <button className="bg-teal-600 text-white px-4 py-2 rounded">
                Start Print
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
