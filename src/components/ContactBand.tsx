import { Clock, MapPin, Phone } from "lucide-react";
import { contactPhoneDisplay, contactPhoneHref, openingHours } from "@/lib/contact";
import { brand } from "@/lib/site";

export function ContactBand() {
  const items = [
    {
      label: "Telefón",
      value: contactPhoneDisplay,
      href: `tel:${contactPhoneHref}`,
      icon: Phone
    },
    {
      label: "Adresa",
      value: brand.address,
      href: null,
      icon: MapPin
    },
    {
      label: "Otváracie hodiny",
      value: openingHours,
      href: null,
      icon: Clock
    }
  ];

  return (
    <section className="wm-container mt-16">
      <div className="grid gap-4 rounded bg-ink p-5 text-white md:grid-cols-3 md:p-6">
        {items.map((item) => {
          const Icon = item.icon;
          const inner = (
            <>
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded bg-redline text-white">
                <Icon aria-hidden="true" size={19} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-extrabold uppercase tracking-normal text-white/52">
                  {item.label}
                </span>
                <span className="mt-1 block text-sm font-bold leading-6 text-white">{item.value}</span>
              </span>
            </>
          );

          return item.href ? (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-4 rounded border border-white/10 p-4 transition hover:border-redline"
            >
              {inner}
            </a>
          ) : (
            <div key={item.label} className="flex items-center gap-4 rounded border border-white/10 p-4">
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
