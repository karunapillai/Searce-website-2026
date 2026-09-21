
  /* ----- §9 : the timeline simply fills ----- */
  (function () {
    var sec = document.getElementById('fde-after');
    if (!sec) return;
    var fill = sec.querySelector('.fde-rung-fill');
    var dots = sec.querySelectorAll('.fde-rung-dot');

    function render(p) {
      gsap.set(fill, { scaleX: p });
      dots.forEach(function (d, i) {
        // the last node sits at p = 1, so give the test a little slack or
        // it never fires at the end of the scrub
        var at = i / (dots.length - 1) * 0.94;
        gsap.set(d, { scale: p >= at ? 1 : 0 });
      });
    }
    if (FINAL) { render(1); return; }
    render(0);

    var st = { p: 0 };
    gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top top', end: '+=120%',
                       pin: true, anticipatePin: 1, scrub: 1 }
    }).to(st, { p: 1, ease: 'none', duration: 1,
                onUpdate: function () { render(st.p); } });
  })();
