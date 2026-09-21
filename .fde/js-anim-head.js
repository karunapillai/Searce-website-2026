/* ---------------------------------------------------------------
   FDE scroll animation. Every section below is ONE scrubbed
   ScrollTrigger timeline, never a pair of forward/reverse tweens —
   scrub is what makes scroll-up reverse exactly, at every scroll
   position rather than only at the ends.
   --------------------------------------------------------------- */
(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrow = !window.matchMedia('(min-width: 1025px)').matches;
  // FINAL = paint the end state, no pinning and no scrubbing. The pinned
  // choreography needs a wide viewport to read; below 1025 the sections
  // stack and show their resolved state instead.
  var FINAL = reduce || narrow;
