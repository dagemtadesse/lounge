const isToday = (date: Date) => {
  const today = new Date();

  const isSameDate =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  return isSameDate;
};

export const formatDate = (date: Date): string => {
  return Intl.DateTimeFormat("en-US", {
    ...(isToday(date)
      ? { timeStyle: "short" }
      : { dateStyle: "medium", timeStyle: "short" }),
  }).format(date);
};
