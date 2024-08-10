# taga3s-dev

This is my profile website.✋

## Tech stacks

- Web Framework
  - HonoX

- Formatter / Linter
  - biome

- Dev environment
  - Vite
  - Wrangler

- CI / CD
  - Github Actions

## Project setup

0. Enable pnpm
```
$ corepack enable pnpm
```

1. Install deps
```
$ pnpm install
```

2. Add env vars to your wrangler.toml
  - `MICRO_CMS_API_KEY`
  - `MICRO_CMS_SERVICE_DOMAIN`

## Project commands

- Run app
```
$ pnpm run dev
```

- Format
```
$ pnpm run format
```

- Lint
```
$ pnpm run lint
```

- Deploy to cloudflare workers
```
$ pnpm run deploy
```
