import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, dogName, dogBreed, subject, message, vaccineCertificate, vaccineCertificateName } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (name, email, phone, message)" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const docRef = await adminDb.collection("enquiries").add({
      name,
      email,
      phone,
      dogName: dogName || "",
      dogBreed: dogBreed || "",
      subject: subject || "",
      message,
      vaccineCertificate: vaccineCertificate || "",
      vaccineCertificateName: vaccineCertificateName || "",
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ success: true, data: { id: docRef.id } }, { status: 201 });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
