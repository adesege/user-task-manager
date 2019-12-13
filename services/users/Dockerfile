FROM node:12

WORKDIR /app/services/users

COPY package.json yarn.lock ./

RUN npm install -g yarn

RUN yarn install

COPY . .

EXPOSE 5001

CMD ["yarn", "dev"]
