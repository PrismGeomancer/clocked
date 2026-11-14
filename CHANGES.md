# CHANGES: overtime -> CLOCKED

Re-run: `python3 tools/rebrand.py` on a fresh copy (asserts exact counts; `--dry` to preview).

## Placeholders (swap later with one find-and-replace)
- Domain `clocked.fun` (39 occurrences: canonical/og/icon URLs, nav and footer links, example tile URLs like clocked.fun/mochi, the launch preview "clocked.fun/ticker", share links).
- Ticker `$CLK` (42 occurrences: "paired with $CLK", coin pair labels, flywheel diagram, docs, fee labels).
  To change: replace `clocked.fun` and `$CLK` across *.html, *.js, README.md. The tickers contain no "$"-leading payload strings, so no `$$` escaping was needed.

## Left unchanged
- API paths `/api/...`, wallet/mint/program addresses (none contained the brand).
- CSS class names, localStorage keys, event names.
- Minified identifiers that merely contain "ot"/"OT" (e.g. `oT`, `.OT`, `FarcasterSignerInitInput`) and base64 blobs.
- Six agents, $10K threshold, 15-minute cadence, fee flow, the ⇧ key and its hint text.
  Exception: the day-state hint said "switch to the overtime mode" (old name of night mode); changed to "night mode".
- Existing hydration error #418 appears on every page in the baseline too (46 occurrences); it is unchanged by the rebrand.

## Needs my input (external links, not changed)
- https://x.com/overtimeagent_ (NEXT_PUBLIC_X_URL default in bundle 1qchkddf4806h.js; nav/footer in index, crew, launch, coins)
- https://x.com/useOvertime (nav/footer in crew, flywheel, coins, leaderboard, milestones, docs, index)
- Any t.me / github / dexscreener / pump.fun / docs links remain as in the original; add real handles for CLOCKED.
