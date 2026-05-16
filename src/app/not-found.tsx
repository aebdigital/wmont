import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wm-container grid min-h-[62vh] place-items-center py-20 text-center">
      <div>
        <p className="text-sm font-extrabold uppercase tracking-normal text-redline">404</p>
        <h1 className="mt-4 text-5xl font-extrabold text-ink">Stránka sa nenašla</h1>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center rounded bg-ink px-5 text-sm font-extrabold text-white transition hover:bg-redline"
        >
          Späť na domov
        </Link>
      </div>
    </section>
  );
}
