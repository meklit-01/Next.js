"use client";

export default function OrdersChart({ rows }) {
  const width = 680, height = 280;
  const pad = { top: 24, right: 24, bottom: 54, left: 62 };
  const max = Math.max(1, ...rows.map((r) => r.revenue));
  const plotH = height-pad.top-pad.bottom, plotW = width-pad.left-pad.right;
  const points = rows.map((row, i) => ({
    ...row,
    x: pad.left + (rows.length < 2 ? plotW/2 : (plotW*i)/(rows.length-1)),
    y: pad.top + plotH - (row.revenue/max)*plotH
  }));
  return (
    <section aria-labelledby="orders-chart-title">
      <h2 id="orders-chart-title">Orders over time</h2>
      <p>Unit: ETB revenue per day. Each point is labelled; the table below contains the same values.</p>
      <div className="chart-frame">
        <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="orders-svg-title orders-svg-desc">
          <title id="orders-svg-title">Revenue over time</title>
          <desc id="orders-svg-desc">A line connects daily revenue values in ETB. Read exact values in the data table below.</desc>
          {[0,.25,.5,.75,1].map(f => {
            const y=pad.top+plotH*(1-f);
            return <g key={f}>
              <line x1={pad.left} y1={y} x2={width-pad.right} y2={y} stroke="currentColor" strokeDasharray="4 4" opacity=".25"/>
              <text x={pad.left-8} y={y+4} textAnchor="end" fontSize="11">{Math.round(max*f).toLocaleString("en-US")}</text>
            </g>;
          })}
          {points.length > 1 && <polyline points={points.map(p=>`${p.x},${p.y}`).join(" ")} fill="none" stroke="currentColor" strokeWidth="3"/>}
          {points.map(p=><g key={p.date}>
            <circle cx={p.x} cy={p.y} r="5" fill="white" stroke="currentColor" strokeWidth="3"/>
            <text x={p.x} y={Math.max(pad.top+12,p.y-10)} textAnchor="middle" fontSize="11">{p.revenue.toLocaleString("en-US")}</text>
            <text x={p.x} y={height-pad.bottom+18} textAnchor="middle" fontSize="11">{p.date}</text>
          </g>)}
          <text x="16" y={height/2} transform={`rotate(-90 16 ${height/2})`} textAnchor="middle" fontSize="12">Revenue (ETB)</text>
        </svg>
      </div>
    </section>
  );
}
