

import { Resend } from "resend";

export interface EnquiryEmailPayload {
  fullName: string;
  email: string;
  phoneNumber: string;
  service: string;
  subject?: string;
  message: string;
  createdAt: Date;
  estimate?: {
    packageName: string;
    pricePerSqft: number;
    sqftArea: number;
    houseType: string;
    multiplier: number;
    estimatedCost: number;
    timestamp: number;
  };
}

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not defined in environment variables.");
  }

  return new Resend(apiKey);
}

function getCompanyEmail(): string {
  const companyEmail = process.env.COMPANY_EMAIL;

  if (!companyEmail) {
    throw new Error("COMPANY_EMAIL is not defined in environment variables.");
  }

  return companyEmail;
}

function getLogoUrl(): string {
  return "https://rudhco.com/logo.webp";
}

export async function sendEnquiryEmails(payload: EnquiryEmailPayload): Promise<void> {
  const resend = getResendClient();
  const companyEmail = getCompanyEmail();
  const fromEmail = process.env.EMAIL_FROM || "Rudhco Enquiry <onboarding@resend.dev>";

  // Notify company inbox with full enquiry details.
  await resend.emails.send({
    from: fromEmail,
    to: companyEmail,
    replyTo: payload.email,
    subject: `New Enquiry: ${payload.subject?.trim() || payload.service}`,
    html: buildCompanyNotificationHtml(payload),
  });

  // Send professional confirmation email to customer.
  await resend.emails.send({
    from: fromEmail,
    to: payload.email,
    subject: "We have received your enquiry | Rudhco",
    html: buildCustomerConfirmationHtml(payload),
  });
}

function buildCompanyNotificationHtml(payload: EnquiryEmailPayload): string {
  return `
    <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6; max-width: 720px; margin: 0 auto;">
      <h2 style="margin-bottom: 8px;">New enquiry received</h2>
      <p style="margin-top: 0; color: #475569;">A new contact enquiry was submitted from rudhco.com.</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tbody>
          ${buildRow("Full Name", payload.fullName)}
          ${buildRow("Email", payload.email)}
          ${buildRow("Phone Number", payload.phoneNumber)}
          ${buildRow("Service", payload.service)}
          ${buildRow("Subject", payload.subject?.trim() || "-")}
          ${buildRow("Message", payload.message)}
          ${payload.estimate ? `
            <tr style="background-color: #fef3c7; font-weight: bold;">
              <td colspan="2" style="padding: 12px; border: 1px solid #e2e8f0;">
                📊 ESTIMATE DETAILS
              </td>
            </tr>
            ${buildRow("Package Name", payload.estimate.packageName)}
            ${buildRow("House Type", payload.estimate.houseType)}
            ${buildRow("Sqft Area", payload.estimate.sqftArea.toLocaleString())}
            ${buildRow("Rate per Sqft", `Rs ${payload.estimate.pricePerSqft.toLocaleString("en-IN")}`)}
            ${buildRow("Multiplier", `${payload.estimate.multiplier}x`)}
            ${buildRow("Calculation", `Rs ${payload.estimate.pricePerSqft.toLocaleString("en-IN")} × ${payload.estimate.multiplier} × ${payload.estimate.sqftArea.toLocaleString()}`)}
            ${buildRow("Estimated Cost", `Rs ${payload.estimate.estimatedCost.toLocaleString("en-IN")}`)}
          ` : ''}
          ${buildRow("Status", "New")}
          ${buildRow("Created At", payload.createdAt.toISOString())}
        </tbody>
      </table>
    </div>
  `;
}

function buildCustomerConfirmationHtml(payload: EnquiryEmailPayload): string {
  const logoUrl = getLogoUrl();

  return `
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Enquiry Confirmation - Rudhco</title>
  </head>
  <body style="margin: 0; padding: 0; background: #f8fafc; font-family: Arial, Helvetica, sans-serif; color: #0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f8fafc; padding: 24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 640px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <tr>
              <td style="padding: 24px; text-align: center; background: linear-gradient(135deg, #f8fafc, #fff7ed); border-bottom: 1px solid #e2e8f0;">
                <img src="${logoUrl}" alt="Rudhco" style="max-width: 160px; width: 100%; height: auto; display: inline-block;" />
              </td>
            </tr>
            <tr>
              <td style="padding: 28px 24px 10px;">
                <h1 style="margin: 0 0 12px; font-size: 24px; line-height: 1.3;">Thank you for contacting Rudhco</h1>
                <p style="margin: 0 0 14px; color: #334155; font-size: 15px; line-height: 1.7;">
                  Dear ${escapeHtml(payload.fullName)},<br />
                  We have successfully received your enquiry and our team is reviewing it.
                </p>
                <p style="margin: 0 0 18px; color: #334155; font-size: 15px; line-height: 1.7;">
                  A Rudhco representative will contact you shortly with the next steps.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 24px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #e2e8f0; border-radius: 10px; background: #f8fafc;">
                  <tr>
                    <td style="padding: 16px; font-size: 14px; color: #0f172a;">
                      <strong>Your enquiry details</strong><br />
                      Service: ${escapeHtml(payload.service)}<br />
                      Subject: ${escapeHtml(payload.subject?.trim() || "General Enquiry")}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 0 24px 28px; color: #475569; font-size: 14px; line-height: 1.7;">
                <strong>Contact Details</strong><br />
                Email: business@rudhco.com<br />
                Phone: +91 98646 58393<br />
                Website: <a href="https://rudhco.com" style="color: #b45309; text-decoration: none;">https://rudhco.com</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
}

function buildRow(label: string, value: string): string {
  return `
    <tr>
      <td style="width: 180px; border: 1px solid #e2e8f0; padding: 10px 12px; background: #f8fafc; font-weight: 700;">${escapeHtml(label)}</td>
      <td style="border: 1px solid #e2e8f0; padding: 10px 12px;">${escapeHtml(value)}</td>
    </tr>
  `;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
