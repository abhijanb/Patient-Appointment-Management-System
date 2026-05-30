# Patient Appointment Management System

A full-stack web application for managing patient appointments with role-based access — patients can browse doctors, book/cancel/rate appointments, and admins can manage doctors, schedules, and view dashboard analytics.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [System Design & Architecture](#system-design--architecture)
- [ER Diagram](#er-diagram)
- [Frontend Description](#frontend-description)
- [Backend Description](#backend-description)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
- [Demo](#demo)
- [Project Structure](#project-structure)

---

## Tech Stack

### Frontend

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI framework |
| TypeScript | 6 | Type safety |
| Vite | 8 | Build tool / dev server |
| Tailwind CSS | 4 | Utility-first styling |
| Redux Toolkit | 2 | State management & RTK Query |
| React Router | 7 | Client-side routing |
| React Hook Form | 7 | Form state management |
| Zod | 4 | Schema validation |
| react-hot-toast | 2 | Toast notifications |
| lucide-react | 1 | Icon library |

### Backend

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 22+ | Runtime |
| Express | 5 | Web framework |
| TypeScript | 6 | Type safety |
| Prisma | 7 | ORM with PostgreSQL adapter |
| PostgreSQL | 16 | Database |
| Zod | 4 | Request validation |
| JSON Web Token | 9 | Authentication |
| bcryptjs | 3 | Password hashing |
| multer | 2 | File uploads |
| node-cron | 4 | Scheduled tasks |
| express-rate-limit | 8 | Rate limiting |
| cookie-parser | 1 | Cookie parsing |

---

## System Design & Architecture

The application follows a **three-tier architecture**:

```
┌─────────────────────────────────────────────────────────────────────┐
│                       Client (React SPA)                            │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────┐                │
│  │ Auth UI  │  │ Admin Panel  │  │ Patient Portal│                │
│  │ /login   │  │ /admin/*     │  │ /book-        │                │
│  │ /register│  │              │  │ appointments  │                │
│  └──────────┘  └──────────────┘  └───────────────┘                │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │               Redux Store + RTK Query                           ││
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────────────────┐  ││
│  │  │ authSlice  │  │ authApi    │  │   patientApi / adminApi  │  ││
│  │  │ (user,     │  │ (login,    │  │   (doctors, schedules,   │  ││
│  │  │  authCheck)│  │  register, │  │    appointments, dash,   │  ││
│  │  └────────────┘  │  me, logout)│  │    CRUD, etc.)          │  ││
│  │                  └────────────┘  └──────────────────────────┘  ││
│  └─────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
                                    │
                              HTTP (JSON)
                          Cookies (accessToken)
                                    │
┌─────────────────────────────────────────────────────────────────────┐
│                      Server (Express)                               │
│                                                                     │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────────────────────┐  │
│  │  Auth    │  │  Middleware   │  │       Controllers            │  │
│  │  Routes  │  │  ─────────── │  │  ┌────────────────────────┐  │  │
│  │  /auth/* │  │  auth cookies│  │  │ authController        │  │  │
│  ├──────────┤  │  role guard  │  │  ├────────────────────────┤  │  │
│  │  Admin   │  │  rate limits │  │  │ admin: doctor Ctrl    │  │  │
│  │  Routes  │  │  file upload │  │  │        schedule Ctrl  │  │  │
│  │  /admin/*│  │  CORS        │  │  │        dashboard Ctrl │  │  │
│  ├──────────┤  └──────────────┘  │  ├────────────────────────┤  │  │
│  │  Patient │                    │  │ patient: doctor Ctrl   │  │  │
│  │  Routes  │                    │  │          appointment   │  │  │
│  │  /patient│                    │  └────────────────────────┘  │  │
│  └──────────┘                    │          │                    │
│                                  │          ▼                    │
│                                  │  ┌────────────────────────┐  │
│                                  │  │ Services (Business     │  │
│                                  │  │ Logic + Prisma Queries)│  │
│                                  │  └────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                              Prisma ORM
                                    │
┌─────────────────────────────────────────────────────────────────────┐
│                       PostgreSQL Database                           │
│  ┌────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐       │
│  │  User  │  │  Doctor  │  │ Schedule │  │ Appointment   │       │
│  └────────┘  └──────────┘  └──────────┘  └───────────────┘       │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Design Decisions

- **JWT in httpOnly cookies** — safer than localStorage, automatic sending with `credentials: 'include'`
- **Single long-lived token (7 days)** — no refresh token flow for simplicity
- **RTK Query** — automatic caching, tag-based invalidation, optimistic updates
- **Prisma with adapter-pg** — driver-level PostgreSQL adapter for connection pooling
- **Transaction-based booking** — optimistic locking via `updateMany where status: AVAILABLE` prevents double-booking
- **Cron-based auto-complete** — `node-cron` runs hourly to mark past appointments as completed

---

## ER Diagram

```
┌──────────────────┐
│       User       │
├──────────────────┤
│ id (PK)          │──┐
│ name             │  │
│ email (UQ)       │  │
│ passwordHash     │  │
│ role (ADMIN/     │  │
│   PATIENT)       │  │
│ createdAt        │  │
│ updatedAt        │  │
└──────────────────┘  │
                      │ 1
                      │
                      │ N
                      │
┌──────────────────┐  │
│   Appointment    │  │
├──────────────────┤  │
│ id (PK)          │  │
│ patientId (FK)   │──┘
│ scheduleId (FK,UQ)│──┐
│ status (UPCOMING/│  │
│   COMPLETED/    │  │
│   CANCELLED)    │  │
│ rating?          │  │
│ ratedAt?         │  │
│ createdAt        │  │
└──────────────────┘  │
                      │ 0..1
                      │
                      │ 1
┌──────────────────┐  │
│     Schedule      │  │
├──────────────────┤  │
│ id (PK)          │  │
│ doctorId (FK)    │──┐│
│ availableDate    │  ││
│ timeSlot         │  ││
│ consultationType │  ││
│   (IN_PERSON/    │  ││
│    TELEHEALTH)   │  ││
│ status (AVAILABLE│  ││
│   / BOOKED)      │  ││
│ UQ(doctorId,     │  ││
│   availableDate, │  ││
│   timeSlot)      │  ││
└──────────────────┘  ││
                      ││
                      └┼──┐
                       │  │
                       │  │
                 ┌─────┘  │
                 │ 1      │ N
                 ▼        │
          ┌──────────┐    │
          │  Doctor   │    │
          ├──────────┤    │
          │ id (PK)  │────┘
          │ name     │
          │ imageUrl │
          │specializ-│
          │ ation    │
          │hospital- │
          │ Branch   │
          │average-  │
          │Rating    │
          │createdAt │
          │updatedAt │
          └──────────┘
```

### Relationships

- **User 1:N Appointment** — one patient has many appointments
- **Schedule N:1 Doctor** — many schedules belong to one doctor
- **Schedule 1:0..1 Appointment** — a schedule slot can have at most one appointment (enforced by `@unique` on `scheduleId`)
- **Doctor N:N User (indirect through Appointment + Schedule)** — patients book appointments with doctors through schedule slots

### Enums

| Enum | Values |
|------|--------|
| `UserRole` | `ADMIN`, `PATIENT` |
| `ConsultationType` | `IN_PERSON`, `TELEHEALTH` |
| `ScheduleStatus` | `AVAILABLE`, `BOOKED` |
| `AppointmentStatus` | `UPCOMING`, `COMPLETED`, `CANCELLED` |

---

## Frontend Description

### UI Design

The UI uses **Tailwind CSS v4** with utility classes — no `tailwind.config.js` or `@theme` blocks. The design follows a clean, modern layout with:

- **Color scheme**: Primary blue tones, green accents for confirmations, purple for telehealth
- **Admin layout**: Fixed sidebar navigation + top header with user info
- **Patient layout**: Responsive sidebar (desktop) / bottom nav (mobile) + top header
- **Booking stepper**: 3-step guided flow (Select Doctor → Pick Time → Confirmation)
- **Responsive**: Full mobile support with collapsible filters and adaptive grid layouts
- **Loading states**: Fallback spinner during lazy-loaded route transitions

### Key UI Pages

#### Public

| Route | Page | Description |
|-------|------|-------------|
| `/login` | LoginPage | Email/password login form |
| `/register` | RegisterPage | Patient registration with terms acceptance |
| `/forbidden` | ForbiddenPage | 403 access denied |

#### Admin (`/admin/*`)

| Route | Page | Description |
|-------|------|-------------|
| `/admin` | DashboardPage | Stats cards (total doctors, today's appointments, pending), recent doctors list |
| `/admin/doctors` | DoctorManagementPage | CRUD table with search, filter, sort, pagination; modal forms for add/edit |
| `/admin/doctors/:id` | DoctorProfilePage | Doctor details with schedule slots table (filterable by date, status, type) |
| `/admin/schedule` | SchedulePage | Full schedule listing with filters (date range, doctor, type, status) |
| `/admin/schedule/create` | CreateSchedulePage | Form to create a new schedule slot (doctor, date, time, consultation type) |

#### Patient

| Route | Page | Description |
|-------|------|-------------|
| `/` | DashboardPage | Welcome banner, upcoming appointments cards, quick book button |
| `/book-appointments` | BookAppointmentsPage | 3-step booking flow: doctor cards with search/filters → date picker + time slots → confirmation |
| `/appointments` | AppointmentsPage | Tabbed table (Upcoming / Completed / Cancelled) with rate/cancel actions |
| `/settings` | SettingsPage | Profile editor, password change form |

### Frontend Architecture

```
client/src/
├── App.tsx                    # Root: ErrorBoundary + Toaster + RouterProvider
├── main.tsx                   # Entry: createRoot + Provider(store)
├── config.ts                  # APP_NAME constant
├── components/
│   ├── LoadingFallback.tsx    # Spinner for Suspense
│   ├── ErrorBoundary.tsx      # React error boundary
│   └── ProtectedRoute.tsx     # Auth guard + role check
├── features/
│   ├── auth/                  # Login, Register, Forbidden pages
│   │   ├── auth.route.tsx     # Public routes
│   │   ├── authApi.ts         # RTK Query: login, register, me, logout
│   │   ├── authSlice.ts       # Redux: user state, authChecked
│   │   ├── auth.type.ts       # TypeScript interfaces
│   │   └── auth.validation.ts # Zod schemas
│   ├── admin/                 # Admin dashboard, doctor CRUD, schedules
│   │   ├── admin.route.tsx    # Protected admin routes
│   │   ├── adminApi.ts        # RTK Query: all admin endpoints
│   │   ├── admin.type.ts      # TypeScript interfaces
│   │   ├── admin.validation.ts# Zod schemas
│   │   ├── hooks/             # useDoctorManagement, useScheduleLogic, etc.
│   │   ├── components/        # AdminLayout, Sidebar, Table, Cards, Modals, Filters
│   │   └── page/              # DashboardPage, DoctorManagementPage, etc.
│   └── patient/               # Patient dashboard, booking, appointments
│       ├── patient.route.tsx  # Protected patient routes
│       ├── patientApi.ts      # RTK Query: doctors, schedules, appointments
│       ├── hooks/             # useBookAppointmentsLogic, usePatientDashboardLogic, etc.
│       ├── components/        # PatientLayout, Sidebar, DoctorCard, SlotSection, etc.
│       └── page/              # DashboardPage, BookAppointmentsPage, etc.
├── store/
│   └── store.ts               # Redux store configuration
├── utils/
│   ├── apiError.ts            # ApiError interface
│   ├── cookie.ts              # Cookie helpers
│   ├── date.ts                # Date formatting
│   ├── getImageUrl.ts         # Image URL resolver
│   └── handleServerError.ts   # Error message extraction
└── styles/                    # Global CSS
```

### State Management

- **Redux Toolkit** for global auth state (`authSlice`)
- **RTK Query** for all server data (automatic caching, background refetch, tag-based invalidation)
  - `authApi` — login, register, me, logout, profile update, password change
  - `adminApi` — dashboard, doctors CRUD, schedules CRUD
  - `patientApi` — doctor listing, schedules, appointments, booking, rate, cancel
- **Local state** with `useState`/`useMemo` for UI state (filters, selected items, form data)
- **React Hook Form** for form management with Zod validation via `zodResolver`

---

## Backend Description

### Architecture

The server follows a standard layered architecture:

```
Routes → Middleware → Controllers → Services → Prisma ORM → PostgreSQL
```

- **Routes** — define URL patterns and HTTP methods, wire middleware and controllers
- **Middleware** — authentication, authorization, rate limiting, file upload, error handling
- **Controllers** — extract/validate request data, call services, format responses
- **Services** — business logic, Prisma queries, transactions
- **Prisma** — type-safe database client with PostgreSQL adapter

### Auth Flow

1. User registers or logs in → server validates credentials, creates JWT
2. Server sets an httpOnly cookie named `accessToken` (JWT, 7-day expiry, `sameSite: lax`, `secure: true`)
3. Client includes `credentials: 'include'` on all API requests
4. `authenticate` middleware reads the cookie, verifies JWT, looks up user, attaches `req.user`
5. `authorize` middleware checks `req.user.role` against allowed roles
6. On app mount, `useGetMeQuery()` checks `GET /api/auth/me` to restore user state from the cookie
7. Logout calls `POST /api/auth/logout` which clears the cookie server-side

### Security

- **Passwords**: bcryptjs with 12 salt rounds
- **JWT**: Signed with secret from env, stored in httpOnly cookie (not accessible to JS)
- **Rate limiting**: Login (5/min), Register (3/min), Appointment mutations (10/min)
- **File upload**: Multer with whitelisted MIME types (JPEG, PNG, GIF, WebP), 5MB max
- **Input validation**: All request data validated with Zod schemas before processing
- **Error handling**: Global error middleware catches and formats all errors

### Seed Scripts

The server includes seed scripts for development:

```bash
pnpm seed:admin   # Seed or update the admin user (uses ADMIN_EMAIL/ADMIN_PASSWORD from .env)
pnpm seed:doctors # Seed 25 doctors across 6 branches
pnpm seed:slots   # Seed schedule slots (10 days × 7 slots per doctor)
pnpm seed         # Run all seeders (doctors + slots)
```

Admin seeding can also be done by visiting `GET /` in development mode, but the CLI script (`pnpm seed:admin`) is the recommended approach.

---

## API Endpoints

### Auth

| Method | Path | Auth | Rate Limit | Description |
|--------|------|------|------------|-------------|
| POST | `/api/auth/register` | No | 3/min | Register a new patient |
| POST | `/api/auth/login` | No | 5/min | Login, sets JWT cookie |
| GET | `/api/auth/me` | Admin, Patient | — | Get current user |
| PATCH | `/api/auth/profile` | Admin, Patient | — | Update name/email |
| POST | `/api/auth/change-password` | Admin, Patient | — | Change password |
| POST | `/api/auth/logout` | Admin, Patient | — | Clear auth cookie |

### Admin

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/admin/dashboard` | Dashboard stats + recent doctors |
| GET | `/api/admin/manage-doctors` | List doctors (paginated, filterable) |
| GET | `/api/admin/manage-doctors/:id` | Get single doctor |
| POST | `/api/admin/manage-doctors` | Create doctor (multipart with image) |
| PATCH | `/api/admin/manage-doctors/:id` | Update doctor (multipart with image) |
| DELETE | `/api/admin/manage-doctors/:id` | Delete doctor |
| GET | `/api/admin/schedules` | List schedules (paginated, filterable) |
| POST | `/api/admin/schedules` | Create a schedule slot |
| DELETE | `/api/admin/schedules/:id` | Delete a schedule slot |

### Patient

| Method | Path | Rate Limit | Description |
|--------|------|------------|-------------|
| GET | `/api/patient/doctors` | — | List available doctors |
| GET | `/api/patient/doctors/:id/schedules` | — | Get available slots |
| POST | `/api/patient/appointments/book` | — | Book an appointment |
| GET | `/api/patient/appointments` | — | List my appointments |
| GET | `/api/patient/appointments/upcoming` | — | List upcoming appointments |
| POST | `/api/patient/appointments/:id/rate` | 10/min | Rate a completed appointment |
| PATCH | `/api/patient/appointments/:id/cancel` | 10/min | Cancel an appointment |

### System

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check (`{ status: "ok", timestamp }`) |
| GET | `/` | (Dev only) Seed admin user — use `pnpm seed:admin` instead |

---

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 11+ (`npm install -g pnpm`)
- PostgreSQL 16+

### Environment Setup

Copy the example env files and adjust as needed:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

**Server** (`server/.env`):

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: `3000`) |
| `NODE_ENV` | `development`, `production`, or `test` |
| `DATABASE_URL` | PostgreSQL connection string |
| `ACCESS_TOKEN_SECRET` | JWT signing secret (generate with `openssl rand -hex 64`) |
| `ACCESS_TOKEN_EXPIRY` | JWT lifetime (default: `7d`) |
| `FRONTEND_URL` | CORS origin (default: `http://localhost:5173`) |
| `ADMIN_EMAIL` | Email for seeded admin user |
| `ADMIN_PASSWORD` | Password for seeded admin user |

**Client** (`client/.env`):

| Variable | Description |
|----------|-------------|
| `VITE_APP_NAME` | Application brand name (default: `CareNote`) |

### Installation

```bash
# Terminal 1 — Server
cd server
pnpm install
pnpm prisma generate
pnpm prisma db push
pnpm seed:admin      # Seed or update admin user
pnpm seed            # Seed doctors + schedule slots
pnpm dev             # Starts on port 3000

# Terminal 2 — Client
cd client
pnpm install
pnpm dev             # Starts on port 5173
```

---

## Demo

[Demo Video](./server/uploads/demo/output.mp4)

---

## Project Structure

```
PatientAppointmentManagementSystem/
├── server/
│   ├── package.json
│   ├── tsconfig.json
│   ├── prisma/
│   │   └── schema.prisma
│   ├── generated/prisma/       # Prisma client output
│   ├── uploads/                # Uploaded doctor images
│   └── src/
│       ├── index.ts            # Entry point
│       ├── server.ts           # Express app setup
│       ├── config/env.ts       # Zod-validated env
│       ├── types/express.d.ts  # Express type augmentation
│       ├── lib/
│       │   ├── prisma.ts       # Prisma client singleton
│       │   └── multer.ts       # File upload utility
│       ├── middleware/
│       │   ├── authenticate.ts # JWT cookie auth
│       │   ├── authorize.ts    # Role-based access
│       │   ├── asyncHandler.ts # Async error wrapper
│       │   └── rateLimiter.ts  # Rate limiting
│       ├── utils/
│       │   ├── error.ts        # ApiError classes
│       │   ├── errorHandler.ts # Global error middleware
│       │   ├── response.ts     # Response helpers
│       │   ├── validateOrThrow.ts
│       │   ├── scheduler.ts    # Cron job
│       │   ├── seed.ts         # Admin seed endpoint
│       │   ├── seedDoctors.ts  # Doctor seeder
│       │   └── seedSlots.ts    # Slot seeder
│       ├── validations/
│       │   ├── auth.validation.ts
│       │   └── admin/, patient/
│       ├── routes/
│       │   ├── index.ts
│       │   ├── auth.ts
│       │   └── admin/, patient/
│       ├── controllers/
│       │   ├── auth.controller.ts
│       │   └── admin/, patient/
│       └── services/
│           ├── auth.service.ts
│           └── admin/, patient/
├── client/
│   ├── package.json
│   ├── tsconfig.json
│   ├── index.html
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── config.ts
│       ├── components/
│       ├── features/
│       │   ├── auth/           # Login, Register, Forbidden
│       │   ├── admin/          # Dashboard, Doctors, Schedules
│       │   └── patient/        # Dashboard, Booking, Appointments
│       ├── store/
│       ├── utils/
│       └── styles/
├── AGENTS.md                   # Development notes
├── improvementsuggestion.md    # Code audit
└── README.md
```
