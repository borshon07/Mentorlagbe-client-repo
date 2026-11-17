const API_URL = process.env.NEXT_PUBLIC_API_URL;

let cachedToken: string | null = null;
let tokenExpiry = 0;

async function getToken(): Promise<string | null> {
  // Token ekhono valid thakle cache theke dao
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const res = await fetch(`${API_URL}/api/token`, {
    credentials: "include",
  });
  if (!res.ok) {
    cachedToken = null;
    return null;
  }
  const data = await res.json();
  cachedToken = data.token;
  // 1 din er token, kintu 50 minute pore refresh kore nebo
  tokenExpiry = Date.now() + 50 * 60 * 1000;
  return cachedToken;
}

export function clearToken() {
  cachedToken = null;
  tokenExpiry = 0;
}

// Public API (token lage na): tuition list, details
export async function publicFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}

// Protected API (token lage)
export async function authFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getToken();
  if (!token) throw new Error("Please sign in to continue");

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}