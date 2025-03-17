# LunchNSpecials Codebase

This project is a web application that is structured with separate components for the admin interface, client-side application, server-side backend, and database management. It is set up with Docker for easy development and deployment.

### 1. admin/

This directory contains the admin panel or dashboard for managing various parts of the application.

### 2. client/

This directory contains the client-side application, typically a frontend application with React.

### 3. database/

This directory holds configurations and files related to database management.

### 4. server/

Contains the server-side code for handling backend logic, APIs, and other business logic.

### - default.conf:

Default configuration for Nginx to manage a Single Page Application (SPA).

### - docker-compose.yml:

Defines the services for setting up the database container using Docker Compose.

## Getting Started

To run the application locally, follow these steps:

```
git clone <repository-url>
cd <project-directory>
```

Set up Docker containers: If you don't have Docker installed, download and install Docker.

Start the application using Docker Compose:

```
docker-compose up --build
```

Access the application:

- Client Interface: http://localhost:3001
- Admin Interface: http://localhost:3002
- API: http://localhost:5001
