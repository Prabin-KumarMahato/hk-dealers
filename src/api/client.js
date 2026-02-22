const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getUserId() {
  const storageKey = "hk_dealers_user_id";
  const existing = window.localStorage.getItem(storageKey);

  if (existing) {
    return existing;
  }

  const created = window.crypto?.randomUUID
    ? window.crypto.randomUUID()
    : `guest-${Date.now()}`;

  window.localStorage.setItem(storageKey, created);
  return created;
}

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    "x-user-id": getUserId(),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = payload?.message || payload || "Request failed";
    throw new Error(message);
  }

  return payload;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) =>
    request(path, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined
    }),
  patch: (path, body) =>
    request(path, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined
    }),
  delete: (path) =>
    request(path, {
      method: "DELETE"
    })
};
