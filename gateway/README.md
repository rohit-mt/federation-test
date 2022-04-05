# Gateway

### Supergraph development

- Nodemon watch dev
  - `npm start`
- Compose supergraph
  - `npm run sg:compose` (happens on pre start also)

### Subgraph development

- Spin up gateway
  - `npx mt-gateway` or `npx mt-gateway start`
- List default env config of gateway
  - `npx mt-gateway config`
- Create your own config
  - `npx mt-gateway config > gateway.env`
- Spin up gateway with custom env file
  - `npx mt-gateway start --env=gateway.env`

### Pipeline

- Auto publish on PR merge(only when concerned code changed)

### Testing Story

- Apps can spin up gateway same way for testing

### Other details

- Currently published on local npm repository
- Apps will not use stale gateway for development, latest will be auto-fetched
