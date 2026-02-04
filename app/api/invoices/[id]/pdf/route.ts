import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { PDFDocument, StandardFonts } from "pdf-lib";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const invoice = await prisma.invoice.findUnique({
      where: { id },
    });

    if (!invoice) {
      return new Response("Invoice not found", { status: 404 });
    }

    // create pdf
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([600, 800]);
    const font = await pdf.embedFont(StandardFonts.Helvetica);

    let y = 760;

    function draw(text: string, size = 12) {
      page.drawText(text, { x: 50, y, size, font });
      y -= size + 10;
    }

    draw("PrintFlow Invoice", 20);
    y -= 10;

    draw(`Invoice #: ${invoice.invoiceNumber}`);
    draw(`Seller: ${invoice.sellerName}`);
    draw(`Status: ${invoice.status}`);
    draw(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`);

    y -= 10;
    draw("Cost Breakdown", 14);
    draw(`Filament Cost: Rs ${invoice.filamentCost}`);
    draw(`Machine Cost: Rs ${invoice.machineCost}`);
    draw(`GST: Rs ${invoice.gst}`);
    draw(`Total: Rs ${invoice.total}`, 16);

    const bytes = await pdf.save();
    const buffer = Buffer.from(bytes);

    return new Response(buffer, {
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
