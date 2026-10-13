const etbFormatter = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 2,
});
const dateFormatter = new Intl.DateTimeFormat("en-ET", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function etb(value) {
  const amount = Number(value);
  return etbFormatter.format(Number.isFinite(amount) ? amount : 0);
}

export function when(value) {
  if (!value) return "Time not available";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Time not available" : dateFormatter.format(date);
}

export function relative(value, now = Date.now()) {
  if (!value) return "time unknown";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "time unknown";
  const seconds = Math.round((date.getTime() - now) / 1000);
  const abs = Math.abs(seconds);
  if (abs < 45) return "just now";
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (abs < 3600) return rtf.format(Math.round(seconds / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(seconds / 3600), "hour");
  return rtf.format(Math.round(seconds / 86400), "day");
}
