<div align="center">
  <img src="https://assets.getsitecontrol.com/prod2/images/cover-logo.png?rev=14c97d7ac6" width="120" height="120">
  <h2>GSC Shopify apps monorepo</h2>
</div>

## Quick start

[How to run development app via CLI (Shopify docs)](https://shopify.dev/docs/apps/tools/cli/existing)

⚠️ Prepare

- Node & NVM (node v20, npm 10.1)
- Shopify CLI 3 (You may need ruby 2.7.7)
- PostgreSQL (v15.1 recommended) for the application (e.g. in Docker).

##### 1. Install dependencies

```shell
npm install
```

##### 2. Select workdir

Apps located in `apps/*`
Common packages (ui, shared, etc) located in `packages/*`

Change dir to target app e.g. `cd apps/countdown`

##### 3. Connect app with Shopify partners

```shell
shopify login
# optionally pass `--shop=YOUR_SHOP` flag to specify your test store
```

Create app config and connect cli with new or existing app

```shell
shopify app connect
```

##### 4. Start app locally

```shell
# run dev mode
npm run dev
```

## Dependencies management

> [!WARNING]
> Install deps only from repository root dir or add manually to required package.json files and run `npm i` from root dir.

> [!TIP]
> You may run npm scripts for target package(workspace) via `npm run {script_name} -w ${package_name}` (see npm workspaces docs)
