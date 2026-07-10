# GymPro

GymPro is a gym membership management system built with React, Tailwind CSS, React Router DOM, Node.js, Express, MongoDB, JWT Authentication, and Recharts.

## Features

- Admin registration and login with JWT authentication
- Protected dashboard and application routes
- Membership plan management
- Trainer profile management
- Member management with trainer assignment
- Workout plan creation
- Daily attendance tracking
- Fitness progress tracking
- Dashboard charts for attendance and progress
- Responsive Tailwind CSS layout

## Project Structure

```text
GymPro/
  client/
    src/
      components/
      context/
      pages/
      routes/
      services/
      styles/
  server/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
```

## Run Frontend

```bash
cd client
npm install
npm run dev
```

## Run Backend

```bash
cd server
npm install
copy .env.example .env
npm run dev
```

Update `server/.env` with your MongoDB connection string and JWT secret.

```text
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/gympro
CLIENT_URL=http://127.0.0.1:5173
JWT_SECRET=replace_this_with_a_long_random_secret
```

## API Routes

```text
GET  /api/health
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
GET  /api/memberships
POST /api/memberships
GET  /api/trainers
POST /api/trainers
GET  /api/members
POST /api/members
PATCH /api/members/:id/assign-trainer
GET  /api/workouts
POST /api/workouts
GET  /api/attendance
POST /api/attendance
GET  /api/progress
POST /api/progress
```

## Build

```bash
cd client
npm run build
```

```bash
cd server
npm run check
```
