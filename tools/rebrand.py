#!/usr/bin/env python3
"""Rebrand overtime -> CLOCKED by exact string replacement.
Each entry: (old, new, expected_total_count). Applied in order over all
*.html, *.js, *.css, *.svg, README.md under the site root. Asserts counts.
Run from the site root:  python3 tools/rebrand.py [--dry]
"""
import glob, sys, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DRY = '--dry' in sys.argv

# Placeholders (swap later with one find-and-replace, see CHANGES.md)
DOMAIN = 'clocked.fun'
TICKER = '$CLK'

PAIRS = [
# ---- domain (placeholder) ----
('overtime.fun', DOMAIN, 39),
# ---- ticker (placeholder) ----
('$OT', TICKER, 42),
# ---- hero / hooks ----
('Your agents<br>work overtime', 'Your agents<br>stay clocked in', 1),
('"Your agents",(0,r.jsx)("br",{}),"work overtime"', '"Your agents",(0,r.jsx)("br",{}),"stay clocked in"', 1),
# ---- ticker / graphics ----
('● OVERTIME NOW', '● CLOCKED IN', 7),
('fillText("OVERTIME NOW"', 'fillText("CLOCKED IN"', 1),
('fillText("overtime",10,100)', 'fillText("clocked",10,100)', 1),
('rotate(14 360 362)">overtime</text>', 'rotate(14 360 362)">clocked</text>', 7),
# ---- badges / labels ----
('OVERTIME · 24/7', 'ON THE CLOCK · 24/7', 8),
('OVERTIME AT $10K', 'CLOCK IN AT $10K', 2),
('"CREW ON OVERTIME":"OVERTIME STARTS AT $10K"', '"CREW ON THE CLOCK":"CLOCK STARTS AT $10K"', 1),
('"MOST OVERTIME"', '"MOST HOURS"', 1),
('"ON OVERTIME"', '"ON THE CLOCK"', 2),
('["$100K","OVERTIME"]', '["$100K","DOUBLE SHIFT"]', 1),
('05 OVERTIME', '05 CLOCK IN', 2),
# ---- launch steps / rungs ----
('<b>Go overtime.</b>', '<b>Clock in.</b>', 1),
('Launch a coin.<br>Go overtime<span', 'Launch a coin.<br>Clock in<span', 1),
('"Go overtime · Launch "', '"Clock in · Launch "', 1),
('"Starting overtime…"', '"Clocking in…"', 1),
('Overtime begins', 'The clock starts', 2),
('<b>$10K</b> overtime begins:', '<b>$10K</b> the clock starts:', 1),
('Double overtime', 'Double shift', 2),
('<b>$100K</b> double overtime:', '<b>$100K</b> a double shift:', 1),
("every rung adds hours to the crew's overtime", "every rung adds hours to the crew's shift", 1),
("every rung adds hours to their crew's overtime", "every rung adds hours to their crew's shift", 1),
("every rung adds hours to their crew’s overtime", "every rung adds hours to their crew’s shift", 1),
# ---- body copy ----
("the crew puts in overtime around the clock", "the crew works all night", 1),
('Its crew of AI agents works overtime from $10K', 'Its crew of AI agents stays on the clock from $10K', 1),
('Its crew of AI agents works overtime:', 'Its crew of AI agents stays on the clock:', 6),
('a crew that works overtime, from launch', 'a crew that stays on the clock, from launch', 1),
("your coin's crew works overtime", "your coin's crew stays on the clock", 3),
('its crew goes on overtime:', 'its crew clocks in:', 2),
('"is on overtime":"goes on overtime at $10K"', '"is on the clock":"clocks in at $10K"', 1),
('just went on overtime. Its crew', 'just clocked in. Its crew', 1),
('whose crews put in the most overtime', 'whose crews log the most hours', 1),
('the most overtime', 'the most hours', 0),
('Overtime<br>leaders', 'Clocked<br>leaders', 1),
('"Overtime",(0,r.jsx)("br",{}),"leaders"', '"Clocked",(0,r.jsx)("br",{}),"leaders"', 1),
('What a night of<br>overtime ships.', 'What a night on<br>the clock ships.', 1),
('"What a night of",(0,s.jsx)("br",{}),"overtime ships."', '"What a night on",(0,s.jsx)("br",{}),"the clock ships."', 1),
('All on overtime.', 'All on the clock.', 1),
('Every coin<br>on overtime<span', 'Every coin<br>on the clock<span', 1),
('"Every coin",(0,r.jsx)("br",{}),"on overtime"', '"Every coin",(0,r.jsx)("br",{}),"on the clock"', 1),
('Every coin on overtime gets', 'Every coin on clocked gets', 2),
('same six on overtime', 'same six on the clock', 2),
('a daily video, on overtime.', 'a daily video, on the clock.', 2),
('Put your coin on overtime', 'Put your coin on the clock', 2),
('with their crew on overtime', 'with their crew on the clock', 1),
("whose crew is on overtime", "whose crew is on the clock", 1),
('No coins on overtime yet.', 'No coins on the clock yet.', 1),
('Nobody is on overtime yet.', 'Nobody is on the clock yet.', 1),
('Nothing on overtime.', 'Nothing on the clock.', 1),
('The top coins on overtime by market cap', 'The top coins on clocked by market cap', 1),
('the crew is on overtime. you can sleep.', 'the crew is on the clock. you can sleep.', 1),
('the crew is on overtime</div>', 'the crew is on the clock</div>', 1),
('"on overtime","for"', '"on the clock","for"', 1),
('"gm from overtime"', '"gm from clocked"', 1),
('no days off. only overtime.', 'no days off. only the clock.', 1),
("we don't take breaks, we take overtime.", "we don't take breaks, we clock in.", 1),
('"still up","overtime","up only"', '"still up","on the clock","up only"', 1),
('"#overtime"', '"#clocked"', 1),
('Some clock out. Put your coin on overtime.', 'Some clock out. Put your coin on the clock.', 0),
('switch to the ",j?"day":"overtime"," mode', 'switch to the ",j?"day":"night"," mode', 1),
# ---- brand: sentence-case / lowercase wordmark ----
('The overtime treasury', 'The clocked treasury', 1),
('the overtime account', 'the clocked account', 1),
('Back to overtime', 'Back to clocked', 1),
('its overtime page', 'its clocked page', 2),
('What is<br>overtime<span', 'What is<br>clocked<span', 1),
('What is overtime', 'What is clocked', 2),
('<p>overtime is a launchpad', '<p>clocked is a launchpad', 1),
('; overtime never sees', '; clocked never sees', 2),
('<p>overtime never sees', '<p>clocked never sees', 1),
('"gm from overtime"', '"gm from clocked"', 0),
('"overtime on X"', '"clocked on X"', 9),
('aria-label="overtime"', 'aria-label="clocked"', 8),
('</svg></span>overtime</a>', '</svg></span>clocked</a>', 8),
('"aria-label":"overtime"', '"aria-label":"clocked"', 1),
('alt:"overtime"', 'alt:"clocked"', 1),
('"overtime"]}),(0,r.jsxs)("nav"', '"clocked"]}),(0,r.jsxs)("nav"', 1),
('# overtime', '# clocked', 1),
('· overtime</title>', '· clocked</title>', 8),
('· overtime</div>', '· clocked</div>', 0),
('og:site_name" content="overtime"', 'og:site_name" content="clocked"', 1),
('og:title" content="overtime"', 'og:title" content="clocked"', 1),
('twitter:title" content="overtime"', 'twitter:title" content="clocked"', 1),
('overtime · some clock out', 'clocked · some clock out', 3),
# ---- JSON-escaped flight payload (index.html) + misc ----
('\\"og:title\\",\\"content\\":\\"overtime\\"', '\\"og:title\\",\\"content\\":\\"clocked\\"', 1),
('\\"og:site_name\\",\\"content\\":\\"overtime\\"', '\\"og:site_name\\",\\"content\\":\\"clocked\\"', 1),
('\\"twitter:title\\",\\"content\\":\\"overtime\\"', '\\"twitter:title\\",\\"content\\":\\"clocked\\"', 1),
('on your overtime account', 'on your clocked account', 1),
('/* Overtime sub-pages', '/* Clocked sub-pages', 1),
# ---- internal nav links: make root-relative so they work locally and on any host ----
('href="https://clocked.fun/launch"', 'href="/launch"', 2),
('href="https://clocked.fun/coins"', 'href="/coins"', 1),
('href="https://clocked.fun/crew"', 'href="/crew"', 1),
('href="https://clocked.fun/milestones"', 'href="/milestones"', 1),
('href="https://clocked.fun/flywheel"', 'href="/flywheel"', 1),
('href="https://clocked.fun/leaderboard"', 'href="/leaderboard"', 1),
('href="https://clocked.fun/docs"', 'href="/docs"', 2),
('href="https://clocked.fun/#board"', 'href="/#board"', 1),
('href="https://clocked.fun/"', 'href="/"', 2),
]

FILES = [f for f in glob.glob(os.path.join(ROOT, '**', '*'), recursive=True)
         if f.endswith(('.html', '.js', '.css', '.svg', '.md'))
         and '/qa/' not in f and '/tools/' not in f and not f.endswith('CHANGES.md')]
data = {f: open(f, encoding='utf8').read() for f in FILES}
bad = 0
for old, new, expected in PAIRS:
    n = 0
    for f in FILES:
        c = data[f].count(old)
        if c:
            n += c
            data[f] = data[f].replace(old, new)
    ok = (n == expected)
    if not ok:
        bad += 1
    print(('ok   ' if ok else 'FAIL ') + f'{n:3d}/{expected:<3d} {old[:70]!r}')
if bad:
    sys.exit(f'{bad} pair(s) with unexpected counts; nothing written')
if not DRY:
    for f in FILES:
        open(f, 'w', encoding='utf8').write(data[f])
    print('written')
