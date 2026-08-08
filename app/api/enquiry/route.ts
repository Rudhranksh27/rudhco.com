import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { sendEnquiryEmails } from "@/lib/email";

interface EnquiryPayload {
	fullName: string;
	email: string;
	phoneNumber: string;
	service: string;
	subject?: string;
	message: string;
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

type ValidationErrors = Partial<Record<keyof EnquiryPayload, string>>;

function validatePayload(payload: EnquiryPayload): ValidationErrors {
	const errors: ValidationErrors = {};

	if (!payload.fullName?.trim()) {
		errors.fullName = "Full Name is required.";
	}

	if (!payload.email?.trim()) {
		errors.email = "Email is required.";
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
		errors.email = "Please enter a valid email address.";
	}

	if (!payload.phoneNumber?.trim()) {
		errors.phoneNumber = "Phone Number is required.";
	} else if (!/^[6-9]\d{9}$/.test(payload.phoneNumber.trim())) {
		errors.phoneNumber = "Please enter a valid 10-digit Indian mobile number.";
	}

	if (!payload.service?.trim()) {
		errors.service = "Service is required.";
	}

	if (!payload.message?.trim()) {
		errors.message = "Message is required.";
	}

	return errors;
}

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as EnquiryPayload;
		const payload: EnquiryPayload = {
			fullName: body.fullName?.trim() || "",
			email: body.email?.trim() || "",
			phoneNumber: body.phoneNumber?.trim() || "",
			service: body.service?.trim() || "",
			subject: body.subject?.trim() || "",
			message: body.message?.trim() || "",
			estimate: body.estimate || undefined,
		};

		// Validate incoming data before any side effect.
		const validationErrors = validatePayload(payload);
		if (Object.keys(validationErrors).length > 0) {
			return NextResponse.json(
				{
					success: false,
					message: "Validation failed.",
					errors: validationErrors,
				},
				{ status: 400 }
			);
		}

		const createdAt = new Date();

		// Persist the enquiry in MongoDB with default status.
		const enquiryDoc = {
			fullName: payload.fullName,
			email: payload.email,
			phoneNumber: payload.phoneNumber,
			service: payload.service,
			subject: payload.subject || null,
			message: payload.message,
			estimate: payload.estimate || null,
			status: "New",
			createdAt,
		};

		let dbSaved = false;
		let dbErrorMessage: string | null = null;

		try {
			const db = await getDatabase();
			await db.collection("enquiries").insertOne(enquiryDoc);
			dbSaved = true;
		} catch (dbError) {
			dbErrorMessage = dbError instanceof Error ? dbError.message : String(dbError);
			console.error("Enquiry email fallback mode: DB save failed:", dbError);
		}

		let emailSent = false;
		let emailErrorMessage: string | null = null;
		try {
			// Send both internal notification and customer confirmation emails.
			await sendEnquiryEmails({
				fullName: payload.fullName,
				email: payload.email,
				phoneNumber: payload.phoneNumber,
				service: payload.service,
				subject: payload.subject,
				message: payload.message,
				estimate: payload.estimate,
				createdAt,
			});
			emailSent = true;
		} catch (emailError) {
			emailErrorMessage = emailError instanceof Error ? emailError.message : String(emailError);
			console.error("Email delivery failed:", emailError);
		}

		if (dbSaved) {
			return NextResponse.json(
				{
					success: true,
					message: emailSent
						? "Enquiry submitted successfully."
						: "Enquiry saved, but confirmation email could not be sent right now.",
				},
				{ status: 201 }
			);
		}

		if (emailSent) {
			return NextResponse.json(
				{
					success: true,
					partial: true,
					message:
						"Enquiry received and email sent. Database save is temporarily unavailable.",
					warning: dbErrorMessage,
				},
				{ status: 202 }
			);
		}

		return NextResponse.json(
			{
				success: false,
				message:
					"Unable to process enquiry right now. Both database save and email delivery failed.",
				errors: {
					database: dbErrorMessage,
					email: emailErrorMessage,
				},
			},
			{ status: 500 }
		);
	} catch (error) {
		console.error("Error creating enquiry:", error);

		return NextResponse.json(
			{
				success: false,
				message:
					error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}