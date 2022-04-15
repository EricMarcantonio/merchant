FROM node:14

WORKDIR /shopping-cart

COPY src/ src/
COPY package.json package-lock.json tsconfig.json ./

ENV HOST='localhost'
ENV PORT='3306'
ENV USER='user'
ENV PASSWORD='password'
ENV DB='MERCHANT'
ENV EXPRESS_PORT='80'
ENV CORS_ORIGIN='http://127.0.0.1:3000'

RUN npm ci

RUN npm run build

CMD ["node", "dist/index.js"]