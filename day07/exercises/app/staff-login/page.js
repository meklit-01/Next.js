"use client";

import { useRouter } from "next/navigation";

export default function StaffLoginPage() {
  const router = useRouter();

  async function handleLogin() {
    await fetch("/api/staff-login", {
      method: "POST",
    });

    router.push("/kitchen");
  }

  return (
    <div>
      <h1>Staff Login</h1>

      <button onClick={handleLogin}>
        Login as Staff
      </button>
    </div>
  );
}