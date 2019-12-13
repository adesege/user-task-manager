FROM node:12

WORKDIR /app/client

COPY package.json yarn.lock ./

RUN npm install -g yarn

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "serve"]
