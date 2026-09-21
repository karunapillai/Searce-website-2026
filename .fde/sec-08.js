
  /* ----- §8 : phase 1 highlight, then phase 2 cards push copy left ----- */
  (function () {
    var sec = document.getElementById('fde-build');
    if (!sec) return;
    var wrap = sec.querySelector('.hl-wrap');
    var copy = sec.querySelector('.fde-build-copy');
    var rail  = sec.querySelector('.fde-rail');
    var cards = Array.prototype.slice.call(sec.querySelectorAll('.fde-bcard'));
    var links = Array.prototype.slice.call(sec.querySelectorAll('.fde-link'));
    if (!wrap) return;

    // split the second sentence into word spans for the highlight
    var words = wrap.textContent.split(/(\s+)/);
    wrap.textContent = '';
    var spans = [];
    words.forEach(function (w) {
      if (/^\s+$/.test(w)) { wrap.appendChild(document.createTextNode(w)); return; }
      var s = document.createElement('span');
      s.className = 'hl'; s.textContent = w;
      wrap.appendChild(s); spans.push(s);
    });

    function lit(p) {                       // p 0..1 across the sentence
      var n = spans.length;
      spans.forEach(function (s, i) {
        var t = (p * n) - i;                // >1 fully lit, <0 dark
        var a = 0.20 + 0.80 * Math.max(0, Math.min(1, t));
        s.style.color = 'rgba(255,255,255,' + a.toFixed(3) + ')';
      });
    }

    if (FINAL) { lit(1); gsap.set(cards, { xPercent: 0, opacity: 1 });
                 gsap.set(links, { opacity: 1 });
                 gsap.set(sec.querySelectorAll('.fde-link i'), { scaleX: 1 });
                 return; }

    lit(0);
    // start well clear of the copy's exit path so the two never overlap
    gsap.set(cards, { xPercent: 230, opacity: 0 });
    gsap.set(links, { opacity: 0 });
    gsap.set(sec.querySelectorAll('.fde-link i'), { scaleX: 0 });

    var st = { p: 0 };
    var tl = gsap.timeline({
      scrollTrigger: { trigger: sec, start: 'top top', end: '+=260%',
                       pin: true, anticipatePin: 1, scrub: 1 }
    });
    // phase 1 — progressive highlight
    tl.to(st, { p: 1, ease: 'none', duration: 1,
                onUpdate: function () { lit(st.p); } }, 0);
    // phase 2a — the copy clears out to the left FIRST, so the incoming
    // cards never cross it
    tl.to(copy, { xPercent: -125, opacity: 0, filter: 'blur(6px)',
                  ease: 'power1.in', duration: 0.55 }, 1);
    // phase 2b — card, then its rails, then the next card, in that order
    var t = 1.5;
    cards.forEach(function (c, i) {
      tl.to(c, { xPercent: 0, opacity: 1, ease: 'power2.out', duration: 0.55 }, t);
      t += 0.62;
      if (links[i]) {
        tl.to(links[i], { opacity: 1, duration: 0.12, ease: 'none' }, t);
        tl.to(links[i].querySelectorAll('i'),
              { scaleX: 1, duration: 0.34, ease: 'power1.out',
                stagger: { amount: 0.16 } }, t);
        t += 0.46;
      }
    });
    tl.to({}, { duration: 0.5 });        // hold the finished trio on screen
  })();
