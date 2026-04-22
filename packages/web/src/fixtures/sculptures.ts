import type { Sculpture } from "~/lib/content/types";

const sculptures: Sculpture[] = [
  {
    _id: "fixture-swit",
    title: { pl: "Świt", en: "Dawn" },
    slug: { pl: "swit", en: "dawn" },
    material: { name: { pl: "Brąz patynowany", en: "Patinated bronze" }, slug: "bronze" },
    category: { name: { pl: "Mała forma", en: "Small form" }, slug: "small-form" },
    dimensions: { height: 52, width: 28, depth: 22, unit: "cm" },
    price: { amount: 3800, currency: "EUR", onRequest: false },
    status: "available",
    gallery: [
      {
        url: "/placeholder-sculpture-1.jpg",
        alt: { pl: "Rzeźba Świt — widok z przodu", en: "Dawn sculpture — front view" },
        width: 1200,
        height: 1200,
      },
      {
        url: "/placeholder-sculpture-1-side.jpg",
        alt: { pl: "Rzeźba Świt — widok z boku", en: "Dawn sculpture — side view" },
        width: 1200,
        height: 1200,
      },
    ],
    description: {
      pl: "Mała forma w brązie patynowanym, odlew jednostkowy z pracowni w Katowicach. Sygnowana i numerowana.",
      en: "A small form in patinated bronze, a single-cast piece from the Katowice studio. Signed and numbered.",
    },
    publishedAt: "2025-09-01T10:00:00Z",
  },
  {
    _id: "fixture-cien",
    title: { pl: "Cień", en: "Shadow" },
    slug: { pl: "cien", en: "shadow" },
    material: { name: { pl: "Brąz", en: "Bronze" }, slug: "bronze" },
    category: { name: { pl: "Popiersie", en: "Bust" }, slug: "bust" },
    dimensions: { height: 68, width: 34, depth: 30, unit: "cm" },
    price: { onRequest: true },
    status: "available",
    gallery: [
      {
        url: "/placeholder-sculpture-2.jpg",
        alt: { pl: "Rzeźba Cień — detal", en: "Shadow sculpture — detail" },
        width: 1200,
        height: 1200,
      },
    ],
    description: {
      pl: "Popiersie w brązie, odlew limitowany. Praca powstała w pracowni przy ul. Kobylińskiego 2A.",
      en: "A bust in bronze, limited cast. Made in the studio at ul. Kobylińskiego 2A.",
    },
    publishedAt: "2025-10-15T10:00:00Z",
  },
  {
    _id: "fixture-korzen",
    title: { pl: "Korzeń", en: "Root" },
    slug: { pl: "korzen", en: "root" },
    material: { name: { pl: "Żywica barwiona", en: "Tinted resin" }, slug: "resin" },
    category: { name: { pl: "Forma parkowa", en: "Park form" }, slug: "park-form" },
    dimensions: { height: 44, width: 46, depth: 24, unit: "cm" },
    price: { amount: 9800, currency: "PLN", onRequest: false },
    status: "reserved",
    gallery: [
      {
        url: "/placeholder-sculpture-3.jpg",
        alt: { pl: "Rzeźba Korzeń — widok ogólny", en: "Root sculpture — overall view" },
        width: 1200,
        height: 1200,
      },
    ],
    description: {
      pl: "Studium formy organicznej w żywicy barwionej. Praca unikatowa, odlewana ręcznie.",
      en: "A study of organic form in tinted resin. Unique piece, hand-cast.",
    },
    publishedAt: "2026-01-10T10:00:00Z",
  },
  {
    _id: "fixture-echo",
    title: { pl: "Echo", en: "Echo" },
    slug: { pl: "echo", en: "echo" },
    material: { name: { pl: "Brąz", en: "Bronze" }, slug: "bronze" },
    category: { name: { pl: "Medal", en: "Medal" }, slug: "medal" },
    dimensions: { height: 12, width: 12, depth: 2, unit: "cm" },
    price: { amount: 1600, currency: "EUR", onRequest: false },
    status: "sold",
    gallery: [
      {
        url: "/placeholder-sculpture-4.jpg",
        alt: { pl: "Medal Echo — awers", en: "Echo medal — obverse" },
        width: 1200,
        height: 1200,
      },
    ],
    description: {
      pl: "Medal odlewany w brązie, niewielki nakład autorski. Praca sygnowana na rewersie.",
      en: "A medal cast in bronze, a small authored edition. Signed on the reverse.",
    },
    publishedAt: "2025-11-05T10:00:00Z",
  },
];

export default sculptures;
