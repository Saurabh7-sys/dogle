import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { verifyUser } from "@/lib/authMiddleware";

export async function POST(req) {
  try {
    const authResult = await verifyUser(req);
    if (authResult.error) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
    }

    const { uid } = authResult.user;
    const body = await req.json();
    const { ownerName, phone, dogName, breed, serviceType, startDate, endDate, specialNeeds, vaccineCertificate } = body;

    if (!ownerName || !phone || !dogName || !serviceType || !startDate || !endDate) {
      return NextResponse.json({ success: false, error: "Missing required booking fields" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const bookingData = {
      userId: uid,
      ownerName,
      phone,
      dogName,
      breed: breed || "",
      serviceType,
      startDate,
      endDate,
      specialNeeds: specialNeeds || "",
      vaccineCertificate: vaccineCertificate || "",
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await adminDb.collection("bookings").add(bookingData);

    return NextResponse.json({ success: true, data: { id: docRef.id, ...bookingData } }, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
