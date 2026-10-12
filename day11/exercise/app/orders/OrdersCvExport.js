
"use client";

import { etb, when } from "@/lib/format";

export function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export default function OrdersCsvExport({ orders }) {
  function exportCsv() {
    const headers = [
      "Order ID",
      "Customer",
      "Status",
      "Total",
      "Created",
    ];

    const rows = orders.map((order) => [
      order.id,
      order.customer,
      order.status,
      etb(order.total),
      when(order.createdAt),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(csvCell).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "orders.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <button type="button" onClick={exportCsv}>
      Export orders to CSV
    </button>
  );
}
