import type { Post } from "~/lib/content/types";

const posts: Post[] = [
  {
    _id: "fixture-patyna",
    title: {
      pl: "Patyna — kolor, który rośnie z czasem",
      en: "Patina — a colour that grows with time",
    },
    slug: { pl: "patyna-kolor-ktory-rosnie", en: "patina-colour-that-grows" },
    excerpt: {
      pl: "Krótko o tym, dlaczego patynowanego brązu nie trzeba chronić przed starzeniem.",
      en: "A short note on why patinated bronze does not need to be protected from ageing.",
    },
    body: {
      pl: "Patyna to powłoka, która narasta na brązie w kontakcie z powietrzem, dotykiem dłoni i światłem. W pracowni kontroluję pierwsze miesiące tego procesu — kolory, intensywność, fakturę. Potem rzeźba idzie własną drogą.\n\nWiele osób pyta, czy patynę trzeba zabezpieczać. Odpowiedź jest krótka: nie. To właśnie patyna jest dowodem, że rzeźba żyje. Wystarczy raz na kwartał przetrzeć ją miękką ściereczką.",
      en: "Patina is a layer that grows on bronze through contact with air, touch, and light. In the studio I control the first months of that process — colours, intensity, texture. After that, the sculpture takes its own path.\n\nPeople often ask whether the patina needs to be preserved. The short answer is: no. Patina is the evidence that a sculpture is alive. A soft cloth, once a quarter, is all you need.",
    },
    publishedAt: "2026-02-14T10:00:00Z",
  },
  {
    _id: "fixture-dab",
    title: {
      pl: "Dlaczego rzeźbię w dębie",
      en: "Why I carve in oak",
    },
    slug: { pl: "dlaczego-rzezbie-w-debie", en: "why-i-carve-in-oak" },
    excerpt: {
      pl: "Kilka słów o materiale, który stawia opór — i dlatego jest taki dobry.",
      en: "A few words on a material that resists — and is exactly that good for it.",
    },
    body: {
      pl: "Dąb polski jest twardy, ciężki i pachnie garbnikiem, gdy się go ciosa. Każde uderzenie dłuta jest decyzją, której nie da się cofnąć.\n\nTa nieodwracalność wymusza uwagę — inną niż przy brązie, gdzie model można przerobić w wosku. W drewnie pracuję wolniej, zostawiam więcej niedokończenia, bo to właśnie niedokończenie otwiera rzeźbę.",
      en: "Polish oak is hard, heavy, and smells of tannin when you carve it. Every strike of the chisel is a decision you cannot undo.\n\nThat irreversibility forces a different kind of attention than bronze, where a model can be reworked in wax. In wood I work more slowly, I leave more unfinished — because it is the unfinished that keeps a sculpture open.",
    },
    publishedAt: "2026-03-20T10:00:00Z",
  },
];

export default posts;
