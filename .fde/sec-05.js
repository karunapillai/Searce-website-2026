
  /* ----- §5 : panels travel right -> left ----- */
  (function () {
    var sec = document.getElementById('fde-comp');
    if (!sec) return;
    var panels = Array.prototype.slice.call(sec.querySelectorAll('.fde-panel'));
    if (panels.length < 2) return;

    // No blur — the inactive panel simply steps aside and dims.
    function place(a) {
      panels.forEach(function (p, i) {
        var d = i - a, ad = Math.min(1, Math.abs(d));
        gsap.set(p, {
          xPercent: d * 118,
          opacity: 1 - 0.78 * ad,
          zIndex: ad < 0.5 ? 2 : 1
        });
      });
    }
    place(0);
    if (FINAL) return;

    var st = { a: 0 };
    var upd = function () { place(st.a); };
    var tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top top', end: '+=185%',
                       pin: true, anticipatePin: 1, scrub: 1 }
    });
    for (var i = 1; i < panels.length; i++) {
      tl.to({}, { duration: 0.45 });
      tl.to(st, { a: i, duration: 0.55, ease: 'power2.inOut', onUpdate: upd });
    }
    tl.to({}, { duration: 0.45 });
  })();
