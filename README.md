# PeopleHub - Employee Registry

A modern web application for browsing and exploring the company's employee registry. Built with Next.js, tanstack and TypeScript for a fast and accessible user experience.

## Architecture Overview

This project follows a modern server-state-driven frontend architecture using Next.js App Router and TanStack Query.

Key decisions:

- Next.js App Router is used for routing and layout composition
- TanStack Query manages API data fetching, caching, retries, and loading states
- Zod validates API responses to ensure type-safe runtime data
- Custom hooks separate business logic from UI components
- Components are designed to be reusable and accessible
- TypeScript strict mode ensures maintainability and safety

Data flow pattern:

API → Zod validation → TanStack Query cache → Custom hooks → UI components

## Features

- 📋 **Employee Registry**: View all employees in a beautiful grid layout
- 👤 **Employee Profiles**: Detailed view for each employee with age and salary
- ♿ **Accessibility**: Accessible design with screen reader support and keyboard navigation
- 🎨 **Modern UI**: Responsive design with Tailwind CSS and smooth animations
- ⚡ **Performance**: Optimized loading with prefetching and lazy loading
- 🧪 **Tested**: Unit tests with Vitest and React Testing Library

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **TanStack Query**: Handles server-state management including caching, loadding and error handling
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack Query (React Query)
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint
- **Schema Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd employees-app
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── employees/          # Employee registry pages
│   │   ├── employee/[id]/  # Individual employee page
│   │   └── page.tsx        # Main employee registry page
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── EmployeeCard.tsx    # Employee card component
│   └── ...
├── hooks/                  # Custom React hooks
│   └── useEmployees.ts     # Hook for fetching employee data
├── lib/                    # Utilities and configuration
│   ├── api.ts              # API calls
│   ├── queryClient.tsx     # React Query setup
│   └── schemas.ts          # Zod schemas
├── types/                  # TypeScript types
└── public/                 # Static files
```

## TanStack Query Usage

TanStack Query is used to manage all remote employee data.

It provides:

- Automatic caching
- Background refetching
- Loading & error state handling
- Retry logic for unstable APIs
- Request deduplication
- Optimistic UI readiness for future updates

Example usage:

- Employee list fetched via `useEmployees`
- Individual employee fetched via `useEmployee`
- Shared QueryClient configured globally

## Error Handling Strategy

Since the API may be unstable, the application handles failures gracefully:

- TanStack Query retry logic is enabled
- Loading states shown with skeleton UI
- Error states rendered with fallback UI
- Schema validation prevents invalid API responses from breaking the UI

This ensures the application remains usable even when the backend is unavailable.

## Accessibility

This application is built with accessibility in mind:

- **Screen Readers**: Support with ARIA labels and semantic HTML
- **Keyboard**: Full navigation without mouse
- **Focus Indicators**: Visible focus rings for all interactive elements
- **Skip Links**: Ability to skip navigation
- **Alt Text**: All images have descriptive alt text
- **Color Contrast**: Sufficient contrast for readability

## Testing

Run tests with:

```bash
npx vitest run
```

Tests include:
- Component rendering
- API integration
- Hook functionality
- Schema validation

## Development Guidelines

- Use TypeScript strictly for all code
- Follow ESLint rules
- Write tests for new functionality
- Use semantic HTML and ARIA attributes for accessibility
- Keep components small and reusable