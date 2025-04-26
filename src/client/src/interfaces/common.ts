export interface ILinkItem {
  vi: string;
  en: string;
  icon: string;
  href: string;
}

export interface ResponseAPIDto<T> {
  data: T;
  message: string;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface IBaseEntity {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
