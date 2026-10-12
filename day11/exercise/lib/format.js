
export function etb(value) {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
}

export function when(value) {
  if (!value) return "Date unavailable";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleString("en-ET", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function relative(value) {
  if (!value) return "Time unavailable";

  const seconds = Math.round(
    (new Date(value).getTime() - Date.now()) / 1000
  );

  if (!Number.isFinite(seconds)) return "Invalid date";

  const formatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  if (Math.abs(seconds) < 60) {
    return formatter.format(seconds, "second");
  }

  const minutes = Math.round(seconds / 60);
  if (Math.abs(minutes) < 60) {
    return formatter.format(minutes, "minute");
  }

  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) {
    return formatter.format(hours, "hour");
  }

  return formatter.format(Math.round(hours / 24), "day");
}
