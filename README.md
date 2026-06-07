# seatingchart

Seating chart — a mobile-first static React app that lets guests search their name and see their assigned table plus party members.

## Stack

- Vite + React
- Tailwind CSS
- pnpm

## Develop

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build
pnpm preview
```

## Data

Edit `public/chart.csv`. Columns: `full_name,party_id,table_number`. Guests sharing a `party_id` are seated together. Every guest must have a party id (parties of one are fine).
