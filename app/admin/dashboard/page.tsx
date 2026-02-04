export const dynamic = "force-dynamic";

/* ================= TYPES ================= */

type PrintJob = {
  status: "PENDING" | "PRINTING" | "COMPLETED" | "FAILED";
  filamentUsed?: number;
  material: "PLA" | "PETG" | "ABS";
};

type Invoice = {
  total: number;
};

/* ================= FETCH REAL DATA ================= */

async function getData() {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const [jobsRes, invoicesRes] = await Promise.all([
    fetch(`${base}/api/print-jobs`, { cache: "no-store" }),
    fetch(`${base}/api/invoices`, { cache: "no-store" }),
  ]);

  return {
    jobs: jobsRes.ok ? await jobsRes.json() : [],
    invoices: invoicesRes.ok ? await invoicesRes.json() : [],
  };
}

/* ================= ADMIN DASHBOARD ================= */

export default async function AdminDashboard() {
  const { jobs, invoices } = await getData();

  const completedPrints = jobs.filter(
    (job: PrintJob) => job.status === "COMPLETED"
  );

  const totalRevenue = invoices.reduce(
    (sum: number, inv: Invoice) => sum + (inv.total || 0),
    0
  );

  const filamentStats = {
    PLA: 0,
    PETG: 0,
    ABS: 0,
  };

  completedPrints.forEach((job: PrintJob) => {
    if (job.filamentUsed && filamentStats[job.material] !== undefined) {
      filamentStats[job.material] += job.filamentUsed;
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-slate-500">
          Overview of your 3D printing operations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value={`₹${totalRevenue.toFixed(2)}`} />
        <StatCard title="Prints Completed" value={completedPrints.length} />
        <StatCard title="PLA Used" value={`${filamentStats.PLA}g`} />
        <StatCard title="PETG Used" value={`${filamentStats.PETG}g`} />
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6 h-72 text-slate-400 flex items-center justify-center">
        Monthly Revenue Chart (next step)
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENT ================= */

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-white border rounded-lg p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
    </div>
  );
}
