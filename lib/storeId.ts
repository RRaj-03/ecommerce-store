/**
 * Returns the storeId for this deployment.
 * Extracted from NEXT_PUBLIC_API_URL which is set per-deployment.
 * e.g. http://admin.example.com/api/store-abc123  →  "store-abc123"
 *
 * This is the single source of truth for "which store is this frontend for".
 * It scopes all Customer operations so a customer registered on Store A
 * cannot log in to Store B even if they share the same backend.
 */
export function getStoreId(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const segments = apiUrl.replace(/\/$/, "").split("/");
  return segments[segments.length - 1] || "default";
}

/**
 * Returns the internal admin backend URL for customer auth API calls.
 * Uses ADMIN_API_URL (internal/server-side only, never exposed to the browser).
 * Falls back to deriving it from NEXT_PUBLIC_API_URL.
 *
 * e.g. "http://localhost:3000/api/store-abc123/customers/auth"
 */
export function getAdminAuthUrl(): string {
  const adminBase = process.env.ADMIN_API_URL;
  const storeId = getStoreId();

  if (adminBase) {
    // ADMIN_API_URL = "http://localhost:3000" (no trailing slash)
    return `${adminBase.replace(/\/$/, "")}/api/${storeId}/customers/auth`;
  }

  // Fallback: derive from NEXT_PUBLIC_API_URL
  // NEXT_PUBLIC_API_URL = "http://localhost:3000/api/store-abc123"
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
  return `${apiUrl}/customers/auth`;
}
