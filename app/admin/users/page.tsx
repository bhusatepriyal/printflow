export default function UsersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">User Management</h1>

      <div className="bg-white rounded-lg border shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="text-left p-3">User</th>
              <th className="text-left p-3">Role</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {["Rahul Sharma", "Priya Patel"].map((u) => (
              <tr key={u} className="border-t">
                <td className="p-3">{u}</td>
                <td className="p-3">Seller</td>
                <td className="p-3 text-green-600">Active</td>
                <td className="p-3">Jan 2026</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
