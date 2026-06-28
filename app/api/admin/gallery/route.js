import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { adminDb } from "@/lib/firebaseAdmin";
import { verifyAdmin } from "@/lib/adminMiddleware";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET: Fetch all gallery images (admin view)
export async function GET(req) {
  try {
    const authResult = await verifyAdmin(req);
    if (authResult.error) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
    }

    const snapshot = await adminDb.collection("gallery").orderBy("createdAt", "desc").get();
    const images = [];
    snapshot.forEach((doc) => {
      images.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

// POST: Upload image to Cloudinary and save to Firestore
export async function POST(req) {
  try {
    const authResult = await verifyAdmin(req);
    if (authResult.error) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
    }

    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ success: false, error: "No image file provided" }, { status: 400 });
    }

    // Convert file to buffer then base64 for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64, {
      folder: "dogle_gallery",
      resource_type: "image",
    });

    // Save to Firestore
    const docRef = await adminDb.collection("gallery").add({
      src: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      data: {
        id: docRef.id,
        src: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      },
    });
  } catch (error) {
    console.error("Error uploading gallery image:", error);
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
  }
}

// DELETE: Remove image from Cloudinary and Firestore
export async function DELETE(req) {
  try {
    const authResult = await verifyAdmin(req);
    if (authResult.error) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: authResult.status });
    }

    const { searchParams } = new URL(req.url);
    const docId = searchParams.get("id");

    if (!docId) {
      return NextResponse.json({ success: false, error: "Missing image ID" }, { status: 400 });
    }

    // Get the document to find the Cloudinary public_id
    const docRef = adminDb.collection("gallery").doc(docId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({ success: false, error: "Image not found" }, { status: 404 });
    }

    const { publicId } = doc.data();

    // Delete from Cloudinary
    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (e) {
        console.warn("Cloudinary delete warning:", e.message);
      }
    }

    // Delete from Firestore
    await docRef.delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
  }
}
