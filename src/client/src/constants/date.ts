export const MONTH_NAMES_VI = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];

export const MONTH_NAMES_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export interface ITimeIntervals {
  [key: string]: number;
}

export const TIME_INTERVALS_VI: ITimeIntervals = {
  năm: 31536000,
  tháng: 2592000,
  tuần: 604800,
  ngày: 86400,
  giờ: 3600,
  phút: 60,
  giây: 1,
};

export const TIME_INTERVALS_EN: ITimeIntervals = {
  year: 31536000,
  month: 2592000,
  week: 604800,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
}; 