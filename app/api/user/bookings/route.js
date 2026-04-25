import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { verifyUser } from "@/lib/authMiddleware";

export async function GET(req) {
  try {
    const authResult = await verifyUser(req);
    if (authResult.error) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
    }

    const { uid } = authResult.user;
    const snapshot = await adminDb.collection("bookings").where("userId", "==", uid).get();
    
    const bookings = [];
    snapshot.forEach(doc => {
      bookings.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
