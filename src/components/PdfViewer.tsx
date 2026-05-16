type PdfViewerProps = {
  src: string;
  title: string;
};

export function PdfViewer({ src, title }: PdfViewerProps) {
  return (
    <section className="mb-10 border-t border-line pt-10">
      <p className="text-sm font-extrabold uppercase tracking-normal text-redline">Katalóg</p>
      <h2 className="mt-2 text-3xl font-extrabold text-ink md:text-4xl">{title}</h2>
      <div className="mt-6 overflow-hidden rounded border border-line bg-neutral-100">
        <iframe
          src={`${src}#toolbar=1&navpanes=0&scrollbar=1`}
          title={title}
          className="h-[72vh] min-h-[520px] w-full bg-white"
        />
      </div>
    </section>
  );
}
