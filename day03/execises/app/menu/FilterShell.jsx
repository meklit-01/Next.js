"use client";

export default function FilterShell({ children }) {
  return (
    <div>
      <button>
        Filter
      </button>

      {children}
    </div>
  );
}