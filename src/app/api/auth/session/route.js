import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("user_session");

    if (!sessionCookie || !sessionCookie.value) {
      return Response.json({ authenticated: false });
    }

    const user = JSON.parse(sessionCookie.value);
    return Response.json({ authenticated: true, user });
  } catch (err) {
    console.error("Session check error:", err);
    return Response.json({ authenticated: false });
  }
}
