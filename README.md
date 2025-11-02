# Next.js / React.js Technical Assessment - Contacts & Tasks

This repository is a **complete scaffold** for the requested assessment. It includes:
- Next.js 14 (App Router) + TypeScript
- In-memory "DB" (module-level data) and JSON seed generator
- Contacts listing with search, sort, and pagination (supports 10k+ dataset)
- Tasks CRUD linked to contacts with optimistic UI & simulated API failure
- Accessibility focus and keyboard navigation
- Performance: virtualization (react-window), memoization
- ESLint + Prettier, Tailwind CSS for styling
- Jest + React Testing Library unit tests and a Playwright e2e test
- ADR.md, LOG.md

## Quick setup

```bash
# install
npm install

# dev
npm run dev

# tests
npm run test

# e2e 
npx playwright install
npm run e2e
```

## Feature Checklist
- [x] List, search, sort, paginate contacts
- [x] Create / edit / toggle / delete tasks linked to contacts
- [x] Optimistic UI updates with simulated failures & retry
- [x] Empty and error states with retry
- [x] Accessibility & keyboard navigation
- [x] Validation & performance optimization
- [x] ESLint & Prettier
- [x] Jest + RTL tests & Playwright e2e
- [x] README, ADR.md, LOG.md

See `ADR.md` for architecture decisions and `LOG.md` for work timeline.

