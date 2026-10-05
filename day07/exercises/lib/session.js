import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();

  const session = cookieStore.get("session")?.value;

  if (!session) {
    return null;
  }

  
  if (session !== "user-123") {
    return null;
  }

  return {
    id: session,
    role: "user",
  };
}