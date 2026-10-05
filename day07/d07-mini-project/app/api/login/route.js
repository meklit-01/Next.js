import { cookies } from "next/headers";

function isSafeNext(next) {
  if (!next) {
    return "/orders";
  }

  // Only allow internal paths.
  if (!next.startsWith("/") || next.startsWith("//")) {
    return "/orders";
  }

  return next;
}

export async function POST(request) {
  const body = await request.json();

  const username = body.username?.trim();
  const next = isSafeNext(body.next);

  if (!username) {
    return Response.json(
      {
        error: "Username is required.",
      },
      {
        status: 400,
      }
    );
  }

  let session;

  if (username === "staff") {
    session = {
      id: "staff-123",
      role: "staff",
    };
  } else {
    session = {
      id: "user-123",
      role: "user",
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("session", session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return Response.json({
    success: true,
    redirect: next,
  });
}