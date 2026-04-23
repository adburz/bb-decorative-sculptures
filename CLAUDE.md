# Dekoracyjne Rzeźby — Dokumentacja projektu

## Przegląd

Monorepo zawierające:

- **web** (Astro) — główna strona www
- **sanity** — headless CMS dla zawartości

## Konfiguracja Sanity

### Zmienne środowiskowe

W `packages/sanity/.env`:

```
SANITY_STUDIO_PROJECT_ID=rp801gr8
SANITY_STUDIO_DATASET=production
```

### Uruchamianie studio lokalnie

```bash
cd packages/sanity && npm run dev
# lub
pnpm dev:sanity
```

Studio będzie dostępne na: `http://localhost:3333`

### Wdrażanie na Sanity.io (hosted)

```bash
cd packages/sanity && npm run deploy
```

Po wdrożeniu studio będzie dostępne na:

```
https://rp801gr8.sanity.studio
```

Tam będzie **pełny UI** i będzie można edytować z dowolnego miejsca.

## Konfiguracja Web (Astro)

### Zmienne środowiskowe

W `packages/web/.env`:

```
# Źródło contentu: "fixtures" (offline) lub "sanity" (live CMS)
PUBLIC_CONTENT_SOURCE=sanity

# Sanity configuration
SANITY_PROJECT_ID=rp801gr8
SANITY_DATASET=production
SANITY_API_TOKEN=<token>

# Web3Forms (formularz kontaktowy)
WEB3FORMS_ACCESS_KEY=<key>

# Cloudflare Turnstile (reCAPTCHA)
PUBLIC_TURNSTILE_SITE_KEY=<key>
TURNSTILE_SECRET_KEY=<key>

# Site
PUBLIC_SITE_URL=https://rzezbadekoracyjna.pl
```

### Uruchamianie dev servera

```bash
cd packages/web && npm run dev
# lub
pnpm dev:web
```

Strona będzie dostępna na: `http://localhost:4321` (lub następny wolny port)

## Struktura zawartości w Sanity

### Dokumenty

- **siteSettings** (singleton) — ustawienia całej strony (brandName, tagline, kontakt, media społeczne)
- **artistPage** (singleton) — strona "O mnie" (biografia, cytat, portret)
- **sculpture** (list) — poszczególne rzeźby
- **material** (list) — materiały używane
- **category** (list) — kategorie rzeźb
- **post** (list) — wpisy na blogu

### Obiekty pomocnicze

- `localizedString` — tekst z wersją PL i EN
- `localizedText` — dłuższy tekst (textarea) z PL i EN
- `imageWithAlt` — obraz z opisem alternatywnym (wymagane dla SEO/a11y)
- `seoFields` — pola SEO (title, description, og:image)

## Fallback na fixtures

Jeśli Sanity zwróci `null` (dokument nie istnieje), kod automatycznie wraca do fixture'ów:

- `packages/web/src/fixtures/siteSettings.ts`
- `packages/web/src/fixtures/artistPage.ts`
- `packages/web/src/fixtures/sculptures.ts`
- `packages/web/src/fixtures/posts.ts`

To pozwala na offline development bez połączenia z CMS.

## Commit messages

Commitów nie zawierają Claude'a jako co-autora. Jeśli klonujesz lub puszujesz — upewnij się że git user to:

```
git config user.name "Adam Burzyński"
git config user.email "silgrom10@gmail.com"
```

## Workflow

1. **Development**: Edytuj kod w web/ i sanity/ lokalnie
2. **Zawartość**: Edytuj w Sanity studio (localhost:3333 lub hosted)
3. **Deploy**: Push do main, GitHub Actions builds i deployuje
