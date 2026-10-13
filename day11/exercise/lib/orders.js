export function relative(date) {
  const seconds = Math.round(
    (new Date(date).getTime() - Date.now()) / 1000
  );

  const formatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  if (Math.abs(seconds) < 60) {
    return formatter.format(seconds, "second");
  }

  if (Math.abs(seconds) < 3600) {
    return formatter.format(Math.round(seconds / 60), "minute");
  }

  if (Math.abs(seconds) < 86400) {
    return formatter.format(Math.round(seconds / 3600), "hour");
  }

  return formatter.format(Math.round(seconds / 86400), "day");
}