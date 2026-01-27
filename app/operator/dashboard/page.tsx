export default function OperatorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Operator Dashboard</h1>
        <p className="text-slate-500">
          Manage print jobs and track progress
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Active Print", value: "1" },
          { title: "In Queue", value: "2" },
          { title: "Completed Today", value: "5" },
          { title: "Failed Today", value: "0" },
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

      {/* Currently Printing */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">Currently Printing</h2>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
            Printing
          </span>
        </div>

        <p className="font-medium">Custom Bracket</p>
        <p className="text-sm text-slate-500 mb-4">by Rahul Sharma</p>

        <div className="flex gap-8 text-sm text-slate-500 mb-4">
          <span>PLA</span>
          <span>2.5h</span>
          <span>Bambu A1</span>
        </div>

        <div className="flex gap-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Complete
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded">
            Failed
          </button>
        </div>
      </div>

      {/* Print Queue */}
      <div className="space-y-4">
        <h2 className="font-semibold">Print Queue</h2>

        {[
          {
            name: "Gear Assembly",
            user: "Amit Kumar",
            material: "PETG",
            time: "4h",
          },
          {
            name: "Mount Plate",
            user: "Vikram Singh",
            material: "PLA",
            time: "1.5h",
          },
        ].map((job) => (
          <div
            key={job.name}
            className="bg-white rounded-lg border shadow-sm p-5 flex justify-between"
          >
            <div>
              <p className="font-medium">{job.name}</p>
              <p className="text-sm text-slate-500">
                by {job.user}
              </p>

              <div className="flex gap-6 text-sm text-slate-500 mt-2">
                <span>{job.material}</span>
                <span>{job.time}</span>
                <span>Bambu A1</span>
              </div>
            </div>

            <span className="self-start text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
              Pending
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
