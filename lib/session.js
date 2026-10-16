import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

const secret = process.env.SESSION_SECRET;
if (!secret || secret.length < 32) {
  throw new Error(
    "SESSION_SECRET is missing or shorter than 32 characters. Set it in .env (see .env.example)."
  );
}

export const sessionOptions = {
  password: secret,
  cookieName: "zentee_admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  },
};

export async function getAdminSession() {
  return getIronSession(cookies(), sessionOptions);
}
