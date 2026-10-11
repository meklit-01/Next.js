import { cookies } from "next/headers";
import {
  getSessionCookieOptions,
  makeSession,
} from "@/lib/session";

function safeNext(value) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return "/orders";
  }

  return value;
}

export async function POST(request) {
  const body = await request.json();
  const username = body.username?.trim().toLowerCase();

  if (!username) {
    return Response.json(
      { error: "Username is required." },
      { status: 400 }
    );
  }

  let id = "user-123";
  let role = "user";

  if (username === "alice") {
    id = "user-alice";
  } else if (username === "bob") {
    id = "user-bob";
  } else if (username === "staff") {
    id = "staff-123";
    role = "staff";
  }

  const cookieStore = await cookies();

  cookieStore.set(
    "session",
    makeSession(id, role),
    getSessionCookieOptions()
  );

  return Response.json({
    success: true,
    redirect: safeNext(body.next),
  });
}
