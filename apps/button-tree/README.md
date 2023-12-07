# GSC Blinks app

[![build-push-app-image](https://github.com/kelreel/blinks-app/actions/workflows/build.yaml/badge.svg)](https://github.com/kelreel/blinks-app/actions/workflows/build.yaml)

## Quick start

[How to run development app via CLI (Shopify docs)](https://shopify.dev/docs/apps/tools/cli/existing)

⚠️ Prepare PostgreSQL (v15.1 recommended) for the application. See `docker-compose.yml`

##### 1. Connect app with Shopify partners

```shell
shopify login
# optionally pass `--shop=YOUR_SHOP` flag to specify your test store
```

Create app config and connect cli with new or existing app

```shell
shopify app connect
```

##### 2. Start app locally

```shell
# install deps
npm install

# run dev mode
npm run dev
```

##### 3. App redirection urls

Allowed redirection urls in Shopify Partner App settings

```
prefix: "apps", subpath: "blinks-app-proxy"
https://{tunnel-url}/api/auth/callback
```

##### 4. App proxy

For app-widget -> backend requests setup proxy in Shopify Partner App settings

```
prefix: "apps", subpath: "blinks-app-proxy"
https://{tunnel-url}/api/client
```

##### 4. App proxy

For app-widget -> backend requests setup proxy in Shopify Partner App settings

```
prefix: "apps", subpath: "blinks-app-proxy"
https://{tunnel-url}/api/client
```

## Tech Stack

| Tech                           | Module               | Purpose                                    |
| ------------------------------ | -------------------- | ------------------------------------------ |
| JS + TypeScript + Liquid       | All codebase         |
| NPM Workspaces                 | All codebase         |
| ExpressJS                      | Backend              | REST API                                   |
| PostgreSQL                     | Backend              | Sessions & shop data storage               |
| Prisma                         | Backend              | ORM, migrations                            |
| Shopify API JS                 | Backend              | Auth, Billing, Rest API & GraphQL wrappers |
| React                          | Frontend (app admin) |
| Tanstack Query (with "ky" lib) | Frontend             | Api requests + cache                       |
| Polaris                        | Frontend             | UI kit                                     |
| Preact                         | App widget           |
| urql                           | App widget           | Graphql client lib                         |
| GraphQL                        | Backend, App widget  | API + Storefront API requests              |

## Developer resources

- [Introduction to Shopify apps](https://shopify.dev/docs/apps/getting-started)
- [App authentication](https://shopify.dev/docs/apps/auth)
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)
- [Shopify API Library documentation](https://github.com/Shopify/shopify-api-js#readme)
- [App Bridge React](https://shopify.dev/docs/apps/tools/app-bridge/getting-started/using-react) adds authentication to API requests in the frontend and renders components outside of the App’s iFrame.
- [Polaris React](https://polaris.shopify.com/) is a powerful design system and component library that helps developers build high quality, consistent experiences for Shopify merchants.
- [Custom hooks](https://github.com/Shopify/shopify-frontend-template-react/tree/main/hooks) make authenticated requests to the Admin API.
- [File-based routing](https://github.com/Shopify/shopify-frontend-template-react/blob/main/Routes.jsx) makes creating new pages easier.
