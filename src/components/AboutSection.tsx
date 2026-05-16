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
];

const SERVICE_BULLETS: Bullet[] = [
  {
    title: "Kovovýroba na mieru",
    text: "Ponúkame špecifické riešenia v oblasti kovovýroby, ktoré sú prispôsobené vašim potrebám. Naši odborníci konzultujú každý detail, aby sme zabezpečili produkt presne podľa vašich predstáv.",
  },
  {
    title: "Brány",
    text: "Vyrábame široký sortiment brán, vrátane posuvných, krídlových a sekcionálnych brán. Každá brána je vyrobená z vysokokvalitných materiálov, ktoré zaručujú dlhú životnosť a spoľahlivosť.",
  },
  {
    title: "Ploty",
    text: "Naše ploty sú navrhnuté tak, aby poskytovali nielen bezpečnosť, ale aj estetickú hodnotu. Ponúkame rôzne typy plotov, ktoré sú vyrobené z najlepších dostupných materiálov.",
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

function BulletList({ items }: { items: Bullet[] }) {
  return (
    <ul className="mt-6 space-y-5">
      {items.map((item) => (
        <li key={item.title} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-[10px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-ink"
          />
          <p className="text-sm font-medium leading-7 text-ink/72">
            <strong className="font-extrabold text-ink">{item.title}</strong>
            {": "}
            {item.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function AboutSection() {
  return (
    <section className="wm-container mt-16 md:mt-20">
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

      <div className="grid gap-10 md:grid-cols-3 md:gap-12">
        <div>
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

        <div>
          <h3 className="text-xl font-extrabold text-ink">Prečo si vybrať W-Mont:</h3>
          <div className="mt-3 h-[3px] w-12 rounded-full bg-redline" />
          <BulletList items={REASONS} />
        </div>

        <div>
          <h3 className="text-xl font-extrabold text-ink">Naše služby</h3>
          <div className="mt-3 h-[3px] w-12 rounded-full bg-redline" />
          <BulletList items={SERVICE_BULLETS} />
        </div>
      </div>
    </section>
  );
}
