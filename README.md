# simple-job-tracker-client

A Vue 3 job application tracking frontend.

## Setup

```bash
npm install
```

## Development

By default, the app expects the backend API to be running at `http://localhost:3000`.

You can override it with a local `.env` file:

```bash
VITE_API_BASE_URL=http://localhost:3000
```

Then run:

```bash
npm run dev
```

## Build

For a production build, set `VITE_API_BASE_URL` to your VPS backend URL in `.env.production` or export it in the shell before building.

Example `.env.production`:

```bash
VITE_API_BASE_URL=http://your-vps-domain-or-ip:3000
```

Build commands:

```bash
npm run build
npm run build:production
```
