FROM node:20.5.1-alpine3.17

ARG SHOPIFY_API_KEY
ENV SHOPIFY_API_KEY=$SHOPIFY_API_KEY
EXPOSE 3000

WORKDIR /app

# copy & instapp deps
COPY web/package.json .
RUN mkdir frontend
COPY web/frontend/package.json frontend/.

RUN npm install 
RUN cd frontend && npm install

# copy main code & build
COPY web .
RUN cd frontend && npm run build

# remove development dependencies
RUN npm prune --production
RUN cd frontend && npm prune --production

# run
CMD ["npm", "run", "serve"]