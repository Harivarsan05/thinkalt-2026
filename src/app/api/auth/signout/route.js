import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("user_session");
    return Response.json({ success: true });
  } catch (err) {
    console.error("Signout error:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
