const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface FetchOptions extends RequestInit {
  retryOnAuth?: boolean;
}

export async function authFetch<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { retryOnAuth = true, headers = {}, ...rest } = options;
  const url = `${API_BASE_URL}${endpoint}`;

  const requestHeaders = new Headers(headers);
  requestHeaders.set("X-Requested-With", "ecogest-admin");

  if (rest.body && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const res = await fetch(url, {
    ...rest,
    headers: requestHeaders,
    credentials: "include", // send/receive httpOnly cookies
  });

  if (res.status === 401 && retryOnAuth && !endpoint.includes("/api/auth/login") && !endpoint.includes("/api/auth/2fa/verify") && !endpoint.includes("/api/auth/refresh")) {
    // Attempt silent refresh
    try {
      const refreshRes = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: "POST",
        headers: {
          "X-Requested-With": "ecogest-admin",
        },
        credentials: "include",
      });

      if (refreshRes.ok) {
        // Retry original request once
        return authFetch<T>(endpoint, { ...options, retryOnAuth: false });
      }
    } catch {
      // Ignore refresh error and bubble 401
    }
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error: any = new Error(data.message || `Request failed with status ${res.status}`);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const authApi = {
  async login(payload: { email: string; password: string }) {
    return authFetch<{
      success: boolean;
      requires2FA?: boolean;
      preAuthToken?: string;
      admin?: { id: string; email: string; twoFactorEnabled: boolean };
    }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async verify2FA(payload: { preAuthToken: string; code: string }) {
    return authFetch<{
      success: boolean;
      usedRecoveryCode?: boolean;
      admin: { id: string; email: string; twoFactorEnabled: boolean };
    }>("/api/auth/2fa/verify", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async generate2FA() {
    return authFetch<{
      success: boolean;
      secret: string;
      qrCodeUrl: string;
      otpauthUrl: string;
    }>("/api/auth/2fa/generate", {
      method: "POST",
    });
  },

  async enable2FA(payload: { secret: string; code: string }) {
    return authFetch<{
      success: boolean;
      message: string;
      recoveryCodes: string[];
    }>("/api/auth/2fa/enable", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async getMe() {
    return authFetch<{
      success: boolean;
      admin: {
        id: string;
        email: string;
        twoFactorEnabled: boolean;
        createdAt: string;
      };
    }>("/api/auth/me", {
      method: "GET",
    });
  },

  async logout() {
    return authFetch<{ success: boolean; message: string }>("/api/auth/logout", {
      method: "POST",
    });
  },

  async getSubmissions(params: { page?: number; limit?: number; type?: string } = {}) {
    const query = new URLSearchParams();
    if (params.page) query.set("page", params.page.toString());
    if (params.limit) query.set("limit", params.limit.toString());
    if (params.type) query.set("type", params.type);

    return authFetch<{
      success: boolean;
      submissions: Array<{
        id: string;
        type: "contact" | "quote";
        submittedAt: string;
        data: Record<string, any>;
        ip?: string;
        userAgent?: string;
      }>;
      pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    }>(`/api/admin/submissions?${query.toString()}`, {
      method: "GET",
    });
  },

  async deleteSubmission(id: string) {
    return authFetch<{ success: boolean; message: string }>(
      `/api/admin/submissions/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
      }
    );
  },

  async getAuditLogs(params: { page?: number; limit?: number; event?: string } = {}) {
    const query = new URLSearchParams();
    if (params.page) query.set("page", params.page.toString());
    if (params.limit) query.set("limit", params.limit.toString());
    if (params.event) query.set("event", params.event);

    return authFetch<{
      success: boolean;
      logs: Array<{
        id: string;
        timestamp: string;
        event: string;
        result: "success" | "failure";
        adminEmail?: string;
        ip?: string;
        userAgent?: string;
        details?: Record<string, any>;
      }>;
      pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    }>(`/api/admin/audit?${query.toString()}`, {
      method: "GET",
    });
  },
};
