
  /* ----- §13 : FAQ accordion (no ScrollTrigger; plain disclosure) ----- */
  (function () {
    var btns = document.querySelectorAll('.fde-q-btn');
    if (!btns.length) return;
    Array.prototype.forEach.call(btns, function (b) {
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') === 'true';
        Array.prototype.forEach.call(btns, function (o) {
          o.setAttribute('aria-expanded', 'false');
        });
        b.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
    });
  })();
