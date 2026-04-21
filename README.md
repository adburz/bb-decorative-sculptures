# Dekoracyjne Rzeźby BB

Katalog-portfolio rzeźb dekoracyjnych — dwujęzyczny (PL/EN), na domenie `dekoracyjna-rzezba.pl`. Nie sklep — kontakt przez formularz.

## Stack

- **Astro 5 + TypeScript + Tailwind** — frontend (SSG/hybrid)
- **Sanity.io** — headless CMS (content edytowany z przeglądarki)
- **Cloudflare Pages** — hosting + Email Routing + Turnstile + Web Analytics
- **Web3Forms** — backend formularza kontaktowego
- **pnpm workspaces** — monorepo (`packages/web`, `packages/sanity`)

Pełna architektura: [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md). Design tokens: [docs/DESIGN_ANALYSIS.md](docs/DESIGN_ANALYSIS.md). Zadania owner-side: [docs/PARALLEL_TASKS.md](docs/PARALLEL_TASKS.md).

## Lokalny development — fixtures mode (default)

**Domyślnie projekt używa lokalnych fixtures** z [packages/web/src/fixtures/](packages/web/src/fixtures/) zamiast realnego Sanity. Po `pnpm install && pnpm dev:web` wszystko działa bez internetu, bez kont, bez access tokenów.

Decyzja świadoma — obniża próg wejścia i pozwala pracować offline. Przełączenie na realne Sanity to **zmiana jednej zmiennej środowiskowej** (patrz niżej „Migracja na produkcję").

### Wymagania

- **Node.js ≥ 20** (rekomendowane 22 LTS). Jeśli masz `nvm`: `nvm use`.
- **pnpm ≥ 9**. Najprościej przez corepack:
  ```bash
  corepack enable
  corepack prepare pnpm@latest --activate
  ```

### Setup

```bash
pnpm install
cp .env.example packages/web/.env.local
# .env.local już ma PUBLIC_CONTENT_SOURCE=fixtures — nic nie musisz zmieniać
```

### Komendy

| Komenda             | Co robi                                                     |
| ------------------- | ----------------------------------------------------------- |
| `pnpm dev:web`      | Astro dev server → http://localhost:4321                    |
| `pnpm dev:sanity`   | Sanity Studio → http://localhost:3333 (wymaga konta Sanity) |
| `pnpm build:web`    | produkcyjny build Astro (`packages/web/dist/`)              |
| `pnpm lint`         | ESLint na całym repo                                        |
| `pnpm typecheck`    | TypeScript check we wszystkich pakietach                    |
| `pnpm format`       | Prettier --write                                            |
| `pnpm format:check` | Prettier --check (CI)                                       |

## Migracja na produkcję — PRZECZYTAJ przed deployem (Faza 7)

Flag `PUBLIC_CONTENT_SOURCE=fixtures` jest **tylko dla dev**. Przed wdrożeniem na Cloudflare Pages:

1. **W Cloudflare Pages → Settings → Environment variables** ustaw dla środowiska `Production`:
   - `PUBLIC_CONTENT_SOURCE=sanity`
   - `SANITY_PROJECT_ID=<twój-project-id>`
   - `SANITY_DATASET=production`
   - `SANITY_API_TOKEN=<read-only-token>`
   - `WEB3FORMS_ACCESS_KEY=<klucz>`
   - `PUBLIC_TURNSTILE_SITE_KEY=<klucz>`
   - `TURNSTILE_SECRET_KEY=<klucz>`
   - `PUBLIC_SITE_URL=https://dekoracyjna-rzezba.pl`
2. **Lokalnie** (jeśli chcesz testować z prawdziwymi danymi): zmień `PUBLIC_CONTENT_SOURCE=sanity` w `packages/web/.env.local` i dodaj te same klucze Sanity.
3. **Zweryfikuj** po deployu: otwórz `/pl/rzezby/` — lista powinna pokazywać content z Sanity, nie z fixtures. Jeśli widzisz fixtures na prod — env var nie zadziałała.

Szczegóły architektury fixtures: [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) → „Architecture hooks → #5 Content".

## Struktura repo

```
.
├── docs/                    # planning docs (niezbędny kontekst)
├── packages/
│   ├── web/                 # Astro frontend
│   └── sanity/              # Sanity Studio (CMS)
├── .github/workflows/ci.yml # lint + typecheck + build
└── Photos/                  # raw designy i zdjęcia (referencyjne)
```

## Konwencje

- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`…). Wymuszone przez commitlint.
- **Pre-commit:** lint-staged → prettier + eslint --fix na zmienionych plikach.
- **TypeScript:** strict mode we wszystkich pakietach.
- **PR:** każda Faza z IMPLEMENTATION_PLAN.md = osobny PR.
