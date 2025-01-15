export interface BaseListDataResponse<T> {
  message: string;
  status: number;
  result: {
    page: number;
    pageSize: number;
    totalPage: number;
    total: number;
    data: T[];
  };
}

export interface BaseDataResponse<T> {
  message: string;
  status: number;
  result: T;
}
