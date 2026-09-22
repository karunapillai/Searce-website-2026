
  /* ----- §11 : the Launch field CONTRACTS into the Stabilization square ----- */
  (function () {
    var sec = document.getElementById('fde-flex');
    var cv  = document.getElementById('fde-flexdots');
    if (!sec || !cv) return;
    var ctx = cv.getContext('2d');
    var launch = sec.querySelector('.ph-launch');
    var stable = sec.querySelector('.ph-stable');

    var PITCH = 13, R = 2.35, GAP_H = 80;    // label knockout band
    var dots = [], W = 0, H = 0, dpr = 1;

    function build() {
      dots = [];
      var cols = Math.floor(W / PITCH), rows = Math.floor(H / PITCH);
      var ox = (W - (cols - 1) * PITCH) / 2, oy = (H - (rows - 1) * PITCH) / 2;
      // the square the field settles into, same pitch, centred
      // the square the field settles into: equal columns and rows, centred
      var side = Math.max(8, Math.min(cols, rows) - 9);   // a tighter square
      var c0 = Math.floor((cols - side) / 2), r0 = Math.floor((rows - side) / 2);
      var cx = W / 2, cy = H / 2;

      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          var x = ox + c * PITCH, y = oy + r * PITCH;
          if (Math.abs(y - cy) < GAP_H / 2) continue;       // label band
          var inSq = c >= c0 && c < c0 + side && r >= r0 && r < r0 + side;
          var tx = x, ty = y;
          if (!inSq) {                                      // clamp onto the square
            tx = Math.min(Math.max(x, ox + c0 * PITCH), ox + (c0 + side - 1) * PITCH);
            ty = Math.min(Math.max(y, oy + r0 * PITCH), oy + (r0 + side - 1) * PITCH);
          }
          var dn = Math.min(1, Math.hypot(x - cx, y - cy) / Math.hypot(cx, cy));
          dots.push({ x: x, y: y, tx: tx, ty: ty, keep: inSq, dn: dn });
        }
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      var b = cv.getBoundingClientRect();
      W = Math.max(1, b.width); H = Math.max(1, b.height);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function ease(t) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2; }

    function render(p) {
      // the field can be resized by pinning without a window resize event;
      // if the box no longer matches the buffer, re-measure before drawing
      var b = cv.getBoundingClientRect();
      if (Math.abs(b.width - W) > 1 || Math.abs(b.height - H) > 1) resize();
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#0064ff';
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        // outer dots start moving first, so the field reads as collapsing
        var local = (p - (1 - d.dn) * 0.34) / 0.66;
        local = ease(Math.max(0, Math.min(1, local)));
        var x = d.x + (d.tx - d.x) * local;
        var y = d.y + (d.ty - d.y) * local;
        var r = d.keep ? R : R * (1 - local);
        if (r < 0.15) continue;
        ctx.globalAlpha = d.keep ? 1 : Math.max(0, 1 - local * 0.9);
        ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
      }
      ctx.globalAlpha = 1;
      gsap.set(launch, { opacity: 1 - Math.min(1, p / 0.45) });
      gsap.set(stable, { opacity: Math.max(0, (p - 0.55) / 0.45) });
    }

    var lastP = 0;
    function remeasure() { resize(); render(lastP); }

    resize();
    // the first measure can land before fonts and layout settle, which
    // would freeze the field at a fraction of its real height
    window.addEventListener('load', remeasure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);
    setTimeout(remeasure, 350);

    if (FINAL) { lastP = 1; render(1); }
    else {
      render(0);
      var st = { p: 0 };
      gsap.timeline({
        scrollTrigger: { trigger: sec, start: 'top top', end: '+=170%',
                         pin: true, anticipatePin: 1, scrub: 1 }
      }).to(st, { p: 1, ease: 'none', duration: 1,
                  onUpdate: function () { lastP = st.p; render(st.p); } });
    }
    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(remeasure, 150);   // ScrollTrigger refreshes itself on resize
    });
  })();
