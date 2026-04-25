import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { verifyAdmin } from "@/lib/adminMiddleware";

export async function GET(req) {
  try {
    const authResult = await verifyAdmin(req);
    if (authResult.error) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
    }

    const snapshot = await adminDb.collection("bookings").orderBy("createdAt", "desc").get();
    
    const bookings = [];
    snapshot.forEach(doc => {
      bookings.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
