import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { verifyUser } from "@/lib/authMiddleware";

export async function GET(req, { params }) {
  try {
    const authResult = await verifyUser(req);
    if (authResult.error) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
    }

    const { id } = params;
    const docRef = adminDb.collection("bookings").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    }

    const bookingData = doc.data();
    
    if (bookingData.userId !== authResult.user.uid) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({ success: true, data: { id: doc.id, ...bookingData } });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
