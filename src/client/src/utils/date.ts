import { getCurrentLocale } from "@/lib/intl";

const monthNamesVi = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const monthNamesEn = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface IIntervals {
  [key: string]: number;
}

const intervalsVi: IIntervals = {
  năm: 31536000,
  tháng: 2592000,
  tuần: 604800,
  ngày: 86400,
  giờ: 3600,
  phút: 60,
  giây: 1,
};

const intervalsEn: IIntervals = {
  year: 31536000,
  month: 2592000,
  week: 604800,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
};

export function utils_DateToDDMMYYYY(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function utils_DateToDDMonth(
  date: Date
  // locale: "vi" | "en" = "vi"
): string {
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const locale = getCurrentLocale() || "vi";

  const month =
    locale === "vi"
      ? monthNamesVi[dateObj.getMonth()]
      : monthNamesEn[dateObj.getMonth()];
  return `${day} ${month}`;
}

//trả về chuỗi thời gian đã trôi qua
export const utils_TimeAgo = (date: Date): string => {
  const dateObj = new Date(date);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  const locale = getCurrentLocale() || "vi";

  const intervals = locale === "vi" ? intervalsVi : intervalsEn;

  for (const key in intervals) {
    const interval = intervals[key];
    const count = Math.floor(seconds / interval);

    if (count >= 1) {
      return locale === "en" ? `${count} ${key}${count > 1 ? "s" : ""}` : `${count} ${key}`;
    }
  }

  return "just now";
};
