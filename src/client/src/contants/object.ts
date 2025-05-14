import { ENUM_STATUS_TOPIC } from './enum';

// ENUM('pending', 'approved', 'rejected')

export interface IStatusObj {
  value: string;
  label: string;
  labelEn?: string;
}

export const STATUS_TOPIC: IStatusObj[] = [
  {
    value: ENUM_STATUS_TOPIC.PENDING, // Chưa hoàn thành
    label: 'Chưa duyệt',
    labelEn: 'Pending',
  },
  {
    value: ENUM_STATUS_TOPIC.APPROVED, // Đã hoàn thành
    label: 'Chấp nhận',
    labelEn: 'Approved',
  },
  {
    value: ENUM_STATUS_TOPIC.REJECTED, // Từ chối
    label: 'Từ chối',
    labelEn: 'Rejected',
  },
];

export const STATUS_TOPIC_CUSTOM: IStatusObj[] = [
  {
    value: 'custom',
    label: 'Đề xuất',
    labelEn: 'Custom',
  },
  {
    value: 'suggest',
    label: 'Gợi ý',
    labelEn: 'Suggest',
  },
];

export const STATUS_HIDDEN: IStatusObj[] = [
  {
    value: 'hidden',
    label: 'Ẩn',
    labelEn: 'Hidden',
  },
  {
    value: 'visible',
    label: 'Hiện',
    labelEn: 'Visible',
  },
];

export const STATUS_COURSE: IStatusObj[] = [
  {
    value: 'not_started',
    label: 'Chưa bắt đầu',
    labelEn: 'Not Started',
  },
  {
    value: 'started',
    label: 'Đang diễn ra',
    labelEn: 'Started',
  },
  {
    value: 'finished',
    label: 'Đã hoàn thành',
    labelEn: 'Finished',
  },
];
