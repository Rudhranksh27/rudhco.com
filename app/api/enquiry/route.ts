import { sendEnquiryEmails, EnquiryEmailPayload } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract form data
    const { fullName, email, phoneNumber, service, subject, message, estimate } = body;

    // Basic validation
    if (!fullName || !email || !phoneNumber || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create payload for email
    const emailPayload: EnquiryEmailPayload = {
      fullName,
      email,
      phoneNumber,
      service: service || "Not specified",
      subject: subject || "General Enquiry",
      message,
      createdAt: new Date(),
      estimate: estimate || undefined,
    };

    // Send email
    await sendEnquiryEmails(emailPayload);

    // Return success
    return NextResponse.json(
      { success: true, message: "Enquiry sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to send enquiry. Please try again." },
      { status: 500 }
    );
  }
}
