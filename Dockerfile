FROM node:lts-bullseye-slim as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:lts-bullseye-slim

ENV NODE_ENV production
USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci

COPY --from=builder /usr/src/app/dist ./dist

CMD [ "npm", "start" ]
