import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // ✅ IMPORTANT: await params (Next.js 16 requirement)
  const { id } = await context.params;

  const invoice = await prisma.invoice.findUnique({
    where: { id },
  });

  if (!invoice) {
    return new NextResponse("Invoice not found", { status: 404 });
  }

  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const chunks: Buffer[] = [];

  doc.on("data", (chunk) => chunks.push(chunk));

  doc.fontSize(20).text("PrintFlow", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text("Invoice", { align: "center" });
  doc.moveDown(2);

  doc.fontSize(10);
  doc.text(`Invoice Number: ${invoice.invoiceNumber}`);
  doc.text(`Seller: ${invoice.sellerName}`);
  doc.text(`Status: ${invoice.status}`);
  doc.text(
    `Date: ${new Date(invoice.createdAt).toLocaleDateString()}`
  );

  doc.moveDown(2);
  doc.fontSize(12).text("Cost Breakdown", { underline: true });
  doc.moveDown();

  doc.text(`Filament Cost: ₹${invoice.filamentCost}`);
  doc.text(`Machine Cost: ₹${invoice.machineCost}`);
  doc.text(`GST: ₹${invoice.gst.toFixed(2)}`);

  doc.moveDown();
  doc.fontSize(14).text(`Total: ₹${invoice.total.toFixed(2)}`);

  doc.moveDown(3);
  doc.fontSize(10).text(
    "This is a system-generated invoice. No signature required.",
    { align: "center" }
  );

  doc.end();

  const pdfBuffer = await new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${invoice.invoiceNumber}.pdf`,
    },
  });
}
