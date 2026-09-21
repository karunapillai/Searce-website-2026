
  /* ----- §2+§3 : lines top->middle, then the ground turns over ----- */
  (function () {
    var sec = document.getElementById('fde-shift');
    if (!sec) return;
    var fan   = sec.querySelector('.fan');
    var lines = sec.querySelectorAll('.fan line');
    var conv  = sec.querySelector('.fan-conv');
    var divg  = sec.querySelector('.fan-div');
    var blue  = sec.querySelector('.fde-shift-blue');
    var a     = sec.querySelector('.fde-shift-a');
    var b     = sec.querySelector('.fde-shift-b');

    gsap.set(b, { y: 18 });

    if (FINAL) {
      gsap.set([conv, divg], { clipPath: 'inset(0 0 0% 0)' });
      gsap.set(lines, { stroke: '#ffffff' });
      gsap.set(conv, { opacity: 0 });
      gsap.set(blue, { opacity: 1 });
      gsap.set(a, { opacity: 0 });
      gsap.set(b, { opacity: 1, y: 0 });
      return;
    }

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: sec,
        start: 'top top',
        end: '+=235%',          // two Figma folds' worth of scroll
        pin: true,
        anticipatePin: 1,
        scrub: 1.1            // heavier lerp reads smoother here
      }
    });

    // phase A — the converging rays draw all the way down fold 2
    tl.to(conv, { clipPath: 'inset(0 0 0% 0)', ease: 'none', duration: 1 }, 0);

    // phase B — ground turns over, copy swaps, and the diverging rays
    // draw from the top of fold 3 right through to its foot
    tl.to(divg, { clipPath: 'inset(0 0 0% 0)', ease: 'none', duration: 0.95 }, 1.45)
      .to(conv, { opacity: 0, ease: 'none', duration: 0.45 }, 1.1)
      .to(lines, { stroke: '#ffffff', ease: 'none', duration: 0.7 }, 1)
      .to(blue,  { opacity: 1, ease: 'none', duration: 0.7 }, 1)
      .to(a,     { opacity: 0, y: -18, ease: 'none', duration: 0.45 }, 1)
      .to(b,     { opacity: 1, y: 0, ease: 'none', duration: 0.55 }, 1.25)
      // the fan inverts with the ground: funnel -> open out
      .to(conv,  { opacity: 0, ease: 'none', duration: 0.6 }, 1)
      .to(divg,  { opacity: 1, ease: 'none', duration: 0.6 }, 1);
  })();
