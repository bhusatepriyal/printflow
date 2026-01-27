export const dynamic = "force-dynamic";

type Invoice = {
  id: string;
  invoiceNumber: string;
  total: number;
  status: "PAID" | "UNPAID";
  createdAt: string;
};

async function getInvoices(): Promise<Invoice[]> {
  const res = await fetch("http://localhost:3000/api/invoices", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch invoices");
  }

  return res.json();
}

export default async function SellerInvoicesPage() {
  const invoices = await getInvoices();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">My Invoices</h1>
        <p className="text-slate-500">
          Download invoices for completed print jobs
        </p>
      </div>

      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left p-3">Invoice No</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {invoices.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-slate-500">
                  No invoices found
                </td>
              </tr>
            )}

            {invoices.map((inv) => (
              <tr key={inv.id} className="border-b">
                <td className="p-3 font-medium">
                  {inv.invoiceNumber}
                </td>

                <td className="p-3">
                  {new Date(inv.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3">
                  ₹{inv.total.toFixed(2)}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      inv.status === "PAID"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <a
                    href={`/api/invoices/${inv.id}/pdf`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Download PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
