import dayjs from "dayjs";
import "dayjs/locale/es";

export function formatDate(date) {
  return dayjs(date).format("DD/MM/YY");
}

export function formatTime(date) {
  return dayjs(date).format("HH:mm");
}

export function formatToHuman(date) {
  return dayjs(date, { locale: "es" }).format("DD [de] MMMM");
}
