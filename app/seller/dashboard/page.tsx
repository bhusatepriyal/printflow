export default function SellerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-slate-500">Welcome back, Rahul</p>
        </div>

        <a
          href="/seller/upload"
          className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm"
        >
          Upload New Design
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Total Orders", value: "24" },
          { title: "In Progress", value: "3" },
          { title: "Completed", value: "21" },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-lg border shadow-sm p-5"
          >
            <p className="text-xs text-slate-500 uppercase">{card.title}</p>
            <p className="text-2xl font-semibold mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">Recent Orders</h2>
          <span className="text-sm text-teal-600 cursor-pointer">
            View All →
          </span>
        </div>

        {[
          { name: "Custom Bracket", price: "₹1,250", status: "Printing" },
          { name: "Gear Assembly", price: "₹2,340", status: "Completed" },
          { name: "Enclosure Top", price: "₹3,890", status: "Completed" },
          { name: "Mount Plate", price: "₹1,780", status: "Pending" },
        ].map((order) => (
          <div
            key={order.name}
            className="flex justify-between items-center py-3 border-t"
          >
            <div>
              <p className="font-medium">{order.name}</p>
              <p className="text-sm text-slate-500">Jan 2026</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-medium">{order.price}</span>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  order.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Printing"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
