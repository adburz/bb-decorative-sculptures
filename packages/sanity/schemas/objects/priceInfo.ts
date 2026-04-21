import { defineField, defineType } from "sanity";

export default defineType({
  name: "priceInfo",
  title: "Price",
  type: "object",
  fields: [
    defineField({
      name: "onRequest",
      title: "Cena na zapytanie",
      type: "boolean",
      initialValue: false,
      description: "Jeśli zaznaczone — cena nie jest pokazywana, zamiast tego przycisk 'Zapytaj'.",
    }),
    defineField({
      name: "amount",
      title: "Kwota",
      type: "number",
      hidden: ({ parent }) => Boolean((parent as { onRequest?: boolean } | undefined)?.onRequest),
      validation: (r) =>
        r.custom((value, ctx) => {
          const parent = ctx.parent as { onRequest?: boolean } | undefined;
          if (parent?.onRequest) return true;
          if (typeof value !== "number" || value <= 0)
            return "Podaj kwotę lub zaznacz 'Cena na zapytanie'.";
          return true;
        }),
    }),
    defineField({
      name: "currency",
      title: "Waluta",
      type: "string",
      options: { list: ["EUR", "PLN"], layout: "radio" },
      initialValue: "EUR",
      hidden: ({ parent }) => Boolean((parent as { onRequest?: boolean } | undefined)?.onRequest),
    }),
  ],
  preview: {
    select: { amount: "amount", currency: "currency", onRequest: "onRequest" },
    prepare: ({ amount, currency, onRequest }) => ({
      title: onRequest ? "Cena na zapytanie" : amount ? `${amount} ${currency ?? ""}` : "—",
    }),
  },
});
