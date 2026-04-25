import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { verifyAdmin } from "@/lib/adminMiddleware";

export async function PUT(req, { params }) {
  try {
    const authResult = await verifyAdmin(req);
    if (authResult.error) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
    }

    const { id } = params;
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ success: false, error: "Missing status field" }, { status: 400 });
    }

    const docRef = adminDb.collection("bookings").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    }

    await docRef.update({
      status,
      updatedAt: new Date().toISOString(),
    });

    const updatedDoc = await docRef.get();

    return NextResponse.json({ success: true, data: { id: updatedDoc.id, ...updatedDoc.data() } });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
