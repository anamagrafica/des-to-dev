# Plan: Interactivity + Transition Updates

## Context

The user wants three changes to the existing hero in `src/App.tsx`:

1. **LinkedIn and Instagram → real anchor buttons** (open external links in a new tab)
2. **Logo → clickable** (link to a portfolio or mailto, TBD — will use `mailto:anama.lopez2000@gmail.com` as a safe default since no URL was given)
3. **Transition reduced to 50ms**

## Where things live in the code (`src/App.tsx`)

- **Zone detection / image switching**: `handleMouseMove` (line 44) — divides mouse X into 6 zones, sets `activeIndex`
- **Images**: lines 61–72 — 6 `<img>` tags stacked absolutely, opacity driven by `activeIndex`
- **Bottom bar**: lines 90–157 — absolute `flex` row at bottom of screen containing the 3-column text grid + logo
- **Text columns**: lines 99–145 inside the text grid
  - Col 1 (bio): line 109
  - Col 2 (services): line 117
  - Col 3 (contact): line 133 — contains LinkedIn and Instagram as plain `<div>`s
- **Logo**: lines 147–156 — `<Anama />` wrapped in a plain `<div>`
- **Transition**: line 69 — `"opacity 0.2s ease"` → change to `"opacity 0.05s ease"`

## Changes

1. `src/App.tsx` line 69: change `0.2s` → `0.05s`
2. `src/App.tsx` lines 141–142: wrap LinkedIn and Instagram `<div>`s in `<a>` tags:
   - LinkedIn: `href="https://linkedin.com/in/anamarialopezgomez"` (placeholder — user hasn't provided URL, will use `#` with `target="_blank"`)
   - Instagram: `href="https://instagram.com/anamarialopezgomez"` (same)
   - Style: inherit text style, `cursor: pointer`, `pointer-events: auto`, `text-decoration: underline` on hover
3. Logo div (lines 147–156): wrap `<Anama />` in an `<a href="mailto:anama.lopez2000@gmail.com">` with `pointer-events: auto; cursor: pointer`
4. The outer bottom bar has `pointer-events-none` — the `<a>` tags need `pointer-events: auto` to be clickable

## Files to modify

- `src/App.tsx` only

## Verification

- Hover LinkedIn/Instagram → underline appears, click opens new tab
- Click logo → mailto opens
- Image crossfade is visibly instant (~50ms)

---

# Plan: Deploy Preview Setup

## Context

The user wants to deploy the Vite + React hero website. This project is a static site — `pnpm run build` outputs to `dist/`. We need to create `.figma/make/deploy-preview` so `figma make verify-deploy-preview` reports `state: success`.

## Steps

1. Create `.figma/make/deploy-preview` as an executable POSIX shell script:
   ```sh
   #!/bin/sh
   set -e
   pnpm run build
   figma make deploy-preview --build-dir dist
   ```
2. Make it executable: `chmod +x .figma/make/deploy-preview`
3. Run `figma make verify-deploy-preview` and iterate until `state: success`

## Files to create/modify

- `.figma/make/deploy-preview` — new file

## Verification

Run `figma make verify-deploy-preview` — terminal output must show `state: success`.

---

# Plan: Mouse-Zone Photo Hero

## Context

The user wants a full-screen hero where **one image fills the entire screen at all times**. The screen is invisibly divided into 6 vertical columns. As the mouse moves across the screen, whichever column the cursor is in determines which photo is shown — no clicks, no panels, just mouse X position driving image switching.

**Aesthetic:** Archival × cinematic dark. JetBrains Mono for minimal zone indicators, editorial Unsplash photos (architecture, forest, coastline, desert, city night, mountain).

---

## Implementation

### Mechanic

- A single full-screen container tracks `onMouseMove`
- Mouse X position is divided into 6 equal zones: `zoneIndex = Math.floor(mouseX / (containerWidth / 6))`
- `activeIndex` state (0–5) drives which photo is displayed
- Default state (no hover / mouse left): show first image or a neutral state

### Transition between images

- All 6 `<img>` elements are stacked via `position: absolute; inset: 0` in the same container
- Active image: `opacity: 1`, others: `opacity: 0`
- CSS transition: `opacity 0.5s ease` for smooth crossfade
- Images use `object-fit: cover; width: 100%; height: 100%`

### Zone indicator (optional but adds craft)

- 6 thin vertical lines (1px, white, 5% opacity) divide the screen — visible but barely — to hint at the interaction
- Current active zone highlights its divider slightly
- Small JetBrains Mono label `01`–`06` at bottom of active zone, low opacity

### Mouse leave behavior

- `onMouseLeave` on the container resets `activeIndex` to `null` or keeps last active image — keeping the last active feels more intentional

### 6 Unsplash photo IDs

Thematically distinct editorial images (confirmed real Unsplash IDs):
1. Architecture interior — `photo-1486325212027-8081e485255e`
2. Forest path — `photo-1448375240586-882707db888b`
3. Ocean coastline — `photo-1505118380757-91f5f5632de0`
4. Desert dunes — `photo-1509316785289-025f5b846b35`
5. City at night — `photo-1477959858617-67f85cf4f1df`
6. Mountain landscape — `photo-1464822759023-fed622ff2c3b`

---

## Files to modify

1. `src/App.tsx` — full replacement with the zone-hover hero
2. `src/index.css` — add Google Fonts `@import` for JetBrains Mono at the top

---

## Verification

- Preview shows a single full-screen image
- Moving mouse left-to-right cycles through all 6 images
- Crossfade transition is smooth (~500ms)
- Zone dividers are visible but subtle
- No scrollbars, no overflow
