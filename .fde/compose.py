#!/usr/bin/env python3
"""Compose fde.html from the shared practice-page chrome plus FDE fragments.
Re-runnable: drop sec-NN.css / sec-NN.html / sec-NN.js into .fde/ and re-run."""
import glob, os, re

D = ".fde"
def rd(p):
    return open(p).read() if os.path.exists(p) else ""
def cat(pat):
    return "\n".join(rd(f) for f in sorted(glob.glob(os.path.join(D, pat))))

CDN = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/"
def tag(f, h):
    return ('<script src="%s%s" integrity="sha384-%s" '
            'crossorigin="anonymous" referrerpolicy="no-referrer"></script>' % (CDN, f, h))
GSAP = (tag("gsap.min.js", "g4NTh/Iv5PPU4xPyhEWqPcwtNXOvdaDI8LLnyYfyNZOjKJeYQyjzQ9X5275eBjpt")
        + "\n" +
        tag("ScrollTrigger.min.js", "Z3REaz79l2IaAZqJsSABtTbhjgOUYyV3p90XNnAPCSHg3EMTz1fouunq9WZRtj3d"))

doc = [
    rd(f"{D}/chrome/head-fde.txt"),
    rd(f"{D}/chrome/sharedcss.txt"),
    rd(f"{D}/css-hero.css"),
    cat("sec-*.css"),
    rd(f"{D}/chrome/footercss.txt"),
    rd(f"{D}/chrome/mqueries.txt"),
    rd(f"{D}/css-responsive.css"),
    "</style>",
    "<script>document.documentElement.classList.add('js');</script>",
    "</head>\n<body>\n",
    rd(f"{D}/chrome/nav-fde.txt"),
    rd(f"{D}/html-hero.html"),
    cat("sec-*.html"),
    rd(f"{D}/chrome/footer.txt"),
    "\n" + GSAP,
    "<script>\n" + rd(f"{D}/js-dots.js") + "\n</script>",
]
sjs = cat("sec-*.js")
if sjs.strip():
    doc.append("<script>\n" + rd(f"{D}/js-anim-head.js") + "\n" + sjs
               + "\n" + rd(f"{D}/js-anim-tail.js") + "\n</script>")
doc.append("</body>\n</html>\n")

html = "\n".join(doc)
open("fde.html", "w").write(html)

errs = []
if html.count("<style>") != 1: errs.append("style tag count")
if html.count("</style>") != 1: errs.append("close style count")
if html.count("<body>") != 1 or html.count("</body>") != 1: errs.append("body tags")
if 'href="fde.html"' not in html: errs.append("no FDE link in nav")
if re.search(r"figma\.com/api/mcp/asset", html): errs.append("LEFTOVER figma asset URL")
if "sha512" in html: errs.append("stale sha512 SRI")
print("wrote fde.html  %d bytes  %d lines" % (len(html), html.count("\n")))
print("sections:", len(glob.glob(f"{D}/sec-*.html")), "| ERRORS:", errs or "none")
