import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochrana osobných údajov | W-Mont",
  description: "Zásady ochrany osobných údajov pre našu webovú stránku.",
  alternates: { canonical: "/ochrana-osobnych-udajov" },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="wm-container py-24 min-h-[60vh]">
      <div className="max-w-3xl mx-auto space-y-8 text-foreground/80">
        <h1 className="text-4xl font-extrabold text-foreground mb-12">Ochrana osobných údajov</h1>
        
        <div className="space-y-4">
          <p><strong>W-Mont obchod s.r.o.</strong></p>
          <p>Sídlo: Močiar 621/38, 980 01 Rimavské Janovce</p>
          <p>IČO: 52 194 884</p>
          <p>DIČ: 2120933034</p>
          <p>IČ DPH: SK2120933034, podľa §4, registrácia od 15. 3. 2019</p>
          <p>Konateľ: Zdenko Ľaudár</p>
          <p>E-mail: wmont621@gmail.com</p>
          <p>Tel.: +421 918 150 409</p>
        </div>

        <p>
          Tieto Zásady ochrany osobných údajov (ďalej len „Zásady“) popisujú, aké osobné údaje spracúvame v súvislosti s používaním našej webovej stránky a kontaktných formulárov.
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground mt-8">I. Kontaktný formulár</h2>
          <p>Na našej webovej stránke prevádzkujeme kontaktný formulár, ktorého účelom je umožniť vám:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Položiť otázku k našim produktom a službám</li>
            <li>Požiadať o cenovú ponuku</li>
          </ul>

          <h3 className="text-xl font-bold text-foreground mt-6">Rozsah spracúvaných údajov:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Meno a priezvisko</li>
            <li>E-mailová adresa</li>
            <li>Telefónne číslo</li>
          </ul>

          <h3 className="text-xl font-bold text-foreground mt-6">Účel spracovania:</h3>
          <p>Spracúvame uvedené údaje, aby sme vás mohli kontaktovať a reagovať na váš dopyt.</p>

          <h3 className="text-xl font-bold text-foreground mt-6">Právny základ:</h3>
          <p>Článok 6 ods. 1 písm. b) GDPR – plnenie opatrení pred uzavretím zmluvy na žiadosť dotknutej osoby.</p>

          <h3 className="text-xl font-bold text-foreground mt-6">Doba uchovávania:</h3>
          <p>Osobné údaje budeme uchovávať maximálne 10 rokov od odozvy na váš dopyt, pokiaľ nevznikne ďalší zmluvný vzťah.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground mt-8">II. Súbory cookies</h2>
          <p>Na našej webovej stránke používame cookies výlučne na nasledujúce účely:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Nevyhnutné cookies</strong> – zabezpečujú základnú funkčnosť stránky (napr. ukladanie relácie, nastavení prehliadača).</li>
            <li><strong>Štatistické (analytické) cookies</strong> – pomáhajú nám pochopiť, ako návštevníci stránku používajú (nasadzujeme ich len so súhlasom používateľa).</li>
          </ul>

          <h3 className="text-xl font-bold text-foreground mt-6">Správa súhlasov:</h3>
          <p>Používateľ môže kedykoľvek odvolať súhlas s využívaním štatistických cookies prostredníctvom nastavení cookie lišty alebo priamo v prehliadači.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground mt-8">III. Práva dotknutej osoby</h2>
          <p>Podľa nariadenia GDPR máte nasledujúce práva:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Prístup k osobným údajom, ktoré spracúvame</li>
            <li>Oprava nepresných alebo neúplných údajov</li>
            <li>Vymazanie („právo zabudnutia“), ak na spracovanie už nie je právny základ</li>
            <li>Obmedzenie spracovania</li>
            <li>Prenosnosť údajov</li>
            <li>Odvolanie súhlasu – stane sa účinným dňom odvolania</li>
            <li>Podanie sťažnosti u Úradu na ochranu osobných údajov SR (Hraničná 12, 820 07 Bratislava, www.dataprotection.gov.sk)</li>
          </ul>

          <p className="mt-6">
            V prípade otázok alebo uplatnenia Vašich práv nás môžete kontaktovať na <strong>wmont621@gmail.com</strong> alebo telefónnom čísle <strong>+421 918 150 409</strong>.
          </p>

          <p className="mt-8 font-semibold">Tieto Zásady nadobúdajú účinnosť dňom 25. 4. 2025.</p>
        </section>
      </div>
    </div>
  );
}
