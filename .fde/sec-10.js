
  /* ----- §10 : two cards enter right -> left, one after the other ----- */
  (function () {
    var sec = document.getElementById('fde-meet');
    if (!sec) return;
    var cards = sec.querySelectorAll('.fde-mcard');
    if (!cards.length) return;

    if (FINAL) { gsap.set(cards, { xPercent: 0, opacity: 1 }); return; }
    gsap.set(cards, { xPercent: 150, opacity: 0 });

    gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top top', end: '+=120%',
                       pin: true, anticipatePin: 1, scrub: 1 }
    }).to(cards, { xPercent: 0, opacity: 1, ease: 'none', duration: 1,
                   stagger: { amount: 0.55 } });
  })();
