"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Watches every element with the `.reveal` class and adds `.is-visible`
// as it crosses into the viewport. Re-runs whenever the route changes so
// next/link client-side navigations also reveal the new page's elements
// (without this, the observer would keep observing the old, now-removed
// DOM and the new page would stay hidden until a hard reload).
// Children of a [data-reveal-stagger] parent get a staggered delay so
// cards in a grid cascade in.
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Run after the new route has committed to the DOM. Without this the
    // observer attaches to the previous page's nodes which React then unmounts.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px 80px 0px" },
    );

    const setupElements = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((parent) => {
        const step = Number(parent.dataset.revealStagger) || 70;
        Array.from(parent.children).forEach((child, i) => {
          if (child instanceof HTMLElement) {
            // Only stagger the first 8 elements (typical initial fold) to preserve
            // the cascade effect, and let subsequent scrolled items reveal instantly.
            const delay = i < 12 ? i * step : 0;
            child.style.setProperty("--reveal-delay", `${delay}ms`);
            if (!child.classList.contains("is-visible")) {
              observer.observe(child);
            }
          }
        });
      });

      document
        .querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
        .forEach((el) => observer.observe(el));
    };

    // Run after the page is committed to DOM
    const raf = window.requestAnimationFrame(() => {
      setupElements();
    });

    // Watch for DOM changes (like dynamic list filtering)
    const mutationObserver = new MutationObserver(() => {
      setupElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
