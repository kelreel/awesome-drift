FROM node:20.5.1-alpine3.17

ARG SHOPIFY_API_KEY
ENV SHOPIFY_API_KEY=$SHOPIFY_API_KEY
EXPOSE 3401

WORKDIR /app

# install deps
COPY ./package.json  ./
COPY ./package-lock.json ./
COPY web/shared/package.json web/shared/
COPY web/frontend/package.json web/frontend/
COPY web/backend/package.json web/backend/
RUN npm ci

# copy source code
COPY ./web ./web

# build shared
RUN cd web/shared && npm run build

# build frontend
RUN cd web/frontend && npm run build

# build backend
RUN cd web/backend && npm run prisma:generate
RUN cd web/backend && npm run build

# remove development depend encies
RUN npm prune --production

ENTRYPOINT ["sh", "-c", "cd web/backend && npm run start:migrate:prod"]

