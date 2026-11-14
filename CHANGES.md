# CHANGES: overtime -> CLOCKED

Re-run: `python3 tools/rebrand.py` on a fresh copy (asserts exact counts; `--dry` to preview).

## Placeholders (swap later with one find-and-replace)
- Domain `clocked.fun` (39 occurrences: canonical/og/icon URLs, nav and footer links, example tile URLs like clocked.fun/mochi, the launch preview "clocked.fun/ticker", share links).
- Ticker `$CLOCKED` (final; 42+ occurrences: "paired with $CLOCKED", coin pair labels, flywheel diagram, docs, fee labels).
  To change: replace `clocked.fun` and `$CLOCKED` across *.html, *.js, README.md. The tickers contain no "$"-leading payload strings, so no `$$` escaping was needed.

## Left unchanged
- API paths `/api/...`, wallet/mint/program addresses (none contained the brand).
- CSS class names, localStorage keys, event names.
- Minified identifiers that merely contain "ot"/"OT" (e.g. `oT`, `.OT`, `FarcasterSignerInitInput`) and base64 blobs.
- Six agents, $10K threshold, 15-minute cadence, fee flow, the ⇧ key and its hint text.
  Exception: the day-state hint said "switch to the overtime mode" (old name of night mode); changed to "night mode".
- Existing hydration error #418 appears on every page in the baseline too (46 occurrences); it is unchanged by the rebrand.

## Needs my input (external links, not changed)
- X link is now https://x.com/Clocked_agent everywhere (nav, footer, bundle default).
- Any t.me / github / dexscreener / pump.fun / docs links remain as in the original; add real handles for CLOCKED.

## Added after the first pass
- `tools/serve.py`: local server with clean URLs (`/launch` -> launch.html). Run `python3 tools/serve.py 8000`. Plain `python3 -m http.server` cannot resolve the nav routes.
- Nav links on the home page are now root-relative (`/launch`, ...) instead of pointing at the placeholder domain.
- Home page structure: `assets/home-extra.js` (loaded by index.html) adds a "How it works" section before Examples and a closing "Put your coin on the clock" CTA after The crew. It runs after hydration, so React markup is untouched. It contains the `$CLOCKED` placeholder once.
- Open the home page at `/`, not `/index.html` (the router reads `/index.html` as a coin named INDEX.HTML, same as the original).
- `assets/site-extra.js` (all pages except 404): replaces the old footer with a structured one (brand, Product / Learn / Follow columns, short risk line). The X link reuses each page's existing handle. "How it works" on the home page was redesigned as a timeline.
- Leaderboard demo data (leaderboard.html, static): 12 real Solana memecoins (TRUMP, BONK, WIF, USELESS, FARTCOIN, BOME, PNUT, POPCAT, MOODENG, MEW, GIGA, GOAT) with market cap and 24h change from DexScreener on 2026-11-14 (queried by mint address). Crew hours are invented; fees are 1% of 24h volume. Added 10 recent coins (AMC, GLITCH, GTA$, CJ, CHRISTMAX, CHILL, WISHMAS, BLACKOUT, DYC, GTA6; pair age <= 30 days, picked by market cap, junk/impersonation tokens skipped) with crew hours = hours since the pair launched. Table is labelled "These run on clocked"; no disclaimer notes. Not for public release; swap for live data or restore the empty state before publishing.
- Leaderboard rows link out to DexScreener and Axiom per coin (top-liquidity pair address from the DexScreener API; links open in a new tab).
- New logo: `logo-white.svg` / `logo-black.svg` (copied from the project folder). The nav brand shows the white logo in night mode and the black one in day mode (CSS appended to 2gdc9udo1mjqi.css, the old inline svg is hidden). `icon.svg` and `mark.svg` (favicons) are now the white logo on a dark rounded tile; index.html's favicon link is now `/icon.svg`.
- Footer redesigned (logo + CLOCKED wordmark, tagline, Launch button, Product/Learn/Follow columns, status pill). Wordmark is uppercase "CLOCKED" in nav and footer via CSS text-transform (HTML text unchanged). X links read "TWITTER" with the X logo in nav (hidden label under 700px) and footer. Prose, page titles and meta still use lowercase "clocked".
- Flywheel diagram centre: old pixel clock replaced by the new logo (static HTML and the 0vhxpckh580h4.js bundle), white in night, black in day.
