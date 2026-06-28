import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

// GET: Public endpoint — fetch all gallery images
export async function GET() {
  try {
    const snapshot = await adminDb.collection("gallery").orderBy("createdAt", "desc").get();
    const images = [];
    snapshot.forEach((doc) => {
      images.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error("Error fetching public gallery:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
