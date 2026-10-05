"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const next = searchParams.get("next") || "/";

  async function handleLogin() {
    await fetch("/api/login", {
      method: "POST",
    });

    router.push(next);
  }

  return (
    <div>
      <h1>Login</h1>

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}