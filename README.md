# E-commerce Performance Demo (Next.js)

Frontend e-commerce application built with Next.js and TypeScript, focused on performance, scalability, and clean architecture.

This project simulates a real-world product listing experience, applying best practices commonly used in production environments.

---

## 🚀 Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- ShadCN UI

---

## ✨ Features

- Product listing with API integration
- Dynamic product detail pages
- Image fallback handling (error resilience)
- Loading states (skeleton UI)
- Responsive design
- Basic performance optimizations

---

## ⚡ Performance & Best Practices

This project focuses on practical performance improvements:

- Optimized image loading using `next/image`
- Parallel data fetching (`Promise.all`)
- Efficient data mapping using `Map` (avoiding O(n²))
- Avoiding unnecessary re-renders
- Component-driven architecture

---

## 🏗 Architecture

The project follows a feature-based structure to improve scalability and maintainability:

```
/app        → routing & pages
/features   → domain logic (products, cart, etc.)
/components → reusable UI components
/services   → API layer
/hooks      → reusable logic
/types      → shared types
/lib        → utilities
```

---

## 🧠 Key Decisions

- Separation between API layer and UI components
- Use of reusable components to avoid duplication
- Graceful handling of API and image failures
- Focus on simplicity without overengineering

---

## ▶️ Getting Started

```bash
npm install
npm run dev
```

---

## 🌐 Live Demo

You can check the live version here:

👉 https://ecommerce-demo-lac-seven.vercel.app/

---

## 📌 Motivation

The goal of this project was to build a realistic frontend application while focusing on performance, maintainability, and clean architecture — similar to real production environments.

---

## 👨‍💻 Author

Maximiliano Prystupczuk
Senior Frontend Developer (React, Next.js, TypeScript)
