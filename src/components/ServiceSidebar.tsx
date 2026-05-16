import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { services } from "@/lib/site";

type ServiceSidebarProps = {
  currentSlug: string;
};

export function ServiceSidebar({ currentSlug }: ServiceSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-32 lg:self-start">
      <div className="rounded border border-line bg-white p-4">
        <p className="px-2 text-xs font-extrabold uppercase tracking-normal text-redline">
          Služby
        </p>
        <nav className="mt-4 grid gap-2" aria-label="Navigácia služieb">
          {services.map((service) => {
            const active = service.slug === currentSlug;

            return (
              <Link
                key={service.slug}
                href={service.path}
                className={`group flex items-center justify-between gap-3 rounded px-3 py-3 text-sm font-bold leading-5 transition ${
                  active
                    ? "bg-ink text-white"
                    : "border border-line text-ink hover:border-ink hover:bg-neutral-50"
                }`}
              >
                <span>{service.title}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  size={16}
                  className={active ? "text-redline" : "text-muted group-hover:text-redline"}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
