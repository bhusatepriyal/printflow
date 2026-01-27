import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

/* ================== READ INVOICES ================== */
export async function GET() {
  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(invoices);
}
