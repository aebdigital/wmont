import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { contactPhoneDisplay, contactPhoneHref, openingHours } from "@/lib/contact";
import type { PageData } from "@/lib/types";
import { brand } from "@/lib/site";

const offerItems = [
  "Fotografiu alebo náhľad požadovanej brány, oplotenia alebo výrobku.",
  "Rozmery v milimetroch: výšku, šírku, bráničky a plotové dielce.",
  "Informáciu, či chcete k bráne aj pohon alebo automatizáciu.",
  "Typ brány: samonosná posuvná, dvojkrídlová, s bráničkou alebo iné riešenie."
];

const googleMapsPlaceUrl =
  "https://www.google.com/maps/place//data=!4m2!3m1!1s0x473ff32fcdca7e11:0x1311e356f96aa103?sa=X&ved=1t:8290&ictx=111";
const googleMapsEmbedUrl = "https://maps.google.com/maps?output=embed&cid=1374129324015919363";

export function ContactPage({ page }: { page: PageData }) {
  return (
    <>
      <section className="wm-container pt-12 md:pt-16">
        <p className="text-sm font-extrabold uppercase tracking-normal text-redline">
          Kontakt a cenové ponuky
        </p>
        <h1 className="mt-4 max-w-5xl text-balance text-5xl font-extrabold leading-none text-ink md:text-7xl">
          {page.title}
        </h1>
        <p className="mt-6 max-w-3xl text-pretty text-sm font-medium leading-7 text-muted md:text-base">
          Máte otázku alebo chcete cenovú ponuku? Pošlite nám rozmery, fotografiu alebo náhľad
          realizácie a ozveme sa späť s návrhom riešenia.
        </p>
      </section>

      <section className="wm-container mt-10 grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
        <div className="grid gap-4 self-start">
          <ContactInfoCard
            icon={Phone}
            label="Telefón"
            value={contactPhoneDisplay}
            href={`tel:${contactPhoneHref}`}
          />
          <ContactInfoCard
            icon={Mail}
            label="Email"
            value={brand.email}
            href={`mailto:${brand.email}`}
          />
          <ContactInfoCard
            icon={MapPin}
            label="Adresa"
            value={brand.address}
            href={googleMapsPlaceUrl}
          />
          <ContactInfoCard icon={Clock} label="Otváracie hodiny" value={openingHours} />

          <div className="mt-2 overflow-hidden rounded border border-line bg-neutral-100">
            <iframe
              title="Mapa W - Mont s.r.o."
              src={googleMapsEmbedUrl}
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="grid gap-5">
          <div className="rounded border border-line bg-white p-5 md:p-6">
            <p className="text-xs font-extrabold uppercase tracking-normal text-redline">
              Cenová ponuka
            </p>
            <h2 className="mt-2 text-2xl font-extrabold leading-tight text-ink">
              Čo nám poslať
            </h2>
            <ul className="mt-4 grid gap-3">
              {offerItems.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-redline pl-3 text-xs font-semibold leading-6 text-muted md:text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs font-medium leading-6 text-muted">
              V prípade iných požiadaviek nám pošlite kontakt. Vyrábame projekty na mieru a
              pripravíme ponuku podľa konkrétneho zadania.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}

type ContactInfoCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
};

function ContactInfoCard({ icon: Icon, label, value, href }: ContactInfoCardProps) {
  const inner = (
    <>
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded bg-redline text-white">
        <Icon aria-hidden="true" size={19} />
      </span>
      <span>
        <span className="block text-xs font-extrabold uppercase tracking-normal text-white/52">
          {label}
        </span>
        <span className="mt-1 block text-sm font-bold leading-6 text-white">{value}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="flex items-center gap-4 rounded bg-ink p-5 text-white transition hover:bg-redline"
      >
        {inner}
      </a>
    );
  }

  return <div className="flex items-center gap-4 rounded bg-ink p-5 text-white">{inner}</div>;
}
