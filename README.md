# 🚀 Team Task Manager

A full-stack web application for managing team projects and tasks with role-based access control.

## 🌐 Live Demo

- **Frontend:** https://team-task-manager-two-self.vercel.app
- **Backend API:** https://team-task-manager-production-8ecc.up.railway.app

---

## 📸 Features

- 🔐 **Authentication** — Signup & Login with JWT
- 👑 **Role-Based Access** — Admin & Member roles
- 📁 **Project Management** — Create & Delete projects (Admin only)
- ✅ **Task Management** — Create, assign & track tasks
- 👤 **User Assignment** — Assign tasks to team members
- 📊 **Dashboard** — View total, pending, completed & overdue tasks
- 🔴 **Overdue Detection** — Highlights overdue tasks in red
- 🔍 **Task Filters** — Filter by All, Pending, Completed, Overdue

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Bootstrap |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | JWT (JSON Web Tokens) |
| Deployment | Vercel (Frontend), Railway (Backend) |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- Git installed

### 1. Clone the Repository

```bash
git clone https://github.com/imhr45/team-task-manager.git
cd team-task-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

> Make sure `frontend/src/services/api.js` has correct backend URL.

---

## 📡 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/users` | Get all users (Protected) |

### Project Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects` | Create project (Admin only) |
| GET | `/api/projects` | Get all projects |
| DELETE | `/api/projects/:id` | Delete project (Admin only) |

### Task Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks` | Get all tasks |
| PUT | `/api/tasks/:id` | Update task status |
| DELETE | `/api/tasks/:id` | Delete task |

---

## 👥 Role-Based Access

| Feature | Admin | Member |
|---------|-------|--------|
| Create Project | ✅ | ❌ |
| Delete Project | ✅ | ❌ |
| Create Task | ✅ | ✅ |
| Assign Task | ✅ | ✅ |
| Update Task Status | ✅ | ✅ |
| View Dashboard | ✅ | ✅ |

---

## 📁 Project Structure

```
team-task-manager/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   └── taskRoutes.js
│   └── server.js
│
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── Login.js
│       │   ├── Signup.js
│       │   ├── Dashboard.js
│       │   ├── Projects.js
│       │   └── Tasks.js
│       ├── services/
│       │   └── api.js
│       └── App.js
│
└── README.md
```

---

## 🚀 Deployment

- **Frontend** deployed on [Vercel](https://vercel.com)
- **Backend** deployed on [Railway](https://railway.app)
- **Database** hosted on [MongoDB Atlas](https://cloud.mongodb.com)

---

## 👨‍💻 Developer

**Himanshu Ranjan**
- GitHub: [@imhr45](https://github.com/imhr45)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
