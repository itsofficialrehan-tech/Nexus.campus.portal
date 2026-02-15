# 🚀 Nexus Campus Portal

Nexus Campus Portal is a role-based campus management web application designed to demonstrate a modern, scalable, and API-driven digital campus system.  
This project was built for a hackathon to showcase frontend–backend integration, authentication, and real-world campus workflows.

---

## 📌 Problem Statement

Most colleges still rely on:
- Manual grievance systems
- Scattered internship information
- No role-based access for students, staff, and admins
- Poor transparency in issue tracking

This results in inefficiency, lack of accountability, and a bad user experience.

---

## ✅ Solution

Nexus Campus Portal solves this by providing:
- A **single unified digital platform**
- **Role-based dashboards** (Student / Admin / Staff)
- **JWT-secured authentication**
- **API-driven modules** for internships and grievances
- Clean, modern, responsive UI

---

## 🧩 Core Features

### 🔐 Authentication
- Secure login using JWT
- Role-based access control
- Protected API routes

### 🎓 Student Module
- View available internships (API-driven)
- Apply for internships
- Submit grievances
- Track grievance status

### 🧑‍💼 Admin Module
- View all grievances submitted by students
- Change grievance status (Pending / In Review / Resolved)
- Monitor platform activity

### 🧑‍🏫 Staff / Teacher (Demo)
- Dedicated role flow (UI + logic ready)
- Can be extended with academic features

### 🎯 UI & UX
- Modern dashboard layout
- Custom animated cursor
- Smooth transitions
- Dark-mode friendly design

---

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

### Backend
- Node.js
- Express.js
- JWT Authentication

### Tools
- Requestly (API testing & demo)
- GitHub Pages (Frontend deployment)

---

## 🔗 Live Frontend Demo

👉 **Frontend Live Link**  
https://itsofficialrehan-tech.github.io/Nexus.campus.portal/

> ⚠️ Note: GitHub Pages supports frontend only.  
> Backend APIs are demonstrated locally and via Requestly (shown in the demo video).

---

## 📂 Project Structure

Nexus.campus.portal/ │ ├── frontend/ │   ├── index.html │   ├── login.html │   ├── student-dashboard.html │   ├── admin-dashboard.html │   ├── internships.html │   ├── grievance.html │   ├── css/ │   └── js/ │ ├── backend/ │   ├── server.js │   ├── routes/ │   │   ├── internship.routes.js │   │   └── grievance.routes.js │   └── middleware/ │ └── README.md

---

## ⚙️ How to Run Frontend Locally

### Method 1: Using Live Server (Recommended)
1. Open the project in **VS Code**
2. Right-click on `index.html`
3. Select **Open with Live Server**

### Method 2: Direct Browser
1. Open `index.html`
2. Run in any modern browser (Chrome recommended)

---

## ⚙️ How to Run Backend Locally

### Prerequisites
- Node.js installed

### Steps
```bash
cd backend
npm install
node server.js

Backend will run on:

http://localhost:5000


---

🔌 API Integration Overview

Authentication

POST /api/auth/login

Returns JWT token


Internships

GET /api/internships

POST /api/internships/apply


Grievances

POST /api/grievance

GET /api/grievance/my

GET /api/admin/grievances


All protected routes require:

Authorization: Bearer <JWT_TOKEN>


---

🧪 API Testing & Demo

APIs tested using Requestly

Live network calls shown in the demo video

Demonstrates real backend execution (not static UI)



---

📈 Future Enhancements

Database integration (MongoDB / PostgreSQL)

Real internship provider APIs

Email & notification system

File uploads (documents, resumes)

Analytics dashboard for admin

Production deployment (Render / Railway)



---

🎥 Demo Video

A full walkthrough video is provided showing:https://www.youtube.com/watch?v=DYQAKHGnuZE

Frontend flow

Login & JWT authentication

Internship API calls

Grievance workflow

Admin dashboard functionality



---

👨‍💻 Author

Rehan Khan
Frontend & Backend Developer
Hackathon Participant


---

⭐ Conclusion

Nexus Campus Portal demonstrates:

Clean architecture

Real-world API usage

Role-based access control

Hackathon-ready full-stack development


Built with scalability and real campus needs in mind.

