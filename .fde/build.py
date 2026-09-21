import io, os
C = lambda n: open(f".fde/chrome/{n}.txt").read()

CHEV = ('<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
        'stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
        '<path d="M6 9l6 6 6-6"/></svg>')

# ---------- head ----------
head = C("head")
head = head.replace(
  "<title>AI Adoption &amp; Change Engineering | Searce</title>",
  "<title>Forward-Deployed Solver Squads | Searce</title>")
import re
head = re.sub(r'<meta name="description"[^>]*>',
  '<meta name="description" content="Forward-Deployed Solver Squads. A cohesive team built to '
  'solve one business problem as a unit. Not staffed roles filled against a rate card.">', head)

# ---------- nav: add the How-we-solve dropdown, FDE inside it ----------
nav = C("nav")
nav = nav.replace(
  '      <li><a href="#">How we solve</a></li>\n',
  '      <li class="has-dropdown">\n'
  '        <a href="#" aria-haspopup="true">How we solve\n'
  f'          {CHEV}\n'
  '        </a>\n'
  '        <div class="mega-panel">\n'
  '          <a class="mega-item" href="fde.html"><span class="mega-title">FDE</span></a>\n'
  '        </div>\n'
  '      </li>\n')
nav = nav.replace(
  '<li><a href="ai-adoption-change-engineering.html" class="current">Practices</a></li>',
  '<li><a href="ai-adoption-change-engineering.html">Practices</a></li>')
assert 'fde.html' in nav and nav.count('has-dropdown') == 2, "nav patch failed"

open(".fde/chrome/nav-fde.txt","w").write(nav)
open(".fde/chrome/head-fde.txt","w").write(head)
print("nav + head prepared;  has-dropdown count:", nav.count("has-dropdown"))
