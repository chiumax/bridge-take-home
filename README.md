This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

TODO:

# Pokedex To-Do List

## 1. Setup Project Environment

- [x] Initialize a new React + TypeScript project (e.g., with Vite, Create React App, or Next.js)
- [x] Install required dependencies (`react-query`/`axios` for API calls, `react-router` for navigation, etc.)
- [x] Set up a basic project folder structure (e.g., `components/`, `pages/`, `hooks/`, `services/`)

---

## 2. Fetch & Display Paginated Pokémon List

- [x] Create a service function to fetch paginated Pokémon data from PokéAPI
- [x] Build `PokemonList` component to display:
  - [x] Pokémon Name
  - [x] Pokémon ID
- [x] Implement pagination controls (Next/Previous buttons or Infinite Scroll)

---

## 3. Detailed Pokémon View

- [x] Create a `PokemonDetail` component that displays:
  - [x] Name
  - [x] Height & Weight
  - [x] Abilities & Moves
  - [x] Stats
  - [x] Image
  - [x] Type(s)
  - [x] Weaknesses (calculated based on type)
- [x] Implement navigation/modal for opening Pokémon details

---

## 4. Search by Name

- [x] Add a search bar to filter Pokémon by name
- [x] Fetch & display the Pokémon matching the search query

---

## 5. Filter by Type

- [x] Implement a filter UI for selecting one or multiple Pokémon types
- [x] Fetch and display filtered Pokémon list based on selected type(s)

---

## 6. Testing

- [x] Write unit tests for:
  - [x] API service functions
  - [x] Pokémon list pagination
  - [x] Pokémon detail view rendering
  - [x] Search & filter functionality

---

## 7. Final Touches

- [x] Add basic styling for a clean UI (e.g., Tailwind, CSS Modules, or Styled Components)
- [x] Handle loading and error states for API calls
- [x] Ensure TypeScript type safety for API responses & components
- [x] Push code to a public GitHub repository
