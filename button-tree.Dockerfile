FROM node:20.5.1-alpine3.17 as base

FROM base as builder
WORKDIR /app
RUN npm i -g turbo
COPY . .
RUN turbo prune blinks-app-root --docker

# Add lockfile and package.json's of isolated subworkspace, install deps
FROM builder as installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
RUN npm install

# Build the project
COPY --from=builder /app/out/full/ .

ARG SHOPIFY_API_KEY
ENV SHOPIFY_API_KEY=$SHOPIFY_API_KEY
EXPOSE 3401

# build shared
RUN cd apps/button-tree/web/shared && npm run build

# build @gsc/ui
RUN cd packages/ui && npm run build

# build frontend
RUN cd apps/button-tree/web/frontend && npm run build

# build backend
RUN cd apps/button-tree/web/backend && npm run prisma:generate
RUN cd apps/button-tree/web/backend && npm run build

# remove development depend encies
RUN npm prune --production

ENTRYPOINT ["sh", "-c", "cd apps/button-tree/web/backend && npm run start:migrate:prod"]

