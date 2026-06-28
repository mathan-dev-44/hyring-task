# hyring-task

# Task Board

A real-time task board built with **Next.js**, **Node.js**, **Express**, **PostgreSQL**, **Prisma**, **Socket.IO**, and **TanStack Query**.

---

# Features

* ✅ Create Task Cards
* ✅ Edit Task Cards
* ✅ Delete Task Cards
* ✅ Drag & Drop between columns
* ✅ Real-time synchronization using WebSockets
* ✅ Automatic socket reconnection

---

# Tech Stack

## Frontend

* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS
* TanStack Query
* Socket.IO Client
* dnd-kit

## Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL
* Socket.IO

---

# Project Structure

```text
client/
├── app/
├── components/
├── hooks/
├── lib/
├── utils/Providers.tsx
└── .env.local

server/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── sockets/
│   ├── db/
│   └── index.js
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── .env.example
```

---

# Environment Variables

## Frontend

Create:

```text
client/.env
```

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

---

## Backend

Create:

```text
server/.env
```

```env
PORT=3001
CLIENT_URL=http://localhost:3000

DATABASE_URL=your_postgresql_connection_string
```

Example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/taskboard
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd task-board
```

---

# Backend Setup

```bash
cd server
npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate deploy
```

For local development:

```bash
npx prisma migrate dev
```

Start backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:3001
```

---

# Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

# Database

This project uses PostgreSQL with Prisma.

Schema:

```prisma
model Card {
  id        String   @id @default(uuid())
  title     String
  status    Status
  position  Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Status {
  todo
  in_progress
  done
}
```

---

# Real-Time Synchronization

The application uses Socket.IO to synchronize changes between multiple browser tabs and clients.

Events:

```text
card:created
card:updated
card:deleted
```

When a user:

* creates a card
* updates a card
* deletes a card
* drags a card to another column

all connected clients receive updates instantly without refreshing.

---

# Reconnection Handling

Socket.IO automatically reconnects if the connection is temporarily lost.

The UI shows:

* Connected
* Reconnecting
* Disconnected

to indicate the current socket status.

---

# Drag and Drop

Implemented using:

```text
@dnd-kit/core
```

Users can move cards between:

* To Do
* In Progress
* Done

---

# Available Scripts

## Frontend

```bash
npm run dev
npm run build
npm run start
```

## Backend

```bash
npm run dev
npm run start
```
