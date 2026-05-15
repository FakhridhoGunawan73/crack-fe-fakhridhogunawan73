export const ACCESS_TOKEN_KEY = "kostify_access_token";

const MAX_AGE_SEC = 60 * 60 * 24;

export function syncAccessTokenCookie(token: string | null): void {
  if (typeof window === "undefined") return;

  if (token) {
    document.cookie = `${ACCESS_TOKEN_KEY}=${encodeURIComponent(token)}; Path=/; Max-Age=${MAX_AGE_SEC}; SameSite=Lax`;
  } else {
    document.cookie = `${ACCESS_TOKEN_KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
  }
}

export function clearAccessTokenCookie(): void {
  syncAccessTokenCookie(null);
}