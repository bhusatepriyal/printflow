import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
  });

  if (!invoice) {
    return new NextResponse("Invoice not found", { status: 404 });
  }

  // ✅ Create PDF
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  // ✅ FIX: use Uint8Array (NO red lines)
  const chunks: Uint8Array[] = [];

  doc.on("data", (chunk) => chunks.push(chunk));

  /* ---------- CONTENT ---------- */
  doc.fontSize(20).text("PrintFlow", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text("Invoice", { align: "center" });
  doc.moveDown(2);

  doc.fontSize(10);
  doc.text(`Invoice Number: ${invoice.invoiceNumber}`);
  doc.text(`Seller: ${invoice.sellerName}`);
  doc.text(`Status: ${invoice.status}`);
  doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`);
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

  // ✅ FIX: resolve buffer correctly
  const pdfBuffer = await new Promise<Uint8Array>((resolve) => {
    doc.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
  });

  // ✅ FORCE DOWNLOAD (not open tab)
  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${invoice.invoiceNumber}.pdf"`,
      "Content-Length": pdfBuffer.byteLength.toString(),
      "Cache-Control": "no-store",
    },
  });
}
