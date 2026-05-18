import Image from "next/image";

type Bullet = { title: string; text: string };

const ABOUT_PARAGRAPHS: string[] = [
  "Na trhu v súčasnosti nájdeme množstvo firiem, ktoré ponúkajú služby v oblasti kovovýroby, avšak iba veľmi málo z nich dokáže poskytnúť služby tak, aby boli pre klienta efektívne, individuálne navrhnuté a ekologicky zodpovedné.",
  "Sme spoločnosť W-Mont, špecializujúca sa na kovovýrobu s dlhoročnými skúsenosťami a dôrazom na kvalitu, presnosť a spoľahlivosť. Naším cieľom je poskytovať komplexné riešenia, ktoré predčia očakávania našich zákazníkov. Všetky naše výrobky sú vyrábané priamo na Slovensku z kvalitných materiálov od overených dodávateľov.",
  "Spoločnosť W-Mont bola založená s víziou poskytovať špičkové služby v oblasti kovovýroby. Našou misiou je prinášať inovatívne a kvalitné riešenia pre našich zákazníkov, pričom vždy kladieme dôraz na individuálny prístup a spokojnosť našich klientov. Sme hrdí na náš tím odborníkov, ktorí majú bohaté skúsenosti a neustále sa vzdelávajú v najnovších trendoch a technológiách.",
  "Veríme v silu lokálneho hospodárstva a udržateľného rozvoja, preto sa snažíme využívať najlepšie dostupné miestne zdroje a ekologické postupy. Naše produkty sú nielen funkčné a esteticky príťažlivé, ale aj šetrné k životnému prostrediu.",
];

const REASONS: Bullet[] = [
  {
    title: "Kvalita a spoľahlivosť",
    text: "Naša kovovýroba je synonymom kvality a spoľahlivosti. Dbáme na každý detail, aby sme zabezpečili, že naše výrobky budú spĺňať tie najvyššie štandardy.",
  },
  {
    title: "Flexibilita a individuálny prístup",
    text: "Chápeme, že každý zákazník má svoje špecifické potreby. Preto sa snažíme prispôsobiť naše služby tak, aby sme vyhoveli vašim požiadavkám a predstavám.",
  },
  {
    title: "Lokálny výrobca",
    text: "Sme slovenská firma, ktorá podporuje miestnu ekonomiku a využíva lokálne zdroje. Výrobky vyrobené na Slovensku prinášajú našim zákazníkom kvalitu, spoľahlivosť a autenticitu.",
  },
  {
    title: "Výhodný pomer cena/kvalita",
    text: "Ponúkame vynikajúci pomer cena/kvalita. Naše výrobky sú cenovo dostupné, pričom si zachovávajú vysokú kvalitu a dlhú životnosť.",
  },
  {
    title: "Moderné technológie a postupy",
    text: "Využívame najnovšie technológie a postupy v oblasti kovovýroby, aby sme zabezpečili vysokú presnosť a kvalitu našich výrobkov. Neustále sledujeme vývoj v odvetví a investujeme do inovácií, aby sme mohli ponúkať tie najlepšie riešenia.",
  },
  {
    title: "Profesionálny prístup",
    text: "Naši pracovníci sú vyškolení odborníci s bohatými skúsenosťami v oblasti kovovýroby. Sme hrdí na náš profesionálny prístup a zodpovednosť voči našim zákazníkom.",
  },
];

const ABOUT_IMAGE_SRC =
  "/assets/uploads/2023/02/91740668_695601431200205_1220323306851270656_n.jpg";

export function AboutSection() {
  return (
    <>
      {/* O nás – text + image on the right */}
      <section className="wm-container mt-16 md:mt-20 reveal">
        <div className="mb-10 text-center md:mb-14">
          <p className="text-sm font-extrabold uppercase tracking-normal text-redline">
            O spoločnosti
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold leading-tight text-ink md:text-5xl">
            O spoločnosti W - Mont s.r.o.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-pretty text-base font-medium leading-7 text-ink/72">
            Kovovýroba – brány, ploty a garážové brány.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-12 md:items-start">
          <div data-reveal-stagger="80">
            <h3 className="text-xl font-extrabold text-ink">O nás</h3>
            <div className="mt-3 h-[3px] w-12 rounded-full bg-redline" />
            <h4 className="mt-6 text-base font-extrabold text-ink">
              Špecialisti na brány, ploty a kovovýrobu
            </h4>
            <div className="mt-4 space-y-5">
              {ABOUT_PARAGRAPHS.map((paragraph, i) => (
                <p key={i} className="text-sm font-medium leading-7 text-ink/72">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded border border-line bg-neutral-100 md:sticky md:top-28">
            <Image
              src={ABOUT_IMAGE_SRC}
              alt="W - Mont – kovovýroba"
              fill
              sizes="(min-width: 768px) 42vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Prečo si vybrať W-Mont – cards */}
      <section className="wm-container mt-20 md:mt-28 reveal">
        <div className="mb-10 text-center md:mb-14">
          <p className="text-sm font-extrabold uppercase tracking-normal text-redline">
            Prečo my
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold leading-tight text-ink md:text-5xl">
            Prečo si vybrať W-Mont
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" data-reveal-stagger="70">
          {REASONS.map((reason) => (
            <article
              key={reason.title}
              className="rounded border border-line bg-white p-5 transition hover:border-ink"
            >
              <h3 className="text-base font-extrabold leading-tight text-ink md:text-lg">
                {reason.title}
              </h3>
              <div className="mt-3 h-[3px] w-10 rounded-full bg-redline" />
              <p className="mt-4 text-sm font-medium leading-7 text-ink/72">
                {reason.text}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
