FROM node:16-alpine AS development

EXPOSE 3020

WORKDIR /usr/src/dev_app-frontend

COPY ["./","./"]

RUN npm install

ENTRYPOINT npm run dev

# ----------------------------------------

FROM node:16-alpine AS build

WORKDIR /usr/src/build_app-frontend

COPY ["./", "./"]

RUN apk update

RUN apk add npm

RUN npm install

ENTRYPOINT npm run build && while true; do sleep 1000000; done

# ----------------------------------------

FROM nginx:alpine AS production

EXPOSE 80

WORKDIR /usr/share/nginx/html
