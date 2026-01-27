import SellerSidebar from "../components/SellerSidebar";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SellerSidebar />
      <main className="flex-1 bg-slate-50 p-6">
        {children}
      </main>
    </div>
  );
}
