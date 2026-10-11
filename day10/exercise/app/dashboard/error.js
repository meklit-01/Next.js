"use client";

export default function DashboardError({ reset }) {
  return (
    <main className="dashboard">
      <h1>Dashboard unavailable</h1>
      <p>Something went wrong while loading the dashboard.</p>
      <button onClick={() => reset()}>Try again</button>
    </main>
  );
}