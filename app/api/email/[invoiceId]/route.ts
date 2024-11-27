import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.com",
      name: "Soumojit Banerjee",
    };

    emailClient.send({
      from: sender,
      to: [{ email: "banerjeesoumojit2@gmail.com" }],
      template_uuid: "6f64746e-184c-43bd-8b0a-e36a119629d7",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "Chromatic.",
        company_info_address: "40/6 Gariahat Rd (S), Kolkata, WB 700031",
        company_info_city: "Kolkata",
        company_info_zip_code: "123456",
        company_info_country: "India",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 }
    );
  }
}
