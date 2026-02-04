import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(invoices);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "DB error" },
      { status: 500 }
    );
  }
}
