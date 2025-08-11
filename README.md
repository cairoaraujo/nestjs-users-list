# NestJS Users CRUD API

A simple backend service built with **NestJS**, **Prisma**, **PostgreSQL**, and **Redis** for caching.

You can access the frontend repo here: https://github.com/cairoaraujo/nextjs-users-list

This API allows you to manage users with Create, Read, Update, and Delete (CRUD) operations.

## Features
- **CRUD for Users**
- **Prisma ORM** with PostgreSQL
- **Redis caching** for faster reads
- **Cache invalidation** on create, update, and delete
- **Environment variables** configuration
- **Docker-ready** for local development

## Endpoints

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| GET    | `/users`             | List all users           |
| GET    | `/users/:id`         | Get user by ID           |
| POST   | `/users`             | Create a new user        |
| PUT    | `/users/:id`         | Update a user            |
| DELETE | `/users/:id`         | Delete a user            |
| GET    | `/users/test-redis`  | Test Redis connection    |

## Requirements
- **Node.js** 18+
- **PostgreSQL** (local or remote, e.g., Neon)
- **Redis** (local or remote, e.g., Railway)
- **npm** or **yarn**

## Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to the project
cd <project-folder>

# Install dependencies
npm install
Environment Variables
Create a .env file in the root directory:

#env
DATABASE_URL=postgresql://user:password@host:port/dbname
REDIS_HOST=your-redis-host
REDIS_PORT=your-redis-port
REDIS_PASSWORD=your-redis-password
REDIS_TTL=60
Running the App
bash
# Development
npm run start:dev

# Production build
npm run build
npm run start:prod

Database
# Run Prisma migrations
npx prisma migrate dev
Testing Redis
You can verify Redis is working by visiting:

GET /users/test-redis
Response:
OK
