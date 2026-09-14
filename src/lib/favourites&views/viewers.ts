export const getVisitorId = (): string => {
  const COOKIE_NAME = "cocktail_visitor_id";

  const existingCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));

  if (existingCookie) {
    return decodeURIComponent(existingCookie.split("=")[1]);
  }

  const visitorId = crypto.randomUUID();

  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    visitorId,
  )}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

  return visitorId;
};
