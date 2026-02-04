import { prisma } from "@/app/lib/prisma";
import { PDFDocument, StandardFonts } from "pdf-lib";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
    });

    if (!invoice) {
      return new Response("Invoice not found", { status: 404 });
    }

    const pdf = await PDFDocument.create();
    const page = pdf.addPage();
    const font = await pdf.embedFont(StandardFonts.Helvetica);

    let y = 750;
    const draw = (t: string, size = 12) => {
      page.drawText(t, { x: 50, y, size, font });
      y -= size + 12;
    };

    draw("PrintFlow Invoice", 18);
    draw(`Invoice: ${invoice.invoiceNumber}`);
    draw(`Seller: ${invoice.sellerName}`);
    draw(`Status: ${invoice.status}`);
    draw(`Total: Rs ${invoice.total}`); // ← no ₹ symbol

    const bytes = await pdf.save(); // Uint8Array

    // ✅ CRITICAL FIX — convert to Buffer
    const buffer = Buffer.from(bytes);

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${invoice.invoiceNumber}.pdf`,
      },
    });

  } catch (e) {
    console.error("PDF ERROR:", e);
    return new Response("PDF failed", { status: 500 });
  }
}
