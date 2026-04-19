# 🦷 Badr Dental Center

The official website for **Badr Dental Center** — a leading dental clinic in Egypt specializing in dental implants, cosmetics, orthodontics, and more since 2014. Built and maintained by [Falak Innovation](https://falak-innovation.com/).

---

## 🚀 Tech Stack

| Layer       | Technology                                                      |
| ----------- | --------------------------------------------------------------- |
| **Backend** | [Laravel 13](https://laravel.com/) (PHP 8.3+)                  |
| **Frontend**| [React 19](https://react.dev/) with [Inertia.js v3](https://inertiajs.com/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/)                     |
| **UI**      | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) components |
| **Icons**   | [Lucide React](https://lucide.dev/)                             |
| **Build**   | [Vite 8](https://vitejs.dev/)                                   |
| **Auth**    | [Laravel Fortify](https://laravel.com/docs/fortify)             |
| **Database**| SQLite (default) / MySQL                                        |
| **Routing** | [Laravel Wayfinder](https://github.com/laravel/wayfinder) for type-safe Inertia routes |

---

## ✨ Features

### Public Website
- **Home Page** — Hero section, service carousel, articles, and client testimonials
- **About Page** — Clinic history, doctor profile, and statistics
- **Services** — Dynamic listing from database with individual show pages and before/after gallery
- **Doctors** — Team directory with profiles
- **Articles** — Blog/news section with detail pages
- **Client Reviews** — Testimonials with ratings and video stories
- **Branches** — Location details for Mansoura and Sheikh Zayed branches
- **Contact / Booking** — Appointment booking form with service and branch selection
- **Country Pages** — Dedicated landing pages for Egypt and Saudi Arabia (medical tourism)

### Admin Dashboard
- Full CRUD management for **Articles**, **Services**, **Doctors**, **Testimonials**, and **Users**
- **Appointment management** — View and manage incoming bookings
- **Service Comparisons** — Before/after image gallery per service
- Role-based access with admin middleware

### Localization
- Full **Arabic (RTL)** and **English (LTR)** support
- Language switcher in navbar
- All content served via JSON translation files (`lang/ar.json`, `lang/en.json`)

---

## 📁 Project Structure

```
dr-badr/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/              # Admin CRUD controllers
│   │   │   ├── SiteController.php  # Public pages controller
│   │   │   └── DashboardController.php
│   │   └── Middleware/
│   │       ├── HandleInertiaRequests.php  # Shared Inertia props
│   │       └── CheckIsAdmin.php
│   └── Models/
│       ├── Article.php
│       ├── Appointment.php
│       ├── Doctor.php
│       ├── Service.php
│       ├── ServiceComparison.php
│       ├── Testimonial.php
│       └── User.php
├── resources/js/
│   ├── components/ui/          # Reusable UI components (navbar, footer, etc.)
│   └── pages/
│       ├── welcome.jsx         # Home page
│       ├── about.jsx           # About page
│       ├── contact.jsx         # Contact & booking page
│       ├── branches.jsx        # Branches page
│       ├── egypt.jsx           # Egypt landing page
│       ├── saudi.jsx           # Saudi Arabia landing page
│       ├── admin/              # Admin dashboard pages
│       ├── articles/           # Articles index & show
│       ├── services/           # Services index & show
│       ├── doctors/            # Doctors listing
│       └── clients/            # Client reviews
├── lang/
│   ├── ar.json                 # Arabic translations
│   └── en.json                 # English translations
├── routes/
│   └── web.php                 # All route definitions
└── database/
    └── migrations/             # Database schema
```

---

## ⚙️ Installation

### Prerequisites
- PHP 8.3+
- Composer
- Node.js 20+
- npm

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Falak-Innovation/Dr-Badr.git
   cd Dr-Badr
   ```

2. **Install dependencies**
   ```bash
   composer install
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Run migrations**
   ```bash
   php artisan migrate
   ```

5. **Start the development server**
   ```bash
   composer dev
   ```
   This runs all services concurrently:
   - Laravel server (`php artisan serve`)
   - Queue worker
   - Log viewer (Pail)
   - Vite dev server

   The app will be available at **http://localhost:8000**

---

## 🛠️ Available Scripts

### PHP / Laravel
| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `composer dev`       | Start all dev services concurrently      |
| `composer setup`     | Full project setup (install, migrate, build) |
| `composer lint`      | Run PHP Pint code formatter              |
| `composer test`      | Run tests with Pest                      |

### JavaScript / Frontend
| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `npm run dev`        | Start Vite dev server                    |
| `npm run build`      | Production build                         |
| `npm run lint`       | Lint & fix with ESLint                   |
| `npm run format`     | Format with Prettier                     |
| `npm run types:check`| TypeScript type checking                 |

---

## 🌐 Routes Overview

### Public Routes
| Route                     | Description              |
| ------------------------- | ------------------------ |
| `/`                       | Home page                |
| `/about`                  | About the clinic         |
| `/services`               | All services             |
| `/services/{id}`          | Service detail page      |
| `/articles`               | All articles             |
| `/articles/{id}`          | Article detail page      |
| `/doctors`                | Doctors listing          |
| `/clients`                | Client testimonials      |
| `/branches`               | Branch locations         |
| `/contact`                | Contact & booking form   |
| `/egypt`                  | Egypt landing page       |
| `/saudi`                  | Saudi Arabia landing page|

### Admin Routes (`/admin/*`)
All admin routes require authentication and admin privileges.

| Route                          | Description                |
| ------------------------------ | -------------------------- |
| `/admin/dashboard`             | Admin dashboard            |
| `/admin/users`                 | User management            |
| `/admin/articles`              | Article management         |
| `/admin/services`              | Service management         |
| `/admin/doctors`               | Doctor management          |
| `/admin/testimonials`          | Testimonial management     |
| `/admin/appointments`          | Appointment management     |

---

## 📝 License

All Rights Reserved — Badr Dental Center. Developed and maintained by [Falak Innovation](https://falak-innovation.com/).
