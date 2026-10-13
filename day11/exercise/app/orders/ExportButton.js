
"use client";

import { exportCSV } from "@/lib/csv";

export default function ExportButton({ orders }) {
  const testOrders = [
    {
      customer: "Abebe, Kebede",
      dish: 'Doro "Special"',
      price: 250,
    },
    {
      customer: "Sara",
      dish: "Shiro",
      price: 150,
    },
  ];

  return (
    <div>
      <button
        type="button"
        onClick={() => exportCSV(orders)}
      >
        Export Orders CSV
      </button>

      <button
        type="button"
        onClick={() => exportCSV(testOrders)}
        style={{ marginLeft: "10px" }}
      >
        Test CSV Special Values
      </button>
    </div>
  );
}
