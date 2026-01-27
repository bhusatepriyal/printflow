export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white">
      <h1 className="text-5xl font-bold mb-6 text-gray-900">
        Automate Your <span className="text-blue-600">3D Printing</span> Business
      </h1>

      <p className="text-gray-600 max-w-2xl mb-8">
        Streamline job management, automate cost calculations, and generate
        professional invoices for your 3D printing lab.
      </p>

      <div className="flex gap-4">
        <a
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
        >
          Get Started
        </a>
        <a
          href="/login"
          className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100"
        >
          View Demo
        </a>
      </div>
    </main>
  );
}
