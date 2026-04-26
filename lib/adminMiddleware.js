import jwt from "jsonwebtoken";

export async function verifyAdmin(req) {
  let token;
  const authHeader = req.headers.get("authorization");
  
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split("Bearer ")[1];
  } else {
    // Check for cookie token for client-side API calls
    token = req.cookies.get("admin_token")?.value;
  }

  if (!token) {
    return { error: "Missing or invalid authorization header/cookie", status: 401 };
  }

  try {
    const secret = process.env.JWT_SECRET || "fallback-secret-do-not-use-in-prod";
    const decoded = jwt.verify(token, secret);
    return { admin: decoded };
  } catch (error) {
    console.error("Admin token verification failed:", error);
    return { error: "Invalid admin token", status: 401 };
  }
}
