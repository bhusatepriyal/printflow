"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/operator/dashboard" },
  { name: "Print Queue", href: "/operator/queue" },
];

export default function OperatorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0f172a] text-white min-h-screen flex flex-col">
      <div className="px-6 py-5 text-lg font-semibold border-b border-slate-700">
        PrintFlow
      </div>

      <div className="px-6 py-3 text-xs text-slate-400 uppercase">
        Operator
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {links.map((link) => {
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

      <div className="px-6 py-4 border-t border-slate-700 text-sm text-slate-400">
        Priya Patel<br />
        <span className="text-xs">Operator</span>
      </div>
    </aside>
  );
}
