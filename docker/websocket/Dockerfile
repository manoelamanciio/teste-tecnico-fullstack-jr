FROM node:24-alpine

WORKDIR /app

COPY websocket/package.json websocket/package-lock.json ./

RUN npm ci

COPY websocket ./

CMD ["npm", "start"]