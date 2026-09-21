# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: enterprise problem owners.** Senior buyers at large enterprises —
CIO, COO, CDO, business-unit heads — evaluating whether Searce can deliver a
specific AI outcome. They land on a practice or industry page, judge whether
the firm understands their problem and can engineer a result, and decide
whether to make contact. Confirmed by the user over technical-evaluator and
talent-first readings.

Talent-facing pages exist in the repo (`careers.html`, `join-us.html`), but
prospective solvers were **not** confirmed as a design audience. Treat their
priority as undecided rather than assuming it.

## Product Purpose

Searce sells AI outcome engineering to large enterprises. The site's job is to
let a problem owner judge credibility without a conversation: practice pages
explain how a class of work is engineered, industry pages show the same
capability applied inside a sector's real constraints, and every page resolves
to the same action — `bring us a problem →`.

Success is a qualified inbound contact from someone who already understands
what Searce would do and why it is different. The site argues; it does not
merely list services.

## Positioning

Drawn from committed page copy, not supplied as a claim:

- **The gap between purchase and change.** Practice pages open on it directly —
  "Most enterprises bought the licences. Far fewer can say what work is …"
  (the heading continues in a nested element). The wedge is realized outcomes,
  not access to models.
- **Named engineering practices, not advisory.** Five: AI Adoption & Change
  Engineering, Business Systems Engineering, AI-Ready Platform Engineering,
  AI Trust & Resilience Engineering, Human-AI Work Engineering. The recurring
  word is *engineering*.
- **Applied above the systems of record.** Industry pages name a specific
  architecture rather than a capability list. Healthcare runs three separate
  headings — "The Autonomous RCM Architecture.", "Four intervention points.",
  and "Four engineering practices, applied above your EHR and clinical systems
  of record."
- **Measured.** Business Systems Engineering leads with "The Metric Ladder."
  Standalone figures are rare in this repo — healthcare carries a single 40%
  and who-we-are carries the "by the numbers" set; DESIGN.md's "proof band"
  describes production, not these pages.
- **Twenty-two years.** Longevity is used as the counterweight to AI-era
  newcomers: "Twenty-two years of solving for better."
- **Model-partner credibility.** Dedicated Anthropic and OpenAI pages.

## Operating Context

A problem owner reads a practice or industry page top to bottom as an argument,
usually before any sales contact and often while comparing firms. Pages are
built to be read in that order: the problem, the offerings, where value shows
up, how an engagement starts, then `let's connect`. The `Outcomes`, `How we
solve`, `Practices`, `Industries`, `Insights` and `Company` nav is the lateral
path between those arguments.

The site is also used internally as a shared reference while the 2026 content
and design are being settled — `index.html` is a flat list of the pages for
exactly that.

## Capabilities and Constraints

- **The repo is a set of standalone HTML pages** — the user's framing: "this is
  just html page thats it." No framework, no build step, no package manager, no
  `package.json`, no bundler.
- Each page is one self-contained `.html` file at repo root, kebab-case, with
  inline `<style>` and inline `<script>`. Inter-page links are relative.
- The only external resources any page loads are Google Fonts stylesheets, a
  jsDelivr webfont for Google Sans Flex, and `assets/preview.css` on one page.
  There are **zero** `<script src>` tags in the repo today.
- Deployed by `.github/workflows/pages.yml`, which force-mirrors the working
  branch onto `gh-pages`. GitHub Pages serves that branch. Nobody works on
  `gh-pages` directly.
- Responsive breakpoints in use: 1180 / 1024 / 768 / 640 px.
- `assets/` holds all imagery, video, and SVG.
- Current page set: 5 practice pages, 3 industry pages (FSI, HLS, TSS) plus
  layout variants, 2 partner pages (Anthropic, OpenAI), 3 company pages
  (who-we-are, careers, join-us), and the `index.html` review list.
- **`DESIGN.md` is an imported copy from the main Next.js project.** It was not
  derived from this repo and does not describe it. Its file paths
  (`next/src/app/globals.css`), Tailwind `@theme` utilities, and component
  names (`KnowMoreButton`, `AINativeBadge`) all refer to the main project. Do
  not regenerate or "correct" it against this repo — it is a reference target
  carried in deliberately, and a scan of these pages would destroy that.
- **These pages use their own token system, which diverges from DESIGN.md's
  palette.** The practice pages define a black/gray neutral ramp (`--ink #000`,
  `--ink-85`, `--ink-60`, `--ink-40`, `--paper #fff`, `--paper-dim`,
  `--paper-line`) plus `--blue #0064ff`, `--blue-strong #004ecc`,
  `--blue-deep #00337f`, and blue tints at 06/12/24. DESIGN.md's neutrals are a
  navy ramp (`#001630`, `#002659`, `#003583`) on a Cool Paper Blue `#F2F7FF`
  ground. Searce Blue `#0064FF` is the only value common to both, and
  `body { background: var(--paper) }` on the practice pages resolves to pure
  white — which DESIGN.md's Daylight Rule explicitly rejects.
- **Decided:** the divergence stands. New pages built in this repo match the
  other preview pages — the shared practice-page `:root` block — not
  DESIGN.md's navy/daylight palette. Confirmed by the user when scoping
  `fde.html`. The practice-page `:root` block is byte-identical across
  `ai-adoption-change-engineering.html`, `human-ai-work-engineering.html` and
  `ai-ready-platform-engineering.html`; copy it rather than restating it.
- **Undecided:** whether these pages are ultimately served as searce.com or
  remain a preview alongside the production Next.js app. The user declined to
  frame it either way; do not assume production-grade SEO, analytics, or
  legal obligations until asked.

## Brand Commitments

All four confirmed binding by the user:

1. **`DESIGN.md` is the governing visual system — for the main project.** It
   is a copy imported from the main Next.js codebase and states the eventual
   target, not what this repo ships. It remains the authority for design
   intent (the closed shape vocabulary, the single-accent discipline, the
   register), and this file does not restate its contents — read it directly.
   **But color and type for pages built in this repo come from the shared
   practice-page `:root` block, not from DESIGN.md.** See Capabilities and
   Constraints for the divergence and the decision.
2. **`Website_content_2026.md` is the authoritative copy source.** Headings and
   body text come from it. New claims are not invented. ⚠️ That file is *not*
   committed to this repo — it is referenced from `who-we-are.html`'s header
   comment. Future work needs it supplied before writing new copy.
3. **1:1 mapping to the live Next.js implementation.** Where a page mirrors a
   production page, it keeps production's real class names and component
   boundaries so it ports cleanly. `who-we-are.html` is the reference example
   and states this in its own header comment.
4. **Self-contained HTML, no build.** Every page stays a single standalone
   `.html` file, deployable to `gh-pages` with no build step.

Also established, from committed copy and assets:

- Name **Searce**; positioning line **"AI Outcome Engineering"**.
- Refrains: "We futurify businesses." · "Twenty-two years of solving for
  better." · "the happier difference" (the seven *happier* letter cards) ·
  "Project Better Living".
- Affiliate **futurify.ai**, held quiet and low on the page.
- Voice: lowercase headings and CTAs, short declaratives, middot sequences
  (`evaluate · validate · launch · optimize · scale`), an arrow on every action
  (`bring us a problem →`).
- Partner relationships shown: Anthropic, OpenAI.

## Evidence on Hand

- **Real copy** in the committed HTML across all practice, industry, partner,
  and company pages.
- **`DESIGN.md`** — the full design system with named rules.
- **`assets/`** — photography (AdobeStock set, hero stills), video
  (`hero-fsi-dashboard.mp4`, `hero-fsi.mp4`, `hero-microscope.mp4`,
  `hero-tss.mp4`, `hero-scientist.mov`), partner logos
  (`anthropic-logo.svg`, `openai-logo.svg`), and the shape SVGs
  (`leaks-shapes.svg`, `perspective-shapes.svg`, `pillars-shapes.svg`,
  `practices-shapes.svg`).
- **"by the numbers"** figures, currently only in `who-we-are.html`.

**Absences future work must not fabricate:** there are no testimonials, no
named client logos, no case studies, no benchmarks, and no pricing anywhere in
this repo. `Website_content_2026.md` is referenced but not present. Do not
invent any of these to fill a layout.

## Product Principles

1. **Write for someone deciding, not browsing.** The reader is a senior buyer
   comparing firms. Every section either advances their judgment or is cut.
2. **Show the mechanism.** Searce's advantage is that it names how the work is
   engineered — architectures, intervention points, metric ladders. Prefer the
   specific mechanism over the adjective; a claim a competitor could copy
   verbatim is not positioning.
3. **Copy is sourced, never invented.** Headings and body text come from the
   2026 content doc. Where it is silent, ask — do not generate plausible
   enterprise prose, and never manufacture proof.
4. **Stay portable.** A page is one standalone HTML file with no build, and
   where it mirrors production it keeps production's class names. Both
   constraints exist so the work can move; neither is negotiable for
   convenience.
5. **One argument per page.** Each practice and industry page exists to make a
   single case a buyer can retell — the problem, the mechanism, where value
   lands, how an engagement starts. Pages that become capability inventories
   stop persuading; if a section does not advance that one argument, it belongs
   on a different page or nowhere.

## Accessibility & Inclusion

No accessibility standard was established by the user for this project. The
existing pages already honor `prefers-reduced-motion: reduce` and draw explicit
`:focus-visible` outlines (`2px solid var(--blue)`, 3px offset); both are
codebase practice worth preserving rather than a stated requirement. Confirm a
target standard before treating anything beyond that as required.
