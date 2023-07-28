const convertTimestamp = (timestamp: Date): string => {
  return new Date(timestamp).toLocaleString("en-EN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export default convertTimestamp;
