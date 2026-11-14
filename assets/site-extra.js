/* Replaces the sparse footer with a structured one on every page. Runs after hydration. */
(function () {
  var css = '' +
    'footer.fx{display:block;margin-top:auto;padding:0;border-top:0;background:var(--bg2)}' +
    'footer.fx .fx-in{max-width:1180px;margin:0 auto;padding:72px 24px 40px;display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:48px}' +
    'footer.fx .fx-logo{display:flex;align-items:center;gap:14px;font-size:26px;font-weight:700;letter-spacing:.04em;text-transform:uppercase}' +
    'footer.fx .fx-mark{width:48px;height:47px;flex:none;background:url(/logo-white.svg) center/contain no-repeat}' +
    'html[data-shift="day"] footer.fx .fx-mark{background-image:url(/logo-black.svg)}' +
    'footer.fx .fx-brand p{margin:18px 0 24px;color:var(--mute);font-size:16px;line-height:1.55;max-width:320px}' +
    'footer.fx .fx-cta{display:inline-flex;align-items:center;gap:8px;height:44px;padding:0 20px;border-radius:12px;background:var(--ink);color:var(--bg);font-size:15px;font-weight:500}' +
    'footer.fx h4{margin:6px 0 18px;font:500 12px GeistMono,monospace;letter-spacing:.16em;text-transform:uppercase;color:var(--mute)}' +
    'footer.fx ul{list-style:none;margin:0;padding:0;display:grid;gap:12px}' +
    'footer.fx li a{color:var(--ink);font-size:15px;opacity:.8;transition:opacity .15s,color .15s}footer.fx li a:hover{opacity:1;color:var(--hi)}' +
    'footer.fx .fx-x{display:inline-flex;align-items:center;gap:10px;font-family:GeistMono,monospace;letter-spacing:.12em;font-size:13px}' +
    'footer.fx .fx-bot{max-width:1180px;margin:0 auto;padding:12px 24px 36px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;color:var(--mute);font-size:13px}' +
    'footer.fx .fx-bot .fxst{display:inline-flex;align-items:center;gap:8px;font:500 11px GeistMono,monospace;letter-spacing:.14em}' +
    'footer.fx .fx-bot .fxst i{width:7px;height:7px;border-radius:50%;background:var(--up);box-shadow:0 0 10px var(--up)}' +
    '@media(max-width:820px){footer.fx .fx-in{grid-template-columns:1fr 1fr;padding-top:52px;gap:36px 24px}footer.fx .fx-brand{grid-column:1/-1}}';
  function list(items) { return '<ul>' + items.map(function (i) { return '<li><a href="' + i[1] + '">' + i[0] + '</a></li>'; }).join('') + '</ul>'; }
  function run() {
    var f = document.querySelector('body > footer');
    if (!f || f.classList.contains('fx')) return !!f;
    var x = f.querySelector('a[href^="https://x.com"]'); var xh = x ? x.getAttribute('href') : 'https://x.com';
    var sv = x && x.querySelector('svg'); var icon = sv ? sv.outerHTML : '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.7 8 10.3h-6.2l-4.9-6.3L5.4 21H2.3l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z"/></svg>';
    var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
    f.className = 'fx';
    f.innerHTML = '<div class="fx-in">' +
      '<div class="fx-brand"><div class="fx-logo"><span class="fx-mark"></span>clocked</div><p>Some clock out. Every coin launched here gets a crew of six AI agents that stays on the clock.</p><a class="fx-cta" href="/launch">Launch a coin <span>↗</span></a></div>' +
      '<div><h4>Product</h4>' + list([['Launch a coin', '/launch'], ['Coins', '/coins'], ['Leaderboard', '/leaderboard']]) + '</div>' +
      '<div><h4>Learn</h4>' + list([['The crew', '/crew'], ['Milestones', '/milestones'], ['Flywheel', '/flywheel'], ['Docs', '/docs']]) + '</div>' +
      '<div><h4>Follow</h4><ul><li><a class="fx-x" href="' + xh + '" target="_blank" rel="noreferrer">' + icon + 'TWITTER</a></li></ul></div></div>' +
      '<div class="fx-bot"><span>© 2026 CLOCKED</span><span class="fxst"><i></i>ON THE CLOCK · 24/7</span></div>';
    return true;
  }
  var n = 0, t = setInterval(function () { if (run() || ++n > 60) clearInterval(t); }, 250);
})();
