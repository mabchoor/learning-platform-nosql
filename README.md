# 📚 NoSQL Learning Platform API

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v14.x-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4.2-green.svg)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-v6.0-green.svg)](https://redis.io/)

Welcome to the **NoSQL Learning Platform API**! 🎓🚀 This backend API powers an online learning platform that allows for efficient management of courses, students, and enrollments. The platform uses **MongoDB** as the main database and **Redis** for caching to ensure optimal performance! 💻📈

[Réponses aux questions](#réponses-aux-questions)

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

🔥 Technologies Used
Node.js: JavaScript runtime used for server-side development.
Express.js: Web framework to handle HTTP requests and routing.
MongoDB: NoSQL database for storing courses and students.
Redis: In-memory data store used for caching.
Mongoose: ODM to interact with MongoDB.

## Réponses aux questions

### Comment gérer efficacement le cache avec Redis ? 🤔

**Réponse :** Utiliser des commandes comme `SET`, `GET` et `DEL` pour gérer le cache dans Redis. Il est également important de définir un **TTL** (Time To Live) pour les clés, afin de gérer leur durée de vie et éviter de garder des données obsolètes.

### Quelles sont les bonnes pratiques pour les clés Redis ? 🔑

**Réponse :**

- Utiliser des noms de clés **descriptifs** et **cohérents** (par exemple : `user:<id>`).
- Ajouter des **namespaces** pour éviter les collisions de noms entre les données (par exemple : `student:123`, `course:456`).
- Définir des **TTL** appropriés pour les clés afin de s'assurer que les données sont rafraîchies régulièrement.

### Pourquoi créer des services séparés ? 🛠️

**Réponse :** Séparer la logique métier de l'accès aux bases de données permet de rendre le code **plus modulaire**, **réutilisable** et **facile à maintenir**. Cela facilite aussi le **test unitaire** des composants métiers.

### Pourquoi séparer les routes dans différents fichiers ? 📂

**Réponse :** Cela permet d’**organiser le code** de manière plus lisible et maintenable, en regroupant les routes par fonctionnalité (par exemple, une route pour les utilisateurs, une autre pour les cours), ce qui rend le projet plus **scalable**.

### Comment organiser les routes de manière cohérente ? 📍

**Réponse :**

- Utiliser un fichier par groupe de routes (par exemple : `studentRoutes.js` pour les routes des étudiants, `courseRoutes.js` pour les routes des cours).
- Les importer et les monter dans le fichier principal (`app.js`) pour centraliser la gestion des routes.

### Quelle est la différence entre un contrôleur et une route ? 🔄

**Réponse :**

- Une **route** définit l’**URL** et la méthode HTTP (par exemple, `GET /students`).
- Un **contrôleur** contient la logique métier exécutée quand la route est appelée, comme la gestion des données en base de données ou la gestion des réponses HTTP.

### Pourquoi séparer la logique métier des routes ? 💡

**Réponse :** La séparation de la logique métier des routes rend le code plus **modulaire**, facilite les **tests unitaires** et permet de maintenir plus facilement des **changements** dans le code métier sans affecter la gestion des routes.

### Pourquoi est-il important de valider les variables d'environnement au démarrage ? 🛑

**Réponse :** Pour s'assurer que l'application a toutes les configurations nécessaires avant de démarrer. Cela permet d'éviter des **erreurs runtime** dues à des variables manquantes ou incorrectes.

### Que se passe-t-il si une variable requise est manquante ? ⚠️

**Réponse :** Une **erreur explicite** est levée au démarrage, empêchant l'application de démarrer sans les configurations nécessaires. Cela aide à éviter des problèmes difficiles à diagnostiquer plus tard dans l'exécution.

### Pourquoi créer un module séparé pour les connexions aux bases de données ? 🔌

**Réponse :** Cela permet de **centraliser** la logique de connexion et de réutiliser le code facilement à différents endroits dans l'application. C'est également plus facile à maintenir et à mettre à jour.

### Comment gérer proprement la fermeture des connexions ? 🔒

**Réponse :** Implémenter une fonction dédiée à la fermeture des connexions, comme `db.close()`, et appeler cette fonction lors de l'arrêt de l'application, notamment dans les gestionnaires d'événements de **shutdown** ou de **crash** de l'application.

### Comment organiser le point d'entrée de l'application ? 🏁

**Réponse :** Dans le fichier principal (`app.js`), commencez par **initialiser les connexions** aux bases de données, configurez les **middlewares** Express, montez les **routes** et démarrez le serveur HTTP. Cela garantit que toutes les étapes essentielles sont réalisées avant que l'application ne commence à accepter des requêtes.

### Quelle est la meilleure façon de gérer le démarrage de l'application ? 🚀

**Réponse :** Utilisez une fonction **asynchrone** pour gérer l'initialisation des connexions aux bases de données et le démarrage du serveur. Capturer les erreurs pendant l'initialisation et lors du démarrage permet d'éviter des plantages et de garantir que l'application fonctionne correctement.

📝 License
This project is licensed under the MIT License. Feel free to use it, modify it, and share it!
