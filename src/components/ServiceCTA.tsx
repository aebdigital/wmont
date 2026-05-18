import { Mail, Phone } from "lucide-react";
import { brand } from "@/lib/site";

type ServiceCTAProps = {
  title?: string;
  subtitle?: string;
};

export function ServiceCTA({
  title = "Zaujali Vás naše služby?",
  subtitle = "Neváhajte nás kontaktovať – radi vám pripravíme ponuku na mieru.",
}: ServiceCTAProps) {
  return (
    <section className="wm-container mt-16 reveal">
      <div className="rounded border border-line bg-white p-8 text-center md:p-12">
        <h2 className="text-balance text-3xl font-extrabold leading-tight text-ink md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-base font-medium leading-7 text-ink/72">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`tel:${brand.phone.replace(/[^\d+]/g, "")}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded bg-redline px-6 text-sm font-extrabold text-white transition hover:bg-ink"
          >
            <Phone aria-hidden="true" size={18} />
            {brand.phone}
          </a>
          <a
            href={`mailto:${brand.email}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded border border-ink px-6 text-sm font-extrabold text-ink transition hover:bg-ink hover:text-white"
          >
            <Mail aria-hidden="true" size={18} />
            {brand.email}
          </a>
        </div>
      </div>
    </section>
  );
}
