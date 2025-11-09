#  Mini Search — Full-Stack Developer Take-Home Task (Task A)

A compact **full-stack search application** built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**.  
It allows users to search through a local JSON dataset and view the top matching results based on keyword relevance.

---

##  Objective

Develop a minimal yet functional **search UI** that interacts with a backend API route.  
The app retrieves the top matches from a local dataset and displays them dynamically with loading and empty states.

---

##  Tech Stack

| Layer | Technology |
|--------|-------------|
| **Framework** | Next.js 16 (React 19, App Router, Turbopack) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 + Tailwind Animate |
| **UI Components** | Radix UI, ShadCN, Lucide Icons |
| **Form Handling** | React Hook Form + Zod |
| **Charts & Utils** | Recharts, date-fns |
| **Analytics** | @vercel/analytics |

---

##  Features

### 🔸 Frontend
- Single search page with:
  - Input field for search queries.
  - “Search” button trigger.
  - Loading spinner and empty state handling.
- Displays **top 3 results** with each item’s:
  - **Title**
  - **Snippet** from the body text.

### 🔸 Backend (API Route)
- **Endpoint:** `POST /api/search`
- **Request Body:**
  ```json
  { "query": "trust badges" }
```

 **Response:**

  json
  {
    "results": [
      {
        "id": "1",
        "title": "Trust badges near CTA",
        "body": "Adding trust badges near the primary CTA increased signups by 12%."
      }
    ],
    "summary": "Adding trust badges near the CTA improves conversions.",
    "sources": ["1"]
  }
  ```
* Returns:

  * **Top 3 matches** based on simple case-insensitive keyword matching.
  * Optional **summary** and **sources** fields (bonus).
* Handles:

  * Empty queries → `400 Bad Request`
  * No matches → returns `[]` with a friendly message

---

---

##  Dataset Example (`data/faqs.json`)

```json
[
  { "id": "1", "title": "Trust badges near CTA", "body": "Adding trust badges near the primary CTA increased signups by 12%." },
  { "id": "2", "title": "Above-the-fold form", "body": "Visible form above the fold lifted lead submissions by 9%." },
  { "id": "3", "title": "Qualifying question", "body": "A single qualifying question improved demo attendance by 6%." },
  { "id": "4", "title": "Test ID visibility", "body": "Showing test IDs on hover sped up analyst workflows." },
  { "id": "5", "title": "Down-funnel icon", "body": "Green funnel means >10% down-funnel uplift; red means <=0%." }
]
```

---

##  API Specification

| Method | Endpoint      | Description                      |
| ------ | ------------- | -------------------------------- |
| `POST` | `/api/search` | Returns top 3 matching FAQ items |

### Request Body

```json
{ "query": "trust badges" }
```

### Successful Response

```json
{
  "results": [
    { "id": "1", "title": "Trust badges near CTA", "body": "Adding trust badges near the primary CTA increased signups by 12%." }
  ],
  "summary": "Adding trust badges near the primary CTA increased signups by 12%.",
  "sources": ["1"]
}
```

### Error Responses

| Status | Description            | Example                                             |
| ------ | ---------------------- | --------------------------------------------------- |
| `400`  | Empty or missing query | `{ "error": "Query cannot be empty" }`              |
| `200`  | No matches found       | `{ "results": [], "message": "No results found." }` |

---

## ⚡ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Aul-rhmn/mini-search.git
   cd mini-search
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run in development mode**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   npm start
   ```

---


##  Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Run app in development mode       |
| `npm run build` | Build optimized production bundle |
| `npm start`     | Start production server           |
| `npm run lint`  | Run ESLint checks                 |

---

##  License

© 2025 — Created by [Muhammad Auliarahman](https://github.com/Aul-rhmn)

---
