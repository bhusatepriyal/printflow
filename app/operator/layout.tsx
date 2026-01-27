import OperatorSidebar from "../components/OperatorSidebar";

export default function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <OperatorSidebar />
      <main className="flex-1 bg-slate-50 p-6">
        {children}
      </main>
    </div>
  );
}
