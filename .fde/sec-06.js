
  /* ----- §6 : bands enter right -> left, staggered one at a time ----- */
  (function () {
    var sec = document.getElementById('fde-cap');
    if (!sec) return;
    var bands = sec.querySelectorAll('.fde-band');
    if (!bands.length) return;

    if (FINAL) { gsap.set(bands, { xPercent: 0, opacity: 1 }); return; }

    gsap.set(bands, { xPercent: 120, opacity: 0 });
    gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top top', end: '+=130%',
                       pin: true, anticipatePin: 1, scrub: 1 }
    }).to(bands, {
      xPercent: 0, opacity: 1, ease: 'none', duration: 1,
      stagger: { amount: 0.66, from: 'start' }
    });
  })();
