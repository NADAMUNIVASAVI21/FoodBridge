export function formatDate(timestamp) {
  if (!timestamp) return "";
  return new Date(timestamp.seconds * 1000).toLocaleString();
}
