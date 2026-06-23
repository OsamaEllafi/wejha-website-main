# Wejha 2026: Unique Animated Promotional Website
## Implementation & Architecture Plan

This document outlines the detailed strategy, technical stack, and step-by-step execution plan to build a "first of its kind", high-quality, and highly animated professional website for the **Wejha Organization**.

---

## 1. Project Scope & Architecture

*   **Primary Scope:** A dynamic, public-facing promotional frontend website showcasing the Wejha organization, its brand, statistical achievements, seasonal events, and interview media.
*   **Target Audience:** High school students, volunteers, educators, and sponsors in Benghazi and Libya.
*   **Architecture Strategy:** A hybrid approach featuring a heavy, immersive single-page scroll landing experience (acting as the main portal), with each major section linking out to its own dedicated detailed webpage for deeper exploration.

---

## 2. Technology Stack

*   **Core Framework:** **Vite + React** (for high-performance component rendering, fast builds, and efficient routing).
*   **Routing:** **React Router** (to handle navigation between the main scroll page and the dedicated detailed section pages).
*   **Styling:** **Vanilla CSS** with a robust CSS-variable design system. We will leverage pure CSS for the "Glassmorphism" aesthetic and complex custom layout grids, avoiding utility-class clutter for highly specific custom designs.
*   **Animation Engine:** **Framer Motion** (for advanced scroll-driven animations, layout transitions, and interactive physics) combined with native CSS transitions for micro-interactions.
*   **Language & i18n:** **i18next** for seamless bilingual support. The app will default to **Arabic (RTL)** but will support a fluid, unrefreshing toggle to **English (LTR)**, dynamically swapping typography and layout directions.

---

## 3. UI/UX Design Strategy & Aesthetics

### A. The "Glassmorphism" Theme
The UI will feature sleek, translucent glass-like cards with subtle borders and background blurs. These elements will float above a dynamic, abstract, slowly-moving gradient background that utilizes the brand's primary colors:
*   **Deep Navy Blue** (`#001F8F`) & **Royal Blue** (`#00389E`) for deep, trustworthy background hues.
*   **Action Orange** (`#FF4900`) & **Vibrant Red** (`#FF3324`) for energetic glowing orbs and accent highlights.

### B. Typography Integration
*   **Arabic (Default):** **DIN Next LT Arabic** for all headers (Heavy/Bold), and **Cairo** / **IBM Plex Arabic** for body text.
*   **English:** A clean geometric sans-serif (e.g., Inter or Roboto) paired with the English glyphs of DIN Next LT, ensuring visual harmony across languages.

### C. Advanced Animation Dynamics
1.  **Scroll-Driven Storytelling:** As the user scrolls down the landing page, elements (like the 2026 survey statistics) will animate into view using Framer Motion (fade-ups, parallax scrolling, staggering lists).
2.  **Hover Micro-interactions:** Buttons, cards, and links will have satisfying, elastic hover states (slight scaling, glow enhancement).
3.  **Page Transitions:** Smooth cross-fading and sliding transitions when navigating from the main timeline to a detailed sub-page.

### D. Media Handling
1.  **Interview Videos:** Displayed initially as auto-playing, silent, looped background previews inside sleek UI cards. Upon clicking, a cinematic, custom-styled full-screen video player overlay will smoothly expand to play the full interview with sound.
2.  **Wejha Items & Seasons:** Presented using interactive 3D-like carousels (using Framer Motion) that allow users to swipe/drag through the high-quality assets (mugs, tote bags, season photos) intuitively.

---

## 4. Website Structure (Sitemap)

1.  **`/` (Home - The Immersive Scroll Experience)**
    *   *Hero Section:* Dynamic logo presentation, primary tagline ("حسن اختيارك هو بداية مشوارك"), and an energetic call-to-action.
    *   *About Snippet:* Quick introduction to the project goals.
    *   *Impact/Stats:* Animated counters showcasing the 1,928 students and 27 schools reached.
    *   *Media Highlights:* Teasers for Interviews and Wejha Seasons.
2.  **`/about` (Detailed Organization Profile)**
    *   Full executive summary, strategic objectives, and the story of the Red Crescent volunteers.
3.  **`/statistics` (The 2026 Student Survey)**
    *   Interactive charts/data visualizations of top desired colleges and demanded skills.
4.  **`/media` (Interviews & Seasons Gallery)**
    *   The full repository of personal interview videos and seasonal event galleries.
5.  **`/brand` (Identity & Merchandise)**
    *   Showcasing the brand philosophy, color palettes, and the physical merchandise (Wejha Items).

---

## 5. Step-by-Step Implementation Phases

### Phase 1: Foundation & Project Setup
*   Initialize the Vite + React project.
*   Set up the folder structure (`/components`, `/pages`, `/assets`, `/styles`, `/locales`).
*   Import and configure the local font files (`assets/fonts`).
*   Set up the CSS Custom Properties (variables) based on `WEJHA_BRAND_IDENTITY.md`.
*   Implement the i18n configuration for Arabic/English switching, ensuring the `dir="rtl"` attribute updates on the `<html>` tag dynamically.

### Phase 2: Design System & Core Components
*   Create the dynamic animated gradient background component.
*   Develop the reusable "Glass" Card component.
*   Build the responsive, sticky, bilingual Navigation Bar.
*   Create typography wrapper components that automatically adjust font families based on the active language.

### Phase 3: The Immersive Homepage (Landing)
*   Develop the Hero section with entrance animations.
*   Implement the scroll-triggered statistic counters (e.g., counting from 0 to 1928).
*   Integrate Framer Motion `useScroll` and `useTransform` hooks for parallax effects.

### Phase 4: Media Galleries & Carousels
*   Build the 3D-like drag-to-scroll carousel for the "Wejha Items" images.
*   Develop the video preview cards and the full-screen cinematic video overlay player for the "Personal Interviews".
*   Implement the "Seasons" masonry or grid gallery.

### Phase 5: Sub-pages Development
*   Flesh out the `/about`, `/statistics`, `/media`, and `/brand` pages.
*   Ensure each page utilizes the layout templates and maintains the glassmorphism aesthetic.
*   Implement smooth React Router page transitions.

### Phase 6: Polish & Optimization
*   Optimize video and image assets for web delivery (lazy loading).
*   Test responsive design across mobile, tablet, and desktop viewports.
*   Refine animation timings to ensure 60fps performance without feeling sluggish.
*   Final QA on language toggling and RTL/LTR layout shifts.

---
**Ready to begin development?** Once approved, we will initialize the Vite project and start Phase 1!
