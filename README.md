## 🛒 Ecommerce Performance Demo

A performance-focused e-commerce application designed to demonstrate real-world optimization techniques in modern React and Next.js applications.

This project focuses on identifying and solving common real-world performance bottlenecks in frontend applications, such as unnecessary re-renders, large bundle sizes, and slow initial load times.

> ⚡ Focused on solving real-world performance challenges in modern frontend applications.

---

## 🌐 Live Demo

👉 Live Demo: https://ecommerce.maxiprystu.dev/
👉 Repository: https://github.com/maxiprys/ecommerce-performance-demo

---

## 🚀 Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- ShadCN UI
- React Server Components (Next.js)

---

## 🎯 Why this project

This project was created to simulate real-world frontend challenges and demonstrate how performance optimizations impact user experience in production-like scenarios.

---

## 🧪 Mocked Backend API

This project uses a mocked backend built with Next.js Route Handlers to simulate real-world API behavior.

Instead of relying on external services, the API is implemented internally to provide full control over data, performance, and edge cases.

### Features

- REST endpoints (`/api/products`, `/api/products/:id`)
- Filtering and search support
- Pagination handling
- Simulated network latency
- Decoupled data layer using mock data

This approach ensures reliability during development and better reflects real production scenarios.

---

## 📊 Performance Case Study

### Problem

E-commerce applications often suffer from slow load times and poor performance due to large bundles and inefficient rendering.

### Solution

- Implemented code splitting at route and component level
- Added lazy loading for non-critical components
- Optimized rendering using memoization techniques
- Improved asset loading strategy

### Results

- Achieved Lighthouse performance scores above 90
- Reduced initial load time through code splitting and lazy loading
- Improved rendering efficiency by minimizing unnecessary re-renders

---

## ⚡ Key Features

- Performance optimization using lazy loading and code splitting
- Efficient rendering with memoization and component optimization
- Scalable project structure for maintainability
- Server-side rendering and modern data fetching (Next.js)

---

## ⚡ Performance Techniques

This project focuses on practical performance improvements:

- Optimized image loading using `next/image`
- Parallel data fetching (`Promise.all`)
- Efficient data mapping using `Map` (avoiding O(n²))
- Avoiding unnecessary re-renders
- Component-driven architecture

---

## 🏗 Architecture

- Feature-based folder structure
- Clear separation between UI, hooks, and data layer
- Scalable state management approach using Context API / Redux

### Folder Structure

/app → routing & pages  
/features → domain logic (products, cart, etc.)  
/components → reusable UI components  
/services → API layer  
/hooks → reusable logic  
/types → shared types  
/lib → utilities

---

## 🧠 Key Decisions

- Clear separation between API layer and UI to improve maintainability
- Component reusability to reduce duplication and increase consistency
- Graceful error handling for API and asset failures
- Prioritized simplicity over overengineering for better scalability

---

## ▶️ Getting Started

```bash
npm install
npm run dev
```

---

## 📌 Motivation

The goal of this project was to build a realistic frontend application while focusing on performance, maintainability, and clean architecture — similar to real production environments.

---

## 👨‍💻 Author

**Maximiliano Prystupczuk**  
Senior Frontend Developer (React, Next.js, TypeScript)

- 🌐 https://www.maxiprystu.dev/
- 💼 https://www.linkedin.com/in/maxi-prystupczuk/
