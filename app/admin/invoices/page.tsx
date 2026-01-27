export default function InvoicesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Invoices</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["INV-001", "INV-002", "INV-003"].map((inv) => (
          <div
            key={inv}
            className="bg-white p-4 rounded-lg shadow-sm border"
          >
            <p className="font-medium">{inv}</p>
            <p className="text-sm text-slate-500">₹2,340</p>
            <button className="mt-3 text-sm text-teal-600">
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
