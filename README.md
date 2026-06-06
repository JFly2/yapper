# Yapper

Yapper is a full-stack real-time chat application built with a Spring Boot backend and a React frontend. It includes JWT authentication, protected REST endpoints, authenticated STOMP WebSocket messaging, room-based chat, and PostgreSQL persistence.

## Project Overview

Yapper is designed as a real-time messaging platform where users can register, log in, join chat rooms, and send messages through authenticated WebSocket connections.

The backend handles authentication, JWT validation, WebSocket authentication, message persistence, and room-based broadcasting. The frontend handles registration, login, JWT storage, room selection, and the realtime chat interface.

## Tech Stack

### Backend

* Java
* Spring Boot
* Spring Security
* Spring WebSocket
* STOMP
* SockJS
* JWT
* PostgreSQL
* Spring Data JPA
* Maven

### Frontend

* React
* Vite
* JavaScript
* React Router
* Axios
* STOMP.js
* SockJS
* CSS

## Repository Structure

```text
yapper/
├── backend/
│   └── yapper-backend/
│       ├── src/
│       ├── pom.xml
│       └── README.md
│
├── frontend/
│   └── yapper-frontend/
│       ├── src/
│       ├── package.json
│       └── README.md
│
└── README.md
```

## Features

* User registration
* User login
* BCrypt password hashing
* JWT authentication
* Protected REST endpoints
* Authenticated WebSocket connections
* STOMP-based realtime messaging
* Room-based chat subscriptions
* PostgreSQL message and user persistence
* React login/register pages
* React chat interface
* Room sidebar
* Message input and message list components

## Authentication Flow

### Registration

Users register with an email, username, and password.

The backend:

1. Checks whether the username already exists.
2. Checks whether the email already exists.
3. Hashes the password using BCrypt.
4. Stores the user in PostgreSQL.

### Login

Users log in with a username and password.

The backend:

1. Looks up the user by username.
2. Verifies the password using BCrypt.
3. Generates a JWT token.
4. Returns the token to the frontend.

The frontend stores the token in local storage:

```javascript
localStorage.setItem("jwt_token", token);
```

The token is used for authenticated REST requests and WebSocket connections.

## WebSocket Flow

The frontend connects to the backend WebSocket endpoint:

```text
/ws
```

During the STOMP connection, the frontend sends the JWT:

```javascript
Authorization: Bearer <token>
```

The backend WebSocket interceptor:

1. Intercepts the STOMP `CONNECT` frame.
2. Extracts the JWT.
3. Validates the token.
4. Loads the authenticated user.
5. Attaches the user as the WebSocket principal.

Users subscribe to room topics:

```text
/topic/room/{roomId}
```

Messages are sent to:

```text
/app/yapper.send
```

The backend sets the message sender from the authenticated principal rather than trusting the frontend.

## Local Setup

### Prerequisites

* Java 17+
* Maven
* Node.js
* npm
* PostgreSQL

## Backend Setup

Navigate to the backend project:

```bash
cd backend/yapper-backend
```

Create the PostgreSQL database:

```sql
CREATE DATABASE yapperdb;
```

Configure local database settings in:

```text
src/main/resources/application.properties
```

Recommended environment-variable based configuration:

```properties
spring.application.name=yapper-backend

spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:5432/yapperdb}
spring.datasource.username=${DB_USERNAME:}
spring.datasource.password=${DB_PASSWORD:}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Run the backend:

```bash
./mvnw spring-boot:run
```

or:

```bash
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

## Frontend Setup

Navigate to the frontend project:

```bash
cd frontend/yapper-frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend usually runs on:

```text
http://localhost:5173
```

## Development Status

Implemented:

* Spring Boot backend structure
* PostgreSQL connection
* User model and repository
* Message model and repository
* Registration endpoint
* Login endpoint
* JWT service
* JWT authentication filter
* Spring Security configuration
* WebSocket configuration
* STOMP WebSocket authentication interceptor
* Room-based WebSocket messaging
* React registration page
* React login page
* JWT token storage
* Axios API setup
* React chat page structure
* Room sidebar
* Message input
* Message list and message component structure

In progress:

* Final realtime message debugging
* Displaying live messages in the React UI
* Room switching behavior
* Loading message history from REST endpoint
* UI cleanup and styling

## Future Improvements

* Refresh tokens
* Email verification
* Password reset
* Auth context on the frontend
* Protected route wrapper
* Logout functionality
* Persistent room list
* Private messaging
* Friend system
* Typing indicators
* Message timestamps
* Read receipts
* Deployment configuration
* Production database configuration

## Notes

This project is currently under active development. The backend and frontend are being built together as a full-stack application, with the main focus on secure authentication and realtime messaging architecture.
