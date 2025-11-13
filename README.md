Pura Agung Kertajaya Website
============================

This is the public-facing website (company profile) for **Pura Agung Kertajaya**. It is built with **Next.js 16 (App Router)**, **Tailwind CSS**, **shadcn/ui**, and **TypeScript**.

The website is designed to beautifully present the temple's profile, gallery, activities, and organizational information, featuring a clean UI, dark mode support, and smooth scroll animations.

🚀 Tech Stack
-------------

*   **Next.js 16 (App Router)**

*   **React + TypeScript**

*   **Tailwind CSS**

*   **shadcn/ui components**

*   **AOS (Animate On Scroll)**

*   **React Fast Marquee**

*   **Lucide Icons**


✅ Features
----------

### 🎨 UI/UX

*   Fully responsive design for all devices.

*   **Light & Dark Mode** support (powered by shadcn/ui theming).

*   Global scroll animations powered by **AOS (Animate On Scroll)**.

*   Clean and modern layout using shadcn/ui semantics.


### 🏛️ Content Sections

All content is loaded dynamically from a public API:

*   **Hero:** A full-screen, auto-rotating image carousel.

*   **About:** A brief profile of the temple.

*   **Organization Structure:** A dynamic hierarchy chart displaying members.

*   **Gallery:** A photo grid with a "Show All" function and an image viewer modal.

*   **Activities:** A list of upcoming events and activities.

*   **Facilities:** A facilities grid with a "Show All" function and modal.

*   **Testimonials:** An auto-scrolling marquee carousel for visitor reviews.

*   **Contact & Location:** Contact information and an embedded Google Maps.


🏁 Getting Started
------------------

Follow the steps below to run this project on your local machine.

### 1\. Prerequisites

Make sure you have the following installed:

*   **Node.js v18.0** or newer

*   **pnpm** (recommended)


Install pnpm globally if you don’t have it:

Bash

```bash
npm install -g pnpm
```

### 2\. Project Installation


1.  **Clone this repository**:
    ```bash
    git clone https://github.com/JonathanGunawan30/pura-agung-kertajaya-cms-frontend.git
    ```

2.  **Install all project dependencies**:
    ```bash
    pnpm install
    ```

### 3\. Environment Variables Configuration

This project requires no special environment variables to run in development mode (other than what might already be in .env.example for your API connection).

### 4\. Running the Application

1.  Bashpnpm dev

2.  Open your browser and visit:http://localhost:3000


📜 Available Scripts
--------------------

Inside the project directory:

*   pnpm dev: Runs the app in development mode.

*   pnpm build: Builds the app for production.

*   pnpm start: Runs the production build.

*   pnpm lint: Runs ESLint.