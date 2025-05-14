import { getCurrentLocale } from "@/lib/utils";

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

export function utils_DateToDDMMYYYY(date: string | Date): string {
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = dateObj.getFullYear();
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


export function utils_CalculateWeeks(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Calculate the difference in milliseconds
  const diffTime = Math.abs(end.getTime() - start.getTime());
  
  // Convert to days and round up to nearest week
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const weeks = Math.ceil(diffDays / 7);
  
  return weeks;
}

export function utils_TimeRemaining(endDate: string): string {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const locale = getCurrentLocale() || "vi";

  // If the end date has passed
  if (diffTime <= 0) {
    return locale === "vi" ? "Đã kết thúc" : "Ended";
  }

  // Calculate remaining time
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return locale === "vi" 
      ? `Còn ${days} ngày ${hours} giờ`
      : `${days} days ${hours} hours remaining`;
  } else if (hours > 0) {
    return locale === "vi"
      ? `Còn ${hours} giờ ${minutes} phút`
      : `${hours} hours ${minutes} minutes remaining`;
  } else {
    return locale === "vi"
      ? `Còn ${minutes} phút`
      : `${minutes} minutes remaining`;
  }
}


export function utils_CalculateProgress(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  // Calculate total duration in milliseconds
  const totalDuration = end.getTime() - start.getTime();
  
  // Calculate elapsed time in milliseconds
  const elapsedTime = now.getTime() - start.getTime();

  // Calculate progress percentage
  let progress = (elapsedTime / totalDuration) * 100;

  // Ensure progress is between 0 and 100
  progress = Math.max(0, Math.min(100, progress));

  return Math.round(progress);
}
