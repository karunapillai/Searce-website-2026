#!/usr/bin/env python3
"""Compact spec dump for Figma nodes via the REST API.
  usage: fig.py <nodeId> [<nodeId>...]        # spec tree
         fig.py --img <nodeId> [...]          # @2x PNG renders -> .fde/ref/
"""
import json, os, sys, subprocess, urllib.parse

KEY = "vOKitcGHVTS9VW37iFo9IW"
TOK = open(os.path.expanduser("~/.figma-token")).read().strip()

def api(path):
    # python's ssl has no CA bundle on this machine; curl does
    out = subprocess.run(["curl","-sSL","-H","X-Figma-Token: "+TOK,
                          "https://api.figma.com/v1/"+path],
                         capture_output=True, text=True, check=True).stdout
    return json.loads(out)

def hexof(c, a=None):
    if not c: return None
    r,g,b = [int(round(c.get(k,0)*255)) for k in ("r","g","b")]
    al = c.get("a",1) if a is None else a
    s = "#%02x%02x%02x" % (r,g,b)
    return s if al >= .999 else "%s @%.2f" % (s, al)

def paint(ps):
    if not ps: return None
    out=[]
    for p in ps:
        if p.get("visible") is False: continue
        t=p.get("type")
        if t=="SOLID": out.append(hexof(p.get("color"), p.get("opacity",1)))
        elif "GRADIENT" in (t or ""):
            stops=[hexof(s.get("color")) for s in p.get("gradientStops",[])]
            out.append("%s(%s)" % (t.replace("GRADIENT_","").lower(), " -> ".join(stops)))
        elif t=="IMAGE": out.append("IMAGE:"+str(p.get("imageRef"))[:8])
    return ", ".join(x for x in out if x) or None

def walk(n, ox, oy, depth, lines, maxd):
    if n.get("visible") is False: return
    b = n.get("absoluteBoundingBox") or {}
    x = round(b.get("x",0)-ox); y = round(b.get("y",0)-oy)
    w = round(b.get("width",0)); h = round(b.get("height",0))
    ind = "  "*depth
    bits = ["%s%s [%s] %dx%d @%d,%d" % (ind, n.get("name","?"), n.get("type","")[:6], w,h,x,y)]
    st = n.get("style") or {}
    if n.get("type")=="TEXT":
        bits.append('%s  TEXT "%s"' % (ind, (n.get("characters","") or "").replace("\n"," / ")[:120]))
        bits.append("%s  font: %s %s %spx / lh %s / ls %s / align %s" % (
            ind, st.get("fontFamily"), st.get("fontWeight"), st.get("fontSize"),
            round(st.get("lineHeightPx",0)) if st.get("lineHeightPx") else st.get("lineHeightPercent"),
            round(st.get("letterSpacing",0),2), st.get("textAlignHorizontal")))
    f = paint(n.get("fills")); s = paint(n.get("strokes"))
    if f: bits.append("%s  fill: %s" % (ind, f))
    if s: bits.append("%s  stroke: %s %.1fpx" % (ind, s, n.get("strokeWeight",0) or 0))
    if n.get("cornerRadius"): bits.append("%s  radius: %s" % (ind, n["cornerRadius"]))
    if n.get("opacity") is not None and n["opacity"] < .999:
        bits.append("%s  opacity: %.2f" % (ind, n["opacity"]))
    for e in (n.get("effects") or []):
        if e.get("visible") is not False:
            bits.append("%s  effect: %s r=%s" % (ind, e.get("type"), round(e.get("radius",0))))
    lines.append("\n".join(bits))
    if depth < maxd:
        for c in (n.get("children") or []): walk(c, ox, oy, depth+1, lines, maxd)

if sys.argv[1] == "--img":
    ids = sys.argv[2:]
    r = api("images/%s?ids=%s&scale=2&format=png" % (KEY, urllib.parse.quote(",".join(ids))))
    os.makedirs(".fde/ref", exist_ok=True)
    for nid, url in (r.get("images") or {}).items():
        if not url: print("no render:", nid); continue
        fn = ".fde/ref/n%s.png" % nid.replace(":","-")
        subprocess.run(["curl","-sSL","-o",fn,url], check=True)
        print("saved", fn)
else:
    maxd = int(os.environ.get("DEPTH","6"))
    ids = sys.argv[1:]
    r = api("files/%s/nodes?ids=%s" % (KEY, urllib.parse.quote(",".join(ids))))
    for nid in ids:
        doc = (r["nodes"].get(nid) or {}).get("document")
        if not doc: print("!! missing", nid); continue
        b = doc.get("absoluteBoundingBox") or {}
        lines=[]; walk(doc, b.get("x",0), b.get("y",0), 0, lines, maxd)
        print("="*70); print("NODE", nid); print("="*70)
        print("\n".join(lines))
