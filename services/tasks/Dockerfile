FROM node:12

WORKDIR /app/services/tasks

COPY package.json yarn.lock ./

RUN npm install -g yarn

RUN yarn install

COPY . .

EXPOSE 5002

CMD ["yarn", "dev"]
