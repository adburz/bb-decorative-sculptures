# Sanity Studio — Dekoracyjne Rzeźby BB

CMS for the site. Schemas live in [schemas/](schemas/). Run from repo root:

```bash
pnpm dev:sanity      # http://localhost:3333
pnpm build:sanity
```

**First run:** copy `.env.example` → `.env.local` and fill `SANITY_STUDIO_PROJECT_ID` after creating project at https://sanity.io/manage.

Schemas are implemented in **Phase 1** (see `/docs/IMPLEMENTATION_PLAN.md`). Phase 0 only scaffolds the Studio shell.
