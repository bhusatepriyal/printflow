export default function PricingPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="font-semibold mb-4">Cost Rates</h2>

        <label className="block text-sm mb-2">PLA (₹/g)</label>
        <input className="border p-2 w-full rounded mb-3" />

        <label className="block text-sm mb-2">Machine Rate (₹/hr)</label>
        <input className="border p-2 w-full rounded" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="font-semibold mb-4">Cost Formula</h2>
        <pre className="text-sm bg-slate-50 p-3 rounded">
filamentCost = filamentUsed × costPerGram
machineCost = printTime × machineRate
gst = (filament + machine) × gstRate
        </pre>
      </div>
    </div>
  );
}
