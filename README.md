# NestJS Starter (MySQL & Redis)
A quick project starter I made for my personal use in developing APIs with NestJS. This particular starter uses MySQL as the primary database and Redis for session storage.

## Features

- User Authentication
- Role-Based Access Control w/ Guards
- TypeORM 

## Quick Start
### Install Dependencies
```bash
npm install
```

### Set Development Environment Variables

Copy the `.env.example` file and rename it to `.env.development` & set the variables.

### Start the containers
```bash
docker compose up -d
```

### Running the app

```bash
npm run start:dev
```


## Support

This repo contains only a basic starting configuration to cover a lot of the boilerplate required to get a NestJS API setup. I may periodically adjust the repository as I discover better practices, and may include the necessary build/deployment steps in the future.

With that being said, feel free to contribute if you'd like, I'm more than happy to review your pull requests.