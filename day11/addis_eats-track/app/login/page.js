"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/orders";
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, next }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Login failed.");
      return;
    }

    window.location.href = data.redirect;
  }

  return (
    <div>
      <h1>Sign in</h1>
      <p>Use alice, bob, or staff for the demo accounts.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <button type="submit">Sign in</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}
