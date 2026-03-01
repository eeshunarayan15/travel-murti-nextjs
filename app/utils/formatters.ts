export const formatTitle = (str: string): string => {
  if (!str || typeof str !== "string") return "";
  return str
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
