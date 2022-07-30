export interface ApiResponse<T> {
  info: ApiResponseInfo;
  results: T;
}

export interface ApiResponseInfo {
  seed: string;
  results: number;
  page: number;
  version: string;
}
