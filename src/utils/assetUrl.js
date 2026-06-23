/**
 * Resolves a public asset path correctly for both local dev and GitHub Pages.
 * Uses Vite's import.meta.env.BASE_URL which is automatically set to the
 * correct subpath (e.g. "/wejha-website-main/") during production builds.
 *
 * Usage:  assetUrl('/assets/images/logo.png')
 *         → "/wejha-website-main/assets/images/logo.png"  (production)
 *         → "/assets/images/logo.png"                     (local dev)
 */
export function assetUrl(path) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // strip trailing slash
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}
