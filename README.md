# personal-landing

After some years I decided to make a personal website, its ironic that I'm currently more focused on the frontend than the backend and to this point I had no personal website. This change now as a practical project to improve some of my skills and to actually have a personal website.

## Tech Stack

- React
- TypeScript
- TailwindCSS
- Vite

## Thiking process

I'll try and address this page as an SPA, and will try to implement the following features:

- Atomic design
- Mobile first design
- Responsive layout
- Theme toggle (dark/light)
- Animated text
- Choreographed scroll navigation
- Scroll-triggered reveals with stagger
- Magnetic hover on interactive elements
- Full `prefers-reduced-motion` support

All of this with ass little external dependencies as possible.

For the color palette I'll use the following colors:

- Primary: #65B891
- Secondary: #93E5AB
- Accent: #4E878C
- Text: #B5FFE1
- Background: #00140F
- Surface: #0B1F1A

**NOTE: Colors were indeed not final, will update once I get the light mode final style, dark mode is final though.**

I was looking into animations to use and fill the gaps within the UI + enhance UX.
After some research I found some anymations that I liked and implemented; and decided to go berserk with it including liquid glass.

### Motion principles (revisited)

After the first animation pass I went back over it with a rule borrowed from studios like Resn:
**motion should answer a user action, not a timer.** Anything that moved on its own was
decoration, and decoration is what makes a site read as templated. So ambient loops came out
and the same movement was re-attached to hover and scroll instead.

Two things fell out of that:

- One easing curve site-wide (`--ease-out-quint`) plus three duration tokens. A shared motion
  vocabulary is what makes unrelated interactions feel like one product.
- The chevron is the deliberate exception: its bob signals an affordance, so it stays.

Choreography matters as much as the animation itself — the chevron commits to its gesture
*before* the page moves, so the transition reads as one intent rather than two events.

## Changelog

Notable changes since the initial build.

### Scroll & hero state

- Replaced the manual scroll listener with an `IntersectionObserver` for hero visibility.
  The old version re-subscribed on every state change and never ran on mount, so the liquid
  glass got stuck: it hid on chevron click but never came back when scrolling up.
- Unified the section change under one choreography — `rotate → settle → scroll` — shared by
  the chevron click and by wheel/keyboard/touch, so both feel identical.
- Added `useHeroScrollSnap`, which intercepts the first downward gesture while the hero owns
  the viewport (disabled under reduced-motion, where hijacking the scroll would be hostile).

### Content

- Updated from the latest CV: Terraform on the Rubidex infra work, plus two projects that
  weren't in it — Foundry AI for Drug Development (agentic workflows, log audits, pg-boss job
  queues over clinical data scraping, Neo4j knowledge graph) and PoleanaMX (Atomic Design
  refactor of an existing frontend, WebSocket consumption tuning, GA/AdSense/Adsterra).
- Experience periods dropped months and show years only — the extra precision wasn't earning
  its space, and it made the roles read like a form rather than a history.
- Reordered experience so overlapping roles stay chronologically legible once months are gone.
- Skills restructured from a grid of cards into stack layers, ordered the way a system gets
  built: infrastructure → data → backend → pipelines → AI → interface. Added the queue systems,
  Redis, Neo4j, Terraform, scraping, analytics, testing and compliance entries — each tool
  appearing exactly once, since a name repeated across categories reads as padding.
- The layers assemble as you scroll rather than fading in as a block: the rule draws itself
  left to right, the label rises behind it, then the tags land in sequence. Sequencing carries
  the "this builds on that" idea without a word of extra copy.
- Hovering a layer dims its siblings and warms its own rules, isolating the row being read.
  Attention through contrast rather than movement, so the section stays calm once settled.
- Added languages (ES native / EN C1 / IT A2), which were on the CV but not the site.
- Added the Google Data Analytics certification as a coda to Experience rather than a section
  of its own — one credential doesn't carry a heading of its own weight, and it belongs beside
  the history it supports. Mirrored in the JSON-LD as `hasCredential` so it is machine-readable.
- Extended meta tags and JSON-LD with the infrastructure, AI and compliance terms, keeping the
  existing React/Django/Web3 keywords rather than swapping them out.

### Typography

- Self-hosted [Geist](https://vercel.com/font) Sans + Mono, variable weight (100–900), subset
  to latin + latin-ext. One file per family instead of one per weight, ~42kb each.
- Dropped the Google Fonts `preconnect`: nothing was being loaded from it, and self-hosting
  removes the third-party round trip before text can paint.
- Added a `Geist Fallback` face with `ascent`/`descent` overrides so the swap from the system
  font doesn't reflow the page — measured CLS is 0.
- Introduced an explicit type scale as tokens (`--text-display` … `--text-meta`), fluid via
  `clamp()` for display and headings. Body went from 14px to 16–18px; the previous scale had
  ten uses of `text-sm` against a single `text-3xl`, so the page was mostly small text with an
  abrupt jump to headings.
- Mono is used on data rather than prose — dates, periods, tech tags — with `tabular-nums` so
  columns of dates align.
- Added a `.measure` cap (68ch) on prose blocks.
- The hero keeps its original sizing; only the family changed.

### Visual system

- Removed the left accent bars from `Button` and `Card`. Hierarchy now comes from border,
  background and hover state instead of a colored strip.
- Dropped the `accent` button variant: without its bar it was identical to `ghost`.
- Cards get a border-draw hairline on hover in place of the static bar.

### Reversible reveals

Reveals used to be one-way: the observer disconnected after firing, so scrolling
back up left everything frozen in place. Now every section plays its own assembly
in reverse on the way out — the last thing to arrive is the first to leave.

- `useReversibleReveal` keeps its observer connected and flips the stagger by
  direction, so a group unwinds in the order it was built.
- Skills: caption → tags (last first) → label → rule. The layer empties before it
  closes.
- Experience: bullets collapse their height back into the heading, then the whole
  entry slides off to the left. The record closes before it is filed away.
- Projects: stack → description → title → rule.

### Projects as rows

- Replaced the card grid with full-width rows: title → description → stack, in the
  order a project gets explained out loud.
- The stack is a real `<ul>` of `<li>` rather than chips — separators are
  generated in CSS, so screen readers get a list and crawlers get plain text.
- Not a carousel, deliberately: slides put most of the content behind an
  interaction, which costs both crawlability and scannability.

### Contact as the closing statement

Contact was the last section still built from cards — four boxes of equal weight, in a 2×2
grid, at a width that broke the page's narrowing rhythm (1088 → 896 → 768 → back to 1088). It
worked, but it spoke a different language from everything above it and asked for nothing in
particular.

- The email is now the section: mono, up to 2rem, spanning the measure between two hairlines.
  One obvious next step instead of four equivalent options.
- A copy button sits beside the `mailto` — plenty of people paste into webmail rather than
  open a mail client. Separate element, not nested, since a button inside an anchor is invalid
  markup. Falls back to a hidden textarea where the async clipboard is unavailable.
- GitHub, LinkedIn and location recede to a metadata row in the same grammar as the project
  stack lists.
- `Card` and `IconBadge` were deleted afterwards: nothing used them any more.

### Internationalization

Three locales — English (default), Spanish, Italian — as JSON dictionaries under
`src/i18n/dictionaries/`, with English as the canonical shape the others are typed against.

- **Each locale is its own indexable URL**: `/`, `/es`, `/it`. A build plugin emits a real
  `index.html` per locale with that language's `<title>`, description, `og:` tags, canonical and
  `hreflang` already in the markup — crawlers don't click language selectors, so a client-only
  switch would leave Google seeing only English.
- `hreflang` + `x-default` on every page, plus a generated `sitemap.xml` and `robots.txt`.
- Switching pushes history, so back/forward moves between languages and deep links work.
- Everything is translated, including CV bullets and project descriptions — but product names
  (PostgreSQL, Terraform, RWA, KYC/KYB) stay put, which is how engineers actually read them.
- Emphasis inside prose is marked `<k>…</k>` in the JSON and split at render, so translations
  stay plain strings with no markup and no `dangerouslySetInnerHTML`.
- The selector is a small popover beside the theme toggle: with three locales, a cycling button
  would make the third option two clicks away and unpredictable.

### Theme transition

Switching themes used to be a hard cut. It now happens in two layers:

- A circular wipe from the toggle itself, via the View Transitions API — the new theme is
  revealed from the control the user pressed rather than the page blinking all at once. The
  radius is computed to the furthest viewport corner so the reveal always completes.
- A 380ms colour transition on surfaces underneath, which is both the fallback for browsers
  without View Transitions and what keeps the change soft in either case. Only background and
  border animate; transitioning text colour makes copy look like it is dissolving mid-read.

The icon is keyed on the theme so it remounts and turns in as the wipe passes over it. Under
`prefers-reduced-motion` the switch is instant.

### Texture & atmosphere

Three reference images set the direction here — Venus lit gold along a dark terminator, the
filament structure of the cosmic web, and an open highway with a volcano on the horizon. None
of them appear on the site; what they share does: scale, a single warm light against darkness,
grain, and depth.

- Grain overlay across the whole page (inline `feTurbulence`, ~3.5% opacity, 2% in light mode).
  A perfectly flat colour field is a large part of what reads as machine-made; noise gives the
  background material. Costs no request.
- One warm accent (`--warm`), used in exactly one place: a low radial glow under the hero's
  glass column, like sunlight catching a planet's edge. Dark mode only — the light palette
  hasn't got the darkness for it to work against, and light mode was already right.
- The splash particles became a filament web: fixed nodes joined by edges wherever they fall
  within range, with edge opacity scaling by distance so the lattice has density gradients.
  Edges draw themselves in, nodes fade up after. Fits a systems engineer better than confetti.
- Cards became panels: a tinted plane with no hard border until you approach, plus a corner
  mark that grows on hover. Light mode keeps its solid surface and soft shadow.

### Micro-interactions

- `Reveal` component: real scroll-triggered reveals with stagger. Previously
  `section-transition` and `animate-fade-in` ran on **mount**, so every section finished
  animating during the splash — long before you scrolled to it. The reveal was never seen.
- `useMagnetic`: subtle cursor pull on hero icon links and contact cards. Skipped entirely on
  coarse pointers.
- Removed ambient timer-driven animations (`float`, `pulse-glow`, `parallax-slow`,
  `scale-in-scroll`, `fizzy-button`) and the superseded `.reveal`/`.active` pair.
- Site-wide `prefers-reduced-motion` block that neutralises transforms rather than merely
  shortening them, so nothing is left stranded mid-translate.

### Accessibility & housekeeping

- Hero social links were a `<button>` nested in an `<a>` — invalid markup that announced its
  label twice to screen readers. Now semantic `<a>` elements with a single label.
- Moved the hardcoded contact email into `config/constants.ts` alongside the other links.
- Removed a leftover `"alumniOf": "Your University"` placeholder from the JSON-LD block.

## References

### Foundations

- [Atomic design](https://bradfrost.com/blog/post/atomic-design/)
- [Color inspiration](https://coolors.co/b5ffe1-93e5ab-65b891-4e878c-00140f)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vite.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)

### Animation & liquid glass

- [CSS animation examples](https://prismic.io/blog/css-animation-examples)
- [Liquid Glass](https://www.google.com/search?q=liquid+glass+css)
- [More Liquid Glass](https://freefrontend.com/css-liquid-glass/)

### UI/UX patterns & micro-interactions

- [Mobbin](https://mobbin.com/) — UI pattern library; main reference for the card, button and
  spacing treatment
- [Interactive website examples](https://www.letsgroto.com/blog/interactive-website-examples) —
  where the "every animation is contingent on user action, not timers" rule came from
- [Modern website design trends 2026](https://spoko.space/blog/modern-website-design-trends/) —
  magnetic buttons, border-draw hover states, scroll-driven animation
- [Portfolio design trends 2026](https://elements.envato.com/learn/portfolio-trends)
- [Micro-animation examples](https://bricxlabs.com/blogs/micro-interactions-2025-examples)

### Type & fonts

- [Geist](https://vercel.com/font) — typeface, SIL OFL
- [Self-hosting fonts & metric overrides](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/size-adjust)
- [Practical Typography — measure](https://practicaltypography.com/line-length.html)

### Accessibility

- [prefers-reduced-motion (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [IntersectionObserver API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
