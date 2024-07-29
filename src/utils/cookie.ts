import Cookies from 'js-cookie';

export function isAuthenticated(): boolean {
  const token = Cookies.get('authToken');
  return !!token;
}

export function setAuthToken(token: string): void {
  Cookies.set('authToken', token, { secure: true, sameSite: 'Strict' });
}

export function clearAuthToken(): void {
  Cookies.remove('authToken');
}
