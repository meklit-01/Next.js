import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();

  const session = cookieStore.get("session")?.value;

  if (session === "user-123") {
    return {
      id: "user-123",
      role: "user",
    };
  }

  if (session === "staff-123") {
    return {
      id: "staff-123",
      role: "staff",
    };
  }

  return null;
}