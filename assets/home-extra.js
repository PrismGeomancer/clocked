/* Home page structure: adds "How it works" before Examples and a closing CTA after The crew.
   Runs after hydration so React markup is untouched. Uses site CSS variables (day/night aware). */
(function () {
  var css = '' +
    '.hx-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;position:relative;padding-top:34px}' +
    '.hx-steps:before{content:"";position:absolute;left:0;right:0;top:9px;height:2px;background:linear-gradient(90deg,var(--hi) 0 25%,var(--line) 25%)}' +
    '.hx-steps:after{content:"";position:absolute;top:8px;left:0;width:48px;height:4px;border-radius:4px;background:var(--hi);box-shadow:0 0 14px var(--hi);animation:hxrun 6s linear infinite}' +
    '@keyframes hxrun{from{left:0}to{left:calc(100% - 48px)}}' +
    '@media(prefers-reduced-motion:reduce){.hx-steps:after{animation:none;display:none}}' +
    '.hx-step{padding:24px 22px 24px;position:relative;transition:transform .2s,border-color .2s}' +
    '.hx-step:hover{transform:translateY(-4px);border-color:var(--hi)}' +
    '.hx-step:before{content:"";position:absolute;top:-30px;left:22px;width:12px;height:12px;border-radius:50%;background:var(--bg);border:2px solid var(--hi)}' +
    '.hx-step.on:before{background:var(--hi);box-shadow:0 0 0 5px color-mix(in srgb,var(--hi) 22%,transparent)}' +
    '.hx-step .n{font:500 12px GeistMono,monospace;letter-spacing:.16em;color:var(--hi)}' +
    '.hx-step b{display:block;font-size:24px;font-weight:600;margin:12px 0 8px;letter-spacing:-.02em}' +
    '.hx-step p{margin:0 0 18px;color:var(--mute);font-size:15px;line-height:1.5}' +
    '.hx-step .m{display:inline-block;font:500 11px GeistMono,monospace;letter-spacing:.12em;border:1px solid var(--line);border-radius:999px;padding:5px 10px;color:var(--ink)}' +
    '.hx-sec{margin:96px 0 0}' +
    '.hx-cta{margin:120px 0 72px;padding:56px 40px;text-align:center}' +
    '.hx-cta h2{font-size:clamp(34px,5vw,56px);line-height:1.02;letter-spacing:-.03em;margin:0 0 14px;font-weight:600}' +
    '.hx-cta p{color:var(--mute);margin:0 auto 28px;max-width:520px;font-size:17px;line-height:1.5}' +
    '.hx-cta .row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}' +
    '.hx-cta .btn.ghost{border:1px solid var(--line);color:var(--ink)}' +
    '.hx-links{display:flex;gap:8px 22px;justify-content:center;flex-wrap:wrap;margin-top:34px;font:500 12px GeistMono,monospace;letter-spacing:.14em;text-transform:uppercase}' +
    '.hx-links a{color:var(--mute)}.hx-links a:hover{color:var(--ink)}' +
    '@media(max-width:900px){.hx-steps{grid-template-columns:repeat(2,1fr);padding-top:0}.hx-steps:before,.hx-steps:after,.hx-step:before{display:none}}' +
    '@media(max-width:560px){.hx-steps{grid-template-columns:1fr}.hx-sec{margin-top:72px}.hx-cta{padding:40px 22px;margin-top:80px}}';
  var how = '<section class="hx-sec" id="how"><div class="sh"><div><div class="label">How it works</div><h2>Launch in a minute.<br>On the clock by $10K.</h2></div>' +
    '<p>One signature in your wallet. After that the crew runs on its own, every coin, every night.</p></div>' +
    '<div class="hx-steps">' +
    step('01', 'Launch', 'Pick a name, ticker and image. Sign once; the coin goes live on pump.fun.', '1 SIGNATURE') +
    step('02', 'Pair', 'Every coin trades against $CLK, so each buy feeds the same treasury.', 'PAIRED WITH $CLK') +
    step('03', 'Clock in', 'At $10K the six agents start: memes, posts, a site and a daily video.', 'AT $10K', 1) +
    step('04', 'Ship', 'Every fifteen minutes fees are collected. Each milestone adds hours to the shift.', 'EVERY 15 MIN') +
    '</div></section>';
  var cta = '<section class="hx-cta panel" id="start"><div class="label">Your turn</div><h2>Put your coin<br>on the clock.</h2>' +
    '<p>Launch in a minute. The crew takes it from there.</p>' +
    '<div class="row"><a class="btn solid" href="/launch">Launch a coin <span>↗</span></a><a class="btn ghost" href="/docs">Read the docs</a></div>' +
    '<div class="hx-links"><a href="/coins">Coins</a><a href="/crew">Crew</a><a href="/milestones">Milestones</a><a href="/flywheel">Flywheel</a><a href="/leaderboard">Leaderboard</a></div></section>';
  function step(n, t, d, m, on) { return '<div class="panel hx-step' + (on ? ' on' : '') + '"><span class="n">' + n + '</span><b>' + t + '</b><p>' + d + '</p><span class="m">' + m + '</span></div>'; }
  function run() {
    var board = document.getElementById('board');
    if (!board || document.getElementById('how')) return !!document.getElementById('how');
    if (!document.getElementById('hx-style')) { var s = document.createElement('style'); s.id = 'hx-style'; s.textContent = css; document.head.appendChild(s); }
    board.insertAdjacentHTML('beforebegin', how);
    var page = board.parentNode; page.insertAdjacentHTML('beforeend', cta);
    return true;
  }
  var tries = 0, t = setInterval(function () { if (run() || ++tries > 60) clearInterval(t); }, 250);
})();
