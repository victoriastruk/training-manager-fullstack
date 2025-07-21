# 🎓 Training Manager Fullstack App

**A fullstack web application for managing trainings and workshops, built with JavaScript.**

> A portfolio project to demonstrate CRUD operations, REST API design, Sequelize relations, migrations & seeders, Express routing, React with routing, and a clean admin interface.

---

## 🚀 About the project

This project demonstrates my ability to design and implement a fullstack web application with a relational database and a clear domain model.

The application allows administrators to:
- Create, edit, and delete trainings
- Assign trainers and participants
- View and filter trainings by date

Participants can:
- Register for available trainings
- View the list of trainings they are registered for

> ⚠️ Authentication & user roles are not implemented — the app provides a single admin interface.

---

## 🧰 Tech stack

- **Backend**
  - Node.js
  - Express.js
  - Sequelize (PostgreSQL)
  - dotenv
  - Sequelize CLI (migrations & seeders)
  - Express Router
  - Mocha / Chai / Supertest (tests)

- **Frontend**
  - React
  - React Router
  - Fetch API
  - HTML / CSS / JS

---

## 📂 Features

### Backend
✅ REST API endpoints:
- `GET /trainings` — fetch all trainings (with optional date filter)
- `GET /trainings/:id` — fetch training by ID
- `POST /trainings` — create training
- `PUT /trainings/:id` — update training
- `DELETE /trainings/:id` — delete training

✅ Participants:
- Register a participant for a training
- List trainings a participant is registered for

✅ Database:
- Models: `Training`, `User`, `Registration`
- Relationships: Trainings ↔ Trainers ↔ Participants
- Migrations include appropriate constraints
- Seeders populate the database with example data

✅ `.env` used for environment variables

✅ Unit & integration tests with Mocha/Chai

---

### Frontend
✅ Admin interface:
- Main page: view and filter trainings
- Create & edit training form
- Delete training
- Assign trainers and participants

✅ React routing:
- Separate pages for training list, training form, and participant view

---

## 📦 Getting started

### 🔷 Backend

Install dependencies:
```bash
cd server
npm install
```
Run database migrations and seeders:
```bash
npm run migrate
npm run seed
```
Start the development server:
```bash
npm run dev
```
✅ The backend runs at: http://localhost:5000



🔷 Frontend

Install dependencies:
```bash
cd client
npm install
```
Start the React development server:
```bash
npm run dev
```
✅ The frontend runs at: http://localhost:5173


