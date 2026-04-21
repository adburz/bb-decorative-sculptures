# Design Analysis — Decorative Sculptures

Analiza trzech makiet przygotowanych w Lovable (nazwa projektu w designie: _Atelier Mira_, demo). Treść i brand są przykładowe — w implementacji zostaną zastąpione przez **Dekoracyjne Rzeźby BB** (domena: `dekoracyjna-rzezba.pl`). Układ, typografia i paleta pozostają jako „design system" do odwzorowania.

**Potwierdzone decyzje (2026-04-21):**

- Brand: **Dekoracyjne Rzeźby BB**, domena: `dekoracyjna-rzezba.pl`
- Fonty: para _serif display (Cormorant Garamond)_ + _Inter sans_ jako start; architektura pozwala na swap jednym commitem (patrz [IMPLEMENTATION_PLAN.md#faza-2](IMPLEMENTATION_PLAN.md))
- Language switcher: **PL / EN** w navbarze (decyzja zatwierdzona)
- Filtry na Sculptures: **URL-driven** (SEO-friendly, szerowalne linki)
- Formularz: **Web3Forms** (darmowy endpoint, ~250 req/mies — wystarczy)
- Newsletter: **NIE w MVP**, ale architektura przygotowana pod późniejsze dołożenie (schema `subscriber` w Sanity + komponenty `<NewsletterForm />` stub wyłączony feature flagiem)
- Strona szczegółu rzeźby: dokomponowana przeze mnie (patrz nowa sekcja poniżej), bazująca na tym samym systemie typograficznym i palecie

Pliki źródłowe:

- [Home.pdf](../Photos/Web design/PDF/Home.pdf) + PNG: Home-1…Home-4
- [Sculptures.pdf](../Photos/Web design/PDF/Sculptures.pdf) + PNG: Sculptures-1…Sculptures-3
- [Contact.pdf](../Photos/Web design/PDF/Contact.pdf) + PNG: Contact-1, Contact-2

---

## Paleta kolorów

Odczyt wizualny — przed fazą implementacji należy dociągnąć wartości HEX z designu pipetką (np. w Figmie albo Preview.app → Digital Color Meter).

| Rola                  | Orientacyjny HEX      | Użycie                                                                                   |
| --------------------- | --------------------- | ---------------------------------------------------------------------------------------- |
| `bg/base`             | `#F5EFE6`             | tło strony (ciepła kość słoniowa / warm cream)                                           |
| `bg/panel`            | `#EFE7DA`             | stopka, sekcja cytatu „About the studio" (delikatnie ciemniejsza)                        |
| `bg/hero`             | `#1E1712`             | hero na Home (bardzo ciemny brąz / near-black, z grafiką na tle)                         |
| `text/primary`        | `#1E1E1C`             | body text, nagłówki                                                                      |
| `text/muted`          | `#6B6A66`             | meta (materiał, wymiary, podpisy pod obrazkami)                                          |
| `accent/gold`         | `#B8956A`             | drugie słowo w logo („Mira"), eyebrow labels, link „Instagram →", „ASK ABOUT THIS PIECE" |
| `button/primary`      | `#111111`             | przycisk główny (SEND, SEND MESSAGE, VIEW COLLECTION)                                    |
| `button/primary-text` | `#FFFFFF` / `#F5EFE6` | tekst w przycisku                                                                        |
| `badge/available-bg`  | `#F5EFE6` @ 92%       | plakietka „AVAILABLE" na karcie rzeźby (półprzezroczysta, jasna)                         |
| `badge/sold-bg`       | `#E8E1D4` @ 92%       | plakietka „SOLD" (ta sama stylistyka, neutralny ton)                                     |
| `border/subtle`       | `#E3DDD0`             | cienka linia pod nawigacją, separator stopki                                             |

Uwagi:

- Paleta jest ciepła, „galeryjna" — w CSS warto ją zamknąć w customowych tokenach Tailwind (`theme.extend.colors.brand.*`), nie trzymać wartości hex w komponentach.
- Sekcja hero na Home pokazuje ciemną wersję (dark-on-dark + grafika). Na pozostałych podstronach brak trybu dark — to nie jest dark mode strony, tylko dark hero.

---

## Typografia

- **Nagłówki / display:** serif z delikatnie „editorial" charakterem, wygląda na **Cormorant Garamond** albo **Playfair Display** (wariant regular, nie bold). Słowo „Mira" w logo jest italic — sugeruje że logotyp używa pary regular + italic tego samego kroju. Cechy: wysokie ascendery, kontrastowe grubości, stare figury cyfr.
- **Body / UI:** sans-serif neutralny, geometryczny, w małych rozmiarach — najpewniej **Inter**, **Söhne** albo **Helvetica Now**. W designie Lovable domyślnie Inter, więc bezpiecznie zacząć od Inter.
- **Rozmiary (orientacyjnie, desktop):**
  - H1 hero („Unique decorative sculptures"): ~64 px, serif, line-height ~1.05
  - H1 podstrony („Sculptures for sale", „Contact the studio"): ~48 px
  - H2 sekcji („Featured sculptures"): ~36 px
  - Quote („I work slowly…"): ~32 px serif italic
  - Eyebrow label („SELECTED WORKS", „ABOUT THE STUDIO", „GET IN TOUCH", „ATELIER MIRA — EST. 2014"): ~11 px sans-serif, `letter-spacing: 0.2em`, uppercase, kolor `accent/gold`
  - Body: 15–16 px sans-serif, line-height ~1.6
  - Meta / caption (materiał, wymiary pod kartą): ~13 px, `text/muted`
  - CTA linkowe („SEE ALL →", „ASK ABOUT THIS PIECE"): ~11 px, uppercase, `letter-spacing: 0.15em`, podkreślenie na hover
  - Przycisk (SEND, VIEW COLLECTION): ~12 px uppercase, `letter-spacing: 0.15em`, padding duży w pionie
- **Finalnie** użyjemy fontów z **Google Fonts / Fontsource** (self-hosted, subset `latin` + `latin-ext` dla polskich znaków). Dla SEO/perfu: `font-display: swap`, preload pliku woff2 dla 1–2 kluczowych wariantów.

---

## Strona: Home

### Sekcje (z góry na dół)

1. **Nav bar**
   - lewa: wordmark „Atelier Mira" (serif, dwa kolory — „Atelier" czarny, „Mira" złoty)
   - prawa: linki HOME · SCULPTURES · CONTACT (uppercase, tracking, sans-serif ~12 px)
   - na tle `bg/base`, cienka dolna granica `border/subtle`
2. **Hero (full-width, pełnej wysokości ~85 vh)**
   - tło: ciemne `bg/hero`, w tle duża grafika (w makiecie użyto obrazu malarstwa — w finale tu pójdzie sztandarowe zdjęcie atelier / jednej z rzeźb, lekko przyciemnione)
   - eyebrow: „ATELIER MIRA — EST. 2014" (tu: nazwa marki + rok założenia)
   - H1 serif: „Unique decorative sculptures"
   - podtytuł / lead: „Hand-made works in bronze, stone, wood and ceramic — each piece signed, numbered, and sold directly from the studio."
   - CTA: jasny przycisk „VIEW COLLECTION" → `/pl/rzezby` / `/en/sculptures`
3. **Featured sculptures**
   - eyebrow „SELECTED WORKS" (gold)
   - H2 „Featured sculptures" + link „SEE ALL →" wyrównany do prawej
   - grid 3 kolumny (desktop), karta rzeźby (patrz komponenty poniżej)
4. **About the studio / quote**
   - tło `bg/panel`
   - eyebrow „ABOUT THE STUDIO"
   - duży cytat w cudzysłowach, serif italic
   - akapit opisowy (3–4 linie)
   - podpis „— [Imię Nazwisko], founder"
   - brak obrazka w makiecie; warto rozważyć dodanie miniatury portretu po lewej albo pozostawić czysty typograficzny layout (do decyzji właściciela)
5. **Footer** (wspólny — opis niżej)

### Komponenty wyodrębnione z Home

- `<TopNav />`
- `<Hero variant="dark" backgroundImage="…" eyebrow="…" title="…" lead="…" cta={{label, href}} />`
- `<SectionHeading eyebrow title rightLink? />`
- `<SculptureCard />` (opisana niżej, używana także na Sculptures)
- `<QuoteSection />`
- `<SiteFooter />`

### Uwagi implementacyjne — Home

- Hero ma ciemne tło z obrazem — obraz musi być optymalizowany (AVIF/WebP, responsive sizes, preload najmocniejszego breakpointa tylko na stronie głównej, bo to LCP).
- CTA „VIEW COLLECTION" powinien mieć kontrast ≥ 4.5:1 (AA) na ciemnym tle — `bg/base` na `bg/hero` spełnia.
- Sekcja quote to pojedynczy statyczny blok — niech treść przychodzi z Sanity (`siteSettings.aboutQuote` + `aboutBody` + `aboutAuthor`), żeby dało się edytować bez deployu.

---

## Strona: Sculptures

### Sekcje

1. **Nav** (ten sam)
2. **Header sekcji**
   - eyebrow „THE COLLECTION" (gold)
   - H1 „Sculptures for sale"
   - lead: „{N} pieces — each unique, signed and ready to ship from Lisbon." — licznik dynamiczny
3. **Pasek filtrów**
   - dwie grupy:
     - **MATERIAL**: ALL · BRONZE · STONE · WOOD · CERAMIC
     - **STATUS**: ALL · AVAILABLE · SOLD
   - aktywny filtr = ciemne tło (button/primary) + biały tekst; nieaktywny = border subtle, tekst `text/primary`
   - w implementacji rozważyć:
     - filtrowanie po URL (`?material=bronze&status=available`) — działa bez JS, dobre dla SEO i dzielenia linkami
     - lub interaktywna komponenta kliencka (Astro + vanilla JS / Alpine / tiny island)
   - rekomendacja: **URL-driven, SSR**. Dla każdej kombinacji filtrów generujemy statyczną listę przy buildzie (dużo mniej możliwych kombinacji; 5×3 = 15 stron) albo renderujemy listę na kliencie z pełnego datasetu (dla 20–100 rzeźb to <100 KB JSON, w porządku).
4. **Grid kart** (3 kolumny desktop, 2 kolumny tablet, 1 kolumna mobile)
5. **Footer**

### Karta rzeźby (`SculptureCard`)

- obraz kwadratowy (aspect-ratio 1:1), `object-fit: cover`
- nad obrazem, lewy górny róg: badge `AVAILABLE` lub `SOLD`
- pod obrazem:
  - tytuł (serif, ~18 px, regular — pozycja meta w niektórych kartach wygląda na italic-like; do potwierdzenia pipetką)
  - linia meta: `{material}, {W} × {H} × {D} cm` (text/muted)
  - cena: `€{amount}` albo `Price on request`
  - na Home dodatkowo link „ASK ABOUT THIS PIECE →" (gold, uppercase)
  - na Sculptures nie ma tego linka — cała karta jest klikalna → prowadzi do szczegółu
- hover: delikatne podniesienie obrazu lub zoom 1.02 (do zaprojektowania, w designie brak stanów hover)

### Strona szczegółu rzeźby (dokomponowana — brak makiety oryginalnej)

Makiety Lovable nie zawierają widoku „product detail", więc poniżej pełny projekt widoku zaprojektowany w tym samym języku graficznym co pozostałe strony (ten sam nav, footer, typografia, paleta).

#### Układ — desktop (≥1024 px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  NAV (ten sam co wszędzie)                                               │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Home › Rzeźby › Silent Dawn                       (breadcrumb, small,   │
│                                                    text/muted, gold ›)   │
│                                                                          │
│  ┌──────────────────────────────────┐   ┌──────────────────────────┐    │
│  │                                  │   │  AVAILABLE (badge, gold  │    │
│  │                                  │   │   eyebrow style)         │    │
│  │       GALERIA (main image)       │   │                          │    │
│  │       aspect-ratio 4:5           │   │  Silent Dawn             │    │
│  │       klikalna → lightbox        │   │  (H1 serif, ~48px)       │    │
│  │                                  │   │                          │    │
│  │                                  │   │  Bronze · 45 × 30 × 22cm │    │
│  └──────────────────────────────────┘   │  (meta, text/muted)      │    │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐           │                          │    │
│  │ 1  │ │ 2  │ │ 3  │ │ 4  │ (thumbs) │  €3,800                   │    │
│  └────┘ └────┘ └────┘ └────┘           │  (price, large)          │    │
│                                         │                          │    │
│                                         │  ──────────────────      │    │
│                                         │  Edycja: unikat          │    │
│                                         │  Rok: 2024               │    │
│                                         │  Waga: 12 kg (opcj.)     │    │
│                                         │  Sygnatura: BB-24-07     │    │
│                                         │  ──────────────────      │    │
│                                         │                          │    │
│                                         │  [ ZAPYTAJ O TĘ PRACĘ ]  │    │
│                                         │  (Button primary, full)  │    │
│                                         │                          │    │
│                                         │  (sticky podczas scroll) │    │
│                                         └──────────────────────────┘    │
│                                                                          │
│  ─── Sekcja „O tej pracy" (max-width 720px, wycentrowana) ───           │
│  Eyebrow: O TEJ PRACY                                                   │
│  RichText opis (PortableText → HTML): 300–500 słów                      │
│  Pierwszy akapit ~18px, dalej ~16px, interlinia 1.7                     │
│                                                                          │
│  ─── Sekcja „Details" (2 kolumny meta, cały feature list) ───           │
│  MATERIAŁ     │ Brąz patynowany                                         │
│  WYMIARY      │ 45 × 30 × 22 cm                                         │
│  ROK          │ 2024                                                    │
│  EDYCJA       │ Unikat / 1 z 3                                          │
│  SYGNATURA    │ BB-24-07                                                │
│  TECHNIKA     │ Odlew traconego wosku                                   │
│  ORIGIN       │ Wykonane w {miasto}                                     │
│                                                                          │
│  ─── Sekcja „Might also interest you" ───                               │
│  Eyebrow: ZOBACZ TAKŻE                                                  │
│  Grid 3 × SculptureCard (po kategorii/materiale, losowe z puli)         │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│  FOOTER (ten sam)                                                        │
└──────────────────────────────────────────────────────────────────────────┘
```

#### Układ — mobile (<768 px)

- Breadcrumb ukryty (lub tylko „← Wróć do kolekcji")
- Galeria: full-width, swipe horizontal (scroll-snap-x), kropki nawigacyjne pod spodem
- Info block: pod galerią, jedna kolumna
- Button CTA: sticky na dole ekranu (fixed bottom, full-width, shadow) gdy reszta strony scrolluje się pod nim — klasyczny „mobile commerce" pattern
- Sekcje „O tej pracy", „Details", „Zobacz także" — 1 kolumna, stackowane

#### Zasady wizualne

- **Galeria główna:** aspect-ratio 4:5 (pionowe = lepsze dla rzeźb portretowych, neutralne dla innych). Obraz na tle `bg/base` (cream) z delikatnym paddingiem wokół, żeby rzeźba „oddychała".
- **Thumbnail row:** 4–6 miniaturek pod głównym obrazem, kwadratowe, aktywna ma border `text/primary`, pozostałe `border/subtle`.
- **Lightbox:** klik w główny obraz → fullscreen lightbox (ciemne tło `bg/hero`, obraz contain, strzałki prev/next, X close). Użyj lekkiego zero-deps lib jak [PhotoSwipe](https://photoswipe.com/) albo natywny `<dialog>` + kilka linii JS.
- **Prawa kolumna:** tytuł H1 serif ~48px, pod nim meta sans-serif ~14px `text/muted`, cena ~24px (duża). Pozycja sticky (`position: sticky; top: 96px`) działa tylko na desktop.
- **Badge status:** ten sam element co na karcie (`AVAILABLE` / `SOLD` / `ZAREZERWOWANA`), ale bez absolute — inline, nad tytułem, jako eyebrow.
- **Linia separująca:** cienka `border/subtle` 1px oddzielająca cenę od meta-details.
- **CTA „ZAPYTAJ O TĘ PRACĘ":** ten sam button primary co wszędzie, full-width w prawej kolumnie, tekst uppercase. Jeśli `status === "sold"` — button zmienia tekst na „ZAPYTAJ O PODOBNE PRACE" (i linkuje do `/kontakt?subject=Zapytanie o prace podobne do: {title}`).

#### Interakcje

- **Hover na thumbnails:** opacity 0.8 → 1.0
- **Click na thumbnail:** podmienia główny obraz (cross-fade 200ms)
- **Scroll:** gdy przewinięcie minie prawą kolumnę z CTA — na mobile pojawia się sticky bottom bar z tym samym CTA
- **CTA z prefill:** link ma query `?sculpture={slug}&subject=Zapytanie: {title}` — strona Contact wypełnia pola `subject` i dopisuje do `message` linię „Dotyczy: {title} ({url})"

#### Komponenty do wyodrębnienia

- `<Breadcrumb items={[{label, href}]} />`
- `<SculptureGallery images={[]} />` (główny + thumbs + lightbox)
- `<SculptureMeta fields={[{label, value}]} />` (dwukolumnowa tabela details)
- `<RelatedSculptures currentId material />` (reużywa `SculptureCard`)
- `<StickyMobileCTA />` (tylko mobile, pokazuje się po scrollu)

#### SEO — strona szczegółu

- JSON-LD `Product` + `VisualArtwork` (dual type) — z `offers.price` lub `offers.priceSpecification` dla „price on request" (patrz IMPLEMENTATION_PLAN Faza 6)
- OG tags: `og:type = "product"`, `og:image` = główne zdjęcie w 1200×630 (Sanity crop do tego rozmiaru)
- Canonical absolutny, hreflang pair do wersji EN
- Meta description: pierwszy akapit opisu, trimmed do 155 znaków

### Uwagi implementacyjne — Sculptures

- Filtry: trzymać źródło prawdy w URL (lepsze dla SEO / share / back button).
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12`.
- Dla SEO — każdy szczegół rzeźby jako własna statyczna strona (`/pl/rzezby/[slug]` + `/en/sculptures/[slug]`), nie lazy-loaded modal.

---

## Strona: Contact

### Sekcje

1. **Nav**
2. **Header**
   - eyebrow „GET IN TOUCH"
   - H1 „Contact the studio"
   - lead: „For inquiries about available works, private commissions, or to arrange a studio visit."
3. **Dwukolumnowy układ**
   - lewa: bloki kontaktowe (EMAIL / PHONE / STUDIO / STUDIO HOURS / FOLLOW)
     - Każdy blok: eyebrow (uppercase, tracking, gold-ish — albo `text/muted`; wygląda na `text/muted`), potem treść sans-serif
   - prawa: formularz
     - row: `YOUR NAME *` | `EMAIL *`
     - `SUBJECT`
     - `MESSAGE *` (textarea ~6 lines)
     - button „SEND MESSAGE" (czarny, uppercase)
4. **Footer**

### Komponenty

- `<ContactInfoBlock label value />`
- `<ContactForm />` (zod validation, honeypot, Turnstile, POST do Web3Forms/Resend)

### Uwagi

- Pola oznaczone `*` są wymagane — zwalidować po stronie klienta (natywne `required`) i serwera (Web3Forms).
- Po sukcesie → redirect na `/pl/kontakt/dziekujemy` (dedykowana strona „Thanks" — dobra pod GA conversion + Google Ads).
- Formularz w stopce duplikuje się z formularzem na Contact — w kodzie to jeden komponent, dwa miejsca użycia.

---

## Wspólne komponenty

### Nav (desktop + mobile)

- Desktop: flex justify-between, logo left + linki right
- Mobile: logo left + hamburger right → drawer z pełnoekranowym menu; przełącznik języka PL/EN w prawym górnym rogu drawer-a
- **Language switcher:** w makiecie go NIE MA. Trzeba dodać — propozycja: `PL | EN` po prawej stronie przed linkami, albo jako element w mobile menu. Decyzja designerska wymagana.

### Footer

- 3 kolumny (desktop) + pasek copyright:
  1. Brand: logo + krótki opis + email + tel + „Instagram →"
  2. Explore: Home · Sculptures for sale · Contact (+ prawdopodobnie „About" i „Journal/Blog" po rozbudowie)
  3. Inline contact mini-form: name · email · message · SEND (ten sam `<ContactForm variant="compact" />`)
- Copyright bar: `© 2026 Atelier Mira. All works are unique.` po lewej, `Lisbon, Portugal` po prawej.
- **Uwaga**: w implementacji dodać linki do polityki prywatności i regulaminu (RODO) — w makiecie ich brak, ale są wymagane prawnie dla formularza kontaktowego w UE.

### Przycisk primary

- czarne tło, biały tekst, uppercase, tracking wide, padding `py-3.5 px-6` (approx.), bez border-radius albo bardzo mały (`rounded-none` lub `rounded-sm`).
- hover: tło → 80% opacity lub przejście na `text/primary` → accent/gold.

### Badge (AVAILABLE / SOLD)

- absolute top-3 left-3 nad obrazem karty
- półprzezroczyste jasne tło + tekst uppercase, mały

---

## Responsywność

Makiety pokazują **tylko desktop**. Mobile trzeba zaprojektować — proponowane breakpointy Tailwind:

- `sm` 640 px: wciąż 1 kolumna grid, nav → hamburger
- `md` 768 px: grid 2 kolumny, nav pozostaje hamburgerem
- `lg` 1024 px: grid 3 kolumny, pełny nav desktop
- `xl` 1280 px: max-width kontenera (~1200 px) wycentrowany

Uwagi mobile:

- Hero: obraz staje się tłem 16:9, H1 zmniejszony do ~40 px
- Filtry na Sculptures: zawijają się na 2 linie, scroll-snap-x w razie potrzeby
- Footer: 1 kolumna, sekcje stackowane
- Formularz: 1 kolumna, name + email nad sobą

---

## Treści / copy (do przetłumaczenia PL ↔ EN)

Wszystkie stringi z designów poniżej — muszą wejść do CMS (`siteSettings`) albo plików tłumaczeń i18n:

**Home:**

- Eyebrow hero: „ATELIER MIRA — EST. 2014" → „DEKORACYJNE RZEŹBY BB — OD {rok}" (PL) / „BB DECORATIVE SCULPTURES — SINCE {year}" (EN)
- H1: „Unique decorative sculptures" → „Unikatowe rzeźby dekoracyjne"
- Lead: „Hand-made works in bronze, stone, wood and ceramic — each piece signed, numbered, and sold directly from the studio." → „Prace wykonywane ręcznie z brązu, kamienia, drewna i ceramiki — każda sygnowana, numerowana i sprzedawana bezpośrednio z pracowni."
- CTA: „VIEW COLLECTION" → „ZOBACZ KOLEKCJĘ"
- Eyebrow selected: „SELECTED WORKS" → „WYBRANE PRACE"
- „Featured sculptures" → „Wybrane rzeźby"
- „SEE ALL →" → „ZOBACZ WSZYSTKIE →"
- „ASK ABOUT THIS PIECE" → „ZAPYTAJ O TĘ PRACĘ"
- Eyebrow about: „ABOUT THE STUDIO" → „O PRACOWNI"
- Quote i bio — do wpisania przez właściciela (PL+EN).

**Sculptures:**

- Eyebrow: „THE COLLECTION" → „KOLEKCJA"
- „Sculptures for sale" → „Rzeźby na sprzedaż"
- „{N} pieces — each unique, signed and ready to ship from {city}." → „{N} prac — każda unikatowa, sygnowana i gotowa do wysyłki z {miasto}."
- „MATERIAL" → „MATERIAŁ"
- „STATUS" → „STATUS"
- „ALL" → „WSZYSTKIE"
- „BRONZE / STONE / WOOD / CERAMIC" → „BRĄZ / KAMIEŃ / DREWNO / CERAMIKA"
- „AVAILABLE / SOLD" → „DOSTĘPNA / SPRZEDANA"
- „Price on request" → „Cena na zapytanie"

**Contact:**

- „GET IN TOUCH" → „KONTAKT"
- „Contact the studio" → „Napisz do pracowni"
- „For inquiries about…" → „W sprawie dostępnych prac, zamówień indywidualnych lub wizyty w pracowni…"
- „EMAIL / PHONE / STUDIO / STUDIO HOURS / FOLLOW" → „E-MAIL / TELEFON / PRACOWNIA / GODZINY / OBSERWUJ"
- „YOUR NAME / EMAIL / SUBJECT / MESSAGE / SEND MESSAGE" → „IMIĘ / E-MAIL / TEMAT / WIADOMOŚĆ / WYŚLIJ"

**Stopka:**

- „Explore" → „Odkryj"
- „Send a message" → „Napisz wiadomość"
- „© {year} {BrandName}. All works are unique." — edycja w i18n.

---

## Rzeczy do doprecyzowania (pozostałe otwarte pytania)

Pytania rozstrzygnięte 2026-04-21 (brand, fonty, filtry, language switcher, formularz, newsletter, strona detail) — patrz blok „Potwierdzone decyzje" na górze dokumentu.

Nadal otwarte:

1. **Brand EN** — „Dekoracyjne Rzeźby BB" to polska nazwa. Jak mają wyglądać wersje EN:
   - Opcja A: **brand stays as-is w obu językach** (np. nazwa działa jak „IKEA" — nieprzetłumaczalna). W EN wyjaśnienie w lead: „BB Decorative Sculptures — hand-made…"
   - Opcja B: osobny wordmark EN, np. **„BB Decorative Sculptures"** albo **„BB Sculptures"**
     Rekomendacja: **Opcja B** — dla rynku anglojęzycznego „Dekoracyjne Rzeźby BB" jest trudne do wymówienia. Potrzebne Twoje potwierdzenie nazwy EN.
2. **Co oznacza BB?** Inicjały? (chcę wpisać do `schema.org/Person.name` w sekcji „O mnie"). Jeśli np. „Bartek Bogusz" — to idzie do meta. Jeśli nazwa firmy / pseudonim artystyczny — inaczej mapuję w Sanity.
3. **Strona potwierdzenia formularza** — prosta „Dziękujemy, odpowiem w 48h" spójna z resztą designu (center, eyebrow, H1, link „← wróć do kolekcji"). Akceptujesz, czy dopracujesz później?
4. **Mobile design** — brak w makietach. Proponuję: implementuję „po programistycznym domyśle" wg zasad z sekcji „Responsywność", potem wspólnie iterujemy w przeglądarce. OK?
5. **Cena dla „sold"** — widoczna (przekreślona?) czy ukryta? Większość galerii pokazuje cenę nawet po sprzedaży (social proof). Rekomendacja: pokazywać, bez przekreślenia, z badge „SPRZEDANA".
6. **Cena „Price on request"** — jak mapować w `schema.org`? Rekomendacja: pominąć `offers.price`, użyć `offers.priceSpecification` z `eligibleQuantity` = 1 i kontakt jako `url`.
7. **Dostawa / wysyłka** — czy wspomnieć o kosztach i krajach? Propozycja: krótka wzmianka w sekcji „Details" na szczególe rzeźby (`DOSTAWA: wysyłka Polska / UE — ustalana indywidualnie`) + ew. rozwinięcie w polityce prywatności lub FAQ.
8. **Polityka prywatności / regulamin** — wymagane przy formularzu (RODO). Plan: stub strony + darmowy szablon GIODO do uzupełnienia (szczegóły w [PARALLEL_TASKS.md#8d](PARALLEL_TASKS.md)). OK?
9. **Analytics** — w budżecie ~20 zł/mies mieści się: Cloudflare Web Analytics (darmowe, zero cookies), Umami Cloud (darmowe do 10k events/mies), GA4 (darmowe ale wymaga banneru RODO). Rekomendacja: **Cloudflare Web Analytics** na start. Potwierdzenie?
10. **Instagram** — link w header/footer. Masz już konto pod brand, czy dopiero do założenia?
11. **Slugi wielojęzyczne** — w Sanity każdy dokument ma `slug.pl` i `slug.en` niezależnie (np. PL: `swit`, EN: `dawn`)? Czy slug identyczny w obu językach (tytuł EN jako źródło)? Rekomendacja: **osobne slugi per język** — lepsze SEO, naturalniejsze URLe.
12. **Symbol/logo „BB"** — favicon wymaga znaku, nie samego wordmark. Masz szkic symbolu (monogram BB, sygnet), czy wymyślamy w trakcie?
