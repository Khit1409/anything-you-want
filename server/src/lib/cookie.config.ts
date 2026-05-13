import type { CookieOptions } from 'express';

/**
 * Cấu hình cookie cho authentication (dùng khi set cookie access_token).
 * - `httpOnly`: true để JS phía client không đọc được
 * - `sameSite`, `secure`, `path`, `maxAge` có thể điều chỉnh theo môi trường
 */
export const authCookieConfig: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: false,
  path: '/',
  maxAge: 1000 * 60 * 60,
};
