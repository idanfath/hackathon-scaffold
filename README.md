<p align="center">
  <img src="https://i.pinimg.com/736x/de/1a/5a/de1a5a8406ffbdeb3b77a735cb54778a.jpg" alt="meme-1" width="32%" />
  <img src="https://i.pinimg.com/736x/b2/9a/aa/b29aaa13884b42a30b79cfca0df03fee.jpg" alt="meme-2" width="32%" />
  <img src="https://i.pinimg.com/736x/06/b1/74/06b17490f9b5224923630fd6d7e7fe8d.jpg" alt="meme-3" width="32%" />
</p>

# Hackathon Scaffold

A production-ready full-stack starter kit built with **Laravel 13**, **Inertia.js v3**, **React 19**, and **Tailwind CSS v4**.

Designed with clean domain architecture, end-to-end type safety, and strict coding guardrails to kickstart modern web apps and hackathon projects without boilerplate fatigue.

---

## Key Features

- **Authentication & Security:**
    - Email/password authentication, registration, email verification, and password reset.
    - Social login (OAuth) via Laravel Socialite.
    - Account ban protection middleware (`EnsureNotBanned`).
    - Rate-limited authentication attempts and security measures.
- **User & Profile Suite:**
    - Role-based authorization (`User`, `Admin`).
    - User profile management.
    - Avatar pipeline: client-side image compression and deterministic SVG fallback avatar generator.
- **Notification Engine:**
    - Message inbox with pagination and category filtering.
    - Push toast notifications and category-based preferences.
    - Realtime broadcast listening via Laravel Echo.
- **End-to-End Type Safety & Developer Experience (DX):**
    - **Laravel Wayfinder:** Backend routes automatically generated as typed TypeScript functions (`@/routes` & `@/actions`).
    - **Enum Synchronizer:** PHP Backed Enums auto-synced to TypeScript const and type definitions (`php artisan enum:types`).
    - **Strict Architectural Boundaries:** Modular feature-based structure documented in [`AGENTS.md`](AGENTS.md).

---

## Tech Stack

- **Backend:** PHP 8.4+ / Laravel 13, SQLite / MySQL / PostgreSQL
- **Frontend:** Inertia.js v3, React 19, TypeScript
- **Styling & UI:** Tailwind CSS v4, Radix UI / Shadcn primitives, Lucide Icons
- **Realtime:** Laravel Echo, Reverb / Pusher Channels
- **Testing & Tooling:** Pest 4, Laravel Pint, ESLint 9, Prettier, Wayfinder
- **Package Managers:** `pnpm` (Node.js) & `composer` (PHP)

---

## Getting Started

```bash
composer install
pnpm install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
pnpm build
```

Start the local development servers:

```bash
php artisan serve
php artisan queue:work
pnpm dev
```

---

## Useful Commands

### Sync Enums to TypeScript

```bash
php artisan enum:types
```

### Create a New Backed Enum

```bash
php artisan enum:make Status --values="draft,published,archived"
```

### Quality Assurance & Testing

```bash
php artisan test --compact    # run pest test suite
pnpm types:check              # run typescript typecheck
pnpm lint:check               # run eslint
pnpm format:check             # check code formatting
vendor/bin/pint --dirty       # check php formatting
```
