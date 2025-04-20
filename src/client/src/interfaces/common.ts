export interface ILinkItem {
  vi: string;
  en: string;
  icon: string;
  href: string;
}


export interface ResponseDto<T> {
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