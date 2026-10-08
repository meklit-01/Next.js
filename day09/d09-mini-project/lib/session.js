import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "session";
const MAX_AGE = 60 * 60 * 24 * 7;

function getSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("SESSION_SECRET is not configured.");
  }

  return secret;
}

function encode(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function sign(value) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function createSessionValue(session) {
  const payload = encode(session);
  return `${payload}.${sign(payload)}`;
}

function verifySessionValue(value) {
  if (!value || !value.includes(".")) {
    return null;
  }

  const [payload, signature] = value.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expected = sign(payload);

  try {
    if (
      signature.length !== expected.length ||
      !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
    ) {
      return null;
    }
  } catch {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );

    if (
      !session?.id ||
      !session?.role ||
      !session?.expiresAt ||
      Date.now() > session.expiresAt
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;

  return verifySessionValue(value);
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  };
}

export function makeSession(id, role = "user") {
  return createSessionValue({
    id,
    role,
    expiresAt: Date.now() + MAX_AGE * 1000,
  });
}
