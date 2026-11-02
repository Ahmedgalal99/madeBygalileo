# GALILEO — image prompts

Prompts for generating mockups and illustrations that match the site's current look.
Paste **the style block** first, then one image prompt under it. Works with ChatGPT / GPT-image, Midjourney, Gemini, Ideogram, Firefly.

> **Honesty note:** for products that are live (Rasid, MoC Content Creators, Tarjim), use **real screenshots** of your work for the page itself and only let the AI make the *frame / scene around it*. An AI-invented "screenshot" of a real client product can misrepresent what you built.

---

## 1. Style block (paste before every prompt)

```
STYLE: modern editorial illustration, hand-drawn cartoon look for a premium developer portfolio.
Confident uneven ink outlines (dark brown-black #1F1A15, ~3px, slightly wobbly, round joins),
flat color fills, no gradients, no 3D, no glossy shine, no glassmorphism, no neon.
Flat offset drop shadows in ink at ~15–20% opacity, offset down-right.
Subtle paper grain texture over everything.
PALETTE (use only these): warm paper #F3ECDF, light paper #FBF7EE, kraft #E3D3B6,
ink #1F1A15, tomato red #D9482B, mustard #E9B949, manila #E3BF74, sage #8FA68A,
forest green #2E4A3F, oak wood #CF9A63, dark oak #A8703F, dusty sky blue #A9C3D3, soft pink #EFB7A6, steel grey #C9C6C0.
Mood: lived-in creative workspace, mature, witty, calm. Sophisticated, NOT childish.
Small handwritten annotations allowed (casual marker handwriting), arrows, sticky notes, tape strips.
```

**Negative / avoid:**
```
photorealism, 3D render, isometric 3D, gradients, glassmorphism, cyberpunk, neon glow, stock-photo people,
corporate SaaS illustration style, purple-blue tech gradients, blurry text, real company logos, watermarks
```

---

## 2. Project screens (the scrolling previews)

Used in the Projects section and `/projects` archive. Each card scrolls a **tall page image**.

- **Size:** tall portrait, ideally **960 × 2400** (2:5). If your tool can't, use **1024 × 1536** (2:3) — it still works, just scrolls less.
- **Save as:** a new folder in `public/assets/projects/`, then add an entry for it in `app/projects.ts` (folder, file names, pixel size and the case-study copy). Landscape 16:10 mockups look best in the cards.

Template — fill the brackets:

```
A full-length website page design shown flat and straight-on (a long scrolling screenshot, no device, no perspective),
for "[NAME]" — [WHAT IT IS].
Sections from top to bottom: [SECTIONS].
UI drawn in the GALILEO style: ink outlines, flat palette colors, rounded cards, chunky buttons,
placeholder text as soft grey bars except the headings listed. Accent color: [ACCENT].
[LANGUAGE NOTE]
Vertical 2:5, page fills the whole canvas edge to edge.
```

| id | NAME | WHAT IT IS | SECTIONS | ACCENT | LANGUAGE NOTE |
|---|---|---|---|---|---|
| `tarjim` | Tarjim | translation funding application system | top bar, title, 4-step progress stepper, form fields, dashed document-upload dropzone, request-status timeline, dark footer | forest #2E4A3F | Arabic, right-to-left layout, heading "ترجم" |
| `rasid-site` | Rasid Payments | bilingual fintech corporate website | nav, hero with big headline + two buttons + round card illustration, 3 feature cards, image + text band, 3 big stats, CTA band, footer | mustard #E9B949 | English, with a small "ع / EN" toggle in nav |
| `aghnam` | Aghnam | meat-products e-commerce storefront | nav with search, category chips, filter sidebar with checkboxes, 2-column product grid (8 products), pagination, footer | tomato #D9482B | English |
| `moc` | Content Creators Platform | government platform connecting creators with awareness campaigns | thin green top strip, hero banner, onboarding stepper, 2×2 campaign cards, sign-up form, footer | sage #8FA68A | Arabic, right-to-left, heading "منصة صُنّاع المحتوى", no official government logos |
| `jovial` | Jovial | event & ticketing platform | event hero, date chips, theatre seat map (rows of rounded seats: free / taken in ink / one selected in tomato), order summary + pay button, related events | tomato #D9482B | English |
| `rasid-dashboard` | Rasid Dashboard | payments admin dashboard | dark left sidebar, 4 KPI tiles, line chart, bar chart, transactions table with status pills | forest #2E4A3F | English |
| `rezeen` | Rezeen | multi-criteria product filtering system | search, many filter chips, faceted sidebar, dense results grid, "showing 1,240 results" | sky #A9C3D3 | English |
| `lms` | LMS | learning management system | 2×2 course cards with progress bars, completion donut chart, line chart, student table | mustard #E9B949 | English |
| `sso` | SSO & Access Control | single sign-on and role management | login card with "Continue with SSO" button, roles list (admin / editor / viewer) with permission toggles, session activity timeline | pink #EFB7A6 | English |
| `analytics` | Analytics | data-heavy analytics dashboards | filter bar, KPI tiles, large line chart, heatmap, bar chart, table | tomato #D9482B | English |
| `petrofast` | Petrofast | fuel station management | map card with station pins, fuel-level gauges, station list table, alerts panel | mustard #E9B949 | English |
| `imx` | IMX | network device management | device status grid (online/offline dots), signal strength charts, device table, topology mini-diagram | sky #A9C3D3 | English |
| `softsteps` | Soft Steps | clinic website for patients | friendly hero, doctors cards, services list, booking CTA, opening hours, footer — Lighthouse-fast and calm | sage #8FA68A | English |

---

## 3. Case-study hero mockups (optional, for the Work section)

Wider scenes that show a real screenshot *on the desk*. Generate the scene, then place your real screenshot onto the screen.

```
Top-down, slightly angled view of a laptop lying on a forest-green desk mat with a stitched dashed border,
on an oak wood desk. The laptop screen is blank light paper (#F6F1E6) so a screenshot can be placed on it.
Around it: a [OBJECT] that hints at the project, a coffee mug with latte art, a sticky note saying "[NOTE]",
a pencil. Lots of empty margin. Landscape 16:10.
```

| project | OBJECT | NOTE |
|---|---|---|
| TAM / Jovial | two paper event tickets with torn edges | "seat C7 ✓" |
| Rasid | a mustard payment card and a long paper receipt stamped "PAID" | "every number adds up" |
| MoC | an open notebook with Arabic handwriting and a green pen | "RTL first" |

---

## 4. Social share image (Open Graph)

**Size:** 1200 × 630 · **Save as:** `app/[lang]/opengraph-image.png`

```
Wide banner. Left 40%: the word "GALILEO" in a heavy, soft, slightly quirky serif, ink color,
the final "O" circled by a thin tilted tomato-red orbit ring with a tiny mustard moon.
Under it in small spaced monospace caps: "AHMED GALAL — FULL-STACK ENGINEER".
Right 60%: a cropped illustration of a creative desk seen from slightly above — laptop on a green mat,
stack of colourful books, red toolbox, open notebook, headphones, coffee mug, sticky notes "React", "Next.js", "Ship it.".
Warm paper background #F3ECDF. Landscape 1200×630.
```

---

## 5. Extra desk illustrations (optional)

Single objects on a **transparent background**, square 1:1, same outline weight — for empty states, the 404 page, or loading.

```
Single hand-drawn object, centered, transparent background, generous padding: [OBJECT].
```

- a brass telescope on a small tripod pointing at a four-point mustard star *(404 page: "nothing out here")*
- a manila folder overflowing with papers labelled "PROJECTS"
- an open red toolbox with a wrench, screwdriver and ruler sticking out
- a phone face-up showing one chat bubble "Got something in mind?"

---

## 6. Wiring them in (prompt for Claude Code)

After saving a new project folder, paste this into Claude Code in this project:

```
I added a new project folder in public/assets/projects/. Add it to app/projects.ts like the others:
slug, folder, shots, pixel size, category, accent colour from the mockups, and a short bilingual
case study (summary, challenge, three approach steps, outcome, stack, tags). Then check its card
and its case-study page in /en and /ar.
```
