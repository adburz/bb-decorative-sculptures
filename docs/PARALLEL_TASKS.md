# Parallel Tasks — zadania poza kodem (dla właściciela projektu)

Lista zadań, które musisz zrobić ręcznie (konta, domena, treści), równolegle do implementacji. Każde zadanie ma:

- **Co** — konkretne kroki
- **Gdzie** — linki
- **Kiedy** — przed którą fazą z [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md)
- **Koszt**
- **Czas**

Posortowane od najważniejszych (blokujących najwcześniejsze fazy) do najpóźniej potrzebnych.

---

## 1. Rejestracja domeny `rzezbadekoracyjna.pl`

**Decyzja:** domena **`rzezbadekoracyjna.pl`**, brand **Dekoracyjne Rzeźby BB** (wybrane 2026-04-21).

**Kiedy:** **teraz** — propagacja DNS + przepięcie nameserverów na Cloudflare zajmuje do kilku godzin, a bez tego nie ruszymy Fazy 7.

**Koszt:** ~10–30 zł/rok (zależy od rejestratora — promocje NASK często robią pierwszy rok ~10 zł, kolejne ~60–90 zł).

**Czas:** 15 minut zakupu + do kilku godzin propagacji nameserverów.

### Ważne — Cloudflare Registrar NIE obsługuje `.pl`

Domena `.pl` wymaga rejestratora polskiego lub zagranicznego wspierającego `.pl`. Opcje:

| Rejestrator                              | Cena 1. rok | Cena odnowienia | UX                      | Uwagi                                                   |
| ---------------------------------------- | ----------- | --------------- | ----------------------- | ------------------------------------------------------- |
| **[Porkbun](https://porkbun.com/)**      | ~$9         | ~$22            | świetny, zero upsell    | Best-in-class; FV angielska, można rozliczyć jako koszt |
| **[nazwa.pl](https://www.nazwa.pl/)**    | ~10 zł      | ~89 zł          | agresywny upsell        | Faktura VAT PL; uważaj na „dodatkowe usługi" w checkout |
| **[home.pl](https://home.pl/)**          | ~15 zł      | ~99 zł          | podobnie                | j.w.                                                    |
| **[OVH.pl](https://www.ovh.pl/domeny/)** | ~30 zł      | ~60 zł          | techniczny, mało upsell | Dobry dla developerów                                   |

**Rekomendacja:** **Porkbun** jeśli nie potrzebujesz FV VAT PL (np. fakturujesz się jako osoba fizyczna), **OVH.pl** albo **nazwa.pl** jeśli potrzebujesz polskiej FV.

### Kroki

1. Wejdź do wybranego rejestratora → sprawdź dostępność `rzezbadekoracyjna.pl`
2. Kup (najkrótszy okres = 1 rok na start, da się przedłużyć)
3. **Nie kupuj dodatków:** hostingu, skrzynek email, „certyfikatu SSL premium", „prywatności WHOIS premium" itp. — mamy to wszystko darmowo przez Cloudflare
4. Po zakupie: w panelu rejestratora znajdź **„Serwery DNS" / „Nameservery"** i zapamiętaj — podmienimy je w kroku #4 na Cloudflare nameservery
5. (Opcjonalnie) Rozważ dodatkowy zakup wariantów jako alias — chroni przed typosquattingiem. Najbardziej prawdopodobne pomyłki: `rzezba-dekoracyjna.pl` (z myślnikiem), `dekoracyjna-rzezba.pl` (odwrócona kolejność), `dekoracyjnarzezba.pl`. Każdy ~10 zł. Mogę zrobić 301 redirect w Fazie 7.
6. (Opcjonalnie) **`rzezbadekoracyjna.com`** jako zabezpieczenie międzynarodowe — jeśli planujesz pozycjonowanie rynku EN, rozważ w przyszłości. Na MVP nie potrzebne.

### Socialmedia handle

Sprawdź zajętość `@dekoracyjnarzezbabb` lub `@dekoracyjne.rzezby.bb` na:

- [Instagram](https://instagram.com) (najważniejsze — link w nav i footer)
- [Namecheckr](https://www.namecheckr.com/) (skrót po innych platformach jednym zapytaniem)

Jeśli dany handle zajęty — wymyśl wariant (`_bb`, `.studio` na końcu itp.) i zapisz do `siteSettings` w Sanity.

---

## 2. GitHub account + repozytorium

**Kiedy:** przed Fazą 0.

**Koszt:** darmowe (GitHub Free).

**Czas:** 10 minut.

### Kroki

1. Jeśli nie masz: [github.com/join](https://github.com/join)
2. Utwórz **puste prywatne repo** `decorative-sculptures` (bez README, bez .gitignore — wszystko wygenerujemy lokalnie w Fazie 0)
3. Skopiuj URL repo (HTTPS albo SSH zależnie od tego, jak pushujesz)
4. Zapewnij sobie SSH key albo GitHub CLI (`gh auth login`) dla bezproblemowego push-a
5. Wyślij mi URL repo

---

## 3. Konto Sanity.io + projekt

**Kiedy:** przed Fazą 1.

**Koszt:** darmowe (Sanity Free plan — 3 userów, 100k docs, unlimited API requests na początku wystarczy z olbrzymim zapasem).

**Czas:** 15 minut.

### Kroki

1. [sanity.io/login](https://www.sanity.io/login) — zarejestruj się przez GitHub (łatwiej) lub email
2. Po zalogowaniu: **Create new project**
   - Nazwa: `Decorative Sculptures` (albo nazwa brand, jeśli już wybrana)
   - Dataset: `production` (domyślny)
3. Z dashboardu zanotuj:
   - **Project ID** (wygląda jak `xyzabc12`)
   - **Dataset name** (`production`)
4. W **API** → **Tokens** → utwórz token z uprawnieniami **Viewer** (read-only), nazwij `astro-build`. Skopiuj — wyświetli się raz.
5. W **API** → **CORS origins** dodaj na początek `http://localhost:4321` (Astro dev) i `http://localhost:3333` (Sanity Studio) — później dodamy domenę produkcyjną
6. Wyślij mi: Project ID, dataset name, token (przez secure channel — 1Password, Bitwarden Send, Signal)

---

## 4. Cloudflare account + dodanie domeny

**Kiedy:** przed Fazą 7.

**Koszt:** darmowe (Pages free, Web Analytics free, Email Routing free).

**Czas:** 20 minut (bez czasu propagacji DNS, który może trwać do 24h, ale zwykle <1h).

### Kroki

1. [cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up) — załóż konto jeśli nie masz
2. **Add a site** → wpisz swoją domenę → plan Free
3. Jeśli domenę kupiłeś przez Cloudflare Registrar (krok #1) — DNS już tam jest, nic nie robisz
4. Jeśli domenę kupiłeś u innego rejestratora (np. Porkbun):
   - Cloudflare wygeneruje 2 nameservery (np. `x.ns.cloudflare.com`)
   - W panelu rejestratora (Porkbun: **Details** → **Authoritative Nameservers**) podmień nameservery na te z Cloudflare
   - Poczekaj na propagację (status w Cloudflare zmieni się z „Pending" na „Active")
5. W Cloudflare → **Workers & Pages** → **Create application** → **Pages** → poczekaj z tym krokiem do Fazy 7 (połączymy z GitHub wtedy)
6. **Email Routing** (żeby mieć `kontakt@domena`):
   - **Email** w lewym menu → **Enable Email Routing**
   - Cloudflare doda MX records automatycznie
   - **Routes** → **Create address** → `kontakt@domena.pl` → forward na Twój prywatny email (gmail/protonmail)
7. **Cloudflare Turnstile** (captcha dla formularza):
   - **Turnstile** w lewym menu → **Add site**
   - Domain: `domena.pl`
   - Mode: **Managed** (darmowe, niewidzialne dla użytkownika)
   - Zanotuj **Site key** (public) i **Secret key** (do env)

---

## 5. Web3Forms account

**Kiedy:** przed Fazą 5.

**Koszt:** darmowe (250 żądań/mies — wystarczy dla formularza kontaktowego).

**Czas:** 3 minuty.

### Kroki

1. Wejdź na [web3forms.com](https://web3forms.com/)
2. W sekcji „Get your Access Key" wpisz email właściciela (tam, gdzie mają przychodzić wiadomości z formularza)
3. W skrzynce pojawi się email z **Access Key** — zanotuj (ciąg UUID)
4. Wyślij mi Access Key (secure channel: 1Password / Bitwarden Send / Signal)

### Uwagi

- Nie wymaga weryfikacji domeny ani konfiguracji DNS.
- Mail przychodzi z `noreply@web3forms.com` → **pierwszym razem sprawdź folder SPAM i oznacz jako „Not spam"** + utwórz w Gmailu filtr „From: noreply@web3forms.com → Never send to Spam".
- Pole `email` w requescie do Web3Forms ustawia **Reply-To** — gdy klikniesz „Odpowiedz" w Gmailu, odpowiedź pójdzie do klienta.
- Gdy zbliżysz się do limitu 250/mies (dashboard Web3Forms), czas na migrację na Resend (1 sesja dev + zakup domeny `noreply@rzezbadekoracyjna.pl` weryfikacja).

### Cloudflare Turnstile (anti-spam) — uwaga: robi się w kroku #4

W kroku #4 (Cloudflare setup) zakładamy Turnstile i notujemy:

- **Site Key** (public, idzie do `PUBLIC_TURNSTILE_SITE_KEY` w .env)
- **Secret Key** (server-side, idzie do `TURNSTILE_SECRET_KEY`)

Te klucze są potrzebne w Fazie 5.

---

## 6. Google Search Console

**Kiedy:** po Fazie 7 (deploy), przed Fazą 8.

**Koszt:** darmowe.

**Czas:** 15 minut.

### Kroki

1. [search.google.com/search-console](https://search.google.com/search-console) → **Add property**
2. **Domain property** (nie URL prefix — domain obejmuje wszystkie subdomeny + HTTP/HTTPS)
3. Google pokaże TXT record do dodania w DNS → dodaj w Cloudflare DNS
4. **Verify** → gotowe
5. **Sitemaps** → wklej `https://domena.pl/sitemap-index.xml` → **Submit**
6. **URL Inspection** → wklej adres Home → sprawdź czy Google widzi (po deployu)
7. (Opcjonalnie) **Bing Webmaster Tools** — [www.bing.com/webmasters](https://www.bing.com/webmasters) — procedura bardzo podobna

---

## 7. Decyzja: analytics

**Kiedy:** przed Fazą 8.

**Opcje:**

| Opcja                        | Koszt                      | Cookies | Banner RODO?  | Jakość danych                           |
| ---------------------------- | -------------------------- | ------- | ------------- | --------------------------------------- |
| **Cloudflare Web Analytics** | darmowe                    | brak    | nie           | podstawowa (pageviews, Core Web Vitals) |
| **Umami Cloud**              | darmowe do 10k events/mies | brak    | nie           | dobra (events, countries, devices)      |
| **Plausible Cloud**          | ~9 €/mies (≈40 zł)         | brak    | nie           | najlepsza z bezcookie                   |
| **GA4**                      | darmowe                    | tak     | tak, wymagany | najpełniejsze dane, ale kompleksowe UI  |

**Rekomendacja** (przy budżecie ~20 zł/mies): **Cloudflare Web Analytics** na start. Jeśli będziesz chciał więcej danych po pierwszym miesiącu — przesiądź się na Umami.

**Czas:** 5 minut (włączenie w Cloudflare dashboardzie).

---

## 8. Przygotowanie treści (największy pojedynczy task)

**Kiedy:** rozłożone — biografia przed Fazą 1, zdjęcia rzeźb przed Fazą 1, copy hero przed Fazą 4.

**Koszt:** Twój czas. Ewentualnie fotograf profesjonalny (~500–1500 zł za sesję).

**Czas:** realistycznie 1–2 tygodnie, z fotografowaniem rzeźb.

### 8a. Biografia / O mnie (PL + EN)

- 300–600 słów PL, to samo EN
- Treści do pokrycia:
  - Kim jesteś, od kiedy robisz rzeźby
  - Czemu akurat ten materiał / styl
  - Jaki jest proces pracy (hand-made, unikatowe)
  - Gdzie wystawiałeś/eś, nagrody (jeśli są)
  - Filozofia: dlaczego ktoś powinien kupić Twoją rzeźbę, a nie „z IKEA"
- 1 portret (wysoka rozdzielczość, ≥2000 px, najlepiej w warsztacie przy pracy)
- Cytat osobisty (2–3 linijki) — idzie na Home w sekcji „About the studio"

### 8b. Copy na Home (PL + EN)

- Eyebrow: nazwa brand + rok założenia (~30 znaków)
- H1 hero (5–8 słów)
- Lead pod H1 (2 zdania, ~25 słów)
- CTA button (2–3 słowa)
- Cytat na sekcję About (1 zdanie)
- Body pod cytatem (3–4 zdania)

### 8c. Pierwsze 3–5 rzeźb do seedowania

Dla każdej rzeźby potrzeba:

- **Zdjęcia:** 3–8 ujęć, każde ≥2000 px na dłuższym boku, format RAW/JPG, neutralne tło albo scena ekspozycji
- **Tytuł** (PL + EN)
- **Materiał** (jedna z: brąz, kamień, drewno, ceramika — rozszerzalne)
- **Kategoria** (opcjonalne — np. „figuratywne", „abstrakcyjne", „vessel")
- **Wymiary** W × H × D w cm
- **Waga** (opcjonalne — przydatne do wyceny wysyłki później)
- **Cena** (EUR lub PLN — decyzja brand) albo „Price on request" albo „Sold"
- **Opis** 100–300 słów PL, tłumaczenie EN (historia powstania, inspiracja, technika)
- **Rok wykonania**
- **Edycja** (unique / 1 of 3 / itp.)

**Wskazówka fotograficzna dla Google Images:**

- Nazwy plików opisowe, np. `silent-dawn-bronze-sculpture-45cm-01.jpg` zamiast `IMG_1234.jpg` (nazwę pliku zostawi Sanity CDN — ale alt ma być opisowy)
- W Sanity w polu `alt` pisać pełnym zdaniem: „Rzeźba z brązu Silent Dawn, 45 × 30 × 22 cm, widok z frontu"

### 8d. Polityka prywatności + regulamin (RODO)

- **Polityka prywatności** — wymagana, bo formularz kontaktowy zbiera email (dane osobowe). Minimum:
  - kto jest administratorem (imię, adres, email)
  - jakie dane zbieramy (email, imię, treść wiadomości, IP przez Cloudflare, Turnstile)
  - cel przetwarzania (odpowiedź na zapytanie)
  - czas przechowywania
  - prawa użytkownika (dostęp, usunięcie, sprostowanie)
  - podstawa prawna (art. 6 ust. 1 lit. b RODO — wykonanie umowy / lit. f — prawnie uzasadniony interes)
- **Regulamin** — ewentualnie stub; jeśli sprzedaż jest „pozaserwisowa" (e-mail + rozmowa), regulamin strony internetowej może być krótki (nic tu nie sprzedajemy bezpośrednio)

**Opcje generowania:**

1. **Darmowy szablon z GIODO/UODO** — bezpieczny, ale nudny. Google „polityka prywatności wzór RODO formularz kontaktowy"
2. **[iubenda](https://www.iubenda.com/)** — generator, darmowy plan pokrywa proste strony, płatny ~30 €/rok za pełny zakres. Używany przez wielu.
3. **[termly.io](https://termly.io/)** — podobnie.
4. **Prawnik znajomy** — najbezpieczniej, ale nie dla tego budżetu.

**Rekomendacja:** darmowy szablon + podstawić swoje dane. Jeśli kiedyś dodamy newsletter — wróć do tematu (double-opt-in wymaga osobnych zapisów).

---

## 9. Skrzynka email pod własną domeną

**Kiedy:** przed Fazą 5 (mile widziane, żeby klient widział `kontakt@rzezbadekoracyjna.pl` jako adres odpowiedzi).

**Koszt:** darmowe (Cloudflare Email Routing).

**Czas:** 5 minut — robi się razem z krokiem #4.

### Kroki

Obejmuje krok #4.6 powyżej. Minimum:

- `kontakt@rzezbadekoracyjna.pl` → forward na `twoj-prywatny@gmail.com`

Web3Forms wysyła z `noreply@web3forms.com` (tego nie zmieniamy), a odpowiedź klientowi wychodzi z Twojej prywatnej skrzynki Gmail (bo to tam dostajesz forward).

**Opcjonalnie — wysyłanie z `kontakt@rzezbadekoracyjna.pl`:**

- W Gmailu: **Settings** → **Accounts** → **Send mail as** → **Add another email** → `kontakt@rzezbadekoracyjna.pl`
- Jako SMTP relay: **[ZohoMail](https://www.zoho.com/mail/)** darmowy plan (1 użytkownik, 5 GB, własna domena) albo **ImprovMX** (tylko forwarding) albo **[Purelymail](https://purelymail.com/)** (~$10/rok)
- Po konfiguracji: odpowiadasz w Gmailu, ale klient widzi `kontakt@rzezbadekoracyjna.pl` w „From"

**Rekomendacja na MVP:** zostawić forwarding-only (kontakt@… → Gmail), odpowiadać z prywatnego Gmaila z podpisem „— BB, Dekoracyjne Rzeźby BB". Dopiero jak strona zacznie żyć i będzie to dokuczliwe, dosetupować ZohoMail (15 min).

---

## 10. Favicon i logo

**Kiedy:** przed Fazą 4 (widoczne w nav i jako favicon).

**Koszt:** darmowe (jeśli robisz sam) albo 50–200 zł (Fiverr / Canva Pro).

**Czas:** 1–3 godziny.

### Potrzebujemy

- **Logo wordmark** (tekst) — już w designie jest „Atelier Mira" w parze regular+italic. Jeśli zmieniasz nazwę, odtwórz w tym samym kroju (np. w Figmie)
- **Logo znak/favicon** — w designie brak! Musisz wymyślić prosty symbol (monogram inicjałów? abstract mark?) lub na start użyć pierwszej litery brand w kole
- **Formaty do eksportu:**
  - `favicon.svg` (32×32 skalowalne)
  - `favicon-32.png`, `favicon-192.png`, `favicon-512.png` (PWA-ready)
  - `apple-touch-icon.png` (180×180)
  - `og-default.jpg` (1200×630, logo + brand kolor — fallback dla Open Graph)

**Narzędzia:**

- [Figma](https://www.figma.com/) (darmowe) — jeśli komfortowo
- [realfavicongenerator.net](https://realfavicongenerator.net/) — wgrywasz SVG, generuje wszystkie formaty

**Alternatywa:** zacznij od prostego tekstu jako favicon (pierwszy znak brand w kole) i iteruj później.

---

## Podsumowanie — kolejność i deadline

| #       | Zadanie                                                | Deadline (faza)            | Czas                     |
| ------- | ------------------------------------------------------ | -------------------------- | ------------------------ |
| 1       | Domena `rzezbadekoracyjna.pl`                          | **TERAZ** (propagacja DNS) | 15 min + ~3 h propagacja |
| 2       | GitHub repo                                            | Faza 0                     | 10 min                   |
| 3       | Sanity projekt                                         | Faza 1                     | 15 min                   |
| 8a      | Biografia PL+EN + brand EN (BB Decorative Sculptures?) | Faza 1                     | 2–4 h                    |
| 8c (×3) | Pierwsze 3 rzeźby (zdjęcia + opisy)                    | Faza 1                     | 1–2 dni                  |
| 4       | Cloudflare account + DNS + Turnstile keys              | Faza 4/5                   | 20 min                   |
| 8b      | Copy hero + quote                                      | Faza 4                     | 1 h                      |
| 10      | Favicon + OG image + symbol BB                         | Faza 4                     | 1–3 h                    |
| 5       | Web3Forms access key                                   | Faza 5                     | 3 min                    |
| 9       | Email routing (`kontakt@rzezbadekoracyjna.pl`)         | Faza 5                     | 5 min                    |
| 8d      | Polityka prywatności                                   | Faza 5 (przed produkcją)   | 1–2 h                    |
| 6       | Google Search Console                                  | Faza 8                     | 15 min                   |
| 7       | Analytics (rekomendacja: Cloudflare Web Analytics)     | Faza 8                     | 5 min                    |

**Szacowany budżet:** ~10–30 zł/rok (pierwszy rok domeny .pl) + 60–90 zł/rok (kolejne lata) + 0 zł wszystko inne = **~5–8 zł/mies amortyzacji** → ✅ mieści się w „do 20 zł/mies".

Cały stack w MVP (Sanity Free, Cloudflare Pages Free, Web3Forms Free, Cloudflare Web Analytics Free) nie kosztuje nic oprócz domeny.
