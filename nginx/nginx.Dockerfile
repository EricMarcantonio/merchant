FROM node:14 as build

WORKDIR /nginx

COPY . .

RUN npm ci

RUN npm run build

FROM nginx

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /nginx/build /usr/share/nginx/html