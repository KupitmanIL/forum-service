# Forum Service

A RESTful API for a forum application built with Node.js, Express, and MongoDB.

The project provides user registration, HTTP Basic Authentication, role-based access control, and post management.

## Tech Stack

* **Node.js** — JavaScript runtime
* **Express.js** — REST API framework
* **MongoDB** — NoSQL database
* **Mongoose** — MongoDB object modeling
* **Joi** — Request validation
* **bcrypt** — Password hashing
* **Jest** — Automated testing
* **Docker & Docker Compose** — Containerization

## Features

### User Management

* User registration and authentication
* Secure password hashing with bcrypt
* User profile management
* Password changes
* Role-based access control
* Three user roles: `USER`, `MODERATOR`, and `ADMIN`

### Forum Posts

* Create, read, update, and delete posts
* Search posts by author
* Filter posts by tags
* Retrieve posts within a date range
* Add comments to posts
* Like posts
* Restrict post modifications based on ownership and permissions

### Security

* HTTP Basic Authentication
* Password hashing
* Request validation using Joi
* Role-based authorization
* Ownership checks for protected operations
* Environment-based configuration

**Security note:** HTTP Basic Authentication must be used over HTTPS in production. The included Docker configuration is intended for local development and demonstration.

## API Endpoints

### User Accounts

| Method | Endpoint                          | Description             |
| ------ | --------------------------------- | ----------------------- |
| POST   | `/account/register`               | Register a user         |
| POST   | `/account/login`                  | Authenticate a user     |
| GET    | `/account/user/:login`            | Get user information    |
| PATCH  | `/account/user/:login`            | Update user information |
| DELETE | `/account/user/:login`            | Delete a user           |
| PATCH  | `/account/password`               | Change password         |
| PATCH  | `/account/user/:login/role/:role` | Add a user role         |
| DELETE | `/account/user/:login/role/:role` | Remove a user role      |

### Forum Posts

| Method | Endpoint                             | Description                |
| ------ | ------------------------------------ | -------------------------- |
| POST   | `/forum/post/:author`                | Create a post              |
| GET    | `/forum/post/:id`                    | Get a post by ID           |
| PATCH  | `/forum/post/:id`                    | Update a post              |
| DELETE | `/forum/post/:id`                    | Delete a post              |
| PATCH  | `/forum/post/:id/like`               | Like a post                |
| PATCH  | `/forum/post/:id/comment/:commenter` | Add a comment              |
| GET    | `/forum/posts/author/:author`        | Get posts by author        |
| GET    | `/forum/posts/tags`                  | Filter posts by tags       |
| GET    | `/forum/posts/period`                | Filter posts by date range |

Some endpoints require authentication and additional authorization based on the user's role or resource ownership.

## Getting Started

### Prerequisites

* Docker and Docker Compose

### 1. Clone the repository

```bash
git clone https://github.com/KupitmanIL/forum-service.git
cd forum-service
```

### 2. Configure environment variables

Create a `.env` file in the project root.

```dotenv
ADMIN_PASSWORD=replace_with_a_strong_password
```

The Docker Compose configuration provides the MongoDB connection string and application port.

### 3. Start the application

```bash
docker compose up --build -d
```

The API will be available at:

`http://localhost:8080`

### 4. Stop the application

```bash
docker compose down
```

MongoDB data is stored in a persistent Docker volume.

## API Usage Examples

### Register a User

**POST** `/account/register`

```json
{
  "login": "testuser",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

New users receive the `USER` role.

### Authentication

Protected endpoints use HTTP Basic Authentication.

Example:

```bash
curl -u testuser:SecurePassword123! \
  http://localhost:8080/account/user/testuser
```

### Create a Post

**POST** `/forum/post/testuser`

```json
{
  "title": "My first post",
  "content": "Hello from Forum Service!",
  "tags": ["nodejs", "mongodb"]
}
```

This endpoint requires authentication.

### Example Post Response

```json
{
  "title": "My first post",
  "content": "Hello from Forum Service!",
  "author": "testuser",
  "tags": ["nodejs", "mongodb"],
  "likes": 0,
  "comments": [],
  "id": "example-post-id"
}
```

## Running Tests

Install dependencies:

```bash
npm ci
```

Run the automated tests:

```bash
npm test -- --runInBand
```

The project includes tests for request validation and authentication middleware.

## Project Structure

```text
forum-service/
├── src/
│   ├── configuration/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   └── server.js
├── tests/
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md
```

## Future Improvements

* Integration tests for protected API endpoints
* API documentation with OpenAPI/Swagger
* Pagination for post listings
* Improved production deployment configuration

## Author

**Ilia Kupitman**

GitHub: KupitmanIL
