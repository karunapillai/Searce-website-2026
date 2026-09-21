
  /* ----- §7 : timeline and circle driven from ONE scalar ----- */
  (function () {
    var sec = document.getElementById('fde-own');
    if (!sec) return;
    var top = sec.querySelector('.own-top'),
        bot = sec.querySelector('.own-bot'),
        prog = sec.querySelector('.own-progress'),
        endDot = sec.querySelector('.own-end'),
        lTop = sec.querySelector('.own-label-top'),
        lBot = sec.querySelector('.own-label-bot');

    var CX = 720, CY = 200, R = 196, X0 = 224, X1 = 1215;
    var TAU = Math.PI * 2;

    // wedge from a0 to a1, swept counter-clockwise on screen
    function wedge(a0, a1) {
      if (a1 - a0 < 1e-4) return '';
      var x0 = CX + R * Math.cos(a0), y0 = CY - R * Math.sin(a0);
      var x1 = CX + R * Math.cos(a1), y1 = CY - R * Math.sin(a1);
      var large = (a1 - a0) > Math.PI ? 1 : 0;
      return 'M' + CX + ',' + CY + ' L' + x0.toFixed(2) + ',' + y0.toFixed(2) +
             ' A' + R + ',' + R + ' 0 ' + large + ' 0 ' + x1.toFixed(2) + ',' + y1.toFixed(2) + ' Z';
    }

    function render(p) {
      // phase 1 (0 -> .5): line reaches centre as the top half closes
      // phase 2 (.5 -> 1): line finishes as the bottom half closes
      var p1 = Math.min(p, 0.5) / 0.5;
      var p2 = Math.max(p - 0.5, 0) / 0.5;
      prog.setAttribute('x2', (X0 + (CX - X0) * p1 + (X1 - CX) * p2).toFixed(1));
      top.setAttribute('d', wedge(0, Math.PI * p1));
      bot.setAttribute('d', wedge(Math.PI - 0.012, Math.PI - 0.012 + Math.PI * p2));
      gsap.set(endDot, { scale: p2 > 0.985 ? 1 : 0, transformOrigin: '1215px 200px' });
      gsap.set(lTop, { opacity: Math.max(0, (p1 - 0.55) / 0.45) });
      gsap.set(lBot, { opacity: Math.max(0, (p2 - 0.55) / 0.45) });
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
