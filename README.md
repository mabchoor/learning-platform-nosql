# 📚 NoSQL Learning Platform API

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v14.x-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4.2-green.svg)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-v6.0-green.svg)](https://redis.io/)

Welcome to the **NoSQL Learning Platform API**! 🎓🚀 This backend API powers an online learning platform that allows for efficient management of courses, students, and enrollments. The platform uses **MongoDB** as the main database and **Redis** for caching to ensure optimal performance! 💻📈

---

## 📦 Features

- **Courses Management** 📝: Create, retrieve, update, and delete courses.
- **Student Management** 👩‍🎓👨‍🎓: Create, retrieve, update, and delete student profiles.
- **Student Enrollment** 📚: Enroll students in courses and fetch their enrolled courses.
- **Cache with Redis** ⚡: Frequently accessed data like courses and students are cached for faster response times.

---

## 🚀 Installation & Setup

Follow these easy steps to get the project up and running on your machine!

### 1️⃣ Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/mabchoor/learning-platform-nosql.git
cd learning-platform-nosql
```

2️⃣ Install Dependencies
Run the following command to install all necessary dependencies:

bash
Copy
Edit
npm install
3️⃣ Set Up Environment Variables
Create a .env file in the project root and add the following environment variables:

plaintext
Copy
Edit
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=learning_platform
REDIS_URI=redis://localhost:6379
PORT=3000
4️⃣ Start the Server
Run the following command to start the server:

bash
Copy
Edit
npm start
Now, the API will be available at http://localhost:3000! 🎉

🛠️ API Endpoints
Courses 📘
GET /courses: Retrieve all courses.
POST /courses: Create a new course.
GET /courses/:id: Get details of a course by ID.
PUT /courses/:id: Update a course by ID.
DELETE /courses/:id: Delete a course by ID.
GET /courses/stats: Get course statistics (e.g., total number of courses, total duration, etc.).
Students 🧑‍🎓
GET /students: Retrieve all students.
POST /students: Add a new student.
GET /students/:id: Retrieve student details by ID.
PUT /students/:id: Update student information.
DELETE /students/:id: Delete a student.
POST /students/:id/enroll: Enroll a student in a course.
GET /students/:id/courses: Retrieve courses that a student is enrolled in.
🔧 Project Structure
Here's an overview of how the project is structured:

plaintext
Copy
Edit
src/
├── config/ # Configuration files (DB, Redis)
│ ├── dbConfig.js # MongoDB connection config
│ └── redisConfig.js # Redis connection config
├── controllers/ # Handles business logic
│ ├── courseController.js # Course-related logic
│ └── studentController.js # Student-related logic
├── routes/ # API route definitions
│ ├── courseRoutes.js # Course routes
│ └── studentRoutes.js # Student routes
├── services/ # Services for MongoDB and Redis
│ ├── courseService.js # Course service
│ └── studentService.js # Student service
├── app.js # Main application entry point
└── .env # Environment variables
