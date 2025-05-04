import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token: string): boolean => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: any = jwtDecode(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    const expirationTime = decoded.exp * 1000;
    return Date.now() >= expirationTime;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (error: any) {
    return true;
  }
};
