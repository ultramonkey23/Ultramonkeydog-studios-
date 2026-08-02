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
    if (
      prefersReducedMotion() &&
      options !== null &&
      typeof options === "object"
    ) {
      return originalScrollIntoView.call(this, { ...options, behavior: "auto" });
    }
    return originalScrollIntoView.call(this, options);
  };

  const originalScrollTo = window.scrollTo.bind(window);
  window.scrollTo = ((
    leftOrOptions: number | ScrollToOptions,
    top?: number,
  ) => {
    if (leftOrOptions !== null && typeof leftOrOptions === "object") {
      return originalScrollTo({
        ...leftOrOptions,
        behavior: prefersReducedMotion() ? "auto" : leftOrOptions.behavior,
      });
    }
    return originalScrollTo(leftOrOptions, top ?? 0);
  }) as typeof window.scrollTo;
}
