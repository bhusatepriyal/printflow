import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { PDFDocument, StandardFonts } from "pdf-lib";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const invoice = await prisma.invoice.findUnique({
      where: { id },
    });

    if (!invoice) {
      return new Response("Invoice not found", { status: 404 });
    }

    // ✅ Create PDF
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([600, 800]);

    const font = await pdf.embedFont(StandardFonts.Helvetica);

    let y = 760;

    function draw(text: string, size = 12) {
      page.drawText(text, { x: 50, y, size, font });
      y -= size + 12;
    }

    // ===== INVOICE CONTENT =====

    draw("PrintFlow Invoice", 22);
    y -= 20;

    draw(`Invoice Number: ${invoice.invoiceNumber}`);
    draw(`Seller: ${invoice.sellerName}`);
    draw(`Status: ${invoice.status}`);
    draw(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`);

    y -= 20;

   draw(`Filament Cost: Rs. ${invoice.filamentCost}`);
   draw(`Machine Cost: Rs. ${invoice.machineCost}`);
   draw(`GST: Rs. ${invoice.gst}`);
   draw(`Total Amount: Rs. ${invoice.total}`, 16);

    y -= 30;
    draw("System generated invoice — no signature required", 10);

    // ✅ Save PDF
    const bytes = await pdf.save();

    return new Response(bytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${invoice.invoiceNumber}.pdf`,
      },
    });

  } catch (err) {
    console.error("PDF ERROR:", err);
    return new Response("PDF failed", { status: 500 });
  }
}
