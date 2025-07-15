# Assignment 2 – Blog Summarizer

This is my second assignment for the **Nexium AI-First Web Development Internship**.

---

## What this app does

- Enter a **blog or article URL**
- The app **scrapes content** from that webpage
- Then it uses **AI** to generate an **English summary**
- That summary is **translated into Urdu**
- You can **copy or download** both versions
- Includes **Light, Dark, and Teal themes**

---

## AI + Backend Overview

This app connects to several intelligent backend services:

### 1. Content Scraping

- Custom `/api/scrape` endpoint
- Uses `cheerio` and `axios` to extract readable content
- The **raw scraped content is stored in MongoDB**

### 2. AI Summarization (GROQ)

- Uses **GROQ API** (OpenAI’s fast inference engine)
- Summarizes the scraped content into simple English
- Stored in Supabase

### 3. Urdu Translation

- Also uses **GROQ** to translate summary into Urdu
- Urdu summary is stored in Supabase too

---

## Database Usage

- **MongoDB**
- Stores **raw scraped text**
- Useful for caching and reference

- **Supabase**
- Stores:
  - The entered blog/article URL
  - The English summary
  - The Urdu translation
- Allows future features like user history or analytics

---

## Technologies Used

- **Next.js 15** – React framework
- **Tailwind CSS v4.1** – Utility-first styling
- **ShadCN UI** – Styled component library
- **TypeScript** – Type safety
- **Framer Motion** – Animation library
- **Lucide Icons** – Icons
- **pnpm** – Package manager
- **GROQ API** – Summarization & Translation
- **Cheerio & Axios** – Web scraping
- **MongoDB** – For raw content storage
- **Supabase** – For storing summaries & translations

---

## Live Website

[Click here to open the app](https://nexium-sumayya-assign2.vercel.app/)

---

## Features

- Input blog URL
- AI-based summarization
- Urdu translation
- Copy to clipboard
- Download summary
- Theme toggle: Light / Dark / Teal
- Smooth transitions and loading indicators

---

## How to Run Locally

1. **Clone the repo**

```bash
   git clone https://github.com/sumayya-yasin/Nexium_Sumayya_Assign2.git
   cd Nexium_Sumayya_Assign2
```

## 2. Install Dependencies

```bash
pnpm install
```

## 3. Start development server

```bash
pnpm dev
```

## 4. env Configuration

Add the following in .env.local:

```bash
GROQ_API_KEY=your_groq_api_key
MONGODB_URI=your_mongodb_uri
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

- Only GROQ_API_KEY is required to run basic summary & translation
- MongoDB and Supabase enhance storage and future scalability

## 5. Example URLs to Try

[Example 1](https://blog.hubspot.com/marketing/content-marketing)

[Example 2](https://uxdesign.cc/design-trends-2024)
