FROM node:18-alpine3.17 as build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install


COPY src ./src
COPY api ./api
COPY env ./env
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.prod.json ./tsconfig.prod.json

RUN yarn run build

FROM node:18-alpine3.17 as app

USER node
WORKDIR /app

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/env /app/dist/env
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/dist /app/dist

ENTRYPOINT node dist/src/server.js -e production
