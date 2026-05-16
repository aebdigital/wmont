"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export type FAQItem = {
  question: string;
  answer: string;
};

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items.length) return null;

  return (
    <section className="mt-12 border-t border-line pt-10">
      <p className="text-sm font-extrabold uppercase tracking-normal text-redline">FAQ</p>
      <div className="mt-5 divide-y divide-line rounded border border-line bg-white">
        {items.map((item, index) => {
          const open = openIndex === index;

          return (
            <div key={item.question}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-sm font-extrabold text-ink transition hover:bg-neutral-50 md:text-base"
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span>{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  size={20}
                  className={`shrink-0 text-redline transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm font-medium leading-7 text-ink/72 md:text-base md:leading-8">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
