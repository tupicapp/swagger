# Swagger

Swagger UI for every Tupic API. The definition dropdown is built in
[src/main.ts](src/main.ts).

## Where definition URLs come from

URLs are **not** baked into the bundle. At container start
`docker/nginx/40-write-config.sh` writes `/config.js` from the container
environment, and `src/lib/config.ts` reads it. One image therefore serves every
environment.

    helm-charts/app/values*.yaml -> ConfigMap -> envFrom -> /config.js -> Swagger UI

To change or add a URL, edit `env.variables` in
[helm-charts/app/values.yaml](helm-charts/app/values.yaml) (production) and
[helm-charts/app/values.development.yaml](helm-charts/app/values.development.yaml)
(development). Adding a *new* service also means adding its key to the
`RuntimeConfigKey` union in `src/lib/config.ts`, the `emit` list in
`docker/nginx/40-write-config.sh`, the `ENV` block in the `Dockerfile`, and an
entry in `definitions` in `src/main.ts`.

Resolution order per key is `/config.js` -> build-time `VITE_*` -> the hardcoded
production fallback in `src/main.ts`. `yarn dev` has no `/config.js`, so it uses
the fallbacks; override individual URLs locally with `VITE_*` in `.env`.

## Bundled specs

Most services serve their own spec. Those that do not are committed under
`public/configs` and referenced by relative path, so they resolve on any host:

| Definition | File | Source of truth |
| --- | --- | --- |
| Tupic IAM | `public/configs/iam.json` | maintained here |
| Tupic Finance | `public/configs/finance.yaml` | maintained here |
| Tupic Chain | `public/configs/chain.yaml` | `chain-core/openapi.yaml` |
| Tupic Games | `public/configs/games.json` | `games-core/TupicGame_Swagger.json` |

Copies must be refreshed by hand when the upstream spec changes. Keep
`.postman/config.json` in sync when adding one.

## Project Setup

```sh
# yarn
yarn install

# npm
npm install
```

### Compile and Hot-Reload for Development

```sh
# yarn
yarn dev

# npm
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
# yarn
yarn build

# npm
npm run build
```

