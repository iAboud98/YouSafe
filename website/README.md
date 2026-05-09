# YouSafe Website

A simple TypeScript and React-based website displaying "YouSafe", powered by Vite.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

This will open the website at `http://localhost:5173` with hot module reloading enabled.

## Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

- `index.html` - Main HTML file with React root element
- `src/index.tsx` - TypeScript + React source code
- `vite.config.ts` - Vite configuration with React plugin
- `dist/` - Compiled output (generated after build)
- `tsconfig.json` - TypeScript configuration with JSX support
- `package.json` - Project metadata and dependencies
