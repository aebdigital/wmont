"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

type CookieSettings = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

const storageKey = "wmont-cookie-settings";
const defaultSettings: CookieSettings = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false
};

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>(defaultSettings);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      setSettings({ ...defaultSettings, ...JSON.parse(saved) });
    } else {
      setVisible(true);
    }

    const openSettings = () => {
      const latest = window.localStorage.getItem(storageKey);
      if (latest) setSettings({ ...defaultSettings, ...JSON.parse(latest) });
      // Only open the settings modal — do NOT re-show the bottom banner.
      // The banner is for users who haven't decided yet; once they've saved
      // any choice, opening settings from the footer link should just edit it.
      setSettingsOpen(true);
    };

    window.addEventListener("wmont:open-cookie-settings", openSettings);
    return () => window.removeEventListener("wmont:open-cookie-settings", openSettings);
  }, []);

  function save(nextSettings: CookieSettings) {
    window.localStorage.setItem(storageKey, JSON.stringify(nextSettings));
    setSettings(nextSettings);
    setVisible(false);
    setSettingsOpen(false);
  }

  if (!visible && !settingsOpen) return null;

  return (
    <>
      {visible ? (
      <div className="fixed bottom-4 left-1/2 z-[90] w-[90vw] max-w-4xl -translate-x-1/2 rounded border border-line bg-white p-4 shadow-soft">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-extrabold text-ink">Cookies</p>
            <p className="mt-1 text-sm font-medium leading-6 text-muted">
              Používame nevyhnutné cookies a voliteľné cookies pre analytiku, marketing a
              zapamätanie nastavení.
              <button
                type="button"
                className="ml-2 font-extrabold text-redline underline-offset-4 hover:underline"
                onClick={() => setSettingsOpen(true)}
              >
                Nastavenia
              </button>
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              className="h-11 rounded border border-ink px-4 text-sm font-extrabold text-ink transition hover:bg-ink hover:text-white"
              onClick={() => save(defaultSettings)}
            >
              Iba nevyhnutné
            </button>
            <button
              type="button"
              className="h-11 rounded bg-redline px-4 text-sm font-extrabold text-white transition hover:bg-ink"
              onClick={() =>
                save({ necessary: true, analytics: true, marketing: true, preferences: true })
              }
            >
              Prijať všetko
            </button>
          </div>
        </div>
      </div>
      ) : null}

      {settingsOpen ? (
        <div className="fixed inset-0 z-[95] grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-[90vw] max-w-xl rounded bg-white p-5 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-normal text-redline">
                  Cookies
                </p>
                <h2 className="mt-2 text-3xl font-extrabold text-ink">Nastavenia</h2>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded border border-line text-ink hover:border-ink"
                aria-label="Zatvoriť nastavenia cookies"
                title="Zatvoriť"
                onClick={() => setSettingsOpen(false)}
              >
                <X aria-hidden="true" size={19} />
              </button>
            </div>

            <div className="mt-5 grid gap-3">
              <CookieToggle
                label="Analytické cookies"
                checked={settings.analytics}
                onChange={(analytics) => setSettings((current) => ({ ...current, analytics }))}
              />
              <CookieToggle
                label="Marketingové cookies"
                checked={settings.marketing}
                onChange={(marketing) => setSettings((current) => ({ ...current, marketing }))}
              />
              <CookieToggle
                label="Preferenčné cookies"
                checked={settings.preferences}
                onChange={(preferences) =>
                  setSettings((current) => ({ ...current, preferences }))
                }
              />
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="h-11 rounded border border-ink px-4 text-sm font-extrabold text-ink transition hover:bg-ink hover:text-white"
                onClick={() => save(defaultSettings)}
              >
                Uložiť iba nevyhnutné
              </button>
              <button
                type="button"
                className="h-11 rounded bg-redline px-4 text-sm font-extrabold text-white transition hover:bg-ink"
                onClick={() => save(settings)}
              >
                Uložiť nastavenia
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function CookieToggle({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded border border-line p-4">
      <span>
        <span className="block text-sm font-extrabold text-ink">{label}</span>
        <span className="mt-1 block text-xs font-medium leading-5 text-muted">
          Voliteľné cookies môžete kedykoľvek zmeniť cez odkaz v pätičke.
        </span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.currentTarget.checked)}
        className="h-5 w-5 accent-redline"
      />
    </label>
  );
}
