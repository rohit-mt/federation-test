# Gateway

### Supergraph development

- `npm start`
- `npm run sg:compose` (happens on pre start also)

### Subgraph development

- `npx mt-gateway` or `npx mt-gateway start`
- `npx mt-gateway config`
- `npx mt-gateway config > gateway.env`
- `npx mt-gateway start --env=gateway.env`

### Pipeline

- Auto publish on PR merge(only when concerned code changed)

### Other details

- Currently published on local npm repository
- Apps will not use stale gateway for developement, latest will be auto-fetched
