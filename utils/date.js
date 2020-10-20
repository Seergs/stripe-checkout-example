import dayjs from "dayjs";
export function formatDate(date) {
  return dayjs(date).format("DD/MM/YY");
}

export function formatTime(date) {
  return dayjs(date).format("HH:mm");
}
