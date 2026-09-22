
  /* ----- §9 : the timeline simply fills ----- */
  (function () {
    var sec = document.getElementById('fde-after');
    if (!sec) return;
    var fill = sec.querySelector('.fde-rung-fill');
    var dots = sec.querySelectorAll('.fde-rung-dot');

    // The rail is measured off the dots rather than guessed from padding,
    // so it starts and ends exactly on the first and last dot centres.
    function layout() {
      if (!dots.length) return;
      var host = sec.querySelector('.fde-rungs').getBoundingClientRect();
      var a = dots[0].getBoundingClientRect();
      var b = dots[dots.length - 1].getBoundingClientRect();
      var x0 = a.left + a.width / 2 - host.left;
      var x1 = b.left + b.width / 2 - host.left;
      var top = a.top + a.height / 2 - host.top - 1;
      [fill, sec.querySelector('.fde-rung-line')].forEach(function (el) {
        el.style.left = x0.toFixed(1) + 'px';
        el.style.width = (x1 - x0).toFixed(1) + 'px';
        el.style.top = top.toFixed(1) + 'px';
      });
    }

    function render(p) {
      gsap.set(fill, { scaleX: p });
      dots.forEach(function (d, i) {
        // the last node sits at p = 1, so give the test a little slack or
        // it never fires at the end of the scrub
        var at = i / (dots.length - 1) * 0.94;
        gsap.set(d, { scale: p >= at ? 1 : 0 });
      });
    }
    layout();
    window.addEventListener('load', layout);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
    window.addEventListener('resize', function () { setTimeout(layout, 120); });

    if (FINAL) { render(1); return; }
    render(0);

    var st = { p: 0 };
    gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top top', end: '+=120%',
                       pin: true, anticipatePin: 1, scrub: 1 }
    }).to(st, { p: 1, ease: 'none', duration: 1,
                onUpdate: function () { render(st.p); } });
  })();
