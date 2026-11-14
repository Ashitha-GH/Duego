
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
  token?: string
) {
  const headers = new Headers(options.headers);

  if (options.body instanceof URLSearchParams) {
    headers.set(
      "Content-Type",
      "application/x-www-form-urlencoded;charset=UTF-8"
    );
  } else if (
    options.body &&
    !(options.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const detail = data?.detail;

    const errorMessage = Array.isArray(detail)
      ? detail.map((item) => item.msg || JSON.stringify(item)).join(", ")
      : typeof detail === "string"
        ? detail
        : "Request failed: " + response.status;

    throw new Error(errorMessage);
  }

  return data;
}
