// ─── Centralized API Client ──────────────────────────────────────────────────
// All backend API calls should go through this module.
//
// In development:  VITE_API_URL=http://localhost:8000
// In production:   VITE_API_URL=https://your-backend.railway.app
//
// Usage:
//   import { apiFetch } from '@/lib/api'
//   const businesses = await apiFetch('/api/businesses')
// ─────────────────────────────────────────────────────────────────────────────

const API_BASE = import.meta.env.VITE_API_URL || ''

/**
 * Fetch wrapper for backend API calls.
 *
 * @param {string}        path     — API path starting with / (e.g. '/api/businesses')
 * @param {RequestInit}   options  — Standard fetch options (method, body, headers, etc.)
 * @returns {Promise<any>}         — Parsed JSON response
 * @throws {Error}                 — On non-2xx response
 */
export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  // Future: inject JWT token from auth context
  // const token = getAuthToken()
  // if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(url, { ...options, headers })

  if (!res.ok) {
    const errorBody = await res.text().catch(() => '')
    throw new Error(
      `API ${options.method || 'GET'} ${path} failed (${res.status}): ${errorBody}`
    )
  }

  // Handle 204 No Content
  if (res.status === 204) return null

  return res.json()
}

/**
 * Convenience methods
 */
export const api = {
  get: (path) => apiFetch(path),

  post: (path, data) =>
    apiFetch(path, { method: 'POST', body: JSON.stringify(data) }),

  put: (path, data) =>
    apiFetch(path, { method: 'PUT', body: JSON.stringify(data) }),

  patch: (path, data) =>
    apiFetch(path, { method: 'PATCH', body: JSON.stringify(data) }),

  delete: (path) => apiFetch(path, { method: 'DELETE' }),
}
