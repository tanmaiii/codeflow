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

export interface ResponseAPIDtoWithPagination<T> {
  data: T;
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  message: string;
}

export interface IGetAllQuery {
  page: number;
  limit: number;
  sortBy?: string;
  order?: "ASC" | "DESC";
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface IBaseEntity {
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
