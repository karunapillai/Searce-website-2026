
  /* ----- §4 : progressive disclosure, card-by-card ----- */
  (function () {
    var sec = document.getElementById('fde-squad');
    if (!sec) return;
    var cards = Array.prototype.slice.call(sec.querySelectorAll('.fde-card'));
    if (!cards.length) return;

    var PITCH = 264;
    var N = cards.length;                  // four: understanding, engineering,
                                           // client success, outcome

    // No blur. Off-cards are held well back so the focused one carries the
    // frame; position and opacity are the only channels.
    function place(a) {
      cards.forEach(function (c, i) {
        var d = i - a, ad = Math.abs(d);
        gsap.set(c, {
          y: d * PITCH,
          opacity: Math.max(0.09, 1 - 0.78 * ad),
          scale: Math.max(0.9, 1 - 0.05 * ad),
          zIndex: Math.round(10 - ad)
        });
        c.classList.toggle('is-active', ad < 0.5);
      });
    }

    place(0);
    if (FINAL) return;

    var state = { a: 0 };
    var upd = function () { place(state.a); };
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: sec, start: 'top top', end: '+=' + (N * 88) + '%',
        pin: true, anticipatePin: 1, scrub: 1.15
      }
    });
    // a short beat to read, then a long gentle glide — the previous
    // split (long dwell, quick move) read as stop-start rather than smooth
    for (var i = 1; i < N; i++) {
      tl.to({}, { duration: 0.22 });
      tl.to(state, { a: i, duration: 0.78, ease: 'power1.inOut', onUpdate: upd });
    }
    tl.to({}, { duration: 0.28 });
  })();
