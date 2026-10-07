/* Searce navbar (shared by all industry pages). Include as the first element inside <body>:
   <script src="assets/searce-nav.js" data-theme="dark|light" data-current="<industry key>"></script>
   It writes the bar, the four mega panels and the mobile drawer, then wires hover/click/keyboard. */
(function(){
  var me = document.currentScript;
  var theme = (me && me.getAttribute('data-theme')) || 'dark';
  var current = (me && me.getAttribute('data-current')) || '';

  var IMG = 'https://assets.searce.com/nextjs-assets/FeaturedSectionMenu/';
  var FEAT_CASE = {t:'Searce helps Redcliffe Labs Improve the Cloud Security Posture', img:IMG+'services.webp',
    d:'By leveraging Google’s SCC and Cloud Armor, Searce helped Redcliffe Labs improve its cloud security posture and significantly reduce the risk of application attacks.',
    cta:'Read more', href:'#'};
  var MENUS = [
    {id:'solve', label:'how we solve', feat:FEAT_CASE, links:[
      {t:'AI Outcome Engineering', d:'Agree the outcome first, engineer everything that moves it', href:'#'},
      {t:'Forward-Deployed Solver Squads', d:'One squad, one owner, one accountable outcome', href:'#'}]},
    {id:'practices', label:'practices', feat:FEAT_CASE, links:[
      {t:'AI Outcome Engineering', d:'Operations that think, learn, and execute', href:'business-systems-engineering.html'},
      {t:'AI Adoption & Change Engineering', d:'Intelligent Work Ops, AI-superpowered Productivity & Collaboration', href:'ai-adoption-change-engineering.html'},
      {t:'AI Trust & Resilience Engineering', d:'Cloud, Data & AI Security with Modern Managed Services', href:'ai-trust-resilience-engineering.html'},
      {t:'Cloud & AI Platform Engineering', d:'AI-superpowered Cloud, Data & App Mod', href:'ai-ready-platform-engineering.html'}]},
    {id:'industries', label:'industries', feat:{t:'Proud to be a trusted partner for Xtelify with Google Cloud', img:IMG+'industries.webp',
      d:'Helping Xtelify (erstwhile Airtel Digital) migrate to Google Cloud was both an exciting opportunity and a big responsibility. Hear directly from Hitesh Bhatia, AVP Engineering at Xtelify, on how this partnership unfolded.',
      cta:'Watch here', href:'https://youtu.be/STRtc9f1RWU?feature=shared', ext:true}, links:[
      {k:'fsi',  t:'financial services & insurance', d:'Autonomous Workflows. Zero-Trust Security. Instant Settlement.', href:'financial-services-and-insurance-v5.html'},
      {k:'hls',  t:'healthcare & life sciences', d:'AI-Native. Patient-Centric. Compliance-First.', href:'hls-v5.html'},
      {k:'ttl',  t:'travel, transportation & logistics', d:'Real-time routing, AI-Native Billing.', href:'travel-transportation-and-logistics-v5.html'},
      {k:'rcpg', t:'retail, CPG & e-commerce', d:'AI-Native. Consumer-Centric. Demand-Driven.', href:'retail-cpg-and-ecommerce-v5.html'},
      {k:'tmeg', t:'telecommunication, media, entertainment & gaming', d:'Engineering the future of connectivity, content, and play', href:'telecommunications-media-entertainment-and-gaming-v5.html'},
      {k:'mic',  t:'manufacturing, industrials & construction', d:'Predictive Maintenance. AI Visual Quality. Synchronous Supply Chains.', href:'manufacturing-industrials-and-construction-v5.html'},
      {k:'tss',  t:'technology, software & services', d:'Predictive Revenue Engines. Refactored Delivery. Synchronous Growth.', href:'technology-software-and-services%20V5.html'},
      {k:'nreu', t:'natural resources, energy & utilities', d:'Autonomous Grids. Zero-Trust Asset Security. Real-time Yield Optimization.', href:'natural-resources-energy-and-utilities-v5.html'},
      {k:'psed', t:'public sector & education', d:'Autonomous Adjudication. Student Success. Agentic Governance.', href:'public-sector-and-education-v5.html'}]},
    {id:'insights', label:'insights', href:'#'},
    {id:'company', label:'company', feat:FEAT_CASE, links:[
      {t:'who we are', d:'The people, values, and history behind Searce', href:'who-we-are.html'},
      {t:'partners', d:'Premier partnerships powering AI-native solutions across every platform', href:'#'},
      {t:'careers', d:'Gain a decade of wisdom in 1,000 days', href:'join-us.html'},
      {t:'futurify.ai', d:'The business engineering company', href:'https://futurify.ai', ext:true}]}
  ];

  var esc = function(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); };
  var ext = function(o){ return o.ext ? ' target="_blank" rel="noopener"' : ''; };
  var CHEV = '<svg class="snav-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  var RIGHT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';
  var ARROW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
  var SEARCH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>';
  var BURGER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  var CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  var LOGO = '<svg viewBox="0 0 272 63" aria-hidden="true"><path class="snav-word" d="M7.035 29.79c0-4.644 4.554-6.793 9.027-6.793 4.125 0 8.508 1.633 10.311 6.02l4.728-2.753c-2.492-5.332-7.99-8.77-15.036-8.77-8.59 0-14.692 5.417-14.692 12.297 0 15.823 25.088 9.716 25.088 20.382 0 5.075-4.81 6.88-9.88 6.88-5.757 0-10.216-2.84-11.77-7.225L0 52.665c2.138 5.506 7.99 9.89 16.58 9.89 9.194 0 15.552-5.072 15.552-12.382-.01-15.824-25.097-9.72-25.097-20.382z"/><path d="M261.723 0a10.261 10.261 0 00-9.475 6.352 10.278 10.278 0 007.489 14.003 10.268 10.268 0 0012.264-10.079 10.289 10.289 0 00-3.015-7.267A10.272 10.272 0 00261.723 0zm0 15.013a4.728 4.728 0 01-4.372-2.925A4.74 4.74 0 01260.8 5.63a4.727 4.727 0 014.858 2.014c.52.779.798 1.695.798 2.632a4.738 4.738 0 01-4.733 4.737z" fill="#0064FF"/><path class="snav-word" d="M164.517 17.48a22.458 22.458 0 00-16.994 7.771v-6.658h-5.533v42.87h5.533V40.028a17.039 17.039 0 014.987-12.017 17.002 17.002 0 0112.007-4.984V17.48zm-38.625 7.773a22.505 22.505 0 00-24.894-6.349 22.53 22.53 0 00-10.627 8.267 22.564 22.564 0 000 25.715 22.53 22.53 0 0010.627 8.268 22.506 22.506 0 0024.894-6.349v6.659h5.534v-42.87h-5.534v6.659zm-16.991 31.783c-3.361 0-6.647-.997-9.442-2.866a17.007 17.007 0 01-6.26-7.635 17.026 17.026 0 013.684-18.539 16.99 16.99 0 0118.522-3.685 17 17 0 017.626 6.267 17.027 17.027 0 012.861 9.452 17.03 17.03 0 01-4.983 12.02 17 17 0 01-12.008 4.986zm-49.721-.002a16.995 16.995 0 01-8.668-2.384 17.017 17.017 0 01-6.244-6.474h-6.084a22.531 22.531 0 007.349 9.784 22.497 22.497 0 0032.577-5.742l-4.768-2.794a16.99 16.99 0 01-14.162 7.61zm0-39.554a22.467 22.467 0 00-16.843 7.54 22.514 22.514 0 00-5.534 17.62l.02.157h44.704s0-.071.023-.157A22.578 22.578 0 0076 25.041a22.537 22.537 0 00-16.82-7.561zM42.415 37.258a17.012 17.012 0 015.772-10.198 16.981 16.981 0 0121.985 0 17.012 17.012 0 015.772 10.198h-33.53zm189.14 19.779a16.995 16.995 0 01-8.667-2.384 17.015 17.015 0 01-6.243-6.472h-6.084a22.523 22.523 0 007.349 9.784 22.498 22.498 0 0023.419 2.371 22.518 22.518 0 009.158-8.113l-4.77-2.796a16.997 16.997 0 01-6.125 5.588 16.968 16.968 0 01-8.037 2.022zm.001-39.557a22.47 22.47 0 00-16.838 7.544 22.519 22.519 0 00-5.532 17.616l.019.157h44.697s0-.071.024-.157a22.582 22.582 0 00-5.551-17.599 22.54 22.54 0 00-16.819-7.561zm-16.765 19.778a17.009 17.009 0 015.771-10.198 16.982 16.982 0 0121.986 0 17.014 17.014 0 015.771 10.198h-33.528zM185.72 57.034a16.98 16.98 0 01-8.464-2.256 17.008 17.008 0 01-8.536-14.633c-.021-2.973.737-5.9 2.197-8.488a17.002 17.002 0 0114.56-8.642 16.998 16.998 0 0114.794 8.234l4.792-2.752a22.532 22.532 0 00-10.963-9.389 22.509 22.509 0 00-14.406-.805 22.53 22.53 0 00-11.94 8.109 22.566 22.566 0 00.088 27.364 22.51 22.51 0 0026.392 7.134 22.535 22.535 0 0010.903-9.46l-4.78-2.784a17.002 17.002 0 01-14.637 8.368z"/></svg>';

  var linkHTML = function(l, cls){
    var cur = (l.k && l.k === current) ? ' is-current' : '';
    return '<a class="'+cls+cur+'" href="'+l.href+'"'+ext(l)+(cur?' aria-current="page"':'')+'><span class="snav-link-t">'+esc(l.t)+'</span><span class="snav-link-d">'+esc(l.d)+'</span></a>';
  };

  var items = MENUS.map(function(m){
    if(!m.links) return '<li class="snav-item"><a href="'+m.href+'"><span class="snav-label">'+m.label+'</span></a></li>';
    return '<li class="snav-item" data-menu="'+m.id+'"><button type="button" aria-expanded="false" aria-controls="snav-p-'+m.id+'"><span class="snav-label">'+m.label+'</span>'+CHEV+'</button></li>';
  }).join('');

  var panels = MENUS.filter(function(m){return m.links;}).map(function(m){
    var f = m.feat;
    return '<div class="snav-panel" id="snav-p-'+m.id+'" data-panel="'+m.id+'"><div class="snav-panel-inner">'
      + '<div class="snav-links">'+m.links.map(function(l){return linkHTML(l,'snav-link');}).join('')+'</div>'
      + '<div class="snav-feat"><p class="snav-feat-t">'+esc(f.t)+'</p><div class="snav-feat-b"><img src="'+f.img+'" alt=""><p>'+esc(f.d)+'</p></div>'
      + '<a class="snav-feat-cta" href="'+f.href+'"'+ext(f)+'>'+f.cta+'<i>'+ARROW+'</i></a></div>'
      + '</div></div>';
  }).join('');

  var drawerMain = '<div class="snav-dview" data-view="main">' + MENUS.map(function(m){
    return m.links
      ? '<button type="button" class="snav-drow" data-open="'+m.id+'">'+m.label+RIGHT+'</button>'
      : '<a class="snav-drow" href="'+m.href+'">'+m.label+RIGHT+'</a>';
  }).join('') + '<a class="snav-dcta" href="#connect">Let’s Connect</a></div>';
  var drawerSubs = MENUS.filter(function(m){return m.links;}).map(function(m){
    return '<div class="snav-dview" data-view="'+m.id+'" hidden><button type="button" class="snav-dback" data-back>'+RIGHT+m.label+'</button>'
      + m.links.map(function(l){return linkHTML(l,'snav-dlink');}).join('') + '</div>';
  }).join('');

  var html = '<nav class="snav" data-theme="'+theme+'" aria-label="Primary navigation">'
    + '<div class="snav-bar">'
    +   '<button type="button" class="snav-burger" aria-label="Open navigation menu" aria-expanded="false">'+BURGER+'</button>'
    +   '<a class="snav-logo" href="index.html" aria-label="Searce home">'+LOGO+'</a>'
    +   '<ul class="snav-menu">'+items+'</ul>'
    +   '<div class="snav-actions"><a class="snav-cta" href="#connect">Let’s Connect</a><button type="button" class="snav-search" aria-label="Search">'+SEARCH+'</button></div>'
    + '</div>'
    + panels
    + '<div class="snav-drawer" aria-label="Navigation menu">'+drawerMain+drawerSubs+'</div>'
    + '</nav><div class="snav-scrim" aria-hidden="true"></div>';

  if(me && me.parentNode){ me.insertAdjacentHTML('afterend', html); } else { document.body.insertAdjacentHTML('afterbegin', html); }

  var nav = document.querySelector('.snav'), scrim = document.querySelector('.snav-scrim');
  var openId = null, closeT = null;
  var item = function(id){ return nav.querySelector('.snav-item[data-menu="'+id+'"]'); };
  var panel = function(id){ return nav.querySelector('.snav-panel[data-panel="'+id+'"]'); };
  function open(id){
    clearTimeout(closeT);
    if(openId === id) return;
    if(openId){ item(openId).classList.remove('is-open'); item(openId).querySelector('button').setAttribute('aria-expanded','false'); panel(openId).classList.remove('is-open'); }
    openId = id;
    item(id).classList.add('is-open'); item(id).querySelector('button').setAttribute('aria-expanded','true'); panel(id).classList.add('is-open');
    nav.classList.add('is-menu'); scrim.classList.add('is-on');
  }
  function close(){
    if(!openId) return;
    item(openId).classList.remove('is-open'); item(openId).querySelector('button').setAttribute('aria-expanded','false'); panel(openId).classList.remove('is-open');
    openId = null; nav.classList.remove('is-menu'); scrim.classList.remove('is-on');
  }
  var later = function(){ clearTimeout(closeT); closeT = setTimeout(close, 180); };
  nav.querySelectorAll('.snav-item[data-menu]').forEach(function(li){
    var id = li.getAttribute('data-menu');
    li.addEventListener('mouseenter', function(){ if(matchMedia('(hover:hover)').matches) open(id); });
    li.querySelector('button').addEventListener('click', function(){ openId === id ? close() : open(id); });
  });
  nav.querySelectorAll('.snav-item:not([data-menu])').forEach(function(li){ li.addEventListener('mouseenter', later); });
  nav.addEventListener('mouseleave', later);
  nav.querySelectorAll('.snav-panel').forEach(function(p){ p.addEventListener('mouseenter', function(){ clearTimeout(closeT); }); });
  scrim.addEventListener('click', close);
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape'){ close(); setDrawer(false); } });

  /* solid bar once the page scrolls */
  var onScroll = function(){ nav.classList.toggle('is-solid', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  /* mobile drawer with drill-in submenus */
  var burger = nav.querySelector('.snav-burger');
  function showView(v){ nav.querySelectorAll('.snav-dview').forEach(function(d){ d.hidden = d.getAttribute('data-view') !== v; }); nav.querySelector('.snav-drawer').scrollTop = 0; }
  function setDrawer(on){
    nav.classList.toggle('is-drawer', on);
    burger.setAttribute('aria-expanded', on ? 'true' : 'false');
    burger.setAttribute('aria-label', on ? 'Close navigation menu' : 'Open navigation menu');
    burger.innerHTML = on ? CLOSE : BURGER;
    document.documentElement.style.overflow = on ? 'hidden' : '';
    if(!on) showView('main');
  }
  burger.addEventListener('click', function(){ setDrawer(!nav.classList.contains('is-drawer')); });
  nav.querySelectorAll('[data-open]').forEach(function(b){ b.addEventListener('click', function(){ showView(b.getAttribute('data-open')); }); });
  nav.querySelectorAll('[data-back]').forEach(function(b){ b.addEventListener('click', function(){ showView('main'); }); });
  nav.querySelectorAll('.snav-drawer a').forEach(function(a){ a.addEventListener('click', function(){ setDrawer(false); }); });
  window.addEventListener('resize', function(){ if(window.innerWidth >= 1024 && nav.classList.contains('is-drawer')) setDrawer(false); });
})();
