export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* LEFT SIDE – FORM */}
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">PrintFlow</h1>
        <p className="text-gray-600 mb-8">Welcome back</p>

        <input
          placeholder="Email"
          className="border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="bg-blue-600 text-white py-3 rounded mb-6 hover:bg-blue-700 transition">
          Sign In
        </button>

        <p className="text-sm text-gray-500 mb-3">
          Or try a demo account
        </p>

        <div className="flex gap-3">
          <a
            href="/admin/dashboard"
            className="border px-4 py-2 rounded text-sm hover:bg-gray-100"
          >
            Admin
          </a>
          <a
            href="/seller/dashboard"
            className="border px-4 py-2 rounded text-sm hover:bg-gray-100"
          >
            Seller
          </a>
          <a
            href="/operator/dashboard"
            className="border px-4 py-2 rounded text-sm hover:bg-gray-100"
          >
            Operator
          </a>
        </div>
      </div>

      {/* RIGHT SIDE – INFO */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-12">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Manage Your 3D Printing Lab
          </h2>
          <p className="text-gray-700">
            Automated billing, professional invoices, and streamlined operations —
            all in one platform.
          </p>
        </div>
      </div>
    </div>
  );
}
