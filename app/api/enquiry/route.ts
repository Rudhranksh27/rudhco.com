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
	} else if (!/^[+]?[-()\d\s]{7,20}$/.test(payload.phoneNumber)) {
		errors.phoneNumber = "Please enter a valid phone number.";
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

		const db = await getDatabase();
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

		await db.collection("enquiries").insertOne(enquiryDoc);

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

		return NextResponse.json(
			{
				success: true,
				message: "Enquiry submitted successfully.",
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating enquiry:", error);

		return NextResponse.json(
			{
				success: false,
				message: "Something went wrong while submitting your enquiry.",
			},
			{ status: 500 }
		);
	}
}

