"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatETB = (value) =>
  `${Number(value).toLocaleString("en-US")} ETB`;

export default function RevenueChart({ data }) {
  if (data.length === 0) {
    return <p>No revenue data available yet.</p>;
  }

  return (
    <section>
      <h2>Revenue by day</h2>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="date" />
            <YAxis tickFormatter={formatETB} width={95} />
            <Tooltip formatter={formatETB} />
            <Bar dataKey="revenue" fill="#839958" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}