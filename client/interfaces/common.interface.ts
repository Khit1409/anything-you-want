export type Role = "user" | "seller";
export interface ApiResponse {
  message: string;
  success: boolean;
  timestamp: Date | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}
