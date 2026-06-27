import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const stateParam = searchParams.get("state") || "{}";

  let mobile = "";
  let source = "join-us";
  try {
    const parsed = JSON.parse(stateParam);
    mobile = parsed.mobile || "";
    source = parsed.source || "join-us";
  } catch (e) {}

  const targetPath = source === "login" ? "/login" : "/join-us";
  const paramPrefix = source === "login" ? "google_login" : "google_signup";

  const redirectError = (msg: string) => {
    return NextResponse.redirect(
      `http://localhost:3000${targetPath}?${paramPrefix}=error&message=${encodeURIComponent(msg)}`
    );
  };

  if (error || !code) {
    return redirectError(error || "Authorization code is missing");
  }

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = "http://localhost:3000/api/auth/google/callback";

  try {
    // Exchange auth code for tokens
    const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    });

    const { access_token } = tokenResponse.data;

    // Fetch user details from Google
    const userinfoResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { name, email } = userinfoResponse.data;

    return NextResponse.redirect(
      `http://localhost:3000${targetPath}?${paramPrefix}=success&name=${encodeURIComponent(
        name || ""
      )}&email=${encodeURIComponent(email || "")}&mobile=${encodeURIComponent(mobile)}`
    );
  } catch (err: any) {
    const errMsg = err.response?.data?.error_description || err.message || "Unknown error";
    return redirectError(errMsg);
  }
}
