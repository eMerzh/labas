# Labas

Display a city extract of OSM data.

## Running locally

### Getting Started

First, run the development server:

create a DB with the following schema (PostgreSQL):
Look in the fetchHistory.js file for the queries to run.

create a .env.local file with the following variables:

```bash
PGHOST=host....
PGUSER=user
PGDATABASE=DB
PGPASSWORD=pass
```

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
