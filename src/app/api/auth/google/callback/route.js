import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    console.error("Google authentication error parameter:", error);
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error)}`, request.url));
  }

  if (!code) {
    console.error("No authorization code provided in Google OAuth callback");
    return NextResponse.redirect(new URL("/login?error=no_code", request.url));
  }

  try {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      console.error("Missing Google OAuth environment variables in callback handler");
      return NextResponse.redirect(
        new URL("/login?error=missing_config", request.url)
      );
    }

    // Exchange authorization code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error("Google Token exchange failed:", errorData);
      return NextResponse.redirect(
        new URL(`/login?error=token_exchange_failed`, request.url)
      );
    }

    const tokens = await tokenResponse.json();
    
    // Fetch user profile using access token
    const userinfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    if (!userinfoResponse.ok) {
      console.error("Failed to fetch user info from Google");
      return NextResponse.redirect(
        new URL("/login?error=userinfo_failed", request.url)
      );
    }

    const user = await userinfoResponse.json();

    // Store session in cookies
    const cookieStore = await cookies();
    cookieStore.set("user_session", JSON.stringify({
      name: user.name || user.given_name || "Google User",
      email: user.email,
      picture: user.picture,
    }), {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.redirect(new URL("/app-health-dashboard", request.url));
  } catch (err) {
    console.error("Google authentication exception occurred:", err);
    return NextResponse.redirect(
      new URL(`/login?error=server_error`, request.url)
    );
  }
}
