/* ---------------------------------------------------------------
   Hero dot field — a STATIC slanted lattice matching Figma's
   `image 242`: rows run down-to-the-right at a shallow angle, the
   plane recedes toward the upper right (dots smaller and sharper
   that way, larger and softer in the near corner). Nothing moves
   or rotates; the only animation is dots switching on and off in a
   wave that travels left to right.

   Seamlessness: the wave is sin(kx - omega*t), so phase advances
   forever with no loop point. Figma pins no speed; these constants
   were chosen to read as a slow, legible sweep.
   --------------------------------------------------------------- */
(function () {
  var cv = document.getElementById('fde-dots');
  if (!cv) return;
  var ctx = cv.getContext('2d', { alpha: false });

  var WAVE_CYCLES  = 1.7;   // on/off cycles visible across the width
  var WAVE_SECONDS = 8.0;   // seconds for one cycle to pass a point
  var COLS = 34, ROWS = 26; // lattice size
  var SHRINK = 0.055;       // per-row perspective falloff

  // lattice basis, read off the reference: rows descend gently to the
  // right; the field recedes up and to the right.
  var ROW_DIR = [0.966, 0.259];
  var COL_DIR = [0.46, -0.89];

  var dpr = 1, W = 0, H = 0, dots = [], raf = 0, running = false;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  function build() {
    dots = [];
    var base = Math.max(W, H) * 0.052;        // near-field pitch
    var ox = -W * 0.22, oy = H * 1.12;        // start off the near corner
    var cx = ox, cy = oy;

    for (var j = 0; j < ROWS; j++) {
      var s = 1 / (1 + j * SHRINK);
      var step = base * s;
      for (var i = 0; i < COLS; i++) {
        var x = cx + ROW_DIR[0] * step * i;
        var y = cy + ROW_DIR[1] * step * i;
        if (x < -80 || x > W + 80 || y < -80 || y > H + 80) continue;
        dots.push({ x: x, y: y, s: s });
      }
      cx += COL_DIR[0] * base * s;
      cy += COL_DIR[1] * base * s;
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var rect = cv.getBoundingClientRect();
    W = Math.max(1, rect.width); H = Math.max(1, rect.height);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  function draw(tMs) {
    var t = tMs / 1000;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, W, H);

    var k = Math.PI * 2 * WAVE_CYCLES / W;
    var omega = Math.PI * 2 / WAVE_SECONDS;

    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];

      // on/off: a tight smoothstep so dots visibly switch rather than
      // merely breathe, wide enough not to alias
      var w = Math.sin(k * d.x - omega * t);
      var on = (w + 1) * 0.5;
      on = on * on * (3 - 2 * on);
      on = on * on;

      var a = (0.07 + 0.80 * on) * (0.35 + 0.65 * d.s);
      if (a < 0.012) continue;

      var r = 1.2 + 7.0 * d.s;             // near dots larger

      if (d.s > 0.58) {
        // near field sits out of focus: a soft disc instead of a ring
        var g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, r * 2.1);
        g.addColorStop(0, 'rgba(120,175,255,' + (a * 0.85).toFixed(4) + ')');
        g.addColorStop(0.55, 'rgba(60,120,240,' + (a * 0.30).toFixed(4) + ')');
        g.addColorStop(1, 'rgba(20,60,160,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(d.x, d.y, r * 2.1, 0, 6.2832); ctx.fill();
      } else {
        // far field is in focus: a crisp small ring
        ctx.strokeStyle = 'rgba(' + (95 + 75 * on).toFixed(0) + ','
                        + (150 + 70 * on).toFixed(0) + ',255,' + a.toFixed(4) + ')';
        ctx.lineWidth = Math.max(0.7, r * 0.42);
        ctx.beginPath(); ctx.arc(d.x, d.y, r, 0, 6.2832); ctx.stroke();
      }
    }
  }

  function frame(t) { draw(t); raf = requestAnimationFrame(frame); }
  function start() { if (!running) { running = true; raf = requestAnimationFrame(frame); } }
  function stop()  { if (running) { running = false; cancelAnimationFrame(raf); } }

  resize();
  if (reduce.matches) {
    draw(WAVE_SECONDS * 250);
  } else {
    start();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es[0].isIntersecting ? start() : stop();
      }, { threshold: 0 }).observe(cv);
    }
    document.addEventListener('visibilitychange', function () {
      document.hidden ? stop() : start();
    });
  }

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      resize();
      if (reduce.matches) draw(WAVE_SECONDS * 250);
    }, 150);
  });
})();
