/* Replaces the sparse footer with a structured one on every page. Runs after hydration. */
(function () {
  var css = '' +
    'footer.fx{display:block;margin-top:auto;padding:0;border-top:0}' +
    'footer.fx .fx-in{max-width:1180px;margin:0 auto;padding:56px 24px 28px;display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:40px}' +
    'footer.fx .fx-brand b{display:block;font-size:22px;letter-spacing:-.02em;font-weight:600}' +
    'footer.fx .fx-brand p{margin:10px 0 0;color:var(--mute);font-size:15px;line-height:1.5;max-width:300px}' +
    'footer.fx h4{margin:0 0 14px;font:500 12px GeistMono,monospace;letter-spacing:.16em;text-transform:uppercase;color:var(--mute)}' +
    'footer.fx ul{list-style:none;margin:0;padding:0;display:grid;gap:10px}' +
    'footer.fx li a{color:var(--ink);font-size:15px;opacity:.85}footer.fx li a:hover{opacity:1;color:var(--hi)}' +
    'footer.fx .fx-x{display:inline-flex;align-items:center;gap:8px}' +
    'footer.fx .fx-bot{max-width:1180px;margin:0 auto;padding:20px 24px 32px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;color:var(--mute);font-size:13px}' +
    '@media(max-width:820px){footer.fx .fx-in{grid-template-columns:1fr 1fr;padding-top:44px}footer.fx .fx-brand{grid-column:1/-1}}' +
    '@media(max-width:420px){footer.fx .fx-in{grid-template-columns:1fr 1fr;gap:28px 20px}}';
  function list(items) { return '<ul>' + items.map(function (i) { return '<li><a href="' + i[1] + '">' + i[0] + '</a></li>'; }).join('') + '</ul>'; }
  function run() {
    var f = document.querySelector('body > footer');
    if (!f || f.classList.contains('fx')) return !!f;
    var x = f.querySelector('a[href^="https://x.com"]'); var xh = x ? x.getAttribute('href') : 'https://x.com';
    var sv = x && x.querySelector('svg'); var icon = sv ? sv.outerHTML : '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.7 8 10.3h-6.2l-4.9-6.3L5.4 21H2.3l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z"/></svg>';
    var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
    f.className = 'fx';
    f.innerHTML = '<div class="fx-in">' +
      '<div class="fx-brand"><b>clocked</b><p>Some clock out. Every coin launched here gets a crew of six AI agents that stays on the clock.</p></div>' +
      '<div><h4>Product</h4>' + list([['Launch a coin', '/launch'], ['Coins', '/coins'], ['Leaderboard', '/leaderboard']]) + '</div>' +
      '<div><h4>Learn</h4>' + list([['The crew', '/crew'], ['Milestones', '/milestones'], ['Flywheel', '/flywheel'], ['Docs', '/docs']]) + '</div>' +
      '<div><h4>Follow</h4><ul><li><a class="fx-x" href="' + xh + '" target="_blank" rel="noreferrer">' + icon + 'X</a></li></ul></div></div>' +
      '<div class="fx-bot"><span>© 2026 clocked.fun</span></div>';
    return true;
  }
  var n = 0, t = setInterval(function () { if (run() || ++n > 60) clearInterval(t); }, 250);
})();
