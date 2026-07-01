import type { CookieOptions } from 'express';

export const authCookieConfig: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: false,
  path: '/',
  maxAge: 1000 * 60 * 60,
};
