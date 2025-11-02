# Architecture Decision Records

## 001 — Tech stack
- Use Next.js 14 App Router for server components and routing.
- TypeScript for type-safety.
- Tailwind CSS for consistent styling and quick iteration.
- In-memory module for storage to satisfy "no external DB" rule.

## 002 — State management
- Use React hooks + SWR for client data fetching and cache.
- Server actions are used for mutations where appropriate.

## 003 — Performance
- Use virtualization (react-window) for rendering large lists.
- Memoize components and handlers using React.memo and useCallback.

## 004 — Testing
- Jest + React Testing Library for unit/component tests.
- Playwright for one e2e happy-path test.

