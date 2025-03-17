# LunchNSpecials API

A modern API built with Bun runtime and Hono.js framework.

## Overview

This project is a lightweight, high-performance API developed using:
- **Bun**: A fast all-in-one JavaScript runtime
- **Hono.js**: A small, simple, and ultrafast web framework

## Project Structure

```bash
├── src/
│   ├── constants/    # Constant values and configurations
│   ├── middleware/   # Custom middleware functions
│   ├── modules/      # Business logic modules
│   ├── router/       # API route definitions
│   ├── schema/       # Data validation schemas
│   └── services/     # External service integrations
├── .env             # Environment variables
├── .gitignore       # Git ignore rules
├── bun.lock         # Bun dependency lock file
├── Dockerfile       # Docker configuration
├── package.json     # Project dependencies and scripts
├── README.md        # Project documentation
└── tsconfig.json    # TypeScript configuration
```

## Prerequisites

- Bun runtime (latest version recommended)

## Installation

To install dependencies:

```sh
bun install
```

Set up environment variables:

- Copy .env.example to .env (if available)
- Fill in required environment variables

To run:

```sh
bun run dev
```

open http://localhost:3000

### Dependencies

Main dependencies:
```bash
hono: ^4.6.20
@hono/zod-openapi: ^0.18.4

See package.json for complete list.
```

# env example

```
APP_PORT=
MONGODB_URI=
MONGODB_DATABASE=
DEVELOPMENT= true|false
JWT_SECRET= 
CORS_ORIGIN= "http://localhost:3001, http://localhost:3002"
```
