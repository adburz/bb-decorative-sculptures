import type { Sculpture } from "~/lib/content/types";

const sculptures: Sculpture[] = [
  {
    _id: "fixture-swit",
    title: { pl: "Świt", en: "Dawn" },
    slug: { pl: "swit", en: "dawn" },
    material: { name: { pl: "Brąz patynowany", en: "Patinated bronze" }, slug: "bronze" },
    dimensions: { height: 52, width: 28, depth: 22, unit: "cm" },
    price: { amount: 3800, currency: "EUR", onRequest: false },
    status: "available",
    gallery: [
      {
        url: "/placeholder-sculpture-1.jpg",
        alt: { pl: "Rzeźba Świt — widok z przodu", en: "Dawn sculpture — front view" },
      },
    ],
    description: {
      pl: "Forma inspirowana wschodem słońca nad łąką; miękkie przejścia patynowego brązu łapią światło z każdego kąta.",
      en: "A form inspired by sunrise over a meadow; soft transitions of patinated bronze catch light from every angle.",
    },
    publishedAt: "2025-09-01T10:00:00Z",
  },
  {
    _id: "fixture-cien",
    title: { pl: "Cień", en: "Shadow" },
    slug: { pl: "cien", en: "shadow" },
    material: { name: { pl: "Marmur carraryjski", en: "Carrara marble" }, slug: "marble" },
    dimensions: { height: 68, width: 34, depth: 30, unit: "cm" },
    price: { amount: 0, currency: "EUR", onRequest: true },
    status: "available",
    gallery: [
      {
        url: "/placeholder-sculpture-2.jpg",
        alt: { pl: "Rzeźba Cień — detal", en: "Shadow sculpture — detail" },
      },
    ],
    description: {
      pl: "Studium ciemności — marmur rzeźbiony techniką negatywu, gdzie cień staje się tak samo ważny jak bryła.",
      en: "A study of darkness — marble carved in negative space, where shadow becomes as important as mass.",
    },
    publishedAt: "2025-10-15T10:00:00Z",
  },
];

export default sculptures;
