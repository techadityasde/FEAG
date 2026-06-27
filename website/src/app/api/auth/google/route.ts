import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mobile = searchParams.get("mobile") || "";
  const source = searchParams.get("source") || "join-us";

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = "http://localhost:3000/api/auth/google/callback";
  const scope = "openid email profile";
  const prompt = "select_account";
  const responseType = "code";
  const state = JSON.stringify({ mobile, source });

  if (!clientId) {
    return NextResponse.json(
      { error: "Google Client ID is not configured" },
      { status: 500 }
    );
  }

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(
    scope
  )}&prompt=${encodeURIComponent(prompt)}&response_type=${encodeURIComponent(
    responseType
  )}&state=${encodeURIComponent(state)}`;

  return NextResponse.redirect(googleAuthUrl);
}
