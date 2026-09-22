
  // FINAL is decided once, at load. Dragging a window (or rotating a
  // tablet) across the 1025 boundary would otherwise leave the page in the
  // wrong mode — pinned sections on a phone, or a flat page on a desktop.
  // Re-entering the correct mode means re-running every section's setup,
  // so the honest move is a reload, fired only on an actual crossing.
  var mq = window.matchMedia('(min-width: 1025px)');
  var onCross = function () { window.location.reload(); };
  if (mq.addEventListener) mq.addEventListener('change', onCross);
  else if (mq.addListener) mq.addListener(onCross);

  // fonts change metrics, which moves every trigger boundary
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
