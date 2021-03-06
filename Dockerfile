### STAGE 1: Build ###
FROM node:14-alpine as builder

COPY package.json package-lock.json ./

RUN npm ci && mkdir /nx-app && mv ./node_modules ./nx-app

WORKDIR /nx-app

COPY . .

RUN npm run build -- --prod

### STAGE 2: Build ###
FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /nx-app/dist/apps/api .
ENV PORT=4000
EXPOSE ${PORT}
RUN npm install --production
RUN npm install tslib
CMD node ./main.js
