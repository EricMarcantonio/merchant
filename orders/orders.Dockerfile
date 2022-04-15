FROM node:14

WORKDIR /orders

COPY src/ src/
COPY package.json package-lock.json tsconfig.json ./

ENV HOST='localhost'
ENV PORT='3306'
ENV USER='user'
ENV PASSWORD='password'
ENV DB='MERCHANT'
ENV EXPRESS_PORT='3001'
ENV CORS_ORIGIN='http://127.0.0.1:3000'
ENV PAYMENT_SERVICE='http://payment'

RUN npm ci

RUN npm run build

CMD ["node", "dist/index.js"]