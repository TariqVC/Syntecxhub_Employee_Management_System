# 👥 EmpManager — Employee Management System

A full-stack Employee Management System built with the **MERN stack** (MongoDB, Express, React, Node.js). Manage your workforce with a clean dashboard, department tracking, and full CRUD operations.

---

## 🚀 Features

- **Dashboard** — Live stats cards, employees by role (pie chart), employees by department (bar chart), and a recent employees table
- **Manage Employees** — Add, edit, and delete employees with grid/list view toggle, search, and filters
- **Departments** — Department cards with a click-to-expand employee panel
- **Form Validation** — Client-side validation with React Hook Form + server-side validation with Mongoose
- **Custom Roles & Departments** — Select "Other" to enter a custom role or department
- **Responsive Design** — Works on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, React Router, React Hook Form, Recharts |
| Backend | Node.js, Express.js |
| Database | MongoDB (local via Compass) |
| HTTP Client | Axios |
| Styling | Pure CSS with responsive grid layouts |

---

## 📁 Project Structure

```
employee-management-system/
├── backend/
│   ├── models/
│   │   └── Employee.js       # Mongoose schema & validation
│   ├── routes/
│   │   └── employees.js      # REST API routes (CRUD)
│   ├── .env                  # Environment variables
│   └── server.js             # Express server entry point
└── frontend/
    └── src/
        ├── api/
        │   └── employeeApi.js        # Axios API calls
        ├── components/
        │   ├── Navbar.jsx            # Navigation bar
        │   ├── EmployeeCard.jsx      # Employee card component
        │   └── EmployeeForm.jsx      # Add/Edit form with validation
        └── pages/
            ├── Dashboard.jsx         # Stats + charts + recent employees
            ├── ManageEmployees.jsx   # Full employee list + filters
            ├── AddEmployee.jsx       # Add/Edit page wrapper
            └── Departments.jsx       # Department cards + employee panel
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB Compass](https://www.mongodb.com/products/compass) running locally

---

### 1. Clone the Repository

```bash
git clone https://github.com/TariqVC/Syntecxhub_Employee_Management_System.git
cd Syntecxhub_Employee_Management_System
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
MONGO_URI="your_own_connect_link"
PORT="examples 5000"
```

Start the backend server:

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected
🚀 Server running on port 5000
```

### 3. Set Up the Frontend

Open a new terminal from the project root:

```bash
cd frontend
npm install
npm start
```

The app will open at **http://localhost:3000**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get a single employee |
| POST | `/api/employees` | Create a new employee |
| PUT | `/api/employees/:id` | Update an employee |
| DELETE | `/api/employees/:id` | Delete an employee |

---

## 🗂️ Employee Data Model

| Field | Type | Required | Notes |
|---|---|---|---|
| name | String | ✅ | Min 2 characters |
| email | String | ✅ | Must be unique, valid format |
| role | String | ✅ | Preset list or custom |
| department | String | ✅ | Preset list or custom |
| salary | Number | ✅ | Cannot be negative |
| phone | String | ❌ | Valid phone format |
| status | String | ✅ | Active / Inactive |
| joinDate | Date | — | Defaults to current date |

---

## 📸 Pages Overview

### 🏠 Dashboard
- Total, active, and inactive employee counts
- Number of departments and average salary
- Pie chart — employees by role
- Bar chart — employees by department
- Recent employees table

### 👥 Manage Employees
- Grid and list view toggle
- Search by name or email
- Filter by role and status
- Edit and delete per employee

### 🏢 Departments
- Auto-generated from employee data
- Click a department card to reveal its employees
- Shows role, salary, and status per employee

---

## 📄 License

This project was built as part of an internship project for **Syntecxhub**.
