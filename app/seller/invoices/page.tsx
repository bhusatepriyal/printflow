type Invoice = {
  id: string;
  invoiceNumber: string;
  total: number;
};

async function getInvoices(): Promise<Invoice[]> {
  try {
    const res = await fetch("http://localhost:3000/api/invoices", {
      cache: "no-store",
    });

    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function SellerInvoicesPage() {
  const invoices = await getInvoices();

  return (
    <div style={{ padding: 24 }}>
      <h1>Seller Invoices</h1>

      {invoices.length === 0 ? (
        <p>No invoices found</p>
      ) : (
        invoices.map((inv) => (
          <div
            key={inv.id}
            style={{
              border: "1px solid #ccc",
              padding: 12,
              marginBottom: 12,
              borderRadius: 6,
            }}
          >
            <div><b>Invoice:</b> {inv.invoiceNumber}</div>
            <div><b>Total:</b> ₹{inv.total}</div>

            <a
              href={`/api/invoices/${inv.id}/pdf`}
              target="_blank"
              style={{
                display: "inline-block",
                marginTop: 8,
                padding: "6px 12px",
                background: "#0ea5e9",
                color: "white",
                borderRadius: 4,
                textDecoration: "none",
              }}
            >
              Download PDF
            </a>
          </div>
        ))
      )}
    </div>
  );
}
