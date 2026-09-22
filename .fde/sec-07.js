
  /* ----- §7 : timeline and circle driven from ONE scalar ----- */
  (function () {
    var sec = document.getElementById('fde-own');
    if (!sec) return;
    var top  = sec.querySelector('.own-top'),
        bot  = sec.querySelector('.own-bot'),
        fill = sec.querySelector('.own-rail-fill'),
        endCap = sec.querySelector('.own-cap-end'),
        lTop = sec.querySelector('.own-label-top'),
        lBot = sec.querySelector('.own-label-bot');

    // square viewBox: the circle is round whatever the container does
    var CX = 50, CY = 50, R = 50;

    function wedge(a0, a1) {
      if (a1 - a0 < 1e-4) return '';
      var x0 = CX + R * Math.cos(a0), y0 = CY - R * Math.sin(a0);
      var x1 = CX + R * Math.cos(a1), y1 = CY - R * Math.sin(a1);
      var large = (a1 - a0) > Math.PI ? 1 : 0;
      return 'M' + CX + ',' + CY + ' L' + x0.toFixed(3) + ',' + y0.toFixed(3) +
             ' A' + R + ',' + R + ' 0 ' + large + ' 0 ' + x1.toFixed(3) + ',' + y1.toFixed(3) + ' Z';
    }

    function render(p) {
      // phase 1 (0 -> .5): rail reaches the centre as the top half closes
      // phase 2 (.5 -> 1): rail finishes as the bottom half closes
      var p1 = Math.min(p, 0.5) / 0.5;
      var p2 = Math.max(p - 0.5, 0) / 0.5;
      fill.style.width = 'calc((100% - 28px) * ' + (0.5 * p1 + 0.5 * p2).toFixed(4) + ')';
      // Each half finishes its sweep a little before its phase ends. Scrub
      // lag means a reader who stops scrolling lands fractionally short of
      // 1.0, and without this slack that leaves a visible wedge gap.
      var s1 = Math.min(1, p1 / 0.92), s2 = Math.min(1, p2 / 0.90);
      top.setAttribute('d', wedge(0, Math.PI * s1));
      // a hair past a full turn so the two halves close with no seam
      bot.setAttribute('d', wedge(Math.PI - 0.02, Math.PI - 0.02 + (Math.PI + 0.05) * s2));
      gsap.set(endCap, { scale: s2 > 0.995 ? 1 : 0 });
      gsap.set(lTop, { opacity: Math.max(0, (s1 - 0.5) / 0.4) });
      gsap.set(lBot, { opacity: Math.max(0, (s2 - 0.5) / 0.4) });
    }

    if (FINAL) { render(1); return; }
    render(0);

    var st = { p: 0 };
    gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top top', end: '+=190%',
                       pin: true, anticipatePin: 1, scrub: 1 }
    }).to(st, { p: 1, ease: 'none', duration: 1,
                onUpdate: function () { render(st.p); } });
  })();
