import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { verifyAdmin } from "@/lib/adminMiddleware";

export async function GET(req) {
  try {
    const authResult = await verifyAdmin(req);
    if (authResult.error) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
    }

    const snapshot = await adminDb.collection("enquiries").orderBy("createdAt", "desc").get();
    
    const enquiries = [];
    snapshot.forEach(doc => {
      enquiries.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ success: true, data: enquiries });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
