# Implementation Plan — Decorative Sculptures

Plan implementacji strony-katalogu rzeźb dekoracyjnych. Stack uzgodniony: **Astro + TypeScript + Tailwind + Sanity** na **Cloudflare Pages** z formularzem przez **Web3Forms**. Podział na fazy jest dobrany tak, żeby każda faza = 1–3 sesje z Claude Code, każda faza = osobny PR.

**Brand:** Dekoracyjne Rzeźby BB
**Domena:** `dekoracyjna-rzezba.pl`

Ten plan odwołuje się do:
- [DESIGN_ANALYSIS.md](DESIGN_ANALYSIS.md) — co zostało odczytane z makiet.
- [PARALLEL_TASKS.md](PARALLEL_TASKS.md) — zadania po stronie właściciela (kont, treści, domeny).

---

## Stack — finalne ustalenia

- **Astro + TypeScript + Tailwind** — SSG/hybrid, najlepszy pod SEO + prędkość
- **Sanity** (free tier: 3 users, 100k docs) — CMS
- **Cloudflare Pages** — hosting frontendu (darmowy, custom domain, auto SSL, edge cache)
- **Web3Forms** — formularz kontaktowy (decyzja właściciela, zatwierdzona)
- **Cloudflare Web Analytics** — analytics startowy (darmowy, bez cookies, bez banneru RODO)
- **GitHub** — repo

### Uwagi do stacku

**Web3Forms — ograniczenia do zapamiętania:**
- Email dostarczany *od* własnego adresu Web3Forms (`noreply@web3forms.com`), więc:
  - **Deliverability** może kiepścić (spam folder) — trzeba odświeżyć skrzynkę kilka razy po deploy i oznaczyć jako „nie-spam" w Gmailu
  - **Reply-To** ustawia się na email wypełniony w formularzu → odpowiedź trafia bezpośrednio do klienta
  - Brak brand-owej sygnatury w treści, ale to temat wtórny
- Plan darmowy: **250 żądań/miesiąc**. Przy 20–100 rzeźbach i formularzu kontaktowym to z zapasem. Monitorować w dashboardzie Web3Forms.
- **Gdy zaczniesz potrzebować więcej (lub będzie newsletter double-opt-in)** — migracja na Resend to 1 sesja: wymieniamy endpoint `/api/contact.ts` na wywołanie Resend SDK + dodajemy weryfikację domeny. Reszta zostaje.

**Newsletter (nie w MVP):** architektura jest przygotowana — szczegóły w sekcji „Architecture hooks" niżej.

---

## Struktura docelowa repo (monorepo)

```
decorative-sculptures/
├── .github/
│   └── workflows/
│       └── ci.yml                    # lint + typecheck + build preview
├── .vscode/
│   └── settings.json                 # projekt-wide lint-on-save
├── docs/                             # te pliki
├── packages/
│   ├── web/                          # Astro frontend
│   │   ├── public/
│   │   │   ├── favicon.svg
│   │   │   ├── robots.txt            # generowany w build, fallback statyczny
│   │   │   └── fonts/                # self-hosted woff2
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── primitives/       # Button, Badge, Input, Textarea
│   │   │   │   ├── layout/           # TopNav, SiteFooter, LanguageSwitcher
│   │   │   │   ├── sculpture/       # SculptureCard, SculptureGallery, SculptureDetail
│   │   │   │   ├── home/             # Hero, FeaturedSculptures, QuoteSection
│   │   │   │   ├── sculptures/      # FilterBar, SculpturesGrid
│   │   │   │   └── contact/         # ContactForm, ContactInfoBlock
│   │   │   ├── layouts/
│   │   │   │   └── BaseLayout.astro  # <head>, meta, hreflang, skip link
│   │   │   ├── lib/
│   │   │   │   ├── sanity/
│   │   │   │   │   ├── client.ts
│   │   │   │   │   ├── queries.ts    # GROQ queries
│   │   │   │   │   └── types.ts      # generowane przez sanity-codegen
│   │   │   │   ├── i18n/
│   │   │   │   │   ├── index.ts      # helper `t(locale, key)`
│   │   │   │   │   ├── pl.json
│   │   │   │   │   └── en.json
│   │   │   │   ├── seo/
│   │   │   │   │   ├── meta.ts       # helper do meta tags
│   │   │   │   │   └── jsonld.ts     # schema.org builders
│   │   │   │   └── image.ts          # helper do Sanity Image URL + alt
│   │   │   ├── pages/
│   │   │   │   ├── index.astro       # redirect → /pl/
│   │   │   │   ├── pl/
│   │   │   │   │   ├── index.astro           # Home
│   │   │   │   │   ├── rzezby/
│   │   │   │   │   │   ├── index.astro       # Sculptures list
│   │   │   │   │   │   └── [slug].astro      # Sculpture detail
│   │   │   │   │   ├── o-mnie.astro          # About
│   │   │   │   │   ├── kontakt/
│   │   │   │   │   │   ├── index.astro       # Contact form
│   │   │   │   │   │   └── dziekujemy.astro  # Thank you
│   │   │   │   │   ├── blog/
│   │   │   │   │   │   ├── index.astro
│   │   │   │   │   │   └── [slug].astro
│   │   │   │   │   ├── polityka-prywatnosci.astro
│   │   │   │   │   └── regulamin.astro
│   │   │   │   ├── en/                        # lustrzane odbicie pl/
│   │   │   │   │   ├── index.astro
│   │   │   │   │   ├── sculptures/
│   │   │   │   │   │   ├── index.astro
│   │   │   │   │   │   └── [slug].astro
│   │   │   │   │   ├── about.astro
│   │   │   │   │   ├── contact/
│   │   │   │   │   │   ├── index.astro
│   │   │   │   │   │   └── thanks.astro
│   │   │   │   │   ├── blog/
│   │   │   │   │   ├── privacy-policy.astro
│   │   │   │   │   └── terms.astro
│   │   │   │   ├── sitemap-sculptures.xml.ts  # sitemap-images
│   │   │   │   └── api/
│   │   │   │       └── contact.ts              # Pages Function, POST → Resend
│   │   │   ├── styles/
│   │   │   │   └── globals.css                 # Tailwind directives, custom layer
│   │   │   └── types/
│   │   │       └── env.d.ts
│   │   ├── astro.config.mjs
│   │   ├── tailwind.config.cjs
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── sanity/                         # Sanity Studio
│       ├── schemas/
│       │   ├── documents/
│       │   │   ├── sculpture.ts
│       │   │   ├── category.ts
│       │   │   ├── material.ts
│       │   │   ├── artistPage.ts      # O mnie
│       │   │   ├── post.ts             # blog
│       │   │   └── siteSettings.ts
│       │   ├── objects/
│       │   │   ├── localizedString.ts
│       │   │   ├── localizedText.ts
│       │   │   ├── priceInfo.ts
│       │   │   ├── dimensions.ts
│       │   │   ├── seoFields.ts
│       │   │   └── imageWithAlt.ts
│       │   └── index.ts
│       ├── sanity.config.ts
│       ├── sanity.cli.ts
│       ├── tsconfig.json
│       └── package.json
├── .env.example
├── .gitignore
├── .editorconfig
├── .prettierrc
├── .prettierignore
├── eslint.config.js                    # flat config
├── package.json                        # root, workspaces
├── pnpm-workspace.yaml                 # (lub package.json.workspaces jeśli npm)
├── README.md
└── LICENSE                             # opcjonalnie
```

Dlaczego monorepo:
- `web` i `sanity` mają różne zależności (Astro vs React), różne buildy i różne deploymenty.
- Wspólne typy (TypeScript) sculptures można dzielić przez `sanity-codegen` → import do `web`.
- Jeden PR może objąć zmiany w schema + nowe query w Astro bez wielopakietowych tag-releasów.

Wybór menedżera pakietów: **pnpm** (najszybszy, hoisting pod kontrolą, workspaces od razu). Alternatywa: npm workspaces (brak dodatkowej instalacji).

---

## Architecture hooks — co ma być „łatwe do zmiany później"

Te decyzje architektoniczne nie dokładają pracy w MVP, ale chronią przed przepisywaniem kodu gdy zmienią się wymagania.

### 1. Swap fontów — „zmień kilka linii i wdroż"

- Wszystkie fonty ładowane przez `@fontsource/{family}` (a nie przez `<link>` do Google Fonts). Wymiana rodziny = zmiana jednego importu w `src/styles/globals.css`.
- W `tailwind.config.cjs` definiujemy **semantic tokens** (`fontFamily.display`, `fontFamily.body`), nie bezpośrednio nazwy krojów w komponentach:
  ```js
  fontFamily: {
    display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
    body: ['Inter', 'system-ui', 'sans-serif'],
  }
  ```
- Komponenty używają `font-display` / `font-body`. Zmiana kroju = zmiana w 1 miejscu + preload w `BaseLayout.astro`.
- Propozycja kandydatów na przyszłość: Cormorant Garamond (start) ↔ Playfair Display ↔ EB Garamond ↔ Fraunces. Wszystkie mają `latin-ext` dla polskich znaków.

### 2. Newsletter — „dodaj w 1 sesji kiedy będziesz gotowy"

Przygotowania w MVP (zero widocznych efektów, żeby potem było szybko):
- **Schema Sanity:** `packages/sanity/schemas/documents/newsletterPost.ts` — **nie tworzymy w MVP**, ale `post.ts` (blog) ma pole `newsletterEligible: boolean` (wyłączone domyślnie) — żebyś mógł później oznaczać, które posty wysyłać do subskrybentów.
- **Feature flag:** `PUBLIC_NEWSLETTER_ENABLED=false` w `.env` + warunkowy render:
  ```astro
  {import.meta.env.PUBLIC_NEWSLETTER_ENABLED === "true" && <NewsletterForm />}
  ```
- **Komponent stub:** `src/components/newsletter/NewsletterForm.astro` tworzony w Fazie 3 jako **ukryty szkielet** — renderuje się tylko gdy flag on. Wewnątrz pusty `<form>` z komentarzem „TODO: podpiąć Buttondown/Brevo/Resend Broadcasts".
- **Routing miejsca:** zarezerwowane w stopce (dodatkowa kolumna, chowana w MVP) + pod postami na blogu. Gdy flag on → pojawiają się bez refactoringu layoutu.
- **Dostawcy do rozważenia gdy włączamy:**
  - **Buttondown** — $9/mies, piękny UX, dobre RODO
  - **Brevo (d. Sendinblue)** — darmowe do 300 maili/dzień, polska firma ma lokalne faktury
  - **Resend Broadcasts** — jeśli wtedy już przeszedłeś z Web3Forms na Resend

### 3. Formularz — „Web3Forms → Resend bez paniki"

- Endpoint formularza w kodzie: `src/pages/api/contact.ts` (jeden plik). Wewnątrz — wywołanie fetch do Web3Forms.
- Gdy migrujesz na Resend — wymieniasz **tylko ten plik** (oraz env vars). Żaden komponent frontendowy nie wie skąd przychodzi odpowiedź.
- Ten sam schema `zod` do walidacji działa w obu wariantach.

### 4. Trzeci język (PT/DE) — „dodaj katalog i tłumaczenia"

- i18n w `astro.config.mjs` ma listę `locales: ["pl", "en"]`. Dodanie trzeciego = `["pl", "en", "de"]`.
- Sanity `localizedString` / `localizedText` przyjmują dowolną listę języków w `sanity.config.ts` — dopisanie `de` włącza pola we wszystkich dokumentach.
- Slugi per język już są (patrz Faza 1), więc nowy język nie łamie istniejących URLi.

---

## Konwencje kodu (obowiązujące od Fazy 0)

- **TypeScript strict mode** we wszystkich pakietach.
- **ESLint flat config** + `@typescript-eslint` + `eslint-plugin-astro`.
- **Prettier** z `prettier-plugin-astro` + `prettier-plugin-tailwindcss` (auto-sort klas).
- **Commit convention:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`…). Wymuszone przez `commitlint` + `husky`.
- **Pre-commit:** `lint-staged` → prettier + eslint --fix tylko na zmienionych plikach.
- **Testy:** pominąć na start (mały projekt katalogowy). Jeśli w Fazie 5 forma okaże się trudna — dodać Playwright e2e tylko dla formularza.
- **Zmienne środowiskowe:** `.env.example` zaktualizowany przy każdej nowej zmiennej; Cloudflare Pages → zmienne w dashboardzie.

---

## Fazy implementacji

### Faza 0 — Setup repo i narzędzi

**Cel:** Zainicjalizowane monorepo z działającym `pnpm install`, prettier, eslint, typecheck.

**Zadania:**
- [ ] `git init` + pierwszy commit na branchu `main`
- [ ] root `package.json` z `workspaces` / `pnpm-workspace.yaml`
- [ ] `.gitignore` (Astro + Sanity + Node)
- [ ] `.editorconfig` (LF, UTF-8, 2 spaces)
- [ ] Prettier config + `.prettierignore`
- [ ] ESLint flat config, globalny `tsconfig.base.json`
- [ ] Husky + lint-staged + commitlint
- [ ] README skeleton (cmd cheat sheet: `pnpm dev:web`, `pnpm dev:sanity`, `pnpm build:web`)
- [ ] `.env.example` z placeholderami (Sanity projectId/dataset, Resend key, Turnstile keys)
- [ ] GitHub Actions CI: lint + typecheck na każdym PR
- [ ] Push do `origin main` na GitHub

**Pliki:** `package.json`, `pnpm-workspace.yaml`, `.prettierrc`, `eslint.config.js`, `tsconfig.base.json`, `.github/workflows/ci.yml`, `README.md`, `.env.example`, `.gitignore`, `.editorconfig`.

**Kryteria ukończenia:**
- `pnpm install` przechodzi bez błędów
- `pnpm lint` i `pnpm typecheck` zwracają 0 (jeszcze nic nie lintują, ale infrastruktura gotowa)
- CI na GitHub zielony na pierwszym PR

**Szacowany czas:** 1 sesja.

**Zależności (z PARALLEL_TASKS.md):** #2 GitHub repo.

---

### Faza 1 — Sanity Studio i model danych

**Cel:** Uruchomione lokalnie Sanity Studio z pełnym schemą + seed 3–5 przykładowych rzeźb, z których można zacząć pobierać dane.

**Zadania:**
- [ ] `pnpm create sanity@latest` w `packages/sanity`, projekt pusty, dataset `production`
- [ ] Zainstalować `@sanity/document-internationalization`
- [ ] Obiekty reużywalne: `localizedString`, `localizedText`, `priceInfo`, `dimensions`, `seoFields`, `imageWithAlt`
- [ ] Dokumenty:
  - [ ] `sculpture` (tytuł, slug per język, opis RichText, galeria zdjęć, materiał→ref, kategoria→ref, wymiary, cena, status [available/sold/priceOnRequest], SEO, `publishedAt`)
  - [ ] `material` (nazwa EN/PL, slug)
  - [ ] `category` (nazwa EN/PL, slug)
  - [ ] `artistPage` (jedyny dokument: bio RichText, portret, quote)
  - [ ] `post` (blog: title, slug, excerpt, body, coverImage, publishedAt, seo)
  - [ ] `siteSettings` (jedyny dokument: brandName, tagline, copyrightLine, contact email/phone/address/hours, social links, footer copy, default SEO og-image)
- [ ] Strukturalne desk (`structure.ts`) — `siteSettings` i `artistPage` jako singletony, pozostałe jako listy
- [ ] Seed 3–5 `sculpture` + 4 `material` + 2 `category` + uzupełniony `siteSettings`
- [ ] Opublikowanie Studio na `*.sanity.studio` (przez `npx sanity deploy`) — żeby właściciel mógł edytować z przeglądarki

**Pliki:** `packages/sanity/schemas/**/*`, `sanity.config.ts`, `sanity.cli.ts`.

**Przykład schema (fragment dla ilustracji — nie jest to kod produkcyjny):**
```ts
// packages/sanity/schemas/documents/sculpture.ts
import { defineField, defineType } from "sanity";
export default defineType({
  name: "sculpture",
  type: "document",
  title: "Sculpture",
  fields: [
    defineField({ name: "title", type: "localizedString", validation: r => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title.en", maxLength: 80 } }),
    defineField({ name: "material", type: "reference", to: [{ type: "material" }] }),
    defineField({ name: "dimensions", type: "dimensions" }),
    defineField({ name: "price", type: "priceInfo" }),
    defineField({ name: "status", type: "string", options: { list: ["available", "sold", "reserved"] } }),
    defineField({ name: "gallery", type: "array", of: [{ type: "imageWithAlt" }], validation: r => r.min(1).max(12) }),
    defineField({ name: "description", type: "localizedText" }),
    defineField({ name: "seo", type: "seoFields" }),
    defineField({ name: "publishedAt", type: "datetime" }),
  ],
});
```

**Kryteria ukończenia:**
- `pnpm dev:sanity` uruchamia Studio na `localhost:3333`
- Wszystkie schematy działają bez błędów walidacji
- 5 rzeźb seeded i można je wylistować przez Vision query `*[_type=="sculpture"]`
- Studio opublikowane pod `*.sanity.studio`

**Szacowany czas:** 2 sesje.

**Zależności:** #3 konto Sanity, #8 pierwsze zdjęcia + opisy rzeźb, #8 biografia.

---

### Faza 2 — Astro scaffolding i i18n

**Cel:** Uruchomiony Astro z Tailwindem, dwujęzyczny routing PL/EN, BaseLayout z meta/hreflang, design tokens z Fazy DESIGN_ANALYSIS wczepione w Tailwind config.

**Zadania:**
- [ ] `pnpm create astro@latest` w `packages/web` (template: „minimal", TypeScript strict)
- [ ] Integracje: `@astrojs/tailwind`, `@astrojs/sitemap`, `@astrojs/cloudflare` (lub `@astrojs/node` na start, zmiana na Cloudflare w Fazie 7)
- [ ] `tailwind.config.cjs` z `theme.extend.colors.brand.*` (hex z `DESIGN_ANALYSIS.md`), font-family (serif + sans), spacing scale
- [ ] Self-host fontów z `@fontsource/…` (2 wagi serif + 2 wagi sans) + preload woff2
- [ ] `astro.config.mjs` z i18n: default `pl`, locales `["pl", "en"]`, `routing: "prefix-always"`, fallback `"none"`
- [ ] `BaseLayout.astro` — `<head>` z canonical, hreflang (x-default + pl + en), OG tags, favicon, skip link, konsumuje `siteSettings` z Sanity (cache build-time)
- [ ] Prosty helper `t(locale, key)` + `packages/web/src/lib/i18n/{pl,en}.json` z UI stringsami (przyciski, navigacja, labels filtrów — wszystkie z DESIGN_ANALYSIS)
- [ ] Root `/` → redirect na `/pl/` (Astro middleware lub meta refresh)
- [ ] „Hello world" strony w `pl/index.astro` i `en/index.astro` (żeby potwierdzić routing)

**Pliki:** `packages/web/astro.config.mjs`, `tailwind.config.cjs`, `src/layouts/BaseLayout.astro`, `src/lib/i18n/*`, `src/pages/index.astro`, `src/pages/pl/index.astro`, `src/pages/en/index.astro`, `src/styles/globals.css`.

**Kryteria ukończenia:**
- `pnpm dev:web` → `localhost:4321/` → redirect na `/pl/`
- `/en/` działa
- Tailwind classes działają (test np. `bg-brand-accent text-brand-bg`)
- `view-source` pokazuje poprawne `<link rel="alternate" hreflang="pl" …>` i `hreflang="en"` i `hreflang="x-default"`
- Lighthouse na pustej stronie ≥ 95 (baseline przed komponentami)

**Szacowany czas:** 1–2 sesje.

**Zależności:** Faza 0, Faza 1 (żeby BaseLayout pobierał `siteSettings`).

---

### Faza 3 — Komponenty UI z designu

**Cel:** Biblioteka komponentów atomowych/molekularnych/sekcji, gotowa do składania stron — wszystko statyczne, bez danych.

**Zadania:**
- [ ] `primitives/Button.astro` (warianty `primary`, `ghost`)
- [ ] `primitives/Badge.astro` (warianty `available`, `sold`)
- [ ] `primitives/Input.astro` + `Textarea.astro` (z walidacją visualną + aria)
- [ ] `primitives/SectionHeading.astro` (eyebrow + title + optional rightLink)
- [ ] `layout/TopNav.astro` (desktop + mobile drawer, language switcher)
- [ ] `layout/SiteFooter.astro` (3 kolumny + copyright bar + inline form placeholder)
- [ ] `layout/LanguageSwitcher.astro` (PL/EN toggle ze świadomością aktualnego slug-a — używa mappingu z Sanity dla rzeźb, statycznego dla innych stron)
- [ ] `sculpture/SculptureCard.astro` (image, badge, title, meta, price, opcjonalny „ASK" link)
- [ ] `home/Hero.astro` (dark variant, background image jako `<Picture>`)
- [ ] `home/QuoteSection.astro`
- [ ] `sculptures/FilterBar.astro` (URL-driven, przyjmuje current filters, renderuje linki)
- [ ] Component gallery page `src/pages/_dev/components.astro` (tylko w dev, wyłączona z sitemap) — do oglądania wszystkich komponentów w jednym miejscu
- [ ] Storybook — pomijamy (overkill dla tego projektu)

**Pliki:** `packages/web/src/components/**/*.astro`, `src/pages/_dev/components.astro`.

**Kryteria ukończenia:**
- Wszystkie komponenty renderują się w `_dev/components` bez błędów
- Wizualnie zgodne z makietą (porównanie side-by-side z PNG-ami) — Ty potwierdzasz
- Mobile breakpointy działają (Chrome DevTools responsive)
- A11y: focus states widoczne, keyboard nav działa w TopNav i LanguageSwitcher

**Szacowany czas:** 2–3 sesje.

**Zależności:** Faza 2.

---

### Faza 4 — Strony i integracja z Sanity

**Cel:** Wszystkie strony działają z prawdziwymi danymi z Sanity, statyczne (SSG), z poprawnymi canonical i hreflang.

**Zadania:**
- [ ] `src/lib/sanity/client.ts` — `createClient({ projectId, dataset, apiVersion, useCdn: true })`
- [ ] `src/lib/sanity/queries.ts` — GROQ:
  - `siteSettingsQuery` (dla BaseLayout)
  - `homeQuery` (siteSettings + 3 featured sculptures + artistPage snippet)
  - `sculpturesListQuery` (wszystkie rzeźby + materiały + kategorie)
  - `sculptureBySlugQuery(slug, locale)`
  - `artistPageQuery`
  - `postsListQuery`, `postBySlugQuery`
- [ ] Strony PL + EN:
  - Home (`/pl/` i `/en/`)
  - Sculptures list (`/pl/rzezby/` i `/en/sculptures/`) — z paskiem filtrów URL-driven; `getStaticPaths` dla kombinacji `{material, status}` lub filtrowanie po stronie klienta z pełnej listy (rekomendacja: po kliencie, bo lista <100 elementów)
  - Sculpture detail (`[slug].astro`) — `getStaticPaths` z listy wszystkich rzeźb, render galerii + meta + CTA prefillowany
  - About (`/pl/o-mnie`, `/en/about`) — artistPage
  - Contact (`/pl/kontakt`, `/en/contact`) — static page + form
  - Thank you (`/pl/kontakt/dziekujemy`, `/en/contact/thanks`)
  - Blog list + detail (`/pl/blog`, `/en/blog`, + `[slug]`)
  - Privacy + terms — stubs z treścią do uzupełnienia
- [ ] `getStaticPaths` wszędzie gdzie potrzeba
- [ ] Image optimization: każdy `<Picture>` z Sanity Image URL builder (generuje WebP + fallback, kilka rozmiarów), `loading="lazy"` poza LCP, `decoding="async"`
- [ ] Canonical URL z BaseLayout korzysta z `Astro.url.pathname`
- [ ] Link switcher: dla rzeźby `PL` link wie o slug-u w `EN` (pobiera z dokumentu)

**Pliki:** `src/lib/sanity/*`, wszystkie `src/pages/pl/**/*.astro` i `src/pages/en/**/*.astro`.

**Kryteria ukończenia:**
- `pnpm build` przechodzi bez błędów; wygenerowane `.html` dla wszystkich rzeźb (PL+EN)
- Każda strona renderuje poprawne dane z Sanity
- Przełącznik języka na szczególe rzeźby prowadzi do tej samej rzeźby w drugim języku
- Filtry na Sculptures działają (URL query params → filtrowana lista)

**Szacowany czas:** 3 sesje.

**Zależności:** Faza 1, 2, 3.

---

### Faza 5 — Formularz kontaktowy (Web3Forms)

**Cel:** Działający formularz na Contact i w stopce, wysyła maila na adres właściciela przez Web3Forms, z anti-spam, kontekstowo wie o rzeźbie (gdy wypełniony z detailu).

**Zadania:**
- [ ] Dodać `zod` do `packages/web`
- [ ] Schema `contactSchema` (name min 2, email valid, subject optional, message min 10, honeypot must be empty)
- [ ] Integracja Cloudflare Turnstile (vanilla JS, bez React):
  - `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer>`
  - `<div class="cf-turnstile" data-sitekey={PUBLIC_TURNSTILE_SITE_KEY} data-callback="onTurnstileSuccess">`
- [ ] `src/pages/api/contact.ts` (Cloudflare Pages Function):
  - POST, JSON body
  - walidacja zod → 400 jeśli błąd
  - walidacja Turnstile token (POST do `https://challenges.cloudflare.com/turnstile/v0/siteverify` z `TURNSTILE_SECRET_KEY`)
  - wysyłka przez **Web3Forms**:
    ```ts
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: import.meta.env.WEB3FORMS_ACCESS_KEY,
        from_name: `[dekoracyjna-rzezba.pl] ${name}`,
        subject: subject || `Zapytanie od ${name}`,
        email: email,  // → reply_to
        message: `${message}\n\n---\n${sculptureContext}\nIP (Cloudflare): ${clientIp}`,
      }),
    });
    ```
  - zwrot 200 JSON `{ ok: true }` lub 4xx/5xx z komunikatem
- [ ] Frontend: `ContactForm.astro` z `<script>` client-side fetch → `/api/contact` → na sukcesie `window.location.href = /pl/kontakt/dziekujemy`
- [ ] Prefill kontekstu rzeźby: na stronie szczegółu CTA → `/pl/kontakt?sculpture={slug}&subject=Zapytanie: {title}` → formularz czyta query params (`URLSearchParams`) i pre-wypełnia subject, a w wiadomości dopisuje linię „Dotyczy: {title} ({absoluteUrl})"
- [ ] Error states: inline komunikat pod przyciskiem gdy endpoint zwraca błąd (tłumaczenia PL/EN z i18n)
- [ ] Po pierwszym wysłanym mailu — w Gmailu oznaczyć nadawcę `noreply@web3forms.com` jako „Not spam" i utworzyć filtr żeby trafiało do inboxa

**Pliki:** `src/pages/api/contact.ts`, `src/components/contact/ContactForm.astro`, `src/lib/validation/contact.ts`, `.env` (+ `WEB3FORMS_ACCESS_KEY`, `PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`).

**Kryteria ukończenia:**
- Wysłanie formularza z deweloperskiego środowiska → email dostarczony do skrzynki właściciela (może wymagać „not spam" przy pierwszym razie)
- Spam z wypełnionym honeypot → 400 (odrzucony)
- Spam bez Turnstile tokenu → 400
- Context prefill: kliknięcie „ZAPYTAJ O TĘ PRACĘ" na szczególe „Świt" → formularz ma subject „Zapytanie: Świt" i w message linię „Dotyczy: Świt (https://dekoracyjna-rzezba.pl/pl/rzezby/swit)"
- Przekroczenie 250 req/mies w Web3Forms → dashboard pokaże; zaalarmuje właściciela że trzeba pomyśleć o Resend

**Szacowany czas:** 1 sesja.

**Zależności:** #5 Web3Forms access key, #4 Cloudflare Turnstile keys, #9 email właściciela, Faza 4.

---

### Faza 6 — SEO i performance

**Cel:** PageSpeed ≥95 na Home, Sculptures i Sculpture detail; pełne JSON-LD; sitemap + sitemap-images; Google Images friendly.

**Zadania:**
- [ ] `sitemap.xml` generowany przez `@astrojs/sitemap` z customową konfiguracją dla hreflang per URL
- [ ] `sitemap-sculptures.xml.ts` — endpoint generujący sitemap-images z wpisami `<image:image>` dla każdej rzeźby (wymagane do Google Images)
- [ ] `robots.txt` generowany w public z wpisem `Sitemap: https://domena/sitemap-index.xml`
- [ ] JSON-LD:
  - `schema.org/Person` dla artistPage (name, description, image, sameAs — Instagram)
  - `schema.org/Product` dla każdej rzeźby:
    ```json
    {
      "@type": "Product",
      "name": "…", "image": ["…"], "description": "…",
      "brand": { "@type": "Brand", "name": "Atelier Mira" },
      "offers": {
        "@type": "Offer",
        "price": "3800", "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": "…"
      }
    }
    ```
    Dla „price on request" — `offers` bez `price`, z `priceSpecification: { priceCurrency: "EUR", valueAddedTaxIncluded: true }` lub pominięty.
  - `schema.org/VisualArtwork` dodatkowo dla rzeźby (alternative type + `artform`, `artMedium`, `surface`)
  - `schema.org/CollectionPage` na Sculptures list
  - `schema.org/Organization` (+ contactPoint) w `<head>` globalnie
  - `schema.org/WebSite` z SearchAction (opcjonalnie)
- [ ] OpenGraph + Twitter Cards: dla rzeźby `og:image` = główne zdjęcie, `og:type = product`; dla blog `og:type = article`
- [ ] Hreflang na każdej stronie: `pl`, `en`, `x-default` (→ pl)
- [ ] Canonical: absolutny URL, self-referencing
- [ ] **Google Images optymalizacja:**
  - Nazwy plików przy uploadzie w Sanity powinny być opisowe — w Studio `imageWithAlt` przypomnieć o tym w `description` pola
  - `alt` tag generowany z pola `alt` w `imageWithAlt`, fallback → `{sculpture.title} — {material.name}`
  - `<img>` / `<Picture>` mają `width`/`height` (CLS = 0)
  - Oryginały w ≥1200 px, w sitemap-images URL najwyższej rozdzielczości
  - Structured data w okolicy obrazka (schema.org Product z `image`)
- [ ] Performance audit:
  - Lighthouse CI na PR (GitHub Actions)
  - preconnect do `cdn.sanity.io`
  - preload fontu serif (LCP text)
  - wyłączenie JS tam gdzie nie potrzeba (Astro domyślnie SSG, ale sprawdzić że filtry nie dociągają całej React runtime)
  - lazy-load wszystkich obrazów poza hero
  - krytyczne CSS inline (Astro robi to domyślnie)
- [ ] meta description: dla rzeźby z Sanity `seo.description` lub fallback = pierwsze 155 znaków `description`
- [ ] OG image fallback — jeden obraz brand w `siteSettings`

**Pliki:** `src/pages/sitemap-sculptures.xml.ts`, `src/lib/seo/meta.ts`, `src/lib/seo/jsonld.ts`, `public/robots.txt`.

**Kryteria ukończenia:**
- PageSpeed Insights ≥95 performance + ≥95 SEO + ≥95 a11y na Home, Sculptures list, Sculpture detail (mobile + desktop)
- `https://validator.schema.org/` → 0 errors na wybranej rzeźbie
- Sitemap + sitemap-images poprawne w [https://www.xml-sitemaps.com/validate-xml-sitemap.html](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- GSC URL inspection na staging pokazuje poprawne hreflang cluster

**Szacowany czas:** 2 sesje.

**Zależności:** Faza 4, deploy (Faza 7) dla testu PageSpeed na prawdziwym CDN.

---

### Faza 7 — Deploy i produkcja

**Cel:** Strona dostępna pod własną domeną, HTTPS, automatyczne deploys per PR, rebuild po publikacji w Sanity.

**Zadania:**
- [ ] Cloudflare Pages: nowy projekt z GitHub integration, branch `main` = production
- [ ] Build command: `pnpm --filter web build`, output dir: `packages/web/dist`
- [ ] Environment vars w Pages dashboard:
  - `SANITY_PROJECT_ID`
  - `SANITY_DATASET`
  - `SANITY_API_TOKEN` (read-only, dla cachowanych buildów)
  - `WEB3FORMS_ACCESS_KEY` (server-side)
  - `TURNSTILE_SECRET_KEY` (server-side validation)
  - `PUBLIC_TURNSTILE_SITE_KEY` (inject do HTML)
  - `PUBLIC_SITE_URL=https://dekoracyjna-rzezba.pl`
- [ ] Custom domain `dekoracyjna-rzezba.pl` podpięta w Cloudflare Pages → automatyczny SSL (Let's Encrypt)
- [ ] Cloudflare Email Routing: `kontakt@dekoracyjna-rzezba.pl` → prywatny email właściciela (darmowe, Cloudflare)
- [ ] (Web3Forms nie wymaga weryfikacji domeny — pomijamy)
- [ ] Sanity webhook: po każdej publikacji → POST na Cloudflare Pages Deploy Hook → rebuild
- [ ] Deploy preview per PR (default w Cloudflare Pages)
- [ ] Cache rules: HTML `max-age=0, s-maxage=60`, assety z hash w nazwie `max-age=31536000, immutable`
- [ ] Redirects:
  - `/` → `/pl/` (w `astro.config.mjs` lub `_redirects`)
  - stare URLe / domyślny locale Accept-Language detection (opcjonalnie — jeśli jest, przez Cloudflare Worker albo `<meta http-equiv>` nie jest idealne; lepszy fixed default PL)

**Pliki:** `_redirects` (Cloudflare), `.github/workflows/ci.yml` aktualizacja, webhook URL zapisany w Sanity studio.

**Kryteria ukończenia:**
- Strona dostępna pod `https://domena.tld/`, SSL ważny
- Deploy trwa <3 min
- PR otwarty → komentarz bota z linkiem do preview
- Edycja w Sanity → publikacja → nowy deploy triggera się automatycznie
- Formularz wysyła maile (produkcyjnie testowany)

**Szacowany czas:** 1 sesja.

**Zależności:** #1 domena `dekoracyjna-rzezba.pl` zarejestrowana, #4 Cloudflare account + DNS (nameservery wskazujące na CF), #5 Web3Forms access key, #9 skrzynka email, Faza 5, Faza 6.

---

### Faza 8 — Analytics i monitoring

**Cel:** Widać ruch, Google zna stronę, Core Web Vitals są mierzone.

**Zadania:**
- [ ] Cloudflare Web Analytics (darmowe) → snippet w `BaseLayout`
- [ ] Google Search Console:
  - weryfikacja domeny przez DNS TXT (Cloudflare DNS, jeden klik)
  - zgłoszenie sitemap-index.xml
  - URL inspection kluczowych stron
- [ ] Bing Webmaster Tools (bonus, darmowe) — podobna procedura
- [ ] Core Web Vitals:
  - włączyć w Cloudflare Web Analytics „Core Web Vitals" (darmowe)
  - opcjonalnie: `web-vitals` pakiet → POST na prosty endpoint Pages Function → log w Cloudflare Analytics (tylko jeśli Web Analytics okaże się za ogólne)
- [ ] Uptime monitoring: UptimeRobot (darmowe, 5 minut interval) pinguje `https://domena/`

**Pliki:** `src/layouts/BaseLayout.astro` (snippet analytics).

**Kryteria ukończenia:**
- Dashboard w Cloudflare pokazuje sesje
- GSC ma zindeksowane strony (min. 1) po 1–3 dniach od zgłoszenia sitemap
- UptimeRobot działa, wysyła alerty na email

**Szacowany czas:** 0.5 sesji (głównie akcje na dashboardach, mało kodu).

**Zależności:** Faza 7 (żyjący deploy).

---

## Co z tym robić dalej

Po Fazie 8 strona jest w produkcji. Kolejne możliwe iteracje (poza zakresem MVP):
- **Newsletter** — hook architektoniczny już jest (patrz „Architecture hooks → Newsletter"). Włączenie = 1 sesja: dodać schema `subscriber` w Sanity, podpiąć Buttondown/Brevo API w `src/pages/api/subscribe.ts`, włączyć feature flag.
- **Rozbudowany blog** z tagami, archiwum, RSS feed.
- **Virtual studio tour** — galeria 360° albo embed wideo.
- **Wersja językowa #3** (np. portugalska / niemiecka) — struktura i18n już jest gotowa.
- **Panel statystyk dla właściciela** — ile wysłanych maili, najpopularniejsze rzeźby (z analytics).
- **A/B test** hero copy (jeśli ruch pozwoli) — przez Cloudflare Waiting Room / Workers.

Najpierw jednak: zebrać dane z pierwszych tygodni, zweryfikować zachowanie filtrów, dopracować kopię.
