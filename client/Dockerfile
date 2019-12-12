FROM node:12

WORKDIR /app/client

COPY package.json yarn.lock ./

RUN curl --compressed -o- -L https://yarnpkg.com/install.sh | bash

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "serve"]
