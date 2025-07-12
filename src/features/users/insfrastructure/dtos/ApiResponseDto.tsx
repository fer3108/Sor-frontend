export interface ApiResponseDto<T> {
  status?: string;
  message?: string;
  data: T;
}
