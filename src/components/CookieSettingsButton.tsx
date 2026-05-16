"use client";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="footer-link text-left font-semibold"
      onClick={() => window.dispatchEvent(new Event("wmont:open-cookie-settings"))}
    >
      Cookies
    </button>
  );
}
