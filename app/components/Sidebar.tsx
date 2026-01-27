"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminLinks = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Users", href: "/admin/users" },
  { name: "Pricing", href: "/admin/pricing" },
  { name: "Invoices", href: "/admin/invoices" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 min-h-screen flex flex-col">
      <div className="px-6 py-5 text-xl font-semibold border-b border-slate-700">
        PrintFlow
      </div>

      <div className="px-4 py-4 text-xs text-slate-400 uppercase">
        Super Admin
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {adminLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 rounded-md text-sm ${
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

      <div className="px-4 py-4 border-t border-slate-700 text-sm text-slate-400">
        System Admin
      </div>
    </aside>
  );
}
