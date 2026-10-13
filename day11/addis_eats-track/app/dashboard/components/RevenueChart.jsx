"use client";

export default function RevenueChart({ rows }) {
  const width = 680;
  const height = 280;
  const pad = { top: 20, right: 24, bottom: 54, left: 66 };
  const max = Math.max(1, ...rows.map((r) => r.revenue));
  const plotH = height - pad.top - pad.bottom;
  const plotW = width - pad.left - pad.right;
  const barW = Math.min(70, plotW / Math.max(1, rows.length) * 0.55);
  const money = (n) => `ETB ${n.toLocaleString("en-US")}`;

  return (
    <section aria-labelledby="revenue-chart-title">
      <h2 id="revenue-chart-title">Revenue by neighbourhood</h2>
      <p>Unit: Ethiopian birr (ETB). Bar height starts at zero; values are also shown in the table.</p>
      <div className="chart-frame">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="revenue-svg-title revenue-svg-desc">
          <title id="revenue-svg-title">Revenue by neighbourhood</title>
          <desc id="revenue-svg-desc">Bars show revenue in ETB for each neighbourhood. Labels and values are also available in the table below.</desc>
          {[0, .25, .5, .75, 1].map((fraction) => {
            const y = pad.top + plotH * (1 - fraction);
            return <g key={fraction}>
              <line x1={pad.left} y1={y} x2={width-pad.right} y2={y} stroke="currentColor" strokeDasharray="4 4" opacity=".25" />
              <text x={pad.left-8} y={y+4} textAnchor="end" fontSize="11">{Math.round(max*fraction).toLocaleString("en-US")}</text>
            </g>;
          })}
          {rows.map((row, i) => {
            const slot = plotW / Math.max(1, rows.length);
            const x = pad.left + slot * i + (slot-barW)/2;
            const h = (row.revenue / max) * plotH;
            return <g key={row.area}>
              <rect x={x} y={pad.top+plotH-h} width={barW} height={h} fill="currentColor" stroke="currentColor" strokeWidth="1" />
              <text x={x+barW/2} y={Math.max(pad.top+12, pad.top+plotH-h-6)} textAnchor="middle" fontSize="11">{row.revenue.toLocaleString("en-US")}</text>
              <text x={x+barW/2} y={height-pad.bottom+18} textAnchor="middle" fontSize="11">{row.area}</text>
            </g>;
          })}
          <text x="16" y={height/2} transform={`rotate(-90 16 ${height/2})`} textAnchor="middle" fontSize="12">Revenue (ETB)</text>
        </svg>
      </div>
    </section>
  );
}
