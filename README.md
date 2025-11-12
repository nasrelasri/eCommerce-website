# 🛍️ Dynamic E-Commerce Product Catalog

ALX Capstone Project — ProDev Front-end Engineering Program

## 📘 Overview of the ProDev Front-end Engineering Program

The **ALX ProDev Frontend Engineering program** is an intensive professional training that focuses on building real-world, industry-ready web developers.
Through the program, learners gain hands-on experience in modern frontend technologies, collaboration, and system design — developing the ability to build and deploy full-stack web applications in partnership with backend engineers.

The curriculum emphasizes:

- Scalable frontend architecture
- Integration with real APIs
- Agile collaboration and version control
- Deployment and product presentation

## 🧠 Major Learnings

### 🧩 Key Technologies Covered

| **Area**                            | **Technologies**                                              |
|-------------------------------------|---------------------------------------------------------------|
| **Web Development**                 | HTML5, CSS3, JavaScript (ES6+), TypeScript                    |
| **Frontend Framework**              | Next.js (React-based SSR framework)                           |
| **Styling & UI**                    | Tailwind CSS, Responsive Design, Component-based Architecture |
| **API Integration**                 | RESTful APIs, Axios, JSON handling, Error management          |
| **System Design & Analysis**        | Component hierarchy, Routing, Data flow, and State management |
| **Version Control & Collaboration** | Git, GitHub, Branching strategies, Pull Requests              |
| **Deployment**                      | Vercel, Environment variables, CI/CD best practices           |

### 💡 Core Frontend Concepts Learned

- **Next.js Fundamentals**: Server-side rendering (SSR), static generation (SSG), and incremental static regeneration (ISR) for SEO and performance.
- **Tailwind CSS**: Fast, utility-first styling and design consistency across responsive breakpoints.
- **TypeScript**: Strong typing for cleaner, maintainable, and error-resistant code.
- **API Integration**: Fetching and displaying live data from a REST API, handling asynchronous calls, and error boundaries.
- **System Design & Analysis**: Mapping data flow between frontend components and backend endpoints.
- **Reusable Components**: Modular UI architecture that simplifies scalability and updates.
- **GraphQL Awareness**: Understanding how GraphQL differs from REST for structured data queries.

## ⚙️ Project Description

### 🎯 Goal

To design and develop a Dynamic E-Commerce Product Catalog web application that allows users to browse, search, and view products dynamically — integrating data from a backend API.

### 🔍 Key Features

1. **API Data Integration**

    - Fetch and display product data dynamically from a backend API.
    - Ensure smooth loading of products with error handling and loading states.

2. **Filtering and Sorting**

    - Category Filtering: Allow users to view products based on selected categories.
    - Price Sorting: Enable sorting by ascending or descending prices.
    - Multi-Criteria Filters: Combine filters for refined results.

3. **Pagination and Infinite Scrolling**

    - Pagination: Provide numbered navigation for viewing products in chunks.
    - Infinite Scrolling: Load products dynamically as users scroll, enhancing usability.

4. **Responsive Design**

    - Ensure the catalog is fully responsive across devices, including desktops, tablets, and mobile phones.

## 🧩 Setup & Installation

Follow these steps to run the project locally.

1. Clone the repository

    ```bash
    git clone https://github.com/nasrelasri/alx-project-nexus.git
    cd alx-project-nexus
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create an .env.local file in the project root and add your backend URL

    ```bash
    NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

The application should now be running at
👉 <http://localhost:3000>

## Collaboration

This project was developed collaboratively as part of the capstone experience:

## Deployment

Next.js: [Vercel URL](https://vercel.com)

## License

This project is part of the ALX ProDev Frontend Engineering Capstone and is intended for educational and portfolio use.
