const formatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

export const formatDate = (date: Date | string) => {
  const d = new Date(date);
  return formatter.format(d);
};

export const formatFileSize = (size: number | null) =>
  size ? `${Math.ceil((size / 1024 / 1024) * 100) / 100} MB` : "-";
