import type { SiteSettings } from "~/lib/content/types";

const settings: SiteSettings = {
  brandName: "Bogumił Burzyński",
  tagline: {
    pl: "Rzeźby w brązie i żywicy — pracownia Bogumiła Burzyńskiego w Katowicach",
    en: "Sculptures in bronze and resin — the Katowice studio of Bogumił Burzyński",
  },
  contact: {
    email: "bbstrona@gmail.com",
    phone: "+48 606 475 803",
    address: "ul. Kobylińskiego 2A, Katowice",
    city: { pl: "Katowic", en: "Katowice" },
    hours: {
      pl: "Wizyty w pracowni po wcześniejszym umówieniu telefonicznym.",
      en: "Studio visits by prior appointment — please call to arrange.",
    },
  },
  social: {
    instagram: "https://www.instagram.com/bogumilburzynski",
  },
  defaultOgImage: "/og-default.jpg",
};

export default settings;
