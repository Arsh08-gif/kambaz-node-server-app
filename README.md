# Kambaz Node Server

REST API backend for Kambaz LMS, built with Node.js, Express, and MongoDB.

---

## Overview

This server handles all backend logic for the Kambaz LMS — authentication, course management, quiz creation and grading, attempt tracking, and enrollment. It follows a **route → controller → DAO → model** pattern, keeping each layer separate and maintainable.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Database | MongoDB, Mongoose |
| Environment | dotenv |

---

## Prerequisites

- Node.js v18+
- npm v9+
- MongoDB Atlas account

---

## Installation

```bash
git clone https://github.com/your-username/kambaz-node-server
cd kambaz-node-server
npm install
```

Create a `.env` file in the root:
```
DATABASE_CONNECTION_STRING=mongodb+srv://<user>:<password>@cluster.mongodb.net/Kambaz
PORT=4000
```

Start the server:
```bash
node index.js
```

Server runs on `http://localhost:4000`

---

## File Structure

```
kambaz-node-server/
├── Assignments/
│   ├── routes.js        # Assignment endpoints
│   ├── dao.js           # Assignment DB queries
│   └── model.js         # Mongoose schema
├── Courses/
│   ├── routes.js        # Course endpoints
│   ├── dao.js           # Course DB queries
│   └── model.js         # Mongoose schema
├── Enrollments/
│   ├── routes.js        # Enrollment endpoints
│   ├── dao.js           # Enrollment DB queries
│   └── model.js         # Mongoose schema
├── Modules/
│   ├── routes.js        # Module endpoints
│   ├── dao.js           # Module DB queries
│   └── model.js         # Mongoose schema
├── Quizzes/
│   ├── routes.js        # Quiz endpoints
│   ├── dao.js           # Quiz DB queries
│   ├── model.js         # Mongoose schema
│   └── schema.js        # Subdocument schemas (questions, choices)
├── Questions/
│   ├── routes.js        # Question endpoints
│   ├── dao.js           # Question DB queries
│   └── model.js         # Mongoose schema
├── QuizAttempt/
│   ├── routes.js        # Attempt + grading endpoints
│   ├── dao.js           # Attempt DB queries
│   └── model.js         # Mongoose schema
├── Users/
│   ├── routes.js        # Auth endpoints (signin, signup, profile)
│   ├── dao.js           # User DB queries
│   └── model.js         # Mongoose schema
├── Database/            # Seed data
├── .env                 # Environment variables (not committed)
├── Hello.js             # Health check route
└── index.js             # Express app entry point
```

---

## API Routes

| Resource | Base Path |
|---|---|
| Users | `/api/users` |
| Courses | `/api/courses` |
| Assignments | `/api/assignments` |
| Modules | `/api/modules` |
| Enrollments | `/api/enrollments` |
| Quizzes | `/api/courses/:courseId/quizzes` |
| Questions | `/api/quizzes/:quizId/questions` |
| Attempts | `/api/quizzes/:quizId/attempts` |


---

## Deployment

Deployed on **Render**. Environment variables (`DATABASE_CONNECTION_STRING`, `PORT`) are configured in the Render dashboard under Environment settings.

> Note: Render free tier spins down after inactivity. First request may take ~30 seconds to wake up.

---

## CORS

Configured to allow requests from:
- `http://localhost:3000` (local development)
- Vercel production URL (frontend deployment)
