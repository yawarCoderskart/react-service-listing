# 🎉 React Service Listing

A modern React + TypeScript service marketplace and booking application for promoting service offerings, collecting customer inquiries, and managing requests from an admin dashboard.

## Overview

This project is designed for businesses that want to showcase services, allow customers to request quotes, and manage users, services, and orders in a clean, responsive interface.

The frontend is built with Vite, React, Tailwind CSS, and shadcn-ui components, and it connects to a backend API for users, services, orders, and contact submissions.

## ✨ Features

- Beautiful landing page with hero section, about section, testimonials, and contact form
- Service catalog with pricing, feature highlights, and CTA buttons
- Customer checkout / inquiry form for selected service
- User login and registration flow
- User profile support after booking
- Admin dashboard with business statistics
- Service management module
- User management module
- Order management module
- Contact inquiry list management
- Responsive mobile-first layout

## 📁 Project Structure

```bash
react-service-listing/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminHeader.tsx
│   │   │   ├── AdminLayout.tsx
│   │   │   └── AdminSidebar.tsx
│   │   ├── ui/
│   │   ├── AboutUs.tsx
│   │   ├── ContactUs.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSlider.tsx
│   │   ├── Navigation.tsx
│   │   ├── OurCoffee.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── Index.tsx
│   │   ├── Checkout.tsx
│   │   ├── NotFound.tsx
│   │   └── admin/
│   │       ├── Dashboard.tsx
│   │       ├── Login.tsx
│   │       ├── Register.tsx
│   │       ├── Services.tsx
│   │       ├── Orders.tsx
│   │       ├── Users.tsx
│   │       ├── UserProfile.tsx
│   │       └── ContactUsList.tsx
│   ├── hooks/
│   ├── lib/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── README.md
└── .gitignore
```

## 🧩 Core Modules

### Frontend Pages
- Home page showcasing company info, services, testimonials, and CTA
- Service booking checkout page for custom inquiries
- Admin login and register flows
- Admin dashboard overview with key business metrics
- Service management for adding, editing, and displaying service items
- Contact submissions list for lead collection
- User and order management screens

### Admin Features
- Manage services and pricing
- Review incoming requests and orders
- Track users and account activity
- Review customer contact messages
- Access dashboard analytics and quick actions

## 🛠️ Tech Stack

- Vite
- TypeScript
- React 18
- React Router DOM
- Tailwind CSS
- shadcn-ui
- TanStack Query
- Zod + React Hook Form
- Lucide React icons

## 🚀 How to Run

### 1. Clone the repository

```bash
git clone <YOUR_GIT_URL>
cd react-service-listing
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the app

Visit:

```text
http://localhost:5173
```

## 🔗 API Configuration

This project uses backend API endpoints configured in the frontend utilities. You can review and modify the API base URL in:

- `src/utils/constantUtils.ts`
- `src/utils/apiListUtils.ts`

## 📝 Notes

- The app is built as a frontend service listing experience with API-driven data flows.
- The admin area is designed for business operations and customer request management.
- The project is fully responsive and follows a modern SaaS-style design system.

## ✅ Development Setup

Recommended Node versions:

- 18.x or newer
- 22.x is also compatible with this Vite setup

If you want to work with the project locally, use the same package manager version across your environment to keep dependency resolution consistent.
