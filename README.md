# User Management Frontend

## Description

This project is a frontend application developed using **React**, **TypeScript**, and **Tailwind CSS**, designed to interact with a backend API for user management, authentication, and more. It provides functionality for viewing, creating, editing, and deleting user profiles.

## 📦 Stack

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - A superset of JavaScript that adds static typing.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for styling.
- [Vite](https://vitejs.dev/) - A fast build tool and development server for modern web projects.
- [JWT (JSON Web Tokens)](https://jwt.io/) - For user authentication and authorization.
- [React Router](https://reactrouter.com/) - For routing and navigation within the app.
- [Axios](https://axios-http.com/) - For making HTTP requests to the backend API.
- [Docker](https://www.docker.com/get-started) (optional) - For containerized development environment.

## 🚀 Features

- Administrator login.
- View, create, update, and delete users.
- Admin dashboard for managing users.
- JWT authentication and session management.
- Full frontend-backend interaction via REST API.

## ⚙️ Requirements

To run this project locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (>= 14.x)
- [Docker](https://www.docker.com/get-started) (if using Docker Compose)

## 🛠️ Getting Started

### 1. Clone the project

```bash
git clone https://github.com/amel-harrath/frontend.git
```

### 2. Setup Environment

Create a .env file in the root of the project to define environment variables for the application.

#### Example:

```bash
VITE_API_URL= Your Backend URL
```

Make sure to set the correct API URL for your backend.

### 3. Start with Docker

```bash
docker-compose up --build
```

## 🧪 Running Locally (without Docker)

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

Visit http://localhost:5173/ in your browser to access the application.

## 🐳 Docker

- App: http://localhost:5173/

### Build and run locally

```bash
docker-compose up --build
```
