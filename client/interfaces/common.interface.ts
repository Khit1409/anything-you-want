export type Role = "user" | "seller";
export interface ApiResponse {
  message: string;
  success: boolean;
  timestamp: Date | string;
  data?: unknown;
}
