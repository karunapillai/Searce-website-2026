---
name: searce.com
description: Minimal geometric primitives and the Searce ring, on daylight blue.
colors:
  searce-blue: "#0064FF"
  near-black-navy: "#001630"
  deep-slate-navy: "#002659"
  mid-navy: "#003583"
  mid-azure: "#3685FF"
  pale-cornflower: "#C9DEFF"
  ice-blue: "#E4EFFF"
  cool-paper-blue: "#F2F7FF"
  white: "#FFFFFF"
  graphite: "#232324"
  divider-gray: "#999999"
typography:
  display:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "9vw"
    fontWeight: 300
    lineHeight: 0.92
    letterSpacing: "normal"
  headline:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 300
    lineHeight: 1.25
    letterSpacing: "normal"
  title:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 300
    lineHeight: 1.375
    letterSpacing: "normal"
  body:
    fontFamily: "Google Sans Flex, system-ui, Segoe UI, Roboto, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: "0.1em"
  stat:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "normal"
rounded:
  pill: "9999px"
  card: "16px"
  none: "0"
spacing:
  gutter-sm: "16px"
  gutter-md: "40px"
  gutter-lg: "80px"
  section-y: "64px"
  section-y-lg: "96px"
components:
  button-primary:
    backgroundColor: "{colors.searce-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "8px 24px"
    typography: "body"
  button-primary-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.near-black-navy}"
    rounded: "{rounded.pill}"
    padding: "8px 24px"
  button-secondary:
    backgroundColor: "{colors.pale-cornflower}"
    textColor: "{colors.near-black-navy}"
    rounded: "{rounded.pill}"
    padding: "8px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.deep-slate-navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "8px 24px"
  badge-ai-native:
    backgroundColor: "{colors.searce-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "4px 8px"
  chip-meta:
    backgroundColor: "{colors.pale-cornflower}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  cell-service:
    backgroundColor: "{colors.white}"
    textColor: "{colors.deep-slate-navy}"
    rounded: "{rounded.none}"
    padding: "48px 0 48px 24px"
  cell-service-hover:
    backgroundColor: "#000000"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "48px 0 48px 24px"
  card-tile:
    backgroundColor: "{colors.white}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.card}"
    padding: "24px"
---

# Design System: searce.com

## Overview

**Creative North Star: "The Ring and the Primitives"**

Searce's visual world is built from five shapes and nothing else. Four are primitives — circle, triangle, square, decagon — and the fifth is the Searce ring: a circle with a 40px `#0064FF` stroke at radius 57, which is to say the circle primitive rendered as an annulus. The mark is not decoration added on top of the system; it is one of the system's own shapes, pressed harder. Every graphic on the site is assembled from that closed set, in three treatments: Searce Blue, white, or Graphite.

The register comes from the copy: short declaratives, lowercase headings and CTAs, middot sequences (`evaluate · validate · launch · optimize · scale`), arrows on every action (`bring us a problem →`), and numbers set large enough to function as artwork. The copy deck's own art direction instructions are restraint instructions — partners get "one or two joint outcomes, nothing more"; the futurify.ai affiliate is "quiet, premium, low on the page". The design follows suit: three type weights, flat surfaces, hairline rules, a single loud accent, and a great deal of daylight. What carries the page is scale and sequence, not ornament.

Motion is where the argument gets made. Each section owns one idea and states it physically: the hero assembles itself from concentric rings, a field of uniform squares morphs row by row into circles and triangles, the words "big picture thinking" zoom 150× until the grid inside them becomes the subject, industry rows scroll as endless marquees, and a 12×8 grid lights up under the cursor. This is a site that performs its positioning rather than asserting it — but always in the primitives' own language, never with imagery or effects borrowed from elsewhere.

**Key Characteristics:**
- A closed shape vocabulary: ring, circle, triangle, square, decagon — no illustration, no stock photography, no new silhouettes
- Daylight ground (Cool Paper Blue `#F2F7FF`) alternating with deep navy grounds; nothing lit for drama
- Flat at rest — depth comes from tonal grounds, hairline rules, and the blueprint grid texture, never from resting shadow
- Three type weights only (300 / 400 / 500), with 300 as the inherited default
- One loud accent (Searce Blue) against an otherwise navy-and-white field
- Every interactive element responds visibly to the pointer
- Lowercase headings and CTAs; capitals reserved for eyebrows

## Colors

A single-hue system: one blue stretched from near-black to near-white, with Graphite and a divider gray as the only true neutrals. There is no secondary or tertiary accent, and adding one would break the system.

### Primary
- **Searce Blue** (`#0064FF`): The brand primary and the only loud color in the system. It fills the ring, the primitives at their most assertive, the primary CTA, the AI-native badge, the plus mark on the closing CTA band, and the third line of the hero headline. It is also the light in the mouse-reactive grid, painted as `rgba(0, 100, 255, α)`. Used on a small fraction of any viewport — its rarity is what makes it read as signal.
- **Mid Azure** (`#3685FF`): The quieter accent. Hairline accent bars — the 3px rule beside hero body copy, and the top bar that wipes across a services cell on hover.

### Neutral
- **Near-Black Navy** (`#001630`): The deepest ground. Section backgrounds, the start of the insights gradient, and the text color that replaces white when a light CTA inverts.
- **Deep Slate Navy** (`#002659`): The workhorse heading and body color on light grounds, and the ground for the "how searce solves" zoom stage. The most-used color on the page after white.
- **Mid Navy** (`#003583`): Reserved almost entirely for the insight row's hover ground.
- **Pale Cornflower** (`#C9DEFF`): Soft fills that need to read as interactive but not loud — the secondary CTA ground and the insight-type chip.
- **Ice Blue** (`#E4EFFF`): The lightest tint above the page ground; incidental fills.
- **Cool Paper Blue** (`#F2F7FF`): The page ground, set on `html, body`. The site's default state is daylight, not white and not dark.
- **White** (`#FFFFFF`): Section grounds that need to sit forward of the page ground, and all text on navy.
- **Graphite** (`#232324`): Body copy on light grounds in the closing CTA band, and the dark treatment of the primitives.
- **Divider Gray** (`#999999`): Hairline dividers in the services grid and metadata text on dark grounds.

### Named Rules

**The One Accent Rule.** Searce Blue is the only accent this system has. When a design needs a second color to distinguish something, it has a hierarchy problem, not a palette problem — solve it with scale, weight, ground, or position instead. Introducing a green, amber, or purple breaks the world.

**The Single Source Rule.** Every blue in the system is defined once, in the `@theme` block of `next/src/app/globals.css`, and reached through its Tailwind utility (`text-blue-800`, `bg-blue-600`). A raw hex literal in a component is drift by definition, even when the digits happen to be correct.

**The Daylight Rule.** The resting ground is Cool Paper Blue, not white. A section that wants to feel forward uses white; a section that wants weight uses navy. Reaching for pure white as the page default erases the distinction both of those depend on.

## Typography

**Display Font:** Poppins (with `system-ui`, `sans-serif`)
**Body Font:** Google Sans Flex (with `system-ui`, `Segoe UI`, `Roboto`, `sans-serif`)

**Character:** Poppins is a geometric sans whose circular bowls are the same geometry as the primitives — the type and the shapes are the same idea at different scales. It is not chosen for its own sake: production ships Gilroy, and Poppins is metric-matched to it. Google Sans Flex handles long-form prose only, where Poppins' geometry becomes tiring to read.

Two corrections make the substitution invisible, and both are invariants rather than preferences:

- **`font-size-adjust: 0.5`** on `html` and on all headings. Gilroy's x-height is exactly 0.500em at every weight it shipped, so normalizing to it scales Poppins ~91% and lands x-height, advance width, and stem weight within 5% of production. Capitals and numerals opt out with `[font-size-adjust:none]` or `.uppercase`, because Poppins' own cap height (0.698em) is already a 99.7% match for Gilroy's 0.700em and would render ~9% short with the adjust applied.
- **A shifted three-weight ladder.** Poppins runs one weight step heavier than Gilroy at matched size, so the scale is retargeted: `light` and `normal` both map to 300, `medium` to 400, and `semibold` and `bold` both to 500. The inherited default is 300. Long-form prose containers (`.prose`, `.prose-body`, `.font-google-sans-flex`) restore the conventional ladder, because Google Sans Flex needs no correction.

### Hierarchy
- **Display** (300, `9vw` at 2xl, line-height 0.92): The hero headline only. It scales on a viewport ladder rather than a clamp — `15vw` on mobile through `11vw`/`12vw` at tablet and laptop, `9vw` at 2xl, then `8vw`/`7vw`/`6vw` at the 3xl/4xl/5xl breakpoints so it does not run away on very wide displays. Three lines, each a block, with the last line in Searce Blue.
- **Headline** (300, `1.875rem` → `3.75rem`, line-height 1.25): Section titles. Lowercase, left-aligned, one idea per line.
- **Title** (300, `1.5rem` → `2.25rem`, line-height 1.375): Card and row titles — service names, insight headlines.
- **Body** (400, `1.125rem` → `1.25rem`, line-height 1.625): Section subheads and paragraph copy. Google Sans Flex only inside a `.prose` / `.prose-body` container or with `.font-google-sans-flex` on the element; otherwise Poppins.
- **Label** (300, `0.75rem`, letter-spacing 0.1em–0.2em, uppercase for eyebrows): The hero eyebrow, and service category labels at the wider `0.2em` tracking.
- **Stat** (300, `3rem`, line-height 1, with `[font-size-adjust:none]`): Large numerals used as artwork — `10x`, `100%`, and the proof-band figures.

### Named Rules

**The Lowercase Rule.** Headings and CTAs are lowercase — "how searce solves", "our partners", "bring us a problem →". Capitals appear only in eyebrows and are always tracked out. Title-casing a heading puts it in the wrong register immediately.

**The Three Weights Rule.** 300, 400, 500. There is no 600 and no 700 — the ladder maps both to 500 deliberately, because production only ever had two Gilroy files. Reaching for a heavier weight to create emphasis is not available; use scale or color.

**The Metric Parity Rule.** Never change `font-size-adjust`, the weight ladder, or the font stack to solve a layout problem. Those three values are calibrated against production's Gilroy, and moving any of them silently breaks parity across the whole site.

## Layout

A single centered column, `max-width: 1440px`, with a three-step gutter: 16px on mobile, 40px from `sm`, 80px from `xl`. The insights band is the one deliberate exception at `max-width: 1300px`, which insets it slightly from every other section and is what makes its gradient ground read as a distinct plane.

Vertical rhythm is 64px (`py-16`) for standard sections and 96px (`py-24`) for sections carrying a full-height graphic. Section grounds alternate — daylight, white, navy, white, gradient navy, white — so no two adjacent sections share a ground.

Structure is expressed with dividing rules rather than gaps. The services grid is a two-column arrangement of cells separated by 1px Divider Gray borders, with the outer edges deliberately unruled (`border-r-0` on odd cells, `border-b-0` on the final row) so the grid reads as an internal lattice rather than a boxed table. Insight rows are full-bleed and separated by 0.5px white hairlines with the last divider removed.

Four breakpoints extend Tailwind's defaults for large displays: `3xl` at 120rem (1920px), `4xl` at 135rem (2160px), and `5xl` at 155rem (2480px). Their only job is to keep viewport-scaled display type from over-growing.

## Elevation & Depth

The system is flat at rest and has no shadow scale. Depth is built three other ways: tonal grounds that alternate section by section, 1px hairline rules that divide without enclosing, and the blueprint grid texture — white 1px lines on a 60px×60px pitch at 0.15 opacity — which sits behind the zoom stage and reads as drafting paper rather than as decoration.

Shadow exists only as a response to the pointer, never as a property of a resting surface. There are exactly two instances: the pill CTA's `hover:shadow-lg`, and the closing CTA band's grid cells, which take an `inset 0 0 20px rgba(0, 100, 255, α)` glow scaled by cursor proximity, with α crossing a 0.3 threshold before any shadow is drawn at all.

### Named Rules

**The Flat-At-Rest Rule.** No surface carries a shadow in its resting state. If a card needs separating from its ground, change the ground or add a hairline — do not lift it. Shadow is reserved as evidence that the pointer is present.

**The Hairline Rule.** Dividers are 1px (0.5px on dark grounds) and unbroken. Structure is drawn with lines, not with elevation, padding wells, or nested containers.

## Shapes

Two form languages coexist, and the split is by function rather than by taste. Anything the visitor acts on is fully round: CTAs, badges, and metadata chips are all `border-radius: 9999px`. Anything that holds content is either softly cornered at 16px (industry and partner tiles) or perfectly sharp at 0 (services cells, insight rows, the morph field, the plus mark). Nothing in the system uses an intermediate radius.

The primitives are the system's whole illustrative vocabulary. In the zoom stage they appear as a matched set — circle, triangle, square, decagon — rendered at three scales in Searce Blue, white, and Graphite. In the morph field, a lattice of 8-per-row squares at `fill-opacity: 0.14` converts row by row into white triangles and Searce Blue circles, on a 121.711px pitch with 102.619px shapes. The Searce ring closes the set: a circle at radius 57 with a 40px stroke, giving an outer radius of 77 and an inner radius of 37.

### Named Rules

**The Closed Set Rule.** New graphics are assembled from the ring, circle, triangle, square, and decagon, plus the blueprint grid texture. No new silhouettes, no illustration, no stock photography, no icon set with its own drawing style. The constraint is the identity.

**The Two Radii Rule.** 9999px for controls, 16px for content tiles, 0 for structure. There is no 4px, 6px, or 8px radius in this system, and introducing one makes everything look approximately branded.

## Components

Every interactive element in this system responds visibly to the pointer. That is the single component philosophy: nothing is inert, and a state that does not move or change ground reads as broken. Transitions run 300ms for controls and 500–900ms for full-plane changes, always on an ease-out or ease-in-out curve.

### Buttons
- **Shape:** Fully round pill (`9999px`), never square or softly cornered.
- **Primary:** Searce Blue ground, white text, 24px/8px padding at the default size, with a right-facing arrow glyph in a nested round wrapper.
- **Secondary:** Pale Cornflower ground with Near-Black Navy text, or white ground with a Searce Blue 1px border and Searce Blue text. Both invert to a navy ground with white text on hover.
- **Hover / Focus:** `scale(1.05)` plus a shadow lift over 300ms, and the arrow glyph translates 4px right independently of the button. The lift and the arrow travel are separate motions on purpose — the arrow leads.
- **Border:** Optional and off by default on dark grounds; when present it is 1px and matches the text color.

### Badges
- **AI-native badge:** Pill, Searce Blue ground, white text, 8px/4px padding, led by a four-point sparkle glyph drawn as inline SVG in `currentColor`. Used on the services page cards, the partner service cards, and the nav.
- **Practice-area pill:** The same pill without the sparkle, carrying the area of the work — systems, people, foundation, assurance — above each homepage practice title. Navy ground with pale text, inverting to pale-on-navy as the cell goes black. It replaced the AI-native badge here: on a page where every practice is AI-native, the claim was noise and the area is information.

### Chips
- **Metadata chip:** Pill, Pale Cornflower ground, 16px/8px padding, sentence case. Used for insight type. Sibling metadata (date, read time) is unchipped Divider Gray text at 0.875rem.

### Cards / Containers
- **Corner Style:** 16px for tiles, 0 for grid cells and rows.
- **Tiles (industry, partner):** Fixed footprint — 240×190 rising to 280×220 — with 16px/24px internal padding. Industry tiles pair a colored icon tile with a photograph of equal size; partner tiles carry a 1px Searce Blue border, a logo locked to a 60px band, and a title beneath.
- **Hover:** `scale(1.05)` over 300ms. Tiles lift; they do not change ground.
- **Grid cells (services):** No radius, no shadow, 48px vertical and 24px left padding, separated by Divider Gray hairlines. On hover the entire cell inverts to a black ground with white text over 900ms while a Mid Azure 3px bar wipes left-to-right across the top edge in 300ms. The bar arrives before the ground finishes — that offset is the effect.
- **Rows (insights):** Full-bleed, no radius, 0.5px white hairline divider. On hover the row takes a Mid Navy ground and its arrow translates 24px right over 500ms.

### Section Header
Every section opens the same way: a lowercase Headline `h2`, then a Body `h3` subhead capped at `max-width: 64rem`, both left-aligned, separated by 24px, with 48px below before content. This pairing is the system's most repeated structure and should not be varied per section.

### Signature: the morph field
A 1024×1024 SVG lattice of squares at `fill-opacity: 0.14` on a near-black ground, converting row by row into white triangles and Searce Blue circles as it enters the viewport. Driven by GSAP MorphSVG on a master timeline, rows keyed at 100ms intervals with 800ms `power2.inOut` morphs, and reversible on scroll-back. It occupies the left half of a two-column section with copy on the right, and is hidden below `lg` rather than reflowed.

## Do's and Don'ts

### Do:
- **Do** reach every color through its Tailwind utility from the `@theme` block in `globals.css` — `text-blue-800`, `bg-blue-600`, `border-blue-600`.
- **Do** assemble new graphics from the ring, circle, triangle, square, and decagon, plus the blueprint grid texture at 60px pitch and 0.15 opacity.
- **Do** keep headings and CTAs lowercase, and track out capitals when an eyebrow needs them (0.1em, or 0.2em for category labels).
- **Do** give every interactive element a visible pointer response — 300ms for controls, 500–900ms for full-plane inversions.
- **Do** open sections with the standard Headline + Body subhead pair, left-aligned, subhead capped at 64rem.
- **Do** alternate section grounds so no two adjacent sections share one.
- **Do** add `[font-size-adjust:none]` to any element whose content is capitals or numerals — stat values, badges, tracked eyebrows.
- **Do** pass explicit brand colors to `KnowMoreButton` on every call site until its internal defaults are corrected.

### Don't:
- **Don't** write a raw hex literal in a component. The homepage currently carries 23 instances of `#0064FF` and 11 of `#002659` written by hand when `bg-blue-600` and `text-blue-800` already exist, and that habit is what produced every near-duplicate below.
- **Don't** introduce another blue. `#0061FF`, `#0164FD`, `#4E8EFF`, `#2563eb`, and `#1d4ed8` are all in the homepage today and all mean Searce Blue; `#002559` means Deep Slate Navy `#002659`; `#CADFFF` means Pale Cornflower `#C9DEFF`. Each is drift, not a design decision.
- **Don't** rely on `KnowMoreButton`'s built-in variant defaults. They resolve to Tailwind's stock `#2563eb` / `#1d4ed8`, not Searce Blue, and `OurPartnersSection` ships that off-brand blue today.
- **Don't** use `next/src/components/ui/button.tsx` or `badge.tsx` for anything user-facing. They are unmodified shadcn primitives on a generic gray-and-red palette that belongs to no part of this system; `KnowMoreButton` and `AINativeBadge` are the real primitives.
- **Don't** add a second accent hue. No green, amber, purple, or teal — Searce Blue is the only accent, and hierarchy problems get solved with scale, weight, ground, or position.
- **Don't** put a shadow on a resting surface. Depth is tonal grounds, hairlines, and the grid texture; shadow is a pointer response only.
- **Don't** use an intermediate corner radius. 9999px for controls, 16px for tiles, 0 for structure — a 4px or 8px radius makes the whole system look approximately branded.
- **Don't** change `font-size-adjust`, the three-weight ladder, or the font stack to solve a layout problem. Those values hold metric parity with production's Gilroy across every page.
- **Don't** add gradient text, `bg-clip-text` headings, glassmorphism, glowing orbs, or bento grids. The AI-startup template is a confirmed anti-reference.
- **Don't** reach for stock boardroom photography, serif authority, or gradient-overlaid hero imagery. The legacy-consultancy register is a confirmed anti-reference.
- **Don't** invert the system to a terminal-dark, neon-accented, monospace-headed treatment. Developer-tool dark mode is a confirmed anti-reference and the wrong register for enterprise problem owners.
- **Don't** put a thick colored border on one side of a card. `border-l-4` reads as an AI-generated tell and is not part of this system's vocabulary.
