# FDE build — state and how to resume

`fde.html` is assembled by `python3 .fde/compose.py` from fragments in `.fde/`.
**Never hand-edit `fde.html`** — it is generated and will be overwritten. Edit the
fragments and re-run the composer.

## Fragment system

| File | Role |
|---|---|
| `.fde/chrome/*.txt` | shared practice-page chrome, extracted verbatim from `ai-adoption-change-engineering.html` (head, tokens+base+nav CSS, connect/footer CSS, media queries, nav markup with the FDE dropdown, connect markup, footer markup) |
| `.fde/css-hero.css` | section system + hero |
| `.fde/html-hero.html` | hero markup |
| `.fde/js-dots.js` | hero dot field (canvas) |
| `.fde/js-anim-head.js` | GSAP/ScrollTrigger setup, opens the IIFE, defines `FINAL` (reduced-motion flag) |
| `.fde/sec-NN.{css,html,js}` | one section group each; the composer globs them in sorted order |
| `.fde/js-anim-tail.js` | ScrollTrigger refresh hooks, closes the IIFE |
| `.fde/css-responsive.css` | FDE responsive + scripted reduced-motion opt-out |

Add a section by writing `sec-NN.css`, `sec-NN.html`, `sec-NN.js` and re-running
the composer. `sec-NN.js` runs inside the shared IIFE, so `FINAL` is in scope.

## Done

- **Chrome** — head, tokens, nav, connect band, footer copied verbatim from the
  practice-page system. No new colors; `:root` block is byte-identical.
- **Nav dropdown** — "How we solve" built by cloning the Company
  `.has-dropdown`/`.mega-panel` pattern, with one item `FDE` -> `fde.html`.
  Added to **13 pages**. Verified: hover, keyboard focus, chevron rotation,
  navigation. `who-we-are.html` and `join-us.html` deliberately untouched.
- **§1 Hero** — full Figma spec (`8115:4258`). Live canvas dot field replaces
  Figma's raster `image 242` per the build decision; the wave is
  `sin(kx - ωt)` with an integer cycle count, so it never restarts visibly.
  Pauses offscreen and when the tab is hidden; renders one settled frame under
  reduced motion.
- **§2+§3** — the Tanmay-tagged 2nd->3rd fold transition, built as ONE pinned
  scrubbed ScrollTrigger over 200vh. Verified at 0 / 50 / 100 % **and in
  reverse**: fan clips 99.4% -> 50.0% -> 2.9%, ground and copy swap with it.
- **§4 "What a squad is"** — full spec via REST (`8129:13358` + `8129:13382`).
  Perspective grid backdrop, three glass cards on a 264px pitch, active card
  solid `--blue` with a white icon. Progressive disclosure verified stepping
  card 0 -> 1 -> 2 across the pin, and reversing.
- **§13 FAQ** — real accordion (button + aria-expanded + aria-controls, one
  open at a time, grid-rows transition, open-by-default without JS). Questions
  are the real ones off the raster. **Answer copy is NOT in Figma and was not
  invented** — each `.fde-q-pending` slot must be filled from
  Website_content_2026.md.
- **§14 Closing CTA** — navy gradient, masked dot texture, `bring us a
  problem →` reusing the nav's arrow.
- Zero console errors/warnings. No horizontal overflow at 1440 or 390.

## All 14 sections built

§1 hero · §2+§3 transition · §4 what a squad is · §5 who is in a squad ·
§6 three courses of capacity · §7 who is accountable · §8 how Searce builds ·
§9 what happens after the build · §10 evaluating a squad · §11 how squads flex ·
§12 global by design · §13 FAQ · §14 closing CTA.

§4 was specced from the Figma REST API before the quota ran out. §5–§12 were
built from the frame PNGs the user exported by hand into `.fde/ref/`
(1440x810 @1x) — layout and copy read off those, colour taken from the
practice-page tokens rather than sampled.

### Responsive contract

Pinning and scrubbing are **desktop-only** (`min-width: 1025px`, set once in
`js-anim-head.js`). Below that, `FINAL` is true and every section paints its
resolved end state and stacks; `css-responsive.css` carries the stacked
layouts. §7's SVG uses `preserveAspectRatio="none"`, which only stays
undistorted at the desktop container ratio, so on mobile the circle is
replaced by two stacked colour blocks carrying the same two roles.

### Revision pass (user feedback)

- **§2/§3** — the fan now *converges* in fold 2 (origin below the frame) and
  *diverges* in fold 3 (origin above), crossfading as the ground turns over.
- **§4 / §5** — both were stepping through `Math.round(...)`, so nothing
  actually animated. The driver is continuous now: position, blur and opacity
  all interpolate, and the pins are shorter.
- **§8** — the copy clears left *before* the cards enter, so they never
  overlap; connectors are 4 lines out of card 1 and 3 out of card 2, matching
  their row counts; all three cards end centred as a group, not just the last.
  Connector opacity is a tweened CSS var so it unwinds on scroll-up.
- **§9** — rail dots were inline spans (computed width 0, invisible). Now
  `display:block`, the rail is inset to the dot centres, the end node fires,
  and there is real space between rail and labels.
- **§11** — Launch is a full 26x16 block across the right side with the label
  centred over it; scrolling cuts columns from the left and rows from the
  bottom down to a 14x14 square, top-right anchored.
- Scrub normalised to 1 across the page and the longer pins trimmed, so the
  deck scrolls without feeling stuck.

### Revision pass 2 (user feedback)

- **Hero** — the field was a radial perspective fan that read as rotating. It
  is now a STATIC slanted lattice matching `Frame 427320989.png`: rows descend
  gently right, the plane recedes up-right (near dots large and soft, far dots
  small crisp rings). Only the on/off wave moves.
- **§2/§3** — rebuilt to `BG.png`. Fold 2's rays converge to a vanishing point
  at the foot of the fold and draw across the WHOLE fold; fold 3's diverge
  from a point at its head out to the bottom edge, animating from the start of
  that fold. Each half has its own clip front and a mask that fades toward its
  vanishing point.
- **§4 / §5** — blur removed entirely. Disclosure is position + opacity +
  a slight scale, and each card/panel now has a dwell beat before the next.
- **§8** — connectors are real elements, so the counts are exact and verified
  in the DOM: **4** rails out of card 1, **3** out of card 2. Sequence is
  card → its rails → next card.
- **§9** — rail inset to the dot centres; dots were inline spans with computed
  width 0 and are now `display:block`.
- **§11** — rebuilt on canvas. Launch is a dot field running the full height
  of the section down the right side; scrolling CONTRACTS it into a square —
  dots travel inward, outer ones first, and the surplus collapses at the
  boundary rather than fading in place. The label moved above the field: a
  knockout band through the middle split the square in two.

### Revision pass 3 (user feedback)

- **§2/§3** — the diverging rays now hold off until the blue ground has
  arrived (timeline 1.45 of ~2.4) instead of starting with it; section scroll
  lengthened to 235% to carry the extra beat.
- **§4** — there are **four** cards, not three. `Client success` was missing;
  it is in place with its own icon, and the order is Business understanding ->
  Hands-on engineering -> Client success -> A single accountable outcome
  (read off `Group 4273210{30,31,32,33}.png`).
  Motion reworked: the old long-dwell/quick-move split read as stop-start, so
  it is now a short beat plus a long `power1.inOut` glide, scrub 1.15.
  Off-cards dropped to 0.09-0.30 opacity so the focused card carries the frame.

### Revision pass 4 (user feedback)

1. **§11** — label knocked back out of the middle of the field (dots above and
   below, per the reference); field widened 34% -> 42% and pitch 17 -> 15 for
   more columns reaching toward centre.
2. **§9** — the rail is now MEASURED off the first and last dot centres at
   layout time rather than guessed from padding, so it cannot drift.
3. **§7** — circle radius 196 -> 252, stage ratio 1440/540; the bottom half
   now sweeps a hair past a full turn so the halves close with no seam;
   label width 24% -> 20% so descriptions wrap to three lines.
4. **§4 / §5 grids** — both flat at a 72px pitch with `background-position:0 0`;
   the perspective transform on §4 was what made them fail to line up.
5. **§13 FAQ** — redesigned to the reference (tinted open row with blue rule
   and filled toggle, white closed rows) and the three real answers are in.
6. **"Let's connect" section removed.** Its CSS was bundled with the footer's,
   so that block was split — `chrome/footercss.txt` now carries the footer half.
   The nav CTA repoints to `#fde-close`; the closing CTA has no destination on
   this site yet and uses the footer's own `#` placeholder.
7. **§14** — `min-height:62vh` and heavier padding (~30% taller).
8. **Responsive** — full ladder rewritten: 1441+/1180/1024/768/480 plus
   reduced-motion. 1180 is the important new one — §8's trio of cards and
   rails did not fit the gutters between 1025 and 1180.

Also: the hero was building a `createRadialGradient` per near-dot per frame,
which pegged the CPU; the soft dot is now a cached offscreen sprite stamped
with `drawImage`.

**This pass is NOT visually verified** — Chrome would not launch for either
Playwright or chrome-devtools (`initializeServer` timeout / frame detached).
Verified statically only: composer checks, `node --check` on all three inline
scripts, and a token audit of every item above.

### Revision pass 5 (user feedback)

- **§7 rebuilt.** The ellipse was structural, not a tuning error: the circle
  lived in a 1440-wide viewBox with `preserveAspectRatio="none"`, so it was
  stretched by whatever ratio the container happened to have. It now sits in
  its own `aspect-ratio:1` box with a SQUARE `viewBox="0 0 100 100"`, which
  makes it round by construction at any width. The rail is a separate
  absolutely-positioned element, so it spans the stage and passes behind the
  circle instead of being part of the stretched SVG. Copy is HTML inside the
  circle at 72% width, sized with clamp() so it neither squashes nor shrinks.
  Wedge geometry verified numerically (`/tmp/wedge-test.js`): the top half
  reaches exactly PI at p=0.5, and the bottom closes 0.03 rad past 2PI with a
  0.02 rad overlap at the 9 o'clock join — no seam at either.
- **§11** scaled down: pitch 15 -> 13, dot radius 2.9 -> 2.35, square side
  tightened, label max 23px -> 18px.

**Verified visually** after a Chrome restart. Desktop 1440: circle measures
470x470 (round), sits 81px clear of the heading, no text clipping, halves meet
exactly on the rail, no horizontal overflow, zero console errors. Phone 390
(loaded at that width, not resized into it): 0 ScrollTriggers, no horizontal
scroll, canvas buffer matches its box, FAQ single column, circle swapped for
the stacked colour blocks.

Two defects the visual pass caught that static checks could not:
- **§11's canvas kept a stale buffer** (504 wide against a 605 box), so CSS was
  upscaling it ~20% — that, not the tuning, was why the dots still looked big.
  `render()` now re-measures whenever the box and buffer disagree.
- **The desktop/mobile gate was decided once at load**, so dragging a window
  across 1025px left the page in the wrong mode. A `matchMedia` change listener
  now reloads on an actual crossing.

### Revision pass 6

- Semicircle copy scaled up — kicker 11.5 -> 13px, name 24 -> 28px, note
  14.5 -> 16.5px, with the label block widened 54% -> 60% so the bigger type
  does not wrap into the curve. Fit checked against the circle's chord at the
  text's furthest point: 141px half-width against 189/192px allowed.
- **Seam fix.** The halves only closed at exactly p=1, and scrub lag leaves a
  reader who stops scrolling fractionally short — which showed as a thin wedge
  gap on the right. Each half now completes its sweep before its phase ends
  (top at p1/0.92, bottom at p2/0.90), so it is closed from p=0.95 onward.
  Verified numerically and at 4x zoom on the join.

### Still outstanding

- **FAQ answers** — the three `.fde-q-pending` slots need real copy from
  Website_content_2026.md. Deliberately not invented.
- **`assets/fde-world-dots.png`** — cropped from the 1x frame export, so it is
  soft on retina. A 2x export of just the map would sharpen it.
- Icons in §4, §6 and §10 are authored to one stroke weight rather than the
  Fluent set Figma references.

## Decisions already locked (do not re-litigate)

1. GSAP 3.12.5 + ScrollTrigger, pinned cdnjs with SRI, `fde.html` only.
2. Palette/type = the practice-page `:root`, NOT DESIGN.md (which documents the
   main Next.js project).
3. Pinned + scrubbed scroll model — one timeline per section, so scroll-up
   reverses exactly rather than running a second animation.
4. Hero dots are a live field, not the Figma raster.
6. The three V5 pages had hover-only dropdowns; `:focus-within` was added so the
   new FDE entry is keyboard-reachable (also fixes their existing Company one).
5. The Figma nav (Geist fonts, "Bring us a problem" pill) is a mockup stand-in
   and was deliberately NOT used; the real practice-page nav ships instead.
