import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

/* ================== CREATE PRINT JOB ================== */
export async function POST(req: Request) {
  const body = await req.json();

  const job = await prisma.printJob.create({
    data: {
      designName: body.designName,
      sellerName: body.sellerName,
      material: body.material,
      estimatedTime: body.estimatedTime,
      printer: body.printer ?? "Bambu A1",
      status: "PENDING",
    },
  });

  return NextResponse.json(job);
}

/* ================== READ PRINT JOBS ================== */
export async function GET() {
  const jobs = await prisma.printJob.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(jobs);
}

/* ================== UPDATE PRINT JOB ================== */
export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, action, actualTime, filamentUsed } = body;

  /* ---------- START PRINT ---------- */
  if (action === "START") {
    const job = await prisma.printJob.update({
      where: { id },
      data: { status: "PRINTING" },
    });

    return NextResponse.json(job);
  }

  /* ---------- COMPLETE PRINT ---------- */
  if (action === "COMPLETE") {
    const COST_PER_GRAM = 2;     // ₹2 / gram
    const MACHINE_RATE = 100;   // ₹100 / hour
    const GST_RATE = 0.18;      // 18%

    const filamentCost = filamentUsed * COST_PER_GRAM;
    const machineCost = actualTime * MACHINE_RATE;
    const gst = (filamentCost + machineCost) * GST_RATE;
    const total = filamentCost + machineCost + gst;

    const job = await prisma.printJob.update({
      where: { id },
      data: {
        status: "COMPLETED",
        actualTime,
        filamentUsed,
        invoice: {
          create: {
            invoiceNumber: `INV-2026-${Date.now()}`,
            sellerName: body.sellerName ?? "",
            filamentCost,
            machineCost,
            gst,
            total,
            status: "UNPAID",
          },
        },
      },
      include: {
        invoice: true,
      },
    });

    return NextResponse.json(job);
  }

  /* ---------- FAIL PRINT ---------- */
  if (action === "FAIL") {
    const job = await prisma.printJob.update({
      where: { id },
      data: { status: "FAILED" },
    });

    return NextResponse.json(job);
  }

  return NextResponse.json(
    { error: "Invalid action" },
    { status: 400 }
  );
}
