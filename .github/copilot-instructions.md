# GitHub Copilot Instructions for eShaman

This repository contains a Next.js application with Apollo GraphQL server integration. Follow these comprehensive instructions for development and contribution.

## Repository Structure

```
eShaman/
├── app/                     # Next.js App Router
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Home page component
│   └── api/
│       └── graphql/
│           └── route.ts    # Apollo GraphQL server endpoint
├── graphql/                # GraphQL schema and resolvers
│   ├── schema.ts           # GraphQL type definitions
│   └── graphql/
│       └── resolvers.ts    # GraphQL resolvers
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
├── eslint.config.js        # ESLint configuration
└── .env.example            # Environment variables template
```

## Technology Stack

- **Frontend**: Next.js 14.2.5 with TypeScript
- **Backend**: Apollo GraphQL Server 4.x
- **Language**: TypeScript with strict mode
- **Linting**: ESLint with Next.js configuration
- **Package Manager**: npm with --legacy-peer-deps required

## Initial Setup

### Prerequisites
- Node.js (recommended: latest LTS)
- npm package manager

### Installation and Setup (⏱️ ~25s)
**NEVER CANCEL** - Package installation requires legacy peer deps and takes time:

```bash
# Install dependencies - NEVER CANCEL during this step
npm install --legacy-peer-deps
```

**Note**: You MUST use `--legacy-peer-deps` flag for all npm operations due to Apollo Server dependencies.

## Development Commands

### Type Checking (⏱️ ~1.7s)
```bash
npm run typecheck
```
Validates TypeScript without emitting files. Should complete without errors.

### Building (⏱️ ~18s)
```bash
npm run build
```
Creates optimized production build in `.next/` directory. **NEVER CANCEL** - this process needs to complete.

### Development Server (⏱️ ~1.3s startup)
```bash
npm run dev
```
- Starts development server on http://localhost:3000
- Hot reloading enabled
- GraphQL endpoint available at http://localhost:3000/api/graphql

### Production Server
```bash
npm run build  # Required first
npm start
```
- Serves production build on http://localhost:3000
- Must run build command before starting production server

### Linting
```bash
npm run lint
```
- Uses ESLint with Next.js configuration
- Supports TypeScript files (.ts, .tsx)
- May show warnings but should not have errors

## Manual Testing Procedures

### 1. Home Page Validation
Navigate to http://localhost:3000 and verify:
- Page displays "eShaman App" heading
- Content shows "This is th starting point for your Apollo + Next.js app."
- No console errors in browser developer tools

### 2. GraphQL API Testing
Test the GraphQL endpoint with a health check:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "{ health }"}' \
  http://localhost:3000/api/graphql
```

Expected response:
```json
{"data":{"health":"OK"}}
```

### 3. GraphQL Playground (if needed)
Visit http://localhost:3000/api/graphql in browser for GraphQL interface (development mode only).

## Common Issues and Solutions

### Build Errors

#### Missing Layout Error
If you see "page.tsx doesn't have a root layout":
- Ensure `app/layout.tsx` exists with proper RootLayout component
- Check that it exports as default

#### Import Resolution Errors
- Verify all import paths are correct
- Check that GraphQL resolvers path is `../../../graphql/graphql/resolvers`
- Ensure all required dependencies are installed with `--legacy-peer-deps`

### TypeScript Errors

#### Module Not Found
Most common cause: incorrect import paths. Check:
- Apollo Server imports use correct exports
- GraphQL schema uses string template literals (not gql tagged templates)
- Resolvers path matches actual file structure

### ESLint Configuration
- Uses flat config format (eslint.config.js)
- May show deprecation warnings - these are safe to ignore
- If config errors occur, ensure `@eslint/eslintrc` and related packages are installed

### Development Server Issues

#### Port Already in Use
```bash
# Kill existing Next.js processes
pkill -f "next"
```

#### Build Cache Issues
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## Code Contribution Guidelines

### File Organization
- Keep GraphQL schema in `graphql/schema.ts`
- Place resolvers in `graphql/graphql/resolvers.ts`
- App components go in `app/` directory following App Router conventions
- API routes use App Router format in `app/api/`

### TypeScript Best Practices
- Enable strict mode in tsconfig.json
- Use proper typing for React components
- Import React explicitly when using JSX
- Follow Next.js 14+ patterns for App Router

### GraphQL Development
- Schema uses string template literals (not gql tagged)
- Resolvers export as named export `resolvers`
- Apollo Server v4 syntax and patterns
- Health check query always available for testing

## CI/CD Notes

### Environment Variables
- Copy `.env.example` to `.env.local` for local development
- No environment variables required for basic functionality
- GraphQL endpoint automatically available at `/api/graphql`

### Production Deployment
- Always run `npm run build` before deployment
- Ensure `npm start` works after build
- Test both home page and GraphQL endpoint
- Verify no TypeScript errors with `npm run typecheck`

## Timing Reference

Actual tested command timings on clean install:
- `npm install --legacy-peer-deps`: ~25 seconds
- `npm run typecheck`: ~1.7 seconds  
- `npm run build`: ~18 seconds
- `npm run dev` startup: ~1.3 seconds
- `npm run lint`: ~1.5 seconds

**Important**: NEVER CANCEL long-running commands like install or build. They need to complete successfully.

## Troubleshooting

### Dependencies
If npm install fails:
1. Clear npm cache: `npm cache clean --force`
2. Remove node_modules: `rm -rf node_modules package-lock.json`
3. Reinstall: `npm install --legacy-peer-deps`

### GraphQL Issues
If GraphQL endpoint returns errors:
1. Check server console for detailed error messages
2. Verify schema syntax in `graphql/schema.ts`
3. Ensure resolvers are properly exported
4. Test with simple health query first

### Build Failures
If build process fails:
1. Check TypeScript errors: `npm run typecheck`
2. Verify all imports are correct
3. Ensure root layout exists
4. Clear .next directory and rebuild

This setup has been fully validated and tested. All commands work from a clean state with proper timing measurements.