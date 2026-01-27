"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/seller/dashboard" },
  { name: "Upload Design", href: "/seller/upload" },
  { name: "Invoices", href: "/seller/invoices" },
];

export default function SellerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0f172a] text-white min-h-screen flex flex-col">
      <div className="px-6 py-5 text-lg font-semibold border-b border-slate-700">
        PrintFlow
      </div>

      <div className="px-6 py-3 text-xs text-slate-400 uppercase">
        Seller
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center px-4 py-2 rounded-md text-sm transition ${
                active
                  ? "bg-teal-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-slate-700 text-sm text-slate-400">
        Rahul Sharma<br />
        <span className="text-xs">Seller</span>
      </div>
    </aside>
  );
}
