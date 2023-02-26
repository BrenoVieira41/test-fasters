FROM node:alpine

WORKDIR /test/stocks

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm","run","start:dev"]
