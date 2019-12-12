# User Task Management App (MVP)

# Installation (Docker) - Recommended

- Ensure you have Docker and Docker-compose already installed on your computer.
- Run `git clone ` to clone the repository and `cd user-task-manager`.
- Clone and rename each `.env-sample` files in `.env-sample`, `./services/<service name>/.env-sample` and `./client/.env-sample` to `.env`. Fill in the values appropriately.
- Run `docker-compose up` to start and build the services for the first time.
- Once all the containers are up and running, run `docker-compose run <service name>-service yarn migrate:up` to run migrations. E.g. `docker-compose run users-service yarn migrate:up`
- Visit http://localhost:3000 to access the frontend.

# Installation Manual

> Ensure you have `nodejs` and `postgres` installed on your computer before following the steps below

- Run `git clone ` to clone the repository and `cd user-task-manager`.
- Install yarn globally on your computer by running `npm install -g yarn`
- Install all the dependencies in the project by running `bash ./scripts/build.sh` from the root directory in your terminal.
- Start the service by running `./scripts/services.sh`
- Start the client by running `cd client && yarn serve` from the root directory.
- Visit http://localhost:3000 to access the frontend.
