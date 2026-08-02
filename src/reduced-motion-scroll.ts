function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

let installed = false;

export function installReducedMotionScrollGuard() {
  if (installed || typeof window === "undefined" || typeof Element === "undefined") {
    return;
  }
  installed = true;

  const originalScrollIntoView = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = function guardedScrollIntoView(
    options?: boolean | ScrollIntoViewOptions,
  ) {
    if (prefersReducedMotion() && typeof options === "object") {
      return originalScrollIntoView.call(this, { ...options, behavior: "auto" });
    }
    return originalScrollIntoView.call(this, options);
  };

  const originalScrollTo = window.scrollTo.bind(window);
  window.scrollTo = ((...args: Parameters<typeof window.scrollTo>) => {
    if (
      prefersReducedMotion() &&
      args.length === 1 &&
      typeof args[0] === "object"
    ) {
      return originalScrollTo({ ...args[0], behavior: "auto" });
    }
    return originalScrollTo(...args);
  }) as typeof window.scrollTo;
}
