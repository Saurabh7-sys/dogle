import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, dogName, breed, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (name, phone, message)" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const docRef = await adminDb.collection("enquiries").add({
      name,
      phone,
      dogName: dogName || "",
      breed: breed || "",
      message,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({ success: true, data: { id: docRef.id } }, { status: 201 });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
