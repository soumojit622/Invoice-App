import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";
import jsPDF from "jspdf";
import { formatCurrency } from "@/app/utils/formatCurrency";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  const { invoiceId } = await params;

  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
    },
    select: {
      invoiceName: true,
      invoiceNumber: true,
      currency: true,
      fromName: true,
      fromEmail: true,
      fromAddress: true,
      clientName: true,
      clientAddress: true,
      clientEmail: true,
      date: true,
      dueDate: true,
      invoiceItemDescription: true,
      invoiceItemQuantity: true,
      invoiceItemRate: true,
      total: true,
      note: true,
    },
  });

  if (!data) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Set general font
  pdf.setFont("helvetica");

  // Header Section with Logo and Invoice Name
  pdf.setFontSize(24);
  pdf.setTextColor(0, 102, 204); // Blue color for header
  pdf.text(data.invoiceName, 20, 20);
  pdf.setFontSize(10);
  pdf.text("Invoice # " + data.invoiceNumber, 160, 20);  // Display invoice number

  // Draw a separator line under the header
  pdf.line(20, 22, 190, 22);

  // From Section
  pdf.setFontSize(12);
  pdf.setTextColor(0); // Default black text
  pdf.text("From", 20, 40);
  pdf.setFontSize(10);
  pdf.text([data.fromName, data.fromEmail, data.fromAddress].join("\n"), 20, 45);

  // Client Section
  pdf.setFontSize(12);
  pdf.text("Bill to", 20, 70);
  pdf.setFontSize(10);
  pdf.text([data.clientName, data.clientEmail, data.clientAddress].join("\n"), 20, 75);

  // Invoice details
  pdf.setFontSize(10);
  pdf.text(
    `Date: ${new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(data.date)}`,
    120,
    40
  );
  pdf.text(`Due Date: ${new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(data.dueDate)}`, 120, 50);

  // Item Table Header with Striking Design
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(255, 255, 255); // White text color
  pdf.setFillColor(0, 102, 204); // Blue background color for header
  pdf.rect(20, 95, 170, 7, "F"); // Blue filled rectangle for header
  pdf.text("Description", 22, 100);
  pdf.text("Quantity", 120, 100);
  pdf.text("Rate", 140, 100);
  pdf.text("Total", 160, 100);

  // Draw Header Line
  pdf.setTextColor(0); // Default black text color
  pdf.line(20, 102, 190, 102);

  // Item Details with Row Styling (Alternating Row Color)
  const rowHeight = 10;
  let yOffset = 110;
  pdf.setFont("helvetica", "normal");

  // Alternate row color (light gray)
  pdf.setFillColor(240, 240, 240); // Light gray background
  pdf.rect(20, yOffset, 170, rowHeight, "F"); // Alternate row background
  pdf.setTextColor(0); // Set text color to black
  pdf.text(data.invoiceItemDescription, 22, yOffset + 6);
  pdf.text(data.invoiceItemQuantity.toString(), 120, yOffset + 6);
  pdf.text(
    formatCurrency({
      amount: data.invoiceItemRate,
      currency: data.currency as any,
    }),
    140,
    yOffset + 6
  );
  pdf.text(
    formatCurrency({ amount: data.total, currency: data.currency as any }),
    160,
    yOffset + 6
  );

  // Draw a thin line below the item row
  pdf.line(20, yOffset + rowHeight, 190, yOffset + rowHeight); // Divider line

  // Total Section with Bold and Color Accent
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(0, 102, 204); // Blue color for "Total"
  pdf.text(`Total (${data.currency})`, 120, yOffset + rowHeight + 15);
  pdf.text(
    formatCurrency({ amount: data.total, currency: data.currency as any }),
    160,
    yOffset + rowHeight + 15
  );

  // Additional Note Section with Professional Styling
  if (data.note) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.setTextColor(0); // Default black text color
    pdf.text("Note:", 20, yOffset + rowHeight + 30);
    pdf.setFont("helvetica", "italic");
    pdf.text(data.note, 20, yOffset + rowHeight + 35);
  }

  // Footer Section with Company Info and Contact Details
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(150, 150, 150); // Light gray text color
  pdf.text("Thank you for your business!", 20, 270);
  pdf.text("Chromatic | 40/6 Gariahat Rd (S) | 9876543210", 20, 275);

  // Footer Line
  pdf.line(20, 280, 190, 280); // Divider line

  // Adding Contact and Social Media Links in the Footer
  pdf.setFontSize(6);
  pdf.text("www.companywebsite.com", 150, 285);
  pdf.text("Follow us on:", 20, 285);
  pdf.text("Twitter | LinkedIn | Facebook", 20, 290);

  // // Optional Page Numbering for Professional Look
  // const pageCount = pdf.internal.getNumberOfPages();
  // for (let i = 1; i <= pageCount; i++) {
  //   pdf.setPage(i);
  //   pdf.setFontSize(8);
  //   pdf.text(`Page ${i} of ${pageCount}`, 180, 295);
  // }

  // Generate the PDF as a buffer
  const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

  // Return PDF as download
  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
    },
  });
}
