FROM node:12

WORKDIR /app/services/gateway

COPY package.json yarn.lock ./

RUN npm install -g yarn

RUN yarn install

COPY . .

EXPOSE 5000

CMD ["yarn", "dev"]
