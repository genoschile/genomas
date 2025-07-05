const ipRequests = new Map<string, { count: number; lastRequest: number }>();

const WINDOW_MS = 10_000; 
const MAX_REQUESTS = 10;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);

  if (!entry || now - entry.lastRequest > WINDOW_MS) {
    ipRequests.set(ip, { count: 1, lastRequest: now });
    return false;
  }

  entry.count++;
  entry.lastRequest = now;

  if (entry.count > MAX_REQUESTS) {
    return true;
  }

  return false;
}