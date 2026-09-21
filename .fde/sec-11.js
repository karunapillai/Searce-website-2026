
  /* ----- §11 : the Launch field CONTRACTS into the Stabilization square ----- */
  (function () {
    var sec = document.getElementById('fde-flex');
    var cv  = document.getElementById('fde-flexdots');
    if (!sec || !cv) return;
    var ctx = cv.getContext('2d');
    var launch = sec.querySelector('.ph-launch');
    var stable = sec.querySelector('.ph-stable');

    var PITCH = 17, R = 3.1, TOP_PAD = 212;  // clearance for the nav + label
    var dots = [], W = 0, H = 0, dpr = 1;

    function build() {
      dots = [];
      var cols = Math.floor(W / PITCH), rows = Math.floor(H / PITCH);
      var ox = (W - (cols - 1) * PITCH) / 2, oy = (H - (rows - 1) * PITCH) / 2;
      // the square the field settles into, same pitch, centred
      // a true square: same count of columns and rows, centred in the field
      var usableRows = rows - Math.ceil(TOP_PAD / PITCH);
      var side = Math.max(6, Math.min(cols, usableRows) - 2);
      var c0 = Math.floor((cols - side) / 2);
      var r0 = Math.ceil(TOP_PAD / PITCH) + Math.floor((usableRows - side) / 2);
      var cx = W / 2, cy = H / 2;

      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          var x = ox + c * PITCH, y = oy + r * PITCH;
          if (y < TOP_PAD) continue;                        // keep clear of the label
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
      rt = setTimeout(function () { remeasure(); ScrollTrigger.refresh(); }, 150);
    });
  })();
